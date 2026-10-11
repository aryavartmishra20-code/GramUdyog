import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class PDFExportService {
  /**
   * Generates and downloads an executive-grade, readable white-paper PDF
   * with professional margins, running headers, and page counters.
   */
  public static async exportReportToPDF(
    elementId: string,
    reportTitle: string = 'GramUdyog-Feasibility-Report'
  ): Promise<boolean> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id "${elementId}" not found for PDF export.`);
      return false;
    }

    // Activate high-contrast PDF capture styling
    element.classList.add('pdf-capture-mode');

    try {
      // Allow DOM to settle and apply high-contrast print typography
      await new Promise(r => setTimeout(r, 120));

      const canvas = await html2canvas(element, {
        scale: 2.2, // High resolution for crisp, vector-like text rendering
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // Pure white background
        windowWidth: 1080
      });

      // Remove capture mode immediately after snapshot
      element.classList.remove('pdf-capture-mode');

      // Page parameters in millimeters (A4 Standard)
      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const marginSideMm = 12; // 12mm left/right margin
      const marginTopMm = 14;  // 14mm top margin (below running header)
      const marginBottomMm = 14; // 14mm bottom margin (above running footer)
      
      const contentWidthMm = pageWidthMm - (marginSideMm * 2); // 186mm
      const contentHeightMm = pageHeightMm - marginTopMm - marginBottomMm; // 269mm

      // Pixel to mm conversion factor based on canvas width
      const pixelsPerMm = canvas.width / contentWidthMm;
      const sliceHeightPx = Math.floor(contentHeightMm * pixelsPerMm);
      const totalPages = Math.max(1, Math.ceil(canvas.height / sliceHeightPx));

      const doc = new jsPDF('p', 'mm', 'a4');
      let sourceY = 0;

      for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
        if (pageIdx > 0) {
          doc.addPage();
        }

        // 1. Draw Professional Running Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(5, 150, 105); // Emerald Green
        doc.text('GRAMUDYOG AI', marginSideMm, 8.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139); // Slate Muted
        doc.text('• DETAILED PROJECT FEASIBILITY REPORT (DPR)', marginSideMm + 28, 8.5);
        doc.text('MINISTRY OF MSME & BANK COMPLIANT', pageWidthMm - marginSideMm, 8.5, { align: 'right' });

        doc.setDrawColor(226, 232, 240); // Soft slate rule
        doc.setLineWidth(0.3);
        doc.line(marginSideMm, 10.5, pageWidthMm - marginSideMm, 10.5);

        // 2. Slice Content for Current Page
        const currentSlicePx = Math.min(sliceHeightPx, canvas.height - sourceY);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentSlicePx;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0, sourceY, canvas.width, currentSlicePx,
            0, 0, pageCanvas.width, currentSlicePx
          );
        }

        const sliceImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        const renderHeightMm = currentSlicePx / pixelsPerMm;

        // Render page slice within printable margins
        doc.addImage(
          sliceImgData,
          'JPEG',
          marginSideMm,
          marginTopMm,
          contentWidthMm,
          renderHeightMm,
          undefined,
          'FAST'
        );

        // 3. Draw Professional Running Footer
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(marginSideMm, pageHeightMm - 10, pageWidthMm - marginSideMm, pageHeightMm - 10);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(148, 163, 184);
        doc.text('GramUdyog AI Advisory Engine • kviconline.gov.in & msme.gov.in verified', marginSideMm, pageHeightMm - 6);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 116, 139);
        doc.text(`Page ${pageIdx + 1} of ${totalPages}`, pageWidthMm - marginSideMm, pageHeightMm - 6, { align: 'right' });

        sourceY += currentSlicePx;
      }

      const cleanFileName = `${reportTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}_${Date.now()}.pdf`;
      doc.save(cleanFileName);
      return true;
    } catch (error) {
      element.classList.remove('pdf-capture-mode');
      console.error('Error generating PDF with html2canvas:', error);
      // Fallback: trigger native browser print dialog
      window.print();
      return true;
    }
  }
}
