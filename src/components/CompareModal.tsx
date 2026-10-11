import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { BUSINESS_TEMPLATES } from '../data/businessCategories';
import { GitCompare, X, CheckCircle2, IndianRupee, TrendingUp, AlertTriangle } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBusiness?: (templateId: string) => void;
  isPage?: boolean;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  onSelectBusiness,
  isPage = false
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'dairy_farming',
    'flour_spice_mill',
    'tailoring_boutique'
  ]);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(prev => prev.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      } else {
        setSelectedIds(prev => [prev[1], prev[2], id]);
      }
    }
  };

  const comparedTemplates = BUSINESS_TEMPLATES.filter(t => selectedIds.includes(t.id));

  const content = (
    <div className={`glass-panel modal-card-compare ${isPage ? 'page-mode' : ''} animate-slide-up`}>
      <div className="modal-header">
        <div className="modal-title-row">
          <div className="modal-icon-wrap compare-icon">
            <GitCompare size={22} />
          </div>
          <div>
            <h3>Rural Business Comparison Engine</h3>
            <p className="text-muted text-sm">Compare 2 to 3 enterprise ideas based on startup capital, profit margins, subsidy fit and risks</p>
          </div>
        </div>
        <button className="btn-close" onClick={onClose} title="Back to main page">
          <X size={20} />
        </button>
      </div>

        {/* Business Selector Pill Strip */}
        <div className="compare-picker-strip">
          <span className="picker-label">Select up to 3 ventures:</span>
          <div className="picker-buttons">
            {BUSINESS_TEMPLATES.map(t => {
              const isChecked = selectedIds.includes(t.id);
              return (
                <button 
                  key={t.id}
                  className={`picker-chip ${isChecked ? 'active' : ''}`}
                  onClick={() => toggleSelect(t.id)}
                >
                  {isChecked ? '✓ ' : '+ '}
                  {t.title.split('(')[0].trim()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="compare-table-container">
          <div className="compare-columns-grid">
            {comparedTemplates.map(template => (
              <div key={template.id} className="compare-col glass-panel">
                <div className="col-top">
                  <span className="badge badge-green">{template.category}</span>
                  <h4>{template.title}</h4>
                  <p className="col-desc">{template.description}</p>
                </div>

                <div className="col-metrics">
                  <div className="col-metric-row">
                    <span className="cm-label">Min Setup Capital</span>
                    <span className="cm-val font-bold">₹{template.typicalInvestmentMin.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="col-metric-row">
                    <span className="cm-label">Typical Margin</span>
                    <span className="cm-val text-green font-bold">{template.typicalMarginPercent}% Net</span>
                  </div>
                  <div className="col-metric-row">
                    <span className="cm-label">Break-Even Period</span>
                    <span className="cm-val text-amber">{template.breakEvenMonthsTypical} Months</span>
                  </div>
                  <div className="col-metric-row">
                    <span className="cm-label">Subsidy Scheme</span>
                    <span className="cm-val text-cyan">
                      {template.category.includes('Dairy') ? 'AHIDF & PMEGP 35%' : template.category.includes('Food') ? 'PMFME 35% ODOP' : 'PM Vishwakarma / PMEGP'}
                    </span>
                  </div>
                </div>

                <div className="col-section">
                  <strong>Key Machinery:</strong>
                  <ul className="compact-list">
                    {template.machineryRequired.slice(0, 3).map((m, mIdx) => (
                      <li key={mIdx}>⚙ {m}</li>
                    ))}
                  </ul>
                </div>

                <div className="col-section">
                  <strong>Core Strength:</strong>
                  <p className="compact-text text-green">
                    ✓ {template.swotDefaults.strengths[0]}
                  </p>
                </div>

                <div className="col-section">
                  <strong>Primary Operational Risk:</strong>
                  <p className="compact-text text-danger">
                    ⚠ {template.swotDefaults.threats[0]}
                  </p>
                </div>

                <div className="col-footer">
                  {onSelectBusiness && (
                    <button 
                      className="btn btn-primary btn-sm full-width"
                      onClick={() => {
                        onSelectBusiness(template.id);
                        onClose();
                      }}
                    >
                      Evaluate This Business
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            {isPage ? '← Back to Evaluation' : 'Close Comparison'}
          </button>
        </div>
      </div>
  );

  return (
    <>
      {isPage ? (
        <div className="compare-page-container">
          {content}
        </div>
      ) : (
        <div className="modal-backdrop">
          {content}
        </div>
      )}

      <style>{`
        .compare-page-container {
          width: 100%;
          max-width: 1200px;
          margin: 1.5rem auto 3.5rem;
          padding: 0 1rem;
        }
        .modal-card-compare.page-mode {
          max-height: none;
          overflow: visible;
          box-shadow: var(--shadow-sm);
        }
        .modal-card-compare {
          width: 100%;
          max-width: 1120px;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 2rem;
          border-radius: var(--radius-xl);
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
        }
        .compare-icon {
          background: #f5f3ff;
          color: #7c3aed;
          border: 1px solid rgba(124, 58, 237, 0.25);
        }
        .compare-picker-strip {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          padding: 0.85rem 1.15rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .picker-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .picker-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .picker-chip {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .picker-chip:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .picker-chip.active {
          background: #ecfdf5;
          color: #047857;
          border-color: rgba(5, 150, 105, 0.4);
          font-weight: 700;
        }
        .compare-columns-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .compare-columns-grid { grid-template-columns: 1fr; }
        }
        .compare-col {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }
        .compare-col:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(5, 150, 105, 0.3);
        }
        .col-top h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0.45rem 0;
        }
        .col-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .col-metrics {
          background: var(--bg-surface-subtle);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .col-metric-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
        }
        .cm-label { color: var(--text-muted); }
        .cm-val { font-family: var(--font-heading); font-weight: 700; }
        .col-section {
          font-size: 0.82rem;
          margin-bottom: 0.85rem;
        }
        .col-section strong {
          color: var(--text-main);
        }
        .compact-list {
          list-style: none;
          margin-top: 0.35rem;
          color: var(--text-body);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .compact-text {
          font-size: 0.82rem;
          line-height: 1.45;
          margin-top: 0.25rem;
          color: var(--text-body);
        }
        .col-footer {
          margin-top: 1.25rem;
        }
      `}</style>
    </>
  );
};
