import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { BusinessForm } from './components/BusinessForm';
import { ReportView } from './components/ReportView';
import { SchemesList } from './components/SchemesList';
import { AdvisorChat } from './components/AdvisorChat';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { SimulatorModal } from './components/SimulatorModal';
import { CompareModal } from './components/CompareModal';

import type { BusinessFormData, FeasibilityReport } from './types/business';
import { SchemeScraperService } from './services/scraperService';
import { FeasibilityEngine } from './services/feasibilityEngine';
import { supabaseService } from './services/supabase';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'report' | 'schemes' | 'advisor' | 'compare'>('form');
  const [currentReport, setCurrentReport] = useState<FeasibilityReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scrapeStatusText, setScrapeStatusText] = useState('');

  // Modals
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [, setForceRender] = useState(0);

  // Load latest report from cache on mount if available
  useEffect(() => {
    supabaseService.getReports().then(reports => {
      if (reports && reports.length > 0) {
        setCurrentReport(reports[0]);
      }
    });
  }, []);

  const handleFormSubmit = async (formData: BusinessFormData) => {
    setIsLoading(true);
    setScrapeStatusText('Initializing connection to government portals...');

    try {
      // 1. Scrape and match government schemes based on user location & inputs
      const { matchedSchemes } = await SchemeScraperService.scrapeGovernmentSchemes(
        formData,
        (step) => setScrapeStatusText(step)
      );

      // 2. Generate comprehensive Feasibility & DPR Report
      const report = FeasibilityEngine.generateReport(formData, matchedSchemes);

      // 3. Save report to Supabase / LocalStorage
      await supabaseService.saveReport(report);

      setCurrentReport(report);
      setActiveTab('report');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('An error occurred during evaluation. Please try again.');
    } finally {
      setIsLoading(false);
      setScrapeStatusText('');
    }
  };

  const handleReset = () => {
    if (window.confirm('Start a new evaluation? You can still browse government schemes anytime.')) {
      setCurrentReport(null);
      setActiveTab('form');
    }
  };

  const handleApplySimulatedChanges = (newCost: number, newCapital: number) => {
    if (!currentReport) return;
    const updatedForm: BusinessFormData = {
      ...currentReport.formData,
      estimatedProjectCost: newCost,
      availableCapital: newCapital
    };
    handleFormSubmit(updatedForm);
  };

  const handleSelectBusinessFromCompare = (templateId: string) => {
    setActiveTab('form');
    // Handled in form presets
  };

  return (
    <div className="app-layout">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasReport={!!currentReport}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onOpenSimulator={() => setIsSimulatorModalOpen(true)}
        onReset={handleReset}
      />

      <main className="main-content">
        {activeTab === 'form' && (
          <BusinessForm 
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            scrapeStatusText={scrapeStatusText}
          />
        )}

        {activeTab === 'report' && currentReport && (
          <ReportView 
            report={currentReport}
            onBackToForm={() => setActiveTab('form')}
            onOpenSimulator={() => setIsSimulatorModalOpen(true)}
            onOpenAdvisor={() => setActiveTab('advisor')}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemesList />
        )}

        {activeTab === 'advisor' && (
          <AdvisorChat currentReport={currentReport} />
        )}

        {activeTab === 'compare' && (
          <CompareModal 
            isOpen={true} 
            isPage={true}
            onClose={() => setActiveTab(currentReport ? 'report' : 'form')}
            onSelectBusiness={handleSelectBusinessFromCompare}
          />
        )}
      </main>

      {/* Popups & Modals */}
      <SupabaseConfigModal 
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigUpdated={() => setForceRender(prev => prev + 1)}
      />

      <SimulatorModal 
        isOpen={isSimulatorModalOpen}
        onClose={() => setIsSimulatorModalOpen(false)}
        baseReport={currentReport}
        onApplyChanges={handleApplySimulatedChanges}
      />

      <footer className="app-footer no-print">
        <div className="footer-content">
          <p>
            <strong>GramUdyog AI</strong> &copy; 2026. Empowering Rural Indian Entrepreneurs.
          </p>
          <p className="footer-sub">
            Built with React, Supabase Backend & Official MSME, PMEGP, PMFME, and Mudra Knowledge Engines.
          </p>
        </div>
      </footer>

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
        }
        .app-footer {
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          padding: 1.75rem 1rem;
          text-align: center;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: auto;
        }
        .footer-sub {
          font-size: 0.75rem;
          color: var(--text-dim);
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
