import React, { useState, useMemo } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import type { FeasibilityReport } from '../types/business';
import { SlidersHorizontal, IndianRupee, X, Check, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';

interface SimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseReport?: FeasibilityReport | null;
  onApplyChanges?: (newCost: number, newCapital: number) => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  isOpen,
  onClose,
  baseReport,
  onApplyChanges
}) => {
  const { t } = useTranslation();

  // Baseline defaults
  const initialCost = baseReport?.formData.estimatedProjectCost || 750000;
  const initialCapital = baseReport?.formData.availableCapital || 120000;
  const isRural = baseReport ? baseReport.formData.localityType === 'rural' : true;
  const isSpecial = baseReport ? baseReport.formData.socialCategory !== 'general' || baseReport.formData.specialCategory !== 'none' : true;

  const [simCost, setSimCost] = useState<number>(initialCost);
  const [simCapital, setSimCapital] = useState<number>(initialCapital);
  const [simInterest, setSimInterest] = useState<number>(9.0);
  const [simTenureMonths, setSimTenureMonths] = useState<number>(60);

  // Dynamic simulation calculations
  const simResults = useMemo(() => {
    const subsidyPct = isSpecial ? (isRural ? 35 : 25) : (isRural ? 25 : 15);
    const promoterPct = isSpecial ? 5 : 10;
    const requiredPromoterEquity = Math.round((simCost * promoterPct) / 100);
    const estimatedSubsidy = Math.round(Math.min((simCost * subsidyPct) / 100, 1750000));
    const netBankLoan = Math.max(0, simCost - requiredPromoterEquity);

    // Monthly EMI formula
    const monthlyRate = (simInterest / 100) / 12;
    let monthlyEMI = 0;
    if (netBankLoan > 0 && monthlyRate > 0) {
      monthlyEMI = Math.round(
        (netBankLoan * monthlyRate * Math.pow(1 + monthlyRate, simTenureMonths)) /
        (Math.pow(1 + monthlyRate, simTenureMonths) - 1)
      );
    }

    const estimatedMonthlyRevenue = Math.round(simCost * 0.22);
    const estimatedMonthlyProfit = Math.round(estimatedMonthlyRevenue * 0.28);
    const dscr = monthlyEMI > 0 ? Number((estimatedMonthlyProfit / monthlyEMI).toFixed(2)) : 3.5;
    const capitalGap = simCapital - requiredPromoterEquity;

    // Feasibility Score calculation
    let score = 70;
    if (capitalGap >= 0) score += 15; else score -= 10;
    if (dscr >= 1.8) score += 10; else if (dscr >= 1.2) score += 5; else score -= 15;
    if (subsidyPct >= 30) score += 5;
    const finalScore = Math.min(98, Math.max(45, score));

    return {
      subsidyPct,
      estimatedSubsidy,
      requiredPromoterEquity,
      capitalGap,
      netBankLoan,
      monthlyEMI,
      estimatedMonthlyProfit,
      dscr,
      finalScore
    };
  }, [simCost, simCapital, simInterest, simTenureMonths, isRural, isSpecial]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass-panel modal-card-sim animate-slide-up">
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-wrap sim-icon">
              <SlidersHorizontal size={22} />
            </div>
            <div>
              <h3>What-If Scenario Simulator</h3>
              <p className="text-muted text-sm">Observe how varying your capital, investment or tenure transforms loan EMIs and feasibility</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-sim">
          {/* Live Dynamic Score Ribbon */}
          <div className="sim-score-ribbon glass-panel">
            <div className="ribbon-col">
              <span className="r-label">Feasibility Score</span>
              <span className={`r-val ${simResults.finalScore >= 80 ? 'text-green' : simResults.finalScore >= 65 ? 'text-amber' : 'text-danger'}`}>
                {simResults.finalScore} / 100
              </span>
            </div>
            <div className="ribbon-divider" />
            <div className="ribbon-col">
              <span className="r-label">Govt Subsidy (35%)</span>
              <span className="r-val text-green">₹{simResults.estimatedSubsidy.toLocaleString('en-IN')}</span>
            </div>
            <div className="ribbon-divider" />
            <div className="ribbon-col">
              <span className="r-label">Monthly EMI</span>
              <span className="r-val text-amber">₹{simResults.monthlyEMI.toLocaleString('en-IN')}/mo</span>
            </div>
            <div className="ribbon-divider" />
            <div className="ribbon-col">
              <span className="r-label">Net Profit Margin</span>
              <span className="r-val text-cyan">₹{simResults.estimatedMonthlyProfit.toLocaleString('en-IN')}/mo</span>
            </div>
          </div>

          <div className="sim-sliders-grid">
            {/* Slider 1: Total Project Cost */}
            <div className="slider-box glass-panel">
              <div className="slider-header">
                <span>Total Project Setup Cost</span>
                <span className="slider-val text-white">₹{simCost.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range"
                min={100000}
                max={4000000}
                step={25000}
                value={simCost}
                onChange={(e) => setSimCost(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-minmax">
                <span>₹1 Lakh</span>
                <span>₹40 Lakhs</span>
              </div>
            </div>

            {/* Slider 2: Available Savings */}
            <div className="slider-box glass-panel">
              <div className="slider-header">
                <span>Your Available Own Savings</span>
                <span className="slider-val text-amber">₹{simCapital.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range"
                min={10000}
                max={1500000}
                step={10000}
                value={simCapital}
                onChange={(e) => setSimCapital(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-minmax">
                <span>₹10,000</span>
                <span>₹15 Lakhs</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="slider-box glass-panel">
              <div className="slider-header">
                <span>Bank Loan Interest Rate</span>
                <span className="slider-val text-cyan">{simInterest}% p.a.</span>
              </div>
              <input 
                type="range"
                min={5.0}
                max={13.5}
                step={0.25}
                value={simInterest}
                onChange={(e) => setSimInterest(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-minmax">
                <span>5.0% (Vishwakarma)</span>
                <span>13.5% (Commercial)</span>
              </div>
            </div>

            {/* Slider 4: Loan Tenure */}
            <div className="slider-box glass-panel">
              <div className="slider-header">
                <span>Repayment Tenure</span>
                <span className="slider-val text-white">{Math.round(simTenureMonths / 12)} Years ({simTenureMonths} Mo)</span>
              </div>
              <input 
                type="range"
                min={12}
                max={84}
                step={6}
                value={simTenureMonths}
                onChange={(e) => setSimTenureMonths(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-minmax">
                <span>1 Year</span>
                <span>7 Years</span>
              </div>
            </div>
          </div>

          <div className="sim-summary-table glass-panel">
            <div className="summary-row">
              <span className="text-muted">Minimum Required Promoter Contribution:</span>
              <span className="font-bold">₹{simResults.requiredPromoterEquity.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span className="text-muted">Capital Adequacy Status:</span>
              <span className={`font-bold ${simResults.capitalGap >= 0 ? 'text-green' : 'text-danger'}`}>
                {simResults.capitalGap >= 0 ? `✓ Surplus of ₹${simResults.capitalGap.toLocaleString('en-IN')}` : `⚠ Shortfall of ₹${Math.abs(simResults.capitalGap).toLocaleString('en-IN')}`}
              </span>
            </div>
            <div className="summary-row">
              <span className="text-muted">Net Bank Financing Required:</span>
              <span className="font-bold text-cyan">₹{simResults.netBankLoan.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span className="text-muted">Debt Service Coverage Ratio (DSCR):</span>
              <span className="font-bold text-green">{simResults.dscr}x (Healthy)</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          {onApplyChanges && (
            <button 
              className="btn btn-primary"
              onClick={() => {
                onApplyChanges(simCost, simCapital);
                onClose();
              }}
            >
              Apply to My Feasibility Report
            </button>
          )}
        </div>
      </div>

      <style>{`
        .modal-card-sim {
          width: 100%;
          max-width: 820px;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 2rem;
          border-radius: var(--radius-xl);
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
        }
        .sim-icon {
          background: #fffbeb;
          color: #d97706;
          border: 1px solid rgba(217, 119, 6, 0.25);
        }
        .sim-score-ribbon {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 1.15rem;
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.25);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .ribbon-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .r-label { font-size: 0.72rem; color: #047857; text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em; }
        .r-val { font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; }
        .ribbon-divider { width: 1px; height: 35px; background: rgba(5, 150, 105, 0.2); }
        .sim-sliders-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 650px) {
          .sim-sliders-grid { grid-template-columns: 1fr; }
          .ribbon-divider { display: none; }
        }
        .slider-box {
          padding: 1.15rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 0.65rem;
        }
        .sim-slider {
          width: 100%;
          accent-color: var(--primary);
          height: 6px;
          cursor: pointer;
        }
        .slider-minmax {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }
        .sim-summary-table {
          padding: 1rem 1.35rem;
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          font-size: 0.88rem;
          color: var(--text-body);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
