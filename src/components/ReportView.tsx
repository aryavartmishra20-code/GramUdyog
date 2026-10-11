import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import type { FeasibilityReport } from '../types/business';
import { PDFExportService } from '../services/pdfService';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  IndianRupee, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  ExternalLink, 
  ArrowLeft,
  SlidersHorizontal,
  MessageSquare,
  Building2,
  PieChart
} from 'lucide-react';

interface ReportViewProps {
  report: FeasibilityReport;
  onBackToForm: () => void;
  onOpenSimulator: () => void;
  onOpenAdvisor: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onBackToForm,
  onOpenSimulator,
  onOpenAdvisor
}) => {
  const { t } = useTranslation();
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  useEffect(() => {
    if (report.overallFeasibilityScore >= 80) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [report.overallFeasibilityScore]);

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      await PDFExportService.exportReportToPDF(
        'gramudyog-report-document',
        `GramUdyog_DPR_${report.formData.businessTitle.replace(/\s+/g, '_')}`
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const { formData, financials, marketAnalysis, swot, risks, actionPlan, matchedSchemes } = report;

  // Percentage shares for visual financial breakdown bar
  const totalCost = financials.totalProjectCost || 1;
  const subsidyPercentShare = Math.min(100, Math.round((financials.estimatedSubsidyAmount / totalCost) * 100));
  const promoterPercentShare = Math.min(100, Math.round((financials.promoterContribution / totalCost) * 100));
  const loanPercentShare = Math.max(0, 100 - (subsidyPercentShare + promoterPercentShare));

  return (
    <div className="report-page-container animate-slide-up">
      {/* Top Floating Control Bar with Corner PDF Download Button */}
      <div className="report-action-header glass-panel no-print">
        <button className="btn btn-outline btn-sm" onClick={onBackToForm}>
          <ArrowLeft size={16} />
          <span>{t.backToForm}</span>
        </button>

        <div className="corner-action-buttons">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={onOpenSimulator}
            title="Modify capital or interest to see how it affects feasibility"
          >
            <SlidersHorizontal size={15} />
            <span>{t.simulateButton}</span>
          </button>

          <button 
            className="btn btn-accent btn-sm" 
            onClick={onOpenAdvisor}
          >
            <MessageSquare size={15} />
            <span>{t.askAdvisorButton}</span>
          </button>

          <button 
            className="btn btn-outline btn-sm" 
            onClick={handlePrint}
            title="Print Detailed Project Report"
          >
            <Printer size={15} />
            <span>{t.printReportButton}</span>
          </button>

          {/* CORNER PDF DOWNLOAD BUTTON */}
          <button 
            id="download-pdf-corner-btn"
            className="btn btn-gold btn-sm corner-download-btn" 
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
          >
            <Download size={16} className={isExportingPDF ? 'animate-spin' : ''} />
            <span>{isExportingPDF ? 'Generating Clean PDF...' : t.downloadPdfButton}</span>
          </button>
        </div>
      </div>

      {/* Main Report Document for Viewing & High-Contrast PDF Rendering */}
      <div id="gramudyog-report-document" className="report-document glass-panel">
        
        {/* Official Header Banner */}
        <div className="document-header-banner">
          <div className="header-meta-left">
            <div className="doc-emblem">
              <span>🌾</span>
            </div>
            <div>
              <div className="doc-tag-row">
                <span className="doc-tag">Detailed Project Report (DPR)</span>
                <span className="badge badge-green">Ministry of MSME Standards</span>
              </div>
              <h1 className="doc-main-title">{formData.businessTitle}</h1>
              <p className="doc-location-row">
                <MapPin size={15} className="text-green" />
                <span>{formData.villageOrTown}, Block: {formData.blockOrTehsil}, Dist: {formData.district}, {formData.state} ({formData.localityType.toUpperCase()})</span>
              </p>
            </div>
          </div>

          <div className="header-meta-right">
            <div className="report-id-badge">
              <span>Ref: {report.id}</span>
              <span className="date-stamp">{new Date(report.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="applicant-badge">
              <strong>Applicant:</strong> {formData.applicantName}
              <span className="text-muted"> ({formData.socialCategory.toUpperCase()} {formData.specialCategory !== 'none' ? `• ${formData.specialCategory}` : ''})</span>
            </div>
          </div>
        </div>

        {/* Executive Feasibility Score & Summary Card */}
        <div className="executive-score-card">
          <div className="score-radial-col">
            <div className={`score-radial-circle ${report.overallFeasibilityScore >= 80 ? 'high' : report.overallFeasibilityScore >= 65 ? 'medium' : 'low'}`}>
              <span className="score-num">{report.overallFeasibilityScore}</span>
              <span className="score-denom">/ 100</span>
            </div>
            <div className="verdict-label-wrap">
              <span className="badge badge-green">
                <CheckCircle2 size={13} /> {report.verdict}
              </span>
            </div>
          </div>

          <div className="executive-text-col">
            <h3>Executive Feasibility Assessment</h3>
            <p className="executive-summary-text">{report.executiveSummary}</p>
            
            <div className="quick-highlights-row">
              <div className="highlight-pill">
                <span className="h-label">Government Subsidy:</span>
                <span className="h-val text-green">{financials.applicableSubsidyPercent}% (₹{financials.estimatedSubsidyAmount.toLocaleString('en-IN')})</span>
              </div>
              <div className="highlight-pill">
                <span className="h-label">Debt Coverage (DSCR):</span>
                <span className="h-val text-cyan">{financials.debtServiceCoverageRatio}x Healthy</span>
              </div>
              <div className="highlight-pill">
                <span className="h-label">Monthly EMI:</span>
                <span className="h-val text-amber">₹{financials.monthlyEMI.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="highlight-pill">
                <span className="h-label">Net Monthly Profit:</span>
                <span className="h-val text-green">₹{financials.estimatedMonthlyProfit.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: FINANCIAL VIABILITY & CAPITAL BREAKDOWN */}
        <div className="section-block">
          <div className="section-title-row">
            <div className="section-icon-wrap finance-glow">
              <IndianRupee size={18} />
            </div>
            <div>
              <h2>{t.capitalBreakdown}</h2>
              <p className="text-sm text-muted">Capital outlay, promoter equity, subsidy grant, and debt amortization</p>
            </div>
          </div>

          {/* Visual Capital Composition Bar */}
          <div className="capital-bar-card">
            <div className="bar-labels">
              <span>Total Setup Outlay: <strong>₹{financials.totalProjectCost.toLocaleString('en-IN')}</strong></span>
              <span>Capital Structure Allocation</span>
            </div>
            <div className="capital-composition-bar">
              <div className="bar-slice subsidy-slice" style={{ width: `${subsidyPercentShare}%` }}>
                <span>Govt Subsidy ({subsidyPercentShare}%)</span>
              </div>
              <div className="bar-slice promoter-slice" style={{ width: `${promoterPercentShare}%` }}>
                <span>Your Equity ({promoterPercentShare}%)</span>
              </div>
              <div className="bar-slice loan-slice" style={{ width: `${loanPercentShare}%` }}>
                <span>Bank Loan ({loanPercentShare}%)</span>
              </div>
            </div>
          </div>

          {/* Key Financial Metric Cards */}
          <div className="grid-4" style={{ marginTop: '1rem' }}>
            <div className="stat-card">
              <span className="stat-label">Total Project Cost</span>
              <span className="stat-value text-main">₹{financials.totalProjectCost.toLocaleString('en-IN')}</span>
              <span className="stat-sub">Machinery, shed & working capital</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">{t.promoterShare}</span>
              <span className="stat-value text-amber">₹{financials.promoterContribution.toLocaleString('en-IN')}</span>
              <span className="stat-sub">
                {financials.capitalSurplusOrDeficit >= 0 
                  ? `✓ Covered (Surplus ₹${financials.capitalSurplusOrDeficit.toLocaleString('en-IN')})` 
                  : `⚠ Shortfall ₹${Math.abs(financials.capitalSurplusOrDeficit).toLocaleString('en-IN')}`}
              </span>
            </div>

            <div className="stat-card">
              <span className="stat-label">{t.govtSubsidy}</span>
              <span className="stat-value text-green">₹{financials.estimatedSubsidyAmount.toLocaleString('en-IN')}</span>
              <span className="stat-sub">{financials.applicableSubsidyPercent}% margin money grant</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">{t.netLoanRequired}</span>
              <span className="stat-value text-cyan">₹{financials.netBankLoan.toLocaleString('en-IN')}</span>
              <span className="stat-sub">Composite bank credit</span>
            </div>
          </div>

          {/* Operating Cash Flow & EMI Table */}
          <div className="financial-table-wrap" style={{ marginTop: '1.25rem' }}>
            <table className="financial-summary-table">
              <thead>
                <tr>
                  <th>Financial Parameter</th>
                  <th>Estimated Value</th>
                  <th>Banking Appraisal Benchmark</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Estimated Monthly Gross Revenue</td>
                  <td className="table-highlight">₹{financials.estimatedMonthlyRevenue.toLocaleString('en-IN')}</td>
                  <td className="text-muted">Calculated from local catchment demand and standard asset turnover</td>
                </tr>
                <tr>
                  <td>Operating Expenses (Raw materials, labor, power)</td>
                  <td className="table-highlight">₹{financials.estimatedMonthlyExpenses.toLocaleString('en-IN')}</td>
                  <td className="text-muted">Includes recurring fodder/materials, electricity, and local transport</td>
                </tr>
                <tr>
                  <td>Projected Net Monthly Operating Profit</td>
                  <td className="table-highlight text-green font-bold">₹{financials.estimatedMonthlyProfit.toLocaleString('en-IN')}</td>
                  <td className="text-muted">Operating profit before taxes and debt servicing</td>
                </tr>
                <tr>
                  <td>Monthly Bank EMI (5-Yr Tenure @ 9% p.a.)</td>
                  <td className="table-highlight text-amber font-bold">₹{financials.monthlyEMI.toLocaleString('en-IN')}</td>
                  <td className="text-muted">Includes {financials.moratoriumMonths} months principal repayment moratorium</td>
                </tr>
                <tr>
                  <td>Surplus Cash Flow After EMI</td>
                  <td className="table-highlight text-green font-bold">₹{(financials.estimatedMonthlyProfit - financials.monthlyEMI).toLocaleString('en-IN')}</td>
                  <td className="text-muted">Healthy buffer; provides strong cash reserve for reinvestment</td>
                </tr>
                <tr>
                  <td>Estimated Break-Even Horizon</td>
                  <td className="table-highlight">{financials.breakEvenMonths} Months</td>
                  <td className="text-muted">Time to fully recover upfront initial promoter equity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: MATCHED GOVERNMENT SCHEMES */}
        <div className="section-block">
          <div className="section-title-row">
            <div className="section-icon-wrap scheme-glow">
              <Building2 size={18} />
            </div>
            <div>
              <h2>{t.recommendedSchemes}</h2>
              <p className="text-sm text-muted">Eligible central and state subsidy programs for {formData.localityType} enterprise</p>
            </div>
          </div>

          <div className="matched-schemes-list">
            {matchedSchemes.slice(0, 3).map((scheme, idx) => (
              <div key={scheme.schemeId} className={`scheme-card ${idx === 0 ? 'top-match' : ''}`}>
                <div className="scheme-card-header">
                  <div className="scheme-title-col">
                    <div className="scheme-badges-row">
                      <span className="badge badge-green">
                        <Sparkles size={11} /> {scheme.matchScore}% Match
                      </span>
                      {scheme.isScrapedLive && (
                        <span className="badge badge-amber">Live Scraped</span>
                      )}
                      <span className="scheme-ministry">{scheme.ministry}</span>
                    </div>
                    <h3>{scheme.name}</h3>
                  </div>

                  <a 
                    href={scheme.portalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline btn-sm scheme-portal-btn no-print"
                  >
                    <span>{t.applyOnPortal}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="scheme-card-body">
                  <div className="grid-4 scheme-stats-grid">
                    <div className="scheme-stat">
                      <span className="s-label">Eligible Subsidy</span>
                      <span className="s-val text-green">{scheme.eligibleSubsidyPercent}%</span>
                      <span className="s-sub">Max ₹{scheme.maxSubsidyAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="scheme-stat">
                      <span className="s-label">Promoter Equity</span>
                      <span className="s-val text-amber">{scheme.promoterContributionPercent}%</span>
                      <span className="s-sub">Mandatory own share</span>
                    </div>

                    <div className="scheme-stat">
                      <span className="s-label">Interest Rate</span>
                      <span className="s-val">{scheme.interestRate}</span>
                      <span className="s-sub">{scheme.moratoriumPeriod} Moratorium</span>
                    </div>

                    <div className="scheme-stat">
                      <span className="s-label">Collateral Requirement</span>
                      <span className="s-val text-cyan">Zero Collateral</span>
                      <span className="s-sub">Under CGTMSE Guarantee</span>
                    </div>
                  </div>

                  <div className="scheme-reasons-box">
                    <strong>Why this scheme fits your profile:</strong>
                    <ul>
                      {scheme.reasons.map((reason, rIdx) => (
                        <li key={rIdx}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="scheme-docs-box">
                    <strong>Mandatory Application Documents:</strong>
                    <div className="docs-chips">
                      {scheme.requiredDocs.slice(0, 4).map((doc, dIdx) => (
                        <span key={dIdx} className="doc-chip">{doc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: HYPER-LOCAL MARKET & COMPETITOR ANALYSIS */}
        <div className="section-block">
          <div className="section-title-row">
            <div className="section-icon-wrap market-glow">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2>{t.marketAnalysis}</h2>
              <p className="text-sm text-muted">Catchment demographics and unmet demand in {formData.district} cluster</p>
            </div>
          </div>

          <div className="grid-2">
            <div className="market-info-card">
              <h4>Local Demand & Catchment</h4>
              <div className="market-metric-row">
                <span className="m-label">Potential Catchment:</span>
                <span className="m-val text-green">{marketAnalysis.potentialCustomersCount.toLocaleString('en-IN')} households</span>
              </div>
              <div className="market-metric-row">
                <span className="m-label">Local Demand Index:</span>
                <span className="m-val text-amber">{marketAnalysis.estimatedLocalDemandLevel}</span>
              </div>
              <div className="market-metric-row">
                <span className="m-label">Competitor Density:</span>
                <span className="m-val text-cyan">{marketAnalysis.competitorPresence}</span>
              </div>
              <p className="competitor-narrative">{marketAnalysis.competitorDensityDesc}</p>
            </div>

            <div className="market-info-card">
              <h4>Key Market Gaps & Distribution</h4>
              <ul className="market-gaps-list">
                {marketAnalysis.keyMarketGaps.map((gap, gIdx) => (
                  <li key={gIdx}>
                    <CheckCircle2 size={15} className="text-green flex-shrink-0" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
              <div className="distribution-tags" style={{ marginTop: '0.85rem' }}>
                <span className="text-xs text-muted" style={{ display: 'block', marginBottom: '0.35rem' }}>Distribution Channels:</span>
                {marketAnalysis.distributionChannels.map((channel, cIdx) => (
                  <span key={cIdx} className="dist-chip">{channel}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SWOT ANALYSIS */}
        <div className="section-block">
          <div className="section-title-row">
            <div className="section-icon-wrap swot-glow">
              <PieChart size={18} />
            </div>
            <div>
              <h2>{t.swotAnalysis}</h2>
              <p className="text-sm text-muted">Strategic review of internal capabilities and external market dynamics</p>
            </div>
          </div>

          <div className="swot-grid">
            <div className="swot-card swot-s">
              <div className="swot-header">
                <h4>🟢 {t.strengths}</h4>
              </div>
              <ul>
                {swot.strengths.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-card swot-w">
              <div className="swot-header">
                <h4>🟠 {t.weaknesses}</h4>
              </div>
              <ul>
                {swot.weaknesses.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-card swot-o">
              <div className="swot-header">
                <h4>🔵 {t.opportunities}</h4>
              </div>
              <ul>
                {swot.opportunities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="swot-card swot-t">
              <div className="swot-header">
                <h4>🔴 {t.threats}</h4>
              </div>
              <ul>
                {swot.threats.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 5: OPERATIONAL RISKS & PRICING STRATEGY */}
        <div className="section-block">
          <div className="grid-2">
            <div className="info-card">
              <h4>Suggested Pricing & Profit Margins</h4>
              <p className="text-sm" style={{ color: 'var(--text-body)', marginBottom: '0.75rem' }}>
                {report.pricingStrategy.suggestedPriceRange}
              </p>
              <div className="pricing-stat-row">
                <span className="text-muted text-sm">Target Gross Margin:</span>
                <span className="text-green font-bold">{report.pricingStrategy.marginPercentage}</span>
              </div>
              <p className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
                {report.pricingStrategy.notes}
              </p>
            </div>

            <div className="info-card">
              <h4>Top Operational Risks & Safeguards</h4>
              <div className="risks-compact-list">
                {risks.slice(0, 3).map((r, rIdx) => (
                  <div key={rIdx} className="risk-item">
                    <div className="risk-top">
                      <AlertTriangle size={14} className={r.severity === 'High' ? 'text-danger' : 'text-amber'} />
                      <span className="risk-title">{r.risk}</span>
                      <span className="risk-badge">{r.severity}</span>
                    </div>
                    <p className="risk-solution">{r.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: STEP-BY-STEP IMPLEMENTATION ROADMAP */}
        <div className="section-block">
          <div className="section-title-row">
            <div className="section-icon-wrap roadmap-glow">
              <Calendar size={18} />
            </div>
            <div>
              <h2>{t.roadmap}</h2>
              <p className="text-sm text-muted">Actionable milestones to progress from business DPR to commercial launch</p>
            </div>
          </div>

          <div className="action-roadmap-grid">
            {actionPlan.map((step) => (
              <div key={step.stepNumber} className="roadmap-step-card">
                <div className="step-num-badge">{step.stepNumber}</div>
                <div className="step-content">
                  <div className="step-meta">
                    <span className="step-phase">{step.phase}</span>
                    <span className="step-timeline">{step.timeline}</span>
                  </div>
                  <h4>{step.title}</h4>
                  <p className="step-desc">{step.description}</p>
                  {step.requiredDocuments && (
                    <div className="step-docs">
                      <strong>Checklist:</strong> {step.requiredDocuments.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Document Footer Stamp */}
        <div className="document-footer-stamp">
          <div className="stamp-emblem">🌾 GRAMUDYOG VERIFIED DPR</div>
          <p>
            This Detailed Project Feasibility Report (DPR) is prepared in compliance with Ministry of MSME guidelines, Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) norms, and Indian commercial banking appraisal benchmarks.
          </p>
        </div>
      </div>

      <style>{`
        .report-page-container {
          max-width: 1100px;
          margin: 1.5rem auto 4rem;
          padding: 0 1rem;
        }
        .report-action-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.35rem;
          margin-bottom: 1.5rem;
          position: relative;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .corner-action-buttons {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .corner-download-btn {
          font-weight: 600;
          padding: 0.5rem 1.15rem;
          background: #059669;
          border: 1px solid #047857;
          color: #ffffff;
          border-radius: var(--radius-md);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .corner-download-btn:hover {
          background: #047857;
        }

        /* Report Document Container */
        .report-document {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        /* Header Banner */
        .document-header-banner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid var(--border-subtle);
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .header-meta-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .doc-emblem {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }
        .doc-tag-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .doc-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary);
          letter-spacing: 0.05em;
        }
        .doc-main-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0.25rem 0;
          color: var(--text-main);
        }
        .doc-location-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .header-meta-right {
          text-align: right;
        }
        .report-id-badge {
          font-size: 0.82rem;
          font-family: monospace;
          color: var(--text-muted);
          display: flex;
          flex-direction: column;
          margin-bottom: 0.35rem;
        }
        .applicant-badge {
          font-size: 0.85rem;
          color: var(--text-main);
        }

        /* Executive Scorecard */
        .executive-score-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.75rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-card);
          margin-bottom: 2rem;
          border-radius: var(--radius-lg);
          flex-wrap: wrap;
        }
        .score-radial-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .score-radial-circle {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 5px solid;
          background: var(--bg-surface);
          box-shadow: var(--shadow-sm);
        }
        .score-radial-circle.high {
          border-color: #059669;
          color: #059669;
        }
        .score-radial-circle.medium {
          border-color: #d97706;
          color: #d97706;
        }
        .score-radial-circle.low {
          border-color: #dc2626;
          color: #dc2626;
        }
        .score-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1;
        }
        .score-denom {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .verdict-label-wrap {
          margin-top: 0.65rem;
        }
        .executive-text-col {
          flex: 1;
          min-width: 280px;
        }
        .executive-text-col h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .executive-summary-text {
          font-size: 0.92rem;
          color: var(--text-body);
          line-height: 1.55;
        }
        .quick-highlights-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.85rem;
          flex-wrap: wrap;
        }
        .highlight-pill {
          background: var(--bg-surface);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .h-label {
          color: var(--text-muted);
          margin-right: 0.35rem;
        }
        .h-val {
          font-weight: 700;
        }

        /* Section Layouts */
        .section-block {
          margin-bottom: 2.25rem;
        }
        .section-title-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.15rem;
        }
        .section-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .finance-glow { background: #fffbeb; color: #d97706; border: 1px solid rgba(217, 119, 6, 0.3); }
        .scheme-glow { background: #ecfdf5; color: #059669; border: 1px solid rgba(5, 150, 105, 0.3); }
        .market-glow { background: #f0f9ff; color: #0284c7; border: 1px solid rgba(2, 132, 199, 0.3); }
        .swot-glow { background: #f5f3ff; color: #7c3aed; border: 1px solid rgba(124, 58, 237, 0.3); }
        .roadmap-glow { background: #ecfeff; color: #0891b2; border: 1px solid rgba(8, 145, 178, 0.3); }

        /* Capital Bar */
        .capital-bar-card {
          padding: 1rem 1.25rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
        }
        .bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.5rem;
        }
        .capital-composition-bar {
          height: 26px;
          display: flex;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #e2e8f0;
        }
        .bar-slice {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.74rem;
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
          padding: 0 0.5rem;
        }
        .subsidy-slice { background: #059669; }
        .promoter-slice { background: #d97706; }
        .loan-slice { background: #0284c7; }

        /* Tables - Crisp & High-Contrast */
        .financial-table-wrap {
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .financial-summary-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          background: var(--bg-surface);
        }
        .financial-summary-table th {
          text-align: left;
          padding: 0.85rem 1rem;
          background: var(--bg-surface-subtle);
          color: var(--text-main);
          font-weight: 700;
          border-bottom: 1px solid var(--border-card);
        }
        .financial-summary-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-body);
        }
        .financial-summary-table tr:last-child td {
          border-bottom: none;
        }
        .financial-summary-table tr:hover {
          background: var(--bg-surface-subtle);
        }
        .table-highlight {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
        }

        /* Scheme Cards */
        .matched-schemes-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .scheme-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
        }
        .scheme-card.top-match {
          border-color: var(--primary);
          border-width: 2px;
        }
        .scheme-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        .scheme-badges-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
          flex-wrap: wrap;
        }
        .scheme-ministry {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .scheme-card-header h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .scheme-stats-grid {
          margin-bottom: 1rem;
        }
        .scheme-stat {
          background: var(--bg-surface-subtle);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
        }
        .s-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .s-val { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; }
        .s-sub { font-size: 0.72rem; color: var(--text-muted); }
        .scheme-reasons-box {
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.25);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
          margin-bottom: 0.85rem;
          color: #065f46;
        }
        .scheme-reasons-box ul {
          padding-left: 1.25rem;
          margin-top: 0.35rem;
        }
        .scheme-docs-box {
          font-size: 0.82rem;
        }
        .docs-chips {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }
        .doc-chip {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.74rem;
          color: var(--text-main);
          font-weight: 500;
        }

        /* Market Cards */
        .market-info-card {
          padding: 1.35rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .market-info-card h4 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.4rem;
          color: var(--text-main);
        }
        .market-metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          margin-bottom: 0.5rem;
        }
        .m-label { color: var(--text-muted); }
        .m-val { font-weight: 700; }
        .competitor-narrative {
          font-size: 0.84rem;
          color: var(--text-body);
          margin-top: 0.85rem;
          line-height: 1.5;
        }
        .market-gaps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.84rem;
        }
        .market-gaps-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          color: var(--text-body);
        }
        .dist-chip {
          display: inline-block;
          background: #f0f9ff;
          border: 1px solid rgba(2, 132, 199, 0.25);
          color: #0369a1;
          font-size: 0.74rem;
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          margin-right: 0.4rem;
          margin-bottom: 0.4rem;
          font-weight: 600;
        }

        /* SWOT Grid */
        .swot-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 750px) {
          .swot-grid { grid-template-columns: 1fr; }
        }
        .swot-card {
          padding: 1.35rem;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          box-shadow: var(--shadow-sm);
        }
        .swot-card h4 {
          font-size: 0.98rem;
          font-weight: 700;
          margin-bottom: 0.65rem;
        }
        .swot-card ul {
          padding-left: 1.25rem;
          font-size: 0.84rem;
          color: var(--text-body);
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .swot-s { border-left: 4px solid #059669; }
        .swot-w { border-left: 4px solid #d97706; }
        .swot-o { border-left: 4px solid #0284c7; }
        .swot-t { border-left: 4px solid #dc2626; }

        /* Info Cards */
        .info-card {
          padding: 1.35rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .info-card h4 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-main);
        }
        .pricing-stat-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .risks-compact-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .risk-item {
          background: var(--bg-surface-subtle);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--border-subtle);
        }
        .risk-top {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .risk-badge {
          margin-left: auto;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-weight: 600;
        }
        .risk-solution {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
          padding-left: 1.25rem;
        }

        /* Roadmap Grid */
        .action-roadmap-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .roadmap-step-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          box-shadow: var(--shadow-sm);
        }
        .step-num-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #059669, #047857);
          color: #ffffff;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
        }
        .step-content {
          flex: 1;
        }
        .step-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--primary);
          margin-bottom: 0.2rem;
          font-weight: 700;
        }
        .step-timeline {
          color: #d97706;
          font-weight: 700;
        }
        .step-content h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .step-desc {
          font-size: 0.84rem;
          color: var(--text-body);
          margin: 0.3rem 0;
        }
        .step-docs {
          font-size: 0.76rem;
          color: var(--text-muted);
          background: var(--bg-surface-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
        }

        /* Footer Stamp */
        .document-footer-stamp {
          text-align: center;
          border-top: 2px solid var(--border-subtle);
          padding-top: 1.5rem;
          margin-top: 2.25rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .stamp-emblem {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #047857;
          margin-bottom: 0.35rem;
        }

        /* ------------------------------------------------------------- */
        /* HIGH-FIDELITY PDF CAPTURE MODE STYLING                         */
        /* Active exclusively during html2canvas PDF generation          */
        /* ------------------------------------------------------------- */
        /* ------------------------------------------------------------- */
        /* HIGH-FIDELITY PDF CAPTURE MODE STYLING                         */
        /* Active exclusively during html2canvas PDF generation          */
        /* ------------------------------------------------------------- */
        .pdf-capture-mode {
          background: #ffffff !important;
          color: #0f172a !important;
          width: 960px !important;
          max-width: 960px !important;
          margin: 0 auto !important;
          border: none !important;
          box-shadow: none !important;
          padding: 2rem !important;
          border-radius: 0 !important;
        }
        .pdf-capture-mode * {
          text-shadow: none !important;
        }
        .pdf-capture-mode .document-header-banner {
          border-bottom: 2px solid #0f172a !important;
          padding-bottom: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        .pdf-capture-mode .doc-main-title {
          color: #020617 !important;
          font-size: 1.6rem !important;
          font-weight: 800 !important;
        }
        .pdf-capture-mode .doc-location-row {
          color: #334155 !important;
        }
        .pdf-capture-mode .executive-score-card {
          background: #f8fafc !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 12px !important;
        }
        .pdf-capture-mode .score-radial-circle {
          background: #ffffff !important;
          border-width: 4px !important;
          box-shadow: none !important;
        }
        .pdf-capture-mode .score-radial-circle .score-num {
          color: #020617 !important;
          font-size: 2rem !important;
        }
        .pdf-capture-mode .executive-summary-text {
          color: #1e293b !important;
          font-size: 0.95rem !important;
          line-height: 1.6 !important;
        }
        .pdf-capture-mode .stat-card {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 10px !important;
        }
        .pdf-capture-mode .stat-label {
          color: #475569 !important;
          font-weight: 700 !important;
        }
        .pdf-capture-mode .stat-value {
          color: #020617 !important;
          font-size: 1.5rem !important;
          font-weight: 800 !important;
        }
        .pdf-capture-mode .financial-summary-table {
          background: #ffffff !important;
          border: 1px solid #94a3b8 !important;
          box-shadow: none !important;
        }
        .pdf-capture-mode .financial-summary-table th {
          background: #f1f5f9 !important;
          color: #0f172a !important;
          font-weight: 700 !important;
          border-bottom: 2px solid #94a3b8 !important;
          padding: 0.75rem 1rem !important;
        }
        .pdf-capture-mode .financial-summary-table td {
          border-bottom: 1px solid #cbd5e1 !important;
          color: #1e293b !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.88rem !important;
        }
        .pdf-capture-mode .table-highlight {
          color: #020617 !important;
          font-weight: 700 !important;
        }
        .pdf-capture-mode .scheme-card {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 12px !important;
          margin-bottom: 1.25rem !important;
        }
        .pdf-capture-mode .scheme-stat {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
        }
        .pdf-capture-mode .scheme-reasons-box {
          background: #f0fdf4 !important;
          border: 1px solid #bbf7d0 !important;
          color: #14532d !important;
          border-radius: 8px !important;
        }
        .pdf-capture-mode .swot-card {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 10px !important;
        }
        .pdf-capture-mode .swot-card ul {
          color: #1e293b !important;
        }
        .pdf-capture-mode .market-info-card, .pdf-capture-mode .info-card {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 10px !important;
        }
        .pdf-capture-mode .roadmap-step-card {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
          border-radius: 10px !important;
        }
        .pdf-capture-mode .step-content h4 {
          color: #020617 !important;
        }
        .pdf-capture-mode .step-desc {
          color: #334155 !important;
        }
        .pdf-capture-mode .badge-green {
          background: #dcfce7 !important;
          color: #15803d !important;
          border: 1px solid #86efac !important;
        }
        .pdf-capture-mode .badge-amber {
          background: #fef3c7 !important;
          color: #b45309 !important;
          border: 1px solid #fde68a !important;
        }
        .pdf-capture-mode .section-block {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin-bottom: 2rem !important;
        }
      `}</style>
    </div>
  );
};
