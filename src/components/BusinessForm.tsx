import React, { useState, useMemo } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import type { BusinessFormData, SocialCategory, SpecialCategory, EducationLevel } from '../types/business';
import { INDIAN_STATES_DATA } from '../data/indianStates';
import { BUSINESS_CATEGORIES, BUSINESS_TEMPLATES } from '../data/businessCategories';
import { 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  HelpCircle,
  Zap
} from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (formData: BusinessFormData) => void;
  isLoading: boolean;
  scrapeStatusText: string;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  onSubmit,
  isLoading,
  scrapeStatusText
}) => {
  const { t } = useTranslation();

  // Form state initialized with realistic default
  const [formData, setFormData] = useState<BusinessFormData>({
    applicantName: 'Kisan Rao Patil',
    contactNumber: '9876543210',
    state: 'Maharashtra',
    district: 'Kolhapur',
    blockOrTehsil: 'Karveer',
    villageOrTown: 'Vadange Village',
    localityType: 'rural',

    businessCategory: 'Dairy & Animal Husbandry',
    businessTitle: '10 Crossbred HF Cattle Dairy & Milk Collection Hub',
    businessDescription: 'Setting up a commercial dairy unit with automated milking, chiller unit, and supply agreement with local dairy cooperative society.',
    unitType: 'new',

    availableCapital: 120000,
    estimatedProjectCost: 750000,
    expectedMonthlyRevenue: 165000,

    socialCategory: 'obc',
    specialCategory: 'none',
    education: 'pass_10th_12th',
    hasPriorExperience: true,
    hasEDPTraining: false
  });

  // Selected State Districts
  const selectedStateDistricts = useMemo(() => {
    const found = INDIAN_STATES_DATA.find(s => s.state === formData.state);
    return found ? found.districts : [];
  }, [formData.state]);

  // Handle State Change
  const handleStateChange = (stateName: string) => {
    const found = INDIAN_STATES_DATA.find(s => s.state === stateName);
    const firstDistrict = found && found.districts.length > 0 ? found.districts[0] : '';
    setFormData(prev => ({
      ...prev,
      state: stateName,
      district: firstDistrict
    }));
  };

  // Preset Template Loader
  const loadPresetTemplate = (templateId: string) => {
    const template = BUSINESS_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    setFormData(prev => ({
      ...prev,
      businessCategory: template.category,
      businessTitle: template.title,
      businessDescription: template.description,
      estimatedProjectCost: template.typicalInvestmentMin,
      availableCapital: Math.round(template.typicalInvestmentMin * 0.15)
    }));
  };

  // Dynamic preview calculations for the live banner
  const livePreview = useMemo(() => {
    const isSpecial = formData.socialCategory !== 'general' || formData.specialCategory !== 'none';
    const isRural = formData.localityType === 'rural';
    const subsidyPct = isSpecial ? (isRural ? 35 : 25) : (isRural ? 25 : 15);
    const promoterPct = isSpecial ? 5 : 10;
    const requiredPromoterEquity = Math.round((formData.estimatedProjectCost * promoterPct) / 100);
    const potentialSubsidy = Math.round((formData.estimatedProjectCost * subsidyPct) / 100);

    return {
      subsidyPct,
      promoterPct,
      requiredPromoterEquity,
      potentialSubsidy,
      capitalSurplus: formData.availableCapital - requiredPromoterEquity
    };
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container animate-slide-up">
      {/* Quick Demo Pre-fill Bar */}
      <div className="quick-presets-row">
        <span className="presets-label">
          <Zap size={14} className="text-amber" />
          <span>Quick Demo Ideas:</span>
        </span>
        <div className="preset-chips">
          <button 
            type="button" 
            className="preset-chip"
            onClick={() => loadPresetTemplate('dairy_farming')}
          >
            🐄 10-Cow Dairy
          </button>
          <button 
            type="button" 
            className="preset-chip"
            onClick={() => loadPresetTemplate('flour_spice_mill')}
          >
            🌾 Atta & Spice Mill
          </button>
          <button 
            type="button" 
            className="preset-chip"
            onClick={() => loadPresetTemplate('tailoring_boutique')}
          >
            🧵 Women Tailoring
          </button>
          <button 
            type="button" 
            className="preset-chip"
            onClick={() => loadPresetTemplate('oil_extraction')}
          >
            🌻 Cold Pressed Oil
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-header-intro">
          <h2>Rural Enterprise Feasibility Evaluation</h2>
          <p className="text-muted">
            Enter your location, business proposal and financial capacity to generate a personalized bank feasibility report and scrape eligible central & state subsidies.
          </p>
        </div>

        {/* Real-time Subsidy Live Strip */}
        <div className="live-metric-strip">
          <div className="metric-box">
            <span className="metric-label">Estimated PMEGP Subsidy</span>
            <span className="metric-val text-green">
              {livePreview.subsidyPct}% (₹{livePreview.potentialSubsidy.toLocaleString('en-IN')})
            </span>
            <span className="metric-sub">Rural margin grant</span>
          </div>
          <div className="metric-sep" />
          <div className="metric-box">
            <span className="metric-label">Your Min. Equity (Margin)</span>
            <span className="metric-val text-amber">
              {livePreview.promoterPct}% (₹{livePreview.requiredPromoterEquity.toLocaleString('en-IN')})
            </span>
            <span className="metric-sub">Mandatory promoter share</span>
          </div>
          <div className="metric-sep" />
          <div className="metric-box">
            <span className="metric-label">Capital Adequacy</span>
            <span className={`metric-val ${livePreview.capitalSurplus >= 0 ? 'text-green' : 'text-danger'}`}>
              {livePreview.capitalSurplus >= 0 ? '✓ Capital Sufficient' : '⚠ Deficit of ₹' + Math.abs(livePreview.capitalSurplus).toLocaleString('en-IN')}
            </span>
            <span className="metric-sub">From ₹{formData.availableCapital.toLocaleString('en-IN')} savings</span>
          </div>
        </div>

        <div className="form-grid">
          {/* SECTION 1: LOCATION */}
          <div className="form-card glass-panel">
            <div className="card-header">
              <div className="card-header-icon location-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h3>{t.formStep1}</h3>
                <p className="card-sub">{t.formStep1Desc}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.state}</label>
                  <select 
                    className="form-select"
                    value={formData.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    required
                  >
                    {INDIAN_STATES_DATA.map(st => (
                      <option key={st.state} value={st.state}>{st.state}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.district}</label>
                  <select 
                    className="form-select"
                    value={formData.district}
                    onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                    required
                  >
                    {selectedStateDistricts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.blockOrTehsil}</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder={t.blockPlaceholder}
                    value={formData.blockOrTehsil}
                    onChange={(e) => setFormData(prev => ({ ...prev, blockOrTehsil: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.villageOrTown}</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder={t.villagePlaceholder}
                    value={formData.villageOrTown}
                    onChange={(e) => setFormData(prev => ({ ...prev, villageOrTown: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>{t.localityType}</span>
                  <span className="form-label-hint">Rural gets 35% subsidy</span>
                </label>
                <div className="radio-pill-group">
                  <label className={`radio-pill ${formData.localityType === 'rural' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="localityType" 
                      value="rural"
                      checked={formData.localityType === 'rural'}
                      onChange={() => setFormData(prev => ({ ...prev, localityType: 'rural' }))}
                    />
                    <span>🌾 {t.localityRural}</span>
                  </label>
                  <label className={`radio-pill ${formData.localityType === 'semi-urban' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="localityType" 
                      value="semi-urban"
                      checked={formData.localityType === 'semi-urban'}
                      onChange={() => setFormData(prev => ({ ...prev, localityType: 'semi-urban' }))}
                    />
                    <span>🏡 {t.localitySemiUrban}</span>
                  </label>
                  <label className={`radio-pill ${formData.localityType === 'urban' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="localityType" 
                      value="urban"
                      checked={formData.localityType === 'urban'}
                      onChange={() => setFormData(prev => ({ ...prev, localityType: 'urban' }))}
                    />
                    <span>🏢 {t.localityUrban}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: BUSINESS DETAILS */}
          <div className="form-card glass-panel">
            <div className="card-header">
              <div className="card-header-icon business-icon">
                <Briefcase size={20} />
              </div>
              <div>
                <h3>{t.formStep2}</h3>
                <p className="card-sub">{t.formStep2Desc}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label className="form-label">{t.businessCategory}</label>
                <select 
                  className="form-select"
                  value={formData.businessCategory}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessCategory: e.target.value }))}
                  required
                >
                  {BUSINESS_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.businessTitle}</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder={t.businessTitlePlaceholder}
                  value={formData.businessTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessTitle: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.businessDescription}</label>
                <textarea 
                  className="form-textarea"
                  placeholder={t.businessDescPlaceholder}
                  value={formData.businessDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.unitType}</label>
                <div className="radio-pill-group">
                  <label className={`radio-pill ${formData.unitType === 'new' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="unitType" 
                      value="new"
                      checked={formData.unitType === 'new'}
                      onChange={() => setFormData(prev => ({ ...prev, unitType: 'new' }))}
                    />
                    <span>✨ {t.unitNew}</span>
                  </label>
                  <label className={`radio-pill ${formData.unitType === 'expansion' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="unitType" 
                      value="expansion"
                      checked={formData.unitType === 'expansion'}
                      onChange={() => setFormData(prev => ({ ...prev, unitType: 'expansion' }))}
                    />
                    <span>📈 {t.unitExpansion}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: FINANCIALS */}
          <div className="form-card glass-panel">
            <div className="card-header">
              <div className="card-header-icon finance-icon">
                <IndianRupee size={20} />
              </div>
              <div>
                <h3>{t.formStep3}</h3>
                <p className="card-sub">{t.formStep3Desc}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">
                    <span>{t.availableCapital}</span>
                  </label>
                  <div className="input-currency-wrap">
                    <span className="currency-symbol">₹</span>
                    <input 
                      type="number" 
                      className="form-input with-symbol"
                      min={10000}
                      step={10000}
                      value={formData.availableCapital}
                      onChange={(e) => setFormData(prev => ({ ...prev, availableCapital: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <span className="form-label-hint">{t.availableCapitalHint}</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>{t.estimatedCost}</span>
                  </label>
                  <div className="input-currency-wrap">
                    <span className="currency-symbol">₹</span>
                    <input 
                      type="number" 
                      className="form-input with-symbol"
                      min={50000}
                      step={25000}
                      value={formData.estimatedProjectCost}
                      onChange={(e) => setFormData(prev => ({ ...prev, estimatedProjectCost: Number(e.target.value) }))}
                      required
                    />
                  </div>
                  <span className="form-label-hint">{t.estimatedCostHint}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t.expectedMonthlyRevenue}</label>
                <div className="input-currency-wrap">
                  <span className="currency-symbol">₹</span>
                  <input 
                    type="number" 
                    className="form-input with-symbol"
                    placeholder="Auto-calculated from typical margins if left empty"
                    value={formData.expectedMonthlyRevenue || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedMonthlyRevenue: e.target.value ? Number(e.target.value) : undefined }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: DEMOGRAPHICS & CRITERIA */}
          <div className="form-card glass-panel">
            <div className="card-header">
              <div className="card-header-icon demo-icon">
                <Users size={20} />
              </div>
              <div>
                <h3>{t.formStep4}</h3>
                <p className="card-sub">{t.formStep4Desc}</p>
              </div>
            </div>

            <div className="card-body">
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.applicantName}</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder={t.applicantNamePlaceholder}
                    value={formData.applicantName}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contactNumber}</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    placeholder="10-digit mobile number"
                    value={formData.contactNumber || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.socialCategory}</label>
                  <select 
                    className="form-select"
                    value={formData.socialCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, socialCategory: e.target.value as SocialCategory }))}
                  >
                    <option value="general">{t.catGeneral}</option>
                    <option value="obc">{t.catOBC}</option>
                    <option value="sc">{t.catSC}</option>
                    <option value="st">{t.catST}</option>
                    <option value="minority">{t.catMinority}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.specialCategory}</label>
                  <select 
                    className="form-select"
                    value={formData.specialCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialCategory: e.target.value as SpecialCategory }))}
                  >
                    <option value="none">{t.specNone}</option>
                    <option value="women">{t.specWomen}</option>
                    <option value="divyangjan">{t.specDivyangjan}</option>
                    <option value="ex_serviceman">{t.specExServiceman}</option>
                    <option value="youth">{t.specYouth}</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.education}</label>
                  <select 
                    className="form-select"
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value as EducationLevel }))}
                  >
                    <option value="below_8th">{t.eduBelow8th}</option>
                    <option value="pass_8th">{t.eduPass8th}</option>
                    <option value="pass_10th_12th">{t.eduPass10th12th}</option>
                    <option value="graduate_or_above">{t.eduGraduate}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.priorExperience}</label>
                  <div className="radio-pill-group">
                    <label className={`radio-pill ${formData.hasPriorExperience ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="hasPriorExperience" 
                        checked={formData.hasPriorExperience}
                        onChange={() => setFormData(prev => ({ ...prev, hasPriorExperience: true }))}
                      />
                      <span>{t.yes}</span>
                    </label>
                    <label className={`radio-pill ${!formData.hasPriorExperience ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="hasPriorExperience" 
                        checked={!formData.hasPriorExperience}
                        onChange={() => setFormData(prev => ({ ...prev, hasPriorExperience: false }))}
                      />
                      <span>{t.no}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="form-actions-bar">
          {isLoading ? (
            <div className="loading-status-box glass-panel-elevated">
              <Loader2 size={24} className="loading-spinner text-primary" />
              <div className="loading-text">
                <strong>{t.submittingText}</strong>
                <p className="text-sm text-muted">{scrapeStatusText || 'Connecting to official portals & analyzing financial viability...'}</p>
              </div>
            </div>
          ) : (
            <button type="submit" className="btn btn-primary btn-lg submit-cta-btn">
              <Sparkles size={20} />
              <span>{t.submitButton}</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </form>

      <style>{`
        .form-container {
          max-width: 1060px;
          margin: 1.25rem auto 3.5rem;
          padding: 0 1rem;
        }
        .quick-presets-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .presets-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .preset-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .preset-chip {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .preset-chip:hover {
          border-color: #059669;
          color: #059669;
          background: #ecfdf5;
        }
        .form-header-intro {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .form-header-intro h2 {
          font-size: 1.85rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
          color: var(--text-main);
          letter-spacing: -0.025em;
        }
        .live-metric-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 1rem 1.75rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.75rem;
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
          gap: 1.25rem;
        }
        .metric-box {
          display: flex;
          flex-direction: column;
        }
        .metric-label {
          font-size: 0.74rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .metric-val {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 0.2rem;
        }
        .metric-sub {
          font-size: 0.72rem;
          color: var(--text-dim);
          margin-top: 0.15rem;
        }
        .metric-sep {
          width: 1px;
          height: 36px;
          background: var(--border-subtle);
        }
        @media (max-width: 650px) {
          .metric-sep { display: none; }
          .live-metric-strip { flex-direction: column; align-items: flex-start; gap: 0.85rem; }
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .form-grid { grid-template-columns: 1fr; }
        }
        .form-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          box-shadow: var(--shadow-sm);
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
        }
        .card-header-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #f1f5f9;
          color: #334155;
          border: 1px solid var(--border-subtle);
        }
        .card-header h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .card-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .radio-pill-group {
          display: flex;
          flex-direction: row;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        .radio-pill {
          flex: 1;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.55rem 0.8rem;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-body);
          transition: all var(--transition-fast);
          text-align: center;
        }
        .radio-pill:hover {
          border-color: #cbd5e1;
          background: var(--bg-surface-subtle);
        }
        .radio-pill.active {
          border-color: rgba(5, 150, 105, 0.4);
          background: #ecfdf5;
          color: #047857;
          font-weight: 600;
        }
        .radio-pill input[type="radio"] {
          display: none;
        }
        .input-currency-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .currency-symbol {
          position: absolute;
          left: 0.85rem;
          color: var(--text-muted);
          font-weight: 700;
          font-size: 0.95rem;
        }
        .form-input.with-symbol {
          padding-left: 1.9rem;
        }
        .form-actions-bar {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }
        .submit-cta-btn {
          min-width: 320px;
          gap: 0.65rem;
          font-size: 1.02rem;
          padding: 0.85rem 1.75rem;
        }
        .loading-status-box {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          padding: 1.15rem 1.75rem;
          border-radius: var(--radius-lg);
          max-width: 580px;
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-accent);
          box-shadow: var(--shadow-md);
        }
        .loading-spinner {
          animation: spinSlow 1s linear infinite;
          flex-shrink: 0;
        }
        .text-green { color: #047857; }
        .text-amber { color: #b45309; }
        .text-danger { color: #dc2626; }
      `}</style>
    </div>
  );
};
