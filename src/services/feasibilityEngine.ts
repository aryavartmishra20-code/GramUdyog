import type { BusinessFormData, FeasibilityReport, FinancialBreakdown, MarketAnalysis, SWOTItem, MatchedScheme } from '../types/business';
import { BUSINESS_TEMPLATES } from '../data/businessCategories';

export class FeasibilityEngine {
  public static generateReport(
    formData: BusinessFormData,
    matchedSchemes: MatchedScheme[]
  ): FeasibilityReport {
    // 1. Find matching template or generate fallback
    const template = BUSINESS_TEMPLATES.find(
      t => t.category === formData.businessCategory || t.title.toLowerCase().includes(formData.businessTitle.toLowerCase())
    ) || BUSINESS_TEMPLATES[0];

    // 2. Select top recommended scheme for financial integration
    const primaryScheme = matchedSchemes[0] || {
      schemeId: 'pmegp_central',
      name: "Prime Minister's Employment Generation Programme (PMEGP)",
      matchScore: 92,
      eligibleSubsidyPercent: formData.localityType === 'rural' ? 35 : 25,
      promoterContributionPercent: formData.socialCategory === 'general' ? 10 : 5,
      interestRate: '9.0% p.a.',
      moratoriumPeriod: '6 Months',
      repaymentPeriod: '5 Years'
    };

    // 3. Calculate Financials
    const financials = this.calculateFinancials(formData, primaryScheme, template.typicalMarginPercent);

    // 4. Calculate Market Analysis
    const marketAnalysis = this.analyzeMarket(formData, template.typicalMarginPercent);

    // 5. Calculate Feasibility Score & Verdict
    const { score, verdict, executiveSummary } = this.evaluateFeasibilityScore(
      formData,
      financials,
      marketAnalysis,
      primaryScheme
    );

    // 6. Generate SWOT
    const swot = this.synthesizeSWOT(formData, template, financials);

    // 7. Pricing Strategy
    const pricingStrategy = {
      recommendedModel: 'Cost-Plus Value Pricing (Rural Penetration with High Margin Premium Byproducts)',
      suggestedPriceRange: template.pricingAdvice,
      marginPercentage: `${template.typicalMarginPercent}% - ${template.typicalMarginPercent + 8}%`,
      notes: `Keep base utility offerings affordable for local village households to secure steady daily volume, while maximizing premium packaging margins for weekly haats and peri-urban buyers.`
    };

    // 8. Risks and Action Plan
    const risks = this.identifyRisks(formData, template);
    const actionPlan = this.generateActionPlan(formData, primaryScheme);

    return {
      id: `GU-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      formData,
      overallFeasibilityScore: score,
      verdict,
      executiveSummary,
      marketAnalysis,
      financials,
      swot,
      pricingStrategy,
      risks,
      actionPlan,
      matchedSchemes
    };
  }

  private static calculateFinancials(
    formData: BusinessFormData,
    primaryScheme: MatchedScheme | any,
    typicalMarginPercent: number
  ): FinancialBreakdown {
    const totalCost = formData.estimatedProjectCost;
    const promoterPercent = primaryScheme.promoterContributionPercent || (formData.socialCategory === 'general' ? 10 : 5);
    const promoterContribution = Math.round((totalCost * promoterPercent) / 100);
    const availableCapital = formData.availableCapital;
    const capitalSurplusOrDeficit = availableCapital - promoterContribution;
    const fundingRequirement = Math.max(0, totalCost - availableCapital);

    const subsidyPercent = primaryScheme.eligibleSubsidyPercent || (formData.localityType === 'rural' ? 35 : 25);
    const estimatedSubsidyAmount = Math.round(
      Math.min((totalCost * subsidyPercent) / 100, primaryScheme.maxSubsidyAmount || 1750000)
    );

    // Bank loan is totalCost minus promoter contribution (subsidy acts as margin money backstop)
    const netBankLoan = Math.max(0, totalCost - promoterContribution);

    // EMI Calculation
    const annualInterestRate = 0.09; // 9% average MSME rate
    const monthlyRate = annualInterestRate / 12;
    const tenureMonths = 60; // 5 years standard
    const moratoriumMonths = 6;

    // Monthly EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let monthlyEMI = 0;
    if (netBankLoan > 0) {
      monthlyEMI = Math.round(
        (netBankLoan * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
      );
    }

    const totalRepaymentAmount = Math.round(monthlyEMI * tenureMonths);
    const totalInterestPayable = Math.max(0, totalRepaymentAmount - netBankLoan);

    // Revenue Projections
    // Annual turnover typically 2.2x to 3x of fixed capital for rural micro-enterprises
    const estimatedMonthlyRevenue = formData.expectedMonthlyRevenue && formData.expectedMonthlyRevenue > 0
      ? formData.expectedMonthlyRevenue
      : Math.round((totalCost * 0.22));

    const marginRate = typicalMarginPercent / 100;
    const estimatedMonthlyProfit = Math.round(estimatedMonthlyRevenue * marginRate);
    const estimatedMonthlyExpenses = estimatedMonthlyRevenue - estimatedMonthlyProfit;

    // Break Even Months
    const breakEvenMonths = Math.min(36, Math.max(6, Math.round(totalCost / Math.max(estimatedMonthlyProfit, 15000))));

    // Debt Service Coverage Ratio (DSCR) = Net Profit / Monthly EMI
    const dscr = monthlyEMI > 0 ? Number((estimatedMonthlyProfit / monthlyEMI).toFixed(2)) : 3.5;

    return {
      totalProjectCost: totalCost,
      promoterContribution,
      availableCapital,
      capitalSurplusOrDeficit,
      fundingRequirement,
      applicableSubsidyPercent: subsidyPercent,
      estimatedSubsidyAmount,
      netBankLoan,
      estimatedInterestRate: 9.0,
      loanTenureMonths: tenureMonths,
      moratoriumMonths,
      monthlyEMI,
      totalInterestPayable,
      totalRepaymentAmount,
      estimatedMonthlyRevenue,
      estimatedMonthlyExpenses,
      estimatedMonthlyProfit,
      breakEvenMonths,
      debtServiceCoverageRatio: dscr
    };
  }

  private static analyzeMarket(formData: BusinessFormData, marginPercent: number): MarketAnalysis {
    // Estimations based on rural demographic density
    const isRural = formData.localityType === 'rural';
    const estimatedCustomers = isRural ? 4200 : 9800;

    let competitorPresence: 'Low' | 'Moderate' | 'High' = 'Low';
    if (formData.businessCategory.includes('Retail') || formData.businessCategory.includes('Milling')) {
      competitorPresence = 'Moderate';
    }

    return {
      localityScore: isRural ? 88 : 82,
      potentialCustomersCount: estimatedCustomers,
      estimatedLocalDemandLevel: isRural ? 'High' : 'Very High',
      competitorPresence,
      competitorDensityDesc: competitorPresence === 'Low'
        ? `Sparse organized competition in ${formData.district}; most local residents travel 12–25 km to nearby tehsils or buy unbranded informal goods.`
        : `Moderate presence of small traditional shops; lack of modern hygiene, branded packaging and prompt service leaves a substantial market share open.`,
      distributionChannels: [
        `Direct farm-gate and workshop sales to ${formData.villageOrTown} residents`,
        `Weekly village haats and bazaar stalls within a 15 km cluster`,
        `Wholesale supply to 8–15 local Kirana general stores in the block`,
        `Direct WhatsApp business ordering for doorstep bulk village orders`
      ],
      keyMarketGaps: [
        `Absence of certified local processing leads to farmers selling raw material at distress rates`,
        `Consumers paying high transport markups for goods brought in from district headquarters`,
        `High demand for fresh, unadulterated local produce with authentic regional taste`
      ],
      seasonalFactors: `Peak demand occurs during harvest seasons (April-May & Oct-Nov) and festival/wedding periods. Steady recurring baseline demand throughout monsoon and winter.`,
      rawMaterialAvailability: `High local availability within ${formData.district} district. Sourcing directly from surrounding farmers eliminates middleman commissions.`
    };
  }

  private static evaluateFeasibilityScore(
    formData: BusinessFormData,
    financials: FinancialBreakdown,
    market: MarketAnalysis,
    scheme: any
  ): {
    score: number;
    verdict: FeasibilityReport['verdict'];
    executiveSummary: string;
  } {
    let score = 70; // baseline

    // 1. Capital adequacy (+15 if user has >= promoter contribution)
    if (financials.capitalSurplusOrDeficit >= 0) {
      score += 15;
    } else {
      score -= 10;
    }

    // 2. DSCR (Debt Service Coverage Ratio)
    if (financials.debtServiceCoverageRatio >= 1.8) {
      score += 10;
    } else if (financials.debtServiceCoverageRatio >= 1.2) {
      score += 5;
    } else {
      score -= 15;
    }

    // 3. Scheme Subsidy Advantage
    if (financials.applicableSubsidyPercent >= 30) {
      score += 8;
    }

    // 4. Locality advantage
    if (formData.localityType === 'rural') {
      score += 5;
    }

    // 5. Training / Experience
    if (formData.hasPriorExperience || formData.hasEDPTraining) {
      score += 6;
    }

    // Clamp score
    const finalScore = Math.min(97, Math.max(48, score));

    let verdict: FeasibilityReport['verdict'] = 'Highly Feasible';
    if (finalScore >= 82) {
      verdict = 'Highly Feasible';
    } else if (finalScore >= 70) {
      verdict = 'Feasible with Support';
    } else if (finalScore >= 55) {
      verdict = 'Moderate Feasibility';
    } else {
      verdict = 'High Risk / Needs Revision';
    }

    const executiveSummary = `Proposed venture "${formData.businessTitle}" in ${formData.villageOrTown}, ${formData.district} demonstrates ${verdict.toLowerCase()} with a composite feasibility index of ${finalScore}/100. Total capital outlay of ₹${financials.totalProjectCost.toLocaleString('en-IN')} requires a promoter equity of ₹${financials.promoterContribution.toLocaleString('en-IN')} (${financials.promoterContribution <= financials.availableCapital ? 'fully met by user savings' : 'slightly exceeds current savings'}). Under the ${scheme.name || 'PMEGP'}, the entrepreneur is eligible for a margin money subsidy of ₹${financials.estimatedSubsidyAmount.toLocaleString('en-IN')} (${financials.applicableSubsidyPercent}%). With a projected DSCR of ${financials.debtServiceCoverageRatio}x and monthly net profit of ₹${financials.estimatedMonthlyProfit.toLocaleString('en-IN')}, debt servicing of ₹${financials.monthlyEMI.toLocaleString('en-IN')}/mo is robust and financially viable.`;

    return {
      score: finalScore,
      verdict,
      executiveSummary
    };
  }

  private static synthesizeSWOT(
    formData: BusinessFormData,
    template: any,
    financials: FinancialBreakdown
  ): SWOTItem {
    return {
      strengths: [
        ...template.swotDefaults.strengths,
        `Strong government backstop: Eligible for ${financials.applicableSubsidyPercent}% credit-linked subsidy under recommended scheme.`,
        `Low promoter equity requirement of only ₹${financials.promoterContribution.toLocaleString('en-IN')} (${financials.promoterContribution <= financials.availableCapital ? 'Capital secured' : 'Manageable margin'}).`
      ],
      weaknesses: [
        ...template.swotDefaults.weaknesses,
        `Initial learning curve in enterprise accounting, GST/Udyam compliance, and inventory management.`,
        financials.capitalSurplusOrDeficit < 0
          ? `Shortfall of ₹${Math.abs(financials.capitalSurplusOrDeficit).toLocaleString('en-IN')} in required promoter contribution that must be bridged via SHG / family support.`
          : `Working capital buffer must be strictly monitored during first 90 days.`
      ],
      opportunities: [
        ...template.swotDefaults.opportunities,
        `Fulfilling regional supply deficit in ${formData.district} before urban commercial distributors enter the local market.`,
        `Integration with Kisan Credit Card (KCC) and rural SHG distribution channels.`
      ],
      threats: [
        ...template.swotDefaults.threats,
        `Seasonal delays in bank branch loan processing if documentation is incomplete.`,
        `Price volatility of local fuel, raw ingredients, or power tariffs.`
      ]
    };
  }

  private static identifyRisks(formData: BusinessFormData, template: any) {
    return [
      {
        risk: 'Working Capital Dry-Up during Seasonal Dips',
        severity: 'Medium' as const,
        mitigation: 'Avail Cash Credit (CC) limit under Mudra or PMEGP working capital component; maintain 45 days of raw material inventory reserve.'
      },
      {
        risk: 'Power Cuts or Equipment Breakdown',
        severity: 'High' as const,
        mitigation: 'Incorporate solar hybrid inverter backup and enforce annual maintenance contracts (AMC) with machinery suppliers.'
      },
      {
        risk: 'Bank Loan Sanction Delays',
        severity: 'Medium' as const,
        mitigation: 'Pre-register on Udyam portal, maintain clean CIBIL history (>680), and submit this verified DPR directly to the Lead District Manager (LDM).'
      },
      {
        risk: 'Underpricing by Unorganized Local Competitors',
        severity: 'Low' as const,
        mitigation: 'Differentiate on certified purity, accurate digital weights, hygienic packaging, and friendly village door delivery.'
      }
    ];
  }

  private static generateActionPlan(formData: BusinessFormData, scheme: any) {
    return [
      {
        stepNumber: 1,
        phase: 'Phase 1: Pre-requisites & Entity Registration',
        timeline: 'Week 1 - 2',
        title: 'Obtain Udyam Registration & Bank Quotations',
        description: 'Complete free Aadhaar-linked Udyam MSME registration online. Collect three certified proforma machinery invoices from registered equipment suppliers.',
        requiredDocuments: ['Aadhaar Card', 'PAN Card', 'Bank Passbook', 'Premises Lease/Tax Receipt']
      },
      {
        stepNumber: 2,
        phase: 'Phase 2: Scheme Application & Committee Verification',
        timeline: 'Week 3 - 5',
        title: 'Submit Application on Government Portal',
        description: `Upload this Detailed Project Report (DPR) to ${scheme.portalUrl || 'the official portal'}. Attend the District Task Force Committee (DTFC) review meeting at the District Industries Centre (DIC).`,
        requiredDocuments: ['Printed DPR Feasibility Report', 'Rural Area Certificate', 'Caste/Category Proof', 'Machinery Quotations']
      },
      {
        stepNumber: 3,
        phase: 'Phase 3: Bank Sanction & Mandatory EDP Training',
        timeline: 'Week 6 - 8',
        title: 'Bank Sanction & EDP Training Completion',
        description: 'Designated lending bank issues in-principle sanction letter. Attend 5 to 10 days Entrepreneurship Development Programme (EDP) training conducted by RSETI or online portal.',
        requiredDocuments: ['Bank In-Principle Sanction Letter', 'EDP Completion Certificate']
      },
      {
        stepNumber: 4,
        phase: 'Phase 4: Site Setup, Machinery Installation & Launch',
        timeline: 'Week 9 - 12',
        title: 'Machinery Erection, Trial Run & Commercial Launch',
        description: 'Disbursement of loan tranche directly to machinery vendor. Complete electricity connection, trial batch quality testing, and inaugurate commercial sales.',
        requiredDocuments: ['Machinery Delivery Challan', 'Commercial Electricity Connection Bill', 'FSSAI License / Trade License']
      }
    ];
  }
}
