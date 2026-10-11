export type LocalityType = 'rural' | 'semi-urban' | 'urban';

export type SocialCategory = 'general' | 'obc' | 'sc' | 'st' | 'minority';

export type SpecialCategory = 'none' | 'women' | 'divyangjan' | 'ex_serviceman' | 'youth';

export type EducationLevel = 'below_8th' | 'pass_8th' | 'pass_10th_12th' | 'graduate_or_above';

export interface BusinessFormData {
  // Locality
  state: string;
  district: string;
  blockOrTehsil: string;
  villageOrTown: string;
  localityType: LocalityType;

  // Business Idea
  businessCategory: string;
  businessTitle: string;
  businessDescription: string;
  unitType: 'new' | 'expansion';

  // Financial Inputs
  availableCapital: number; // User's own savings/contribution in INR
  estimatedProjectCost: number; // Target total project cost in INR
  expectedMonthlyRevenue?: number;

  // Entrepreneur Demographics (Crucial for govt subsidies like PMEGP / Mudra / Stand-Up)
  applicantName: string;
  contactNumber?: string;
  socialCategory: SocialCategory;
  specialCategory: SpecialCategory;
  education: EducationLevel;
  hasPriorExperience: boolean;
  hasEDPTraining: boolean; // Entrepreneurship Development Programme
}

export interface FinancialBreakdown {
  totalProjectCost: number;
  promoterContribution: number; // User's mandatory share (e.g., 5% or 10%)
  availableCapital: number;
  capitalSurplusOrDeficit: number; // availableCapital - promoterContribution
  fundingRequirement: number; // totalProjectCost - availableCapital
  applicableSubsidyPercent: number; // e.g. 35% for PMEGP rural special
  estimatedSubsidyAmount: number;
  netBankLoan: number;
  estimatedInterestRate: number; // e.g. 8.5%
  loanTenureMonths: number; // e.g. 60 (5 years)
  moratoriumMonths: number; // e.g. 6 months
  monthlyEMI: number;
  totalInterestPayable: number;
  totalRepaymentAmount: number;
  estimatedMonthlyRevenue: number;
  estimatedMonthlyExpenses: number;
  estimatedMonthlyProfit: number;
  breakEvenMonths: number;
  debtServiceCoverageRatio: number; // DSCR ratio
}

export interface MarketAnalysis {
  localityScore: number; // 0-100
  potentialCustomersCount: number;
  estimatedLocalDemandLevel: 'Very High' | 'High' | 'Moderate' | 'Niche';
  competitorPresence: 'Low' | 'Moderate' | 'High';
  competitorDensityDesc: string;
  distributionChannels: string[];
  keyMarketGaps: string[];
  seasonalFactors: string;
  rawMaterialAvailability: string;
}

export interface SWOTItem {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RiskAndMitigation {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface ActionStep {
  stepNumber: number;
  phase: string;
  timeline: string;
  title: string;
  description: string;
  requiredDocuments?: string[];
}

export interface FeasibilityReport {
  id: string;
  createdAt: string;
  formData: BusinessFormData;
  overallFeasibilityScore: number; // 0 - 100
  verdict: 'Highly Feasible' | 'Feasible with Support' | 'Moderate Feasibility' | 'High Risk / Needs Revision';
  executiveSummary: string;
  marketAnalysis: MarketAnalysis;
  financials: FinancialBreakdown;
  swot: SWOTItem;
  pricingStrategy: {
    recommendedModel: string;
    suggestedPriceRange: string;
    marginPercentage: string;
    notes: string;
  };
  risks: RiskAndMitigation[];
  actionPlan: ActionStep[];
  matchedSchemes: MatchedScheme[];
}

export interface MatchedScheme {
  schemeId: string;
  name: string;
  ministry: string;
  matchScore: number; // 0-100%
  eligibleSubsidyPercent: number;
  maxSubsidyAmount: number;
  maxLoanAmount: number;
  promoterContributionPercent: number;
  interestRate: string;
  moratoriumPeriod: string;
  repaymentPeriod: string;
  collateralRequirement: string;
  portalUrl: string;
  eligibilityVerdict: string;
  reasons: string[];
  requiredDocs: string[];
  isScrapedLive?: boolean;
}
