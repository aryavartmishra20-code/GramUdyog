import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { supabaseService } from '../services/supabase';
import { 
  Sprout, 
  Globe, 
  Database, 
  FileText, 
  Search, 
  MessageSquare, 
  GitCompare, 
  SlidersHorizontal,
  RefreshCw,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'form' | 'report' | 'schemes' | 'advisor' | 'compare';
  setActiveTab: (tab: 'form' | 'report' | 'schemes' | 'advisor' | 'compare') => void;
  hasReport: boolean;
  onOpenSupabaseModal: () => void;
  onOpenSimulator: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasReport,
  onOpenSupabaseModal,
  onOpenSimulator,
  onReset
}) => {
  const { language, setLanguage, t } = useTranslation();
  const isSupabaseConnected = supabaseService.isConnected();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('gramudyog_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gramudyog_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header-container no-print">
      <div className="header-inner">
        {/* Brand Logo & Tag */}
        <div 
          className="brand-section" 
          onClick={() => setActiveTab('form')} 
          role="button"
          tabIndex={0}
          title="Return to Business Evaluation"
        >
          <div className="brand-icon">
            <Sprout size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-name">{t.appTitle}</span>
            <span className="brand-badge">Govt Subsidy AI</span>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="header-nav">
          <button 
            className={`nav-btn ${activeTab === 'form' || activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab(hasReport ? 'report' : 'form')}
          >
            <FileText size={15} />
            <span>{t.navEvaluation}</span>
            {hasReport && <span className="report-indicator" title="Active Report Ready" />}
          </button>

          <button 
            className={`nav-btn ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('schemes')}
          >
            <Search size={15} />
            <span>{t.navSchemes}</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'advisor' ? 'active' : ''}`}
            onClick={() => setActiveTab('advisor')}
          >
            <MessageSquare size={15} />
            <span>{t.navAdvisor}</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            <GitCompare size={15} />
            <span>{t.navCompare}</span>
          </button>

          <button 
            className="nav-btn simulator-btn"
            onClick={onOpenSimulator}
            title="Interactive Financial Simulator"
          >
            <SlidersHorizontal size={14} />
            <span>{t.navSimulator}</span>
          </button>

          {hasReport && (
            <button 
              className="nav-btn reset-btn"
              onClick={onReset}
              title="Start a new business feasibility check"
            >
              <RefreshCw size={13} />
              <span>{t.resetButton}</span>
            </button>
          )}
        </nav>

        {/* Right Utility Actions */}
        <div className="header-utilities">
          {/* Supabase Status */}
          <button 
            className={`util-pill-btn ${isSupabaseConnected ? 'connected' : 'local'}`}
            onClick={onOpenSupabaseModal}
            title="Configure Supabase Database"
          >
            <Database size={13} />
            <span>{isSupabaseConnected ? 'Cloud' : 'Local'}</span>
          </button>

          {/* Compact Language Selector */}
          <div className="lang-group">
            <Globe size={13} className="lang-icon" />
            <button 
              className={`lang-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-option ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
            >
              हिन्दी
            </button>
            <button 
              className={`lang-option ${language === 'mr' ? 'active' : ''}`}
              onClick={() => setLanguage('mr')}
            >
              मराठी
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            className="theme-icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </div>

      <style>{`
        .header-container {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          box-shadow: var(--shadow-sm);
          z-index: 50;
        }
        .header-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0.65rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .brand-section {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          user-select: none;
        }
        .brand-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background: #ecfdf5;
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .brand-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          background: #f1f5f9;
          color: #475569;
          border: 1px solid var(--border-subtle);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.42rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-body);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .nav-btn:hover {
          background: var(--bg-surface-subtle);
          color: var(--text-main);
        }
        .nav-btn.active {
          background: #ecfdf5;
          color: #047857;
          border-color: rgba(5, 150, 105, 0.2);
          font-weight: 600;
        }
        .report-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #059669;
        }
        .simulator-btn {
          background: #fffbeb;
          border-color: rgba(217, 119, 6, 0.2);
          color: #b45309;
        }
        .simulator-btn:hover {
          background: #fef3c7;
          color: #92400e;
        }
        .reset-btn {
          color: #64748b;
          border-color: var(--border-subtle);
        }
        .reset-btn:hover {
          color: #dc2626;
          border-color: rgba(220, 38, 38, 0.3);
          background: #fef2f2;
        }
        .header-utilities {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .util-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.28rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }
        .util-pill-btn.connected {
          color: #047857;
          border-color: rgba(5, 150, 105, 0.3);
          background: #ecfdf5;
        }
        .util-pill-btn.local {
          color: #b45309;
          border-color: rgba(217, 119, 6, 0.3);
          background: #fffbeb;
        }
        .lang-group {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.15rem 0.3rem;
        }
        .lang-icon {
          color: var(--text-muted);
          margin: 0 0.2rem;
        }
        .lang-option {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.74rem;
          font-weight: 600;
          padding: 0.2rem 0.4rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .lang-option:hover {
          color: var(--text-main);
        }
        .lang-option.active {
          background: #059669;
          color: #ffffff;
        }
        .theme-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .theme-icon-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        @media (max-width: 950px) {
          .header-inner {
            flex-wrap: wrap;
          }
          .header-nav {
            order: 3;
            width: 100%;
            overflow-x: auto;
            padding-top: 0.35rem;
          }
        }
      `}</style>
    </header>
  );
};
