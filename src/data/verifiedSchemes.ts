import type { GovernmentScheme } from '../types/schemes';

export const VERIFIED_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pmegp_central',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortName: 'PMEGP',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MoMSME) / KVIC',
    category: 'Credit Linked Capital Subsidy',
    description: 'Flagship central government scheme providing up to 35% margin money subsidy on bank loans for setting up new micro-enterprises in manufacturing and service sectors in rural areas.',
    maxProjectCost: 5000000, // 50 Lakhs for manufacturing, 20 Lakhs for services
    maxSubsidyAmount: 1750000, // 35% of 50 Lakhs
    generalSubsidyPercent: {
      rural: 25,
      urban: 15
    },
    specialSubsidyPercent: {
      rural: 35,
      urban: 25
    },
    promoterContribution: {
      general: 10,
      special: 5
    },
    interestRateRange: '8.25% - 10.50% p.a.',
    moratoriumPeriodMonths: 6,
    repaymentPeriodMonths: 84, // 3 to 7 years
    collateralRequired: false,
    collateralNotes: 'No collateral security required for projects up to ₹10 Lakhs (covered under CGTMSE guarantee scheme up to ₹200 Lakhs).',
    applicableSectors: ['manufacturing', 'service', 'dairy', 'food_processing', 'textiles', 'renewables', 'all'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18,
      educationMinRequired: '8th Pass (mandatory only for projects exceeding ₹10L in manufacturing or ₹5L in services)'
    },
    keyBenefits: [
      'Huge 35% Government Subsidy on total project cost for rural SC/ST/OBC/Women/Minorities',
      'Minimal promoter contribution: Just 5% of total project cost for special categories',
      'Bank finances remaining 90% to 95% through composite term loan + working capital',
      'Margin money kept in 3-year term deposit; credited against loan upon successful inspection',
      'Free Entrepreneurship Development Programme (EDP) training included (online or offline)'
    ],
    eligibilityConditions: [
      'Individual entrepreneur must be above 18 years of age',
      'New business unit setup only (existing units are not eligible under standard PMEGP)',
      'For project cost above ₹10 Lakh in manufacturing or ₹5 Lakh in services, applicant must have passed at least 8th standard',
      'Only one person from a single family can avail assistance under PMEGP'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Project Detailed Project Report (DPR / Feasibility Report)',
      'Caste Certificate / Special Category proof (for OBC, SC, ST, Minorities, Women)',
      'Rural Area Certificate verified by Gram Panchayat / Tehsildar',
      'Educational Qualification Certificate (8th pass mark sheet if project > ₹10L)',
      'Land/Premises Agreement or Ownership proof',
      'Bank Account passbook / cancelled cheque'
    ],
    officialPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    applicationWorkflow: '1. Register online on KVIC PMEGP Portal -> 2. Upload DPR and KYC documents -> 3. District Task Force Committee (DTFC) scrutiny -> 4. Bank sanction & disbursement -> 5. 10-day EDP training completion -> 6. Release of Subsidy.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'pm_mudra_kishore',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY) - Kishore & Tarun',
    shortName: 'PM MUDRA Yojana',
    ministry: 'Department of Financial Services, Ministry of Finance',
    category: 'Institutional Micro Credit',
    description: 'Provides collateral-free loans up to ₹10 Lakhs (and up to ₹20 Lakhs under Tarun Plus) for non-corporate, non-farm small/micro enterprises for machinery purchase and working capital.',
    maxProjectCost: 2000000,
    maxSubsidyAmount: 0, // MUDRA is zero collateral, concessional rate rather than direct capital subsidy
    generalSubsidyPercent: {
      rural: 0,
      urban: 0
    },
    specialSubsidyPercent: {
      rural: 0,
      urban: 0
    },
    promoterContribution: {
      general: 15,
      special: 10
    },
    interestRateRange: '8.50% - 11.25% p.a.',
    moratoriumPeriodMonths: 3,
    repaymentPeriodMonths: 60, // up to 5 years
    collateralRequired: false,
    collateralNotes: 'Strictly zero collateral required. Fully backed by Credit Guarantee Fund for Micro Units (CGFMU).',
    applicableSectors: ['manufacturing', 'service', 'trading', 'dairy', 'poultry', 'retail', 'automotive'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18
    },
    keyBenefits: [
      'Zero third-party collateral guarantee required; no mortgaging of agricultural land',
      'MUDRA Debit Card provided for hassle-free working capital drawals at rural ATMs',
      'Tiered categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakhs), Tarun (₹5L to ₹10L), Tarun Plus (up to ₹20L)',
      'Available across all Public Sector Banks, Regional Rural Banks (RRBs), and Small Finance Banks',
      'Zero processing fee for Shishu and Kishore loan categories'
    ],
    eligibilityConditions: [
      'Any Indian citizen with a viable business plan for manufacturing, processing, trading, or allied agriculture services',
      'Applicant should not be a defaulter with any commercial bank or cooperative financial institution',
      'Existing or new enterprise with realistic cash-flow projections'
    ],
    requiredDocuments: [
      'Proof of Identity (Aadhaar / Voter ID / Driving License)',
      'Proof of Residence and Rural Address',
      'Proof of Business Enterprise (Udyam Registration Certificate)',
      'Quotations of machinery and items to be purchased',
      'Bank statement for previous 6 months (if existing account)',
      'Business Project Proposal and DPR'
    ],
    officialPortalUrl: 'https://www.mudra.org.in/',
    applicationWorkflow: '1. Prepare Business DPR -> 2. Apply on Udyamimitra portal (udyamimitra.in) or visit nearest RRB / Commercial Bank branch -> 3. Loan officer appraisal -> 4. Sanction without collateral -> 5. MUDRA Card issuance.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'pmfme_food_processing',
    name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)',
    shortName: 'PMFME Scheme',
    ministry: 'Ministry of Food Processing Industries (MoFPI)',
    category: 'One District One Product (ODOP) Credit Linked Subsidy',
    description: 'Centrally sponsored scheme providing 35% credit-linked capital subsidy (maximum ₹10 Lakhs) for micro food processing units, flour mills, spice grinding, edible oil expellers, and rural bakery units.',
    maxProjectCost: 3000000,
    maxSubsidyAmount: 1000000, // Max 10 Lakhs
    generalSubsidyPercent: {
      rural: 35,
      urban: 35
    },
    specialSubsidyPercent: {
      rural: 35,
      urban: 35
    },
    promoterContribution: {
      general: 10,
      special: 10
    },
    interestRateRange: '8.00% - 9.75% p.a.',
    moratoriumPeriodMonths: 6,
    repaymentPeriodMonths: 72,
    collateralRequired: false,
    collateralNotes: 'Eligible for CGTMSE collateral coverage; banks cannot demand third party guarantee up to ₹10 Lakhs.',
    applicableSectors: ['food_processing', 'milling', 'oil_extraction', 'spices', 'dairy', 'beverages', 'bakery'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18
    },
    keyBenefits: [
      'Credit-linked subsidy at 35% of eligible project cost with a ceiling of ₹10 Lakh per enterprise',
      'Beneficiary contribution is only 10% of total project cost; bank finances the remaining 90%',
      'Support for FSSAI food safety licensing, barcode registration, testing, and modern packaging',
      'Special preference given to enterprises aligned with the local district ODOP (One District One Product) crop'
    ],
    eligibilityConditions: [
      'Individual micro food processing unit (flour mill, oil ghani, spice grinder, pickle, dairy, pulses)',
      'Enterprise must be willing to transition to formal status (obtain Udyam and FSSAI)',
      'Promoter ownership is proprietary, partnership, or Self-Help Group (SHG)'
    ],
    requiredDocuments: [
      'Aadhaar Card, PAN Card, and Rural Domicile',
      'Detailed Project Report (DPR) detailing processing machinery and capacity',
      'Quotation for food processing machinery from approved manufacturers',
      'Electricity connection proof and site possession document',
      'Bank passbook and KYC details'
    ],
    officialPortalUrl: 'https://pmfme.mofpi.gov.in/',
    applicationWorkflow: '1. Register on PMFME MIS Portal -> 2. District Resource Person (DRP) assists with free DPR preparation -> 3. District Level Committee approval -> 4. Bank sanction & subsidy credit.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma Scheme (Traditional Artisans & Craftspeople)',
    shortName: 'PM Vishwakarma',
    ministry: 'Ministry of MSME and Ministry of Skill Development',
    category: 'End-to-End Artisan Support & Collateral-Free Concessional Credit',
    description: 'Comprehensive financial and developmental support for rural artisans and craftspeople across 18 traditional trades (tailors, carpenters, blacksmiths, potters, cobblers, weavers) with collateral-free enterprise credit at an ultra-low 5% interest rate.',
    maxProjectCost: 300000,
    maxSubsidyAmount: 65000, // Includes ₹15,000 free toolkit grant + 8% interest subvention
    generalSubsidyPercent: {
      rural: 20,
      urban: 15
    },
    specialSubsidyPercent: {
      rural: 25,
      urban: 20
    },
    promoterContribution: {
      general: 5,
      special: 5
    },
    interestRateRange: 'Concessional 5.00% fixed (Govt provides 8% interest subvention to bank)',
    moratoriumPeriodMonths: 3,
    repaymentPeriodMonths: 48,
    collateralRequired: false,
    collateralNotes: '100% collateral-free credit backed fully by the Government of India National Credit Guarantee Trustee Company (NCGTC).',
    applicableSectors: ['textiles', 'tailoring', 'handicraft', 'woodwork', 'blacksmith', 'pottery', 'repair'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18
    },
    keyBenefits: [
      'Collateral-free enterprise credit: ₹1,00,000 in Tranche 1 (18 months tenure) and ₹2,00,000 in Tranche 2 (30 months)',
      'Extremely low interest rate of only 5% per annum for the borrower (Govt pays 8% interest subvention to bank)',
      'Free ₹15,000 modern toolkit e-voucher credited directly to beneficiary bank account',
      'Free 5-7 days basic skill training with a daily stipend of ₹500/day during training',
      'Official PM Vishwakarma Certificate & Digital ID Card recognition across India'
    ],
    eligibilityConditions: [
      'Artisan or craftsperson working with hands and tools in one of the 18 eligible trades (e.g. Tailor/Darzi, Carpenter/Suthar, Blacksmith/Lohar, Potter/Kumhaar, Cobbler/Charmakar)',
      'Minimum age of 18 years on the date of application',
      'Must not have availed loans under PMEGP, PM MUDRA, or PM SVANidhi within the last 5 years'
    ],
    requiredDocuments: [
      'Aadhaar Card with mobile number linked',
      'Ration Card / Family details',
      'Active Bank Account Passbook details',
      'Self-declaration of traditional artisan trade practiced'
    ],
    officialPortalUrl: 'https://pmvishwakarma.gov.in/',
    applicationWorkflow: '1. Free registration at Gram Panchayat Common Service Centre (CSC) -> 2. Three-step verification (Gram Panchayat Head / ULB -> District Committee -> Screening Committee) -> 3. Basic skill training & ₹15k toolkit voucher -> 4. Concessional 5% loan disbursement.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'standup_india',
    name: 'Stand-Up India Scheme for Women and SC/ST Entrepreneurs',
    shortName: 'Stand-Up India',
    ministry: 'Department of Financial Services, Ministry of Finance / SIDBI',
    category: 'High-Impact Enterprise Credit',
    description: 'Facilitates bank loans between ₹10 Lakhs and ₹1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one Woman borrower per bank branch for setting up a greenfield enterprise.',
    maxProjectCost: 10000000, // 1 Crore
    maxSubsidyAmount: 0,
    generalSubsidyPercent: {
      rural: 0,
      urban: 0
    },
    specialSubsidyPercent: {
      rural: 15,
      urban: 15
    },
    promoterContribution: {
      general: 15,
      special: 10
    },
    interestRateRange: 'MCLR + 3% (typically 8.75% - 10.25% p.a.)',
    moratoriumPeriodMonths: 18,
    repaymentPeriodMonths: 84, // up to 7 years with 18 month moratorium
    collateralRequired: false,
    collateralNotes: 'Covered under Credit Guarantee Scheme for Stand Up India (CGSSI) or primary security of assets created.',
    applicableSectors: ['manufacturing', 'service', 'dairy', 'food_processing', 'agri_allied', 'renewables', 'trading'],
    targetDemographics: {
      socialCategories: ['sc', 'st', 'general', 'obc'],
      specialCategories: ['women'],
      minAge: 18
    },
    keyBenefits: [
      'Substantial loan size: ₹10 Lakhs to ₹100 Lakhs for ambitious rural and semi-urban enterprises',
      'Mandatory quota of at least 2 borrowers (1 Woman, 1 SC/ST) per commercial bank branch across India',
      'Generous moratorium period up to 18 months allows new enterprises to stabilize before repayment begins',
      'Can be converged with state government capital subsidies (bringing borrower margin down to just 10%)'
    ],
    eligibilityConditions: [
      'Borrower must be a Woman entrepreneur or belonging to SC/ST category',
      'Greenfield enterprise only (first time venture of the beneficiary in manufacturing, service, or agri-allied sector)',
      'In case of non-individual enterprises, 51% of the shareholding and controlling stake must be held by an SC/ST and/or woman entrepreneur'
    ],
    requiredDocuments: [
      'Aadhaar, PAN Card, and Caste Certificate (for SC/ST)',
      'Detailed Project Report (DPR) with 5-year financial projections and cash-flow statements',
      'Rent agreement or title deed of enterprise premises',
      'Pollution control NOC / municipal clearance where applicable'
    ],
    officialPortalUrl: 'https://www.standupmitra.in/',
    applicationWorkflow: '1. Register online at standupmitra.in -> 2. Connect with Lead District Manager (LDM) or preferred bank branch -> 3. Handholding support by SIDBI -> 4. Composite loan sanction.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'ahidf_nabard_dairy',
    name: 'Animal Husbandry Infrastructure Development Fund (AHIDF) & NABARD DEDS',
    shortName: 'AHIDF / Dairy Scheme',
    ministry: 'Department of Animal Husbandry and Dairying / NABARD',
    category: 'Interest Subvention & Dairy Credit',
    description: 'Promotes private investment in dairy processing, value-addition facilities, cattle feed plants, and modern animal husbandry units with 3% interest subvention and up to 90% loan financing.',
    maxProjectCost: 20000000,
    maxSubsidyAmount: 2500000,
    generalSubsidyPercent: {
      rural: 25,
      urban: 15
    },
    specialSubsidyPercent: {
      rural: 33.33,
      urban: 25
    },
    promoterContribution: {
      general: 10,
      special: 10
    },
    interestRateRange: '3% Interest Subvention (Effective interest rate: ~6.5% - 7.5% p.a.)',
    moratoriumPeriodMonths: 24, // Up to 2 years moratorium on principal
    repaymentPeriodMonths: 96, // Up to 8 years
    collateralRequired: false,
    collateralNotes: 'Credit guarantee coverage of up to 25% of the credit facility through NABARD Credit Guarantee Portal.',
    applicableSectors: ['dairy', 'animal_husbandry', 'poultry', 'feed_manufacturing'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18
    },
    keyBenefits: [
      '3% Interest Subvention on bank loan directly provided by Central Government',
      'Massive moratorium period: up to 2 full years on principal repayment!',
      'Loan financing covers up to 90% of total project cost for individual entrepreneurs and MSMEs',
      'Ideal for chilling centers, paneer/ghee packaging units, animal feed mixing, and breeding farms'
    ],
    eligibilityConditions: [
      'Individual entrepreneurs, Farmer Producer Organisations (FPOs), Section 8 companies, and MSMEs',
      'Commitment of minimum 10% promoter contribution',
      'Adequate land with water source and veterinary access available'
    ],
    requiredDocuments: [
      'Detailed Project Report (DPR) with technical animal husbandry specs',
      'Land revenue records / 7-12 extract or long-term lease agreement (min 10 years)',
      'KYC documents and credit bureau score report',
      'Quotation for dairy machinery / cattle feed mixer'
    ],
    officialPortalUrl: 'https://ahidf.udyamimitra.in/',
    applicationWorkflow: '1. Online submission of DPR on ahidf.udyamimitra.in -> 2. DAHD ministry preliminary review -> 3. Forwarded to designated lending bank -> 4. Bank sanction & interest subvention tagging.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'cmegp_state_scheme',
    name: 'State Chief Minister Employment Generation Programme (CMEGP / MYSY)',
    shortName: 'State CMEGP Scheme',
    ministry: 'State Directorate of Industries & Rural Development',
    category: 'State Credit-Linked Capital Subsidy',
    description: 'Special state-sponsored scheme (e.g. Maharashtra CMEGP, UP Mukhyamantri Yuva Swarojgar Yojana, MP Mukhyamantri Udyam Kranti) providing 15% to 35% state capital subsidy for youth, women, and rural entrepreneurs.',
    maxProjectCost: 5000000,
    maxSubsidyAmount: 1250000,
    generalSubsidyPercent: {
      rural: 20,
      urban: 15
    },
    specialSubsidyPercent: {
      rural: 30,
      urban: 25
    },
    promoterContribution: {
      general: 10,
      special: 5
    },
    interestRateRange: '8.50% - 10.25% p.a.',
    moratoriumPeriodMonths: 6,
    repaymentPeriodMonths: 72,
    collateralRequired: false,
    collateralNotes: 'State guarantee coverage convergent with CGTMSE for micro units.',
    applicableSectors: ['manufacturing', 'service', 'food_processing', 'textiles', 'agri_allied', 'all'],
    targetDemographics: {
      socialCategories: ['general', 'obc', 'sc', 'st', 'minority'],
      specialCategories: ['none', 'women', 'divyangjan', 'ex_serviceman', 'youth'],
      minAge: 18
    },
    keyBenefits: [
      'State-level direct capital subsidy of up to 30% for rural units and 35% for women/SC/ST',
      'Fast-track Single Window Clearance via District Industries Centre (DIC)',
      'Electricity tariff concessions and stamp duty exemptions on enterprise land lease',
      'Dedicated District Task Force to ensure bank branch coordination'
    ],
    eligibilityConditions: [
      'Domicile certificate of the respective State is mandatory',
      'Age between 18 to 45 years (relaxable up to 50 years for women/SC/ST)',
      'Education: Minimum 7th or 10th standard pass for project sizes over ₹10 Lakhs'
    ],
    requiredDocuments: [
      'State Domicile Certificate',
      'Aadhaar Card, PAN Card, and Passport-size photos',
      'Detailed Project Report (DPR) certified by chartered accountant / DIC consultant',
      'Caste and Special Category Certificate (where applicable)',
      'Gram Panchayat No-Objection Certificate (NOC)'
    ],
    officialPortalUrl: 'https://maha-cmegp.gov.in/',
    applicationWorkflow: '1. Register on State Single Window Portal -> 2. DIC scrutiny and verification -> 3. District Task Force Committee interview -> 4. Bank loan sanction and margin money deposit.',
    sourceType: 'verified_official',
    lastUpdated: '2026-03-01'
  }
];
