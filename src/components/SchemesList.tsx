import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { VERIFIED_GOVERNMENT_SCHEMES } from '../data/verifiedSchemes';
import type { GovernmentScheme } from '../types/schemes';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  IndianRupee, 
  CheckCircle2, 
  FileText, 
  Filter, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const SchemesList: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [calcProjectCost, setCalcProjectCost] = useState<number>(500000);
  const [calcIsRural, setCalcIsRural] = useState<boolean>(true);
  const [calcIsSpecial, setCalcIsSpecial] = useState<boolean>(true);

  // Filter schemes
  const filteredSchemes = VERIFIED_GOVERNMENT_SCHEMES.filter(scheme => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = 
      selectedSector === 'all' || 
      scheme.applicableSectors.includes('all') || 
      scheme.applicableSectors.includes(selectedSector);

    return matchesSearch && matchesSector;
  });

  return (
    <div className="schemes-page animate-slide-up">
      <div className="schemes-hero">
        <h2>Official Central & State Government MSME Schemes</h2>
        <p className="text-muted">
          Browse verified credit-linked capital subsidies, collateral-free loans, and interest subvention schemes for rural entrepreneurs.
        </p>

        {/* Interactive Dynamic Subsidy Sandbox */}
        <div className="subsidy-sandbox glass-panel">
          <div className="sandbox-header">
            <Sparkles size={16} className="text-amber" />
            <span>Interactive Subsidy Estimator</span>
          </div>

          <div className="sandbox-controls">
            <div className="control-item">
              <label>Project Cost: ₹{calcProjectCost.toLocaleString('en-IN')}</label>
              <input 
                type="range" 
                min={50000} 
                max={5000000} 
                step={50000} 
                value={calcProjectCost}
                onChange={(e) => setCalcProjectCost(Number(e.target.value))}
                className="sandbox-slider"
              />
            </div>

            <div className="control-toggles">
              <label className="toggle-btn">
                <input 
                  type="checkbox" 
                  checked={calcIsRural} 
                  onChange={(e) => setCalcIsRural(e.target.checked)} 
                />
                <span>Rural Area (Max Subsidy)</span>
              </label>

              <label className="toggle-btn">
                <input 
                  type="checkbox" 
                  checked={calcIsSpecial} 
                  onChange={(e) => setCalcIsSpecial(e.target.checked)} 
                />
                <span>Special Category (SC/ST/OBC/Women)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="schemes-filter-bar glass-panel">
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search schemes by name, keyword, or trade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="schemes-search"
          />
        </div>

        <div className="sector-filters">
          <button 
            className={`filter-btn ${selectedSector === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSector('all')}
          >
            All Sectors
          </button>
          <button 
            className={`filter-btn ${selectedSector === 'dairy' ? 'active' : ''}`}
            onClick={() => setSelectedSector('dairy')}
          >
            🐄 Dairy & Husbandry
          </button>
          <button 
            className={`filter-btn ${selectedSector === 'food_processing' ? 'active' : ''}`}
            onClick={() => setSelectedSector('food_processing')}
          >
            🌾 Food Processing
          </button>
          <button 
            className={`filter-btn ${selectedSector === 'textiles' ? 'active' : ''}`}
            onClick={() => setSelectedSector('textiles')}
          >
            🧵 Textiles & Tailoring
          </button>
          <button 
            className={`filter-btn ${selectedSector === 'manufacturing' ? 'active' : ''}`}
            onClick={() => setSelectedSector('manufacturing')}
          >
            ⚙ Manufacturing
          </button>
        </div>
      </div>

      {/* Schemes Cards Grid */}
      <div className="schemes-grid">
        {filteredSchemes.map(scheme => {
          // Calculate dynamic subsidy for this scheme based on sandbox inputs
          const subsidyPct = calcIsSpecial 
            ? (calcIsRural ? scheme.specialSubsidyPercent.rural : scheme.specialSubsidyPercent.urban)
            : (calcIsRural ? scheme.generalSubsidyPercent.rural : scheme.generalSubsidyPercent.urban);

          const promoterPct = calcIsSpecial ? scheme.promoterContribution.special : scheme.promoterContribution.general;
          const calculatedSubsidy = Math.round(
            Math.min((calcProjectCost * subsidyPct) / 100, scheme.maxSubsidyAmount || 999999999)
          );
          const calculatedPromoterEquity = Math.round((calcProjectCost * promoterPct) / 100);

          return (
            <div key={scheme.id} className="scheme-detailed-card glass-panel">
              <div className="card-top">
                <div className="top-meta">
                  <span className="badge badge-green">{scheme.category}</span>
                  <span className="text-xs text-muted">{scheme.ministry}</span>
                </div>
                <h3>{scheme.name}</h3>
                <p className="scheme-desc">{scheme.description}</p>
              </div>

              {/* Dynamic Sandbox Result for this scheme */}
              <div className="sandbox-calc-pill">
                <div className="calc-item">
                  <span className="c-label">Subsidy under your inputs:</span>
                  <span className="c-val text-green font-bold">
                    {subsidyPct}% (₹{calculatedSubsidy.toLocaleString('en-IN')})
                  </span>
                </div>
                <div className="calc-item">
                  <span className="c-label">Promoter Equity Required:</span>
                  <span className="c-val text-amber font-bold">
                    {promoterPct}% (₹{calculatedPromoterEquity.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              <div className="grid-2 scheme-quick-stats">
                <div className="quick-stat">
                  <span className="qs-label">Max Project Limit</span>
                  <span className="qs-val">₹{scheme.maxProjectCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="quick-stat">
                  <span className="qs-label">Interest Rate</span>
                  <span className="qs-val">{scheme.interestRateRange}</span>
                </div>
                <div className="quick-stat">
                  <span className="qs-label">Moratorium Period</span>
                  <span className="qs-val">{scheme.moratoriumPeriodMonths} Months</span>
                </div>
                <div className="quick-stat">
                  <span className="qs-label">Repayment Tenure</span>
                  <span className="qs-val">{Math.round(scheme.repaymentPeriodMonths / 12)} Years</span>
                </div>
              </div>

              <div className="key-benefits-list">
                <strong>Key Scheme Benefits:</strong>
                <ul>
                  {scheme.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle2 size={13} className="text-green flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer-action">
                <a 
                  href={scheme.officialPortalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-sm full-width"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .schemes-page {
          max-width: 1200px;
          margin: 1.5rem auto 4rem;
          padding: 0 1rem;
        }
        .schemes-hero {
          text-align: center;
          margin-bottom: 2rem;
        }
        .schemes-hero h2 {
          font-size: 2.1rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }
        .subsidy-sandbox {
          max-width: 750px;
          margin: 1.5rem auto 0;
          padding: 1.25rem 1.5rem;
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.25);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .sandbox-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #b45309;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        .sandbox-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .control-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: left;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .sandbox-slider {
          accent-color: var(--primary);
          height: 6px;
        }
        .control-toggles {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.84rem;
          cursor: pointer;
          color: var(--text-body);
          font-weight: 500;
        }
        .toggle-btn input[type="checkbox"] {
          accent-color: var(--primary);
        }
        .schemes-filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 250px;
        }
        .search-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
        }
        .schemes-search {
          width: 100%;
          padding: 0.65rem 0.85rem 0.65rem 2.25rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.9rem;
          outline: none;
        }
        .schemes-search:focus {
          border-color: var(--primary);
        }
        .sector-filters {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .filter-btn:hover {
          color: var(--primary);
          background: #ecfdf5;
        }
        .filter-btn.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #ffffff;
        }
        .schemes-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .schemes-grid { grid-template-columns: 1fr; }
        }
        .scheme-detailed-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        .top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .scheme-detailed-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-main);
        }
        .scheme-desc {
          font-size: 0.85rem;
          color: var(--text-body);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .sandbox-calc-pill {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .calc-item {
          display: flex;
          flex-direction: column;
        }
        .c-label { font-size: 0.74rem; color: var(--text-muted); font-weight: 600; }
        .c-val { font-size: 0.98rem; font-family: var(--font-heading); }
        .scheme-quick-stats {
          margin-bottom: 1rem;
        }
        .quick-stat {
          background: var(--bg-surface-subtle);
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
        }
        .qs-label { font-size: 0.74rem; color: var(--text-muted); font-weight: 600; }
        .qs-val { font-size: 0.88rem; font-weight: 700; color: var(--text-main); }
        .key-benefits-list {
          font-size: 0.84rem;
          margin-bottom: 1.25rem;
        }
        .key-benefits-list ul {
          list-style: none;
          margin-top: 0.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .key-benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          color: var(--text-body);
        }
        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
};
