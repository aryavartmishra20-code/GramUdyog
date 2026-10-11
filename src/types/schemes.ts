import type { SocialCategory, SpecialCategory } from './business';

export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  category: string;
  description: string;
  maxProjectCost: number; // in INR
  maxSubsidyAmount: number; // in INR
  generalSubsidyPercent: {
    rural: number;
    urban: number;
  };
  specialSubsidyPercent: {
    rural: number;
    urban: number;
  };
  promoterContribution: {
    general: number; // e.g. 10%
    special: number; // e.g. 5%
  };
  interestRateRange: string;
  moratoriumPeriodMonths: number;
  repaymentPeriodMonths: number;
  collateralRequired: boolean;
  collateralNotes: string;
  applicableSectors: string[]; // ['manufacturing', 'service', 'dairy', 'food_processing', 'all']
  applicableStates?: string[]; // empty means all India
  targetDemographics: {
    socialCategories: SocialCategory[];
    specialCategories: SpecialCategory[];
    minAge?: number;
    educationMinRequired?: string;
  };
  keyBenefits: string[];
  eligibilityConditions: string[];
  requiredDocuments: string[];
  officialPortalUrl: string;
  applicationWorkflow: string;
  sourceType: 'verified_official' | 'live_scraped';
  lastUpdated: string;
}

export interface SchemeScrapeResult {
  sourceUrl: string;
  scrapedAt: string;
  schemesFound: GovernmentScheme[];
  searchQuery: string;
  status: 'success' | 'partial' | 'fallback';
}
