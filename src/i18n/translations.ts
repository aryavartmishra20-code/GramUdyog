export type Language = 'en' | 'hi' | 'mr';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  badgeGovtApproved: string;
  
  // Navigation
  navEvaluation: string;
  navSchemes: string;
  navAdvisor: string;
  navCompare: string;
  navSimulator: string;
  supabaseConnected: string;
  supabaseLocal: string;
  connectSupabase: string;

  // Form Headers
  formStep1: string;
  formStep1Desc: string;
  formStep2: string;
  formStep2Desc: string;
  formStep3: string;
  formStep3Desc: string;
  formStep4: string;
  formStep4Desc: string;

  // Form Fields
  applicantName: string;
  applicantNamePlaceholder: string;
  contactNumber: string;
  state: string;
  selectState: string;
  district: string;
  selectDistrict: string;
  blockOrTehsil: string;
  blockPlaceholder: string;
  villageOrTown: string;
  villagePlaceholder: string;
  localityType: string;
  localityRural: string;
  localitySemiUrban: string;
  localityUrban: string;
  
  businessCategory: string;
  selectCategory: string;
  businessTitle: string;
  businessTitlePlaceholder: string;
  businessDescription: string;
  businessDescPlaceholder: string;
  unitType: string;
  unitNew: string;
  unitExpansion: string;

  availableCapital: string;
  availableCapitalHint: string;
  estimatedCost: string;
  estimatedCostHint: string;
  expectedMonthlyRevenue: string;

  socialCategory: string;
  catGeneral: string;
  catOBC: string;
  catSC: string;
  catST: string;
  catMinority: string;

  specialCategory: string;
  specNone: string;
  specWomen: string;
  specDivyangjan: string;
  specExServiceman: string;
  specYouth: string;

  education: string;
  eduBelow8th: string;
  eduPass8th: string;
  eduPass10th12th: string;
  eduGraduate: string;

  priorExperience: string;
  edpTraining: string;
  yes: string;
  no: string;

  // Action buttons
  submitButton: string;
  submittingText: string;
  resetButton: string;
  downloadPdfButton: string;
  printReportButton: string;
  simulateButton: string;
  askAdvisorButton: string;
  backToForm: string;

  // Report Section
  reportHeading: string;
  reportSubheading: string;
  feasibilityScore: string;
  verdict: string;
  capitalBreakdown: string;
  promoterShare: string;
  govtSubsidy: string;
  netLoanRequired: string;
  monthlyEmi: string;
  estimatedProfit: string;
  breakEven: string;
  marketAnalysis: string;
  swotAnalysis: string;
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  recommendedSchemes: string;
  subsidyRate: string;
  maxSubsidy: string;
  applyOnPortal: string;
  roadmap: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'GramUdyog AI',
    appSubtitle: 'Rural Enterprise & Scheme Feasibility Platform',
    tagline: 'Empowering Village Entrepreneurs with Hyper-Local Market Insights & Government Subsidies',
    badgeGovtApproved: 'Verified Indian MSME & KVIC Scheme Engine 2026',

    navEvaluation: 'Feasibility Engine',
    navSchemes: 'Govt Schemes',
    navAdvisor: 'AI Advisor',
    navCompare: 'Compare Ideas',
    navSimulator: 'What-If Simulator',
    supabaseConnected: 'Supabase Cloud Connected',
    supabaseLocal: 'Local Offline Cache Mode',
    connectSupabase: 'Configure Supabase',

    formStep1: '1. Location & Locality',
    formStep1Desc: 'Rural locations qualify for up to 35% government subsidies.',
    formStep2: '2. Proposed Business Idea',
    formStep2Desc: 'Choose your venture sector and specific operational scale.',
    formStep3: '3. Capital & Financial Capacity',
    formStep3Desc: 'Estimate your savings and target setup investment.',
    formStep4: '4. Social Category & Background',
    formStep4Desc: 'Special categories enjoy lower margin money and higher grant quotas.',

    applicantName: 'Applicant / Entrepreneur Name',
    applicantNamePlaceholder: 'e.g. Ramesh Kumar Patel',
    contactNumber: 'Mobile Number (Optional)',
    state: 'State',
    selectState: 'Select State...',
    district: 'District',
    selectDistrict: 'Select District...',
    blockOrTehsil: 'Block / Tehsil / Taluka',
    blockPlaceholder: 'e.g. Haveli / Baramati',
    villageOrTown: 'Village / Gram Panchayat Name',
    villagePlaceholder: 'e.g. Shivnagar Village',
    localityType: 'Locality Type',
    localityRural: 'Rural (Village / Gram Panchayat - Up to 35% Subsidy)',
    localitySemiUrban: 'Semi-Urban (Town perimeter)',
    localityUrban: 'Urban / Municipal Council',

    businessCategory: 'Business Sector',
    selectCategory: 'Select Business Category...',
    businessTitle: 'Business Project Name',
    businessTitlePlaceholder: 'e.g. 10 Cow Dairy Unit with Chilling Center',
    businessDescription: 'Brief Description of Operations',
    businessDescPlaceholder: 'Describe what you will produce, machinery to purchase, and target customers...',
    unitType: 'Enterprise Type',
    unitNew: 'New Enterprise (Greenfield - Eligible for PMEGP)',
    unitExpansion: 'Existing Enterprise Expansion',

    availableCapital: 'Your Available Capital / Own Savings (₹)',
    availableCapitalHint: 'Amount of money you can personally invest without loans.',
    estimatedCost: 'Target Total Project Setup Cost (₹)',
    estimatedCostHint: 'Includes machinery, shed/shop, and initial working capital.',
    expectedMonthlyRevenue: 'Expected Monthly Turnover (₹ - Optional)',

    socialCategory: 'Social Category',
    catGeneral: 'General Category',
    catOBC: 'Other Backward Classes (OBC)',
    catSC: 'Scheduled Caste (SC)',
    catST: 'Scheduled Tribe (ST)',
    catMinority: 'Minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',

    specialCategory: 'Special Category Status',
    specNone: 'None of the below',
    specWomen: 'Women Entrepreneur (Higher Subsidy Quota)',
    specDivyangjan: 'Specially Abled (Divyangjan)',
    specExServiceman: 'Ex-Servicemen',
    specYouth: 'Rural Youth / Transgender',

    education: 'Highest Educational Qualification',
    eduBelow8th: 'Below 8th Standard',
    eduPass8th: '8th Standard Pass (PMEGP > ₹10L Eligible)',
    eduPass10th12th: '10th / 12th Pass',
    eduGraduate: 'Graduate / ITI / Diploma Holder',

    priorExperience: 'Prior Experience in this Trade?',
    edpTraining: 'Completed EDP / RSETI Skill Training?',
    yes: 'Yes',
    no: 'No',

    submitButton: 'Analyze Feasibility & Scrape Govt Schemes',
    submittingText: 'Scraping Portals & Generating Feasibility DPR...',
    resetButton: 'Reset Form',
    downloadPdfButton: 'Download PDF Report',
    printReportButton: 'Print DPR',
    simulateButton: 'What-If Simulator',
    askAdvisorButton: 'Chat with AI Advisor',
    backToForm: 'Back to Form Input',

    reportHeading: 'Detailed Business Feasibility & Scheme Report',
    reportSubheading: 'Bankable Project Feasibility Assessment for Rural Entrepreneurship',
    feasibilityScore: 'Overall Feasibility Score',
    verdict: 'Assessment Verdict',
    capitalBreakdown: 'Capital & Subsidy Structure',
    promoterShare: 'Your Required Share (Promoter Equity)',
    govtSubsidy: 'Eligible Government Subsidy',
    netLoanRequired: 'Estimated Net Bank Loan',
    monthlyEmi: 'Estimated Monthly Bank EMI',
    estimatedProfit: 'Projected Net Monthly Profit',
    breakEven: 'Estimated Break-Even Horizon',
    marketAnalysis: 'Hyper-Local Market & Competitor Analysis',
    swotAnalysis: 'SWOT Analysis',
    strengths: 'Strengths',
    weaknesses: 'Weaknesses',
    opportunities: 'Opportunities',
    threats: 'Threats & Risks',
    recommendedSchemes: 'Matched Government Loan Schemes',
    subsidyRate: 'Subsidy Rate',
    maxSubsidy: 'Max Subsidy Available',
    applyOnPortal: 'Open Official Portal',
    roadmap: 'Step-by-Step Implementation Roadmap'
  },

  hi: {
    appTitle: 'ग्रामउद्योग AI',
    appSubtitle: 'ग्रामीण उद्यम एवं सरकारी योजना व्यवहार्यता मंच',
    tagline: 'गाँव के उद्यमियों को स्थानीय बाजार विश्लेषण और सरकारी सब्सिडी से सशक्त बनाना',
    badgeGovtApproved: 'सत्यापित भारत सरकार MSME एवं KVIC योजना इंजन 2026',

    navEvaluation: 'व्यवहार्यता इंजन',
    navSchemes: 'सरकारी योजनाएं',
    navAdvisor: 'AI व्यापार सलाहकार',
    navCompare: 'व्यवसाय तुलना',
    navSimulator: 'संभावना सिम्युलेटर',
    supabaseConnected: 'सुपाबेस क्लाउड कनेक्टेड',
    supabaseLocal: 'लोकल ऑफलाइन मोड',
    connectSupabase: 'सुपाबेस सेटिंग्स',

    formStep1: '१. स्थान एवं इलाका',
    formStep1Desc: 'ग्रामीण इलाकों के लिए 35% तक सरकारी सब्सिडी उपलब्ध है।',
    formStep2: '२. प्रस्तावित व्यवसाय विचार',
    formStep2Desc: 'अपने उद्योग का क्षेत्र और व्यावसायिक पैमाना चुनें।',
    formStep3: '३. पूंजी एवं वित्तीय क्षमता',
    formStep3Desc: 'अपनी उपलब्ध बचत और कुल अनुमानित लागत दर्ज करें।',
    formStep4: '४. सामाजिक श्रेणी एवं पृष्ठभूमि',
    formStep4Desc: 'विशेष श्रेणियों को कम मार्जिन और अधिक सब्सिडी का लाभ मिलता है।',

    applicantName: 'आवेदक / उद्यमी का नाम',
    applicantNamePlaceholder: 'उदा. रमेश कुमार पटेल',
    contactNumber: 'मोबाइल नंबर (वैकल्पिक)',
    state: 'राज्य',
    selectState: 'राज्य चुनें...',
    district: 'जिला',
    selectDistrict: 'जिला चुनें...',
    blockOrTehsil: 'ब्लॉक / तहसील / तालुका',
    blockPlaceholder: 'उदा. हवेली / बारामती',
    villageOrTown: 'गाँव / ग्राम पंचायत का नाम',
    villagePlaceholder: 'उदा. शिवनगर गाँव',
    localityType: 'इलाके का प्रकार',
    localityRural: 'ग्रामीण (गाँव/ग्राम पंचायत - 35% तक सब्सिडी)',
    localitySemiUrban: 'अर्ध-शहरी (कस्बा)',
    localityUrban: 'शहरी क्षेत्र',

    businessCategory: 'व्यवसाय क्षेत्र',
    selectCategory: 'व्यवसाय क्षेत्र चुनें...',
    businessTitle: 'व्यवसाय परियोजना का नाम',
    businessTitlePlaceholder: 'उदा. 10 गायों का आधुनिक डेयरी फार्म एवं चिलिंग सेंटर',
    businessDescription: 'व्यवसाय का संक्षिप्त विवरण',
    businessDescPlaceholder: 'मशीनरी, उत्पाद और ग्राहकों का विवरण दें...',
    unitType: 'उद्यम का प्रकार',
    unitNew: 'नया उद्यम (PMEGP सब्सिडी के लिए पात्र)',
    unitExpansion: 'मौजूदा इकाई का विस्तार',

    availableCapital: 'आपकी उपलब्ध स्वयं की बचत / पूंजी (₹)',
    availableCapitalHint: 'वह राशि जो आप बिना ऋण के स्वयं लगा सकते हैं।',
    estimatedCost: 'परियोजना की कुल अनुमानित लागत (₹)',
    estimatedCostHint: 'मशीनरी, शेड और कार्यशील पूंजी सहित।',
    expectedMonthlyRevenue: 'अनुमानित मासिक बिक्री (₹ - वैकल्पिक)',

    socialCategory: 'सामाजिक श्रेणी (Caste/Category)',
    catGeneral: 'सामान्य वर्ग (General)',
    catOBC: 'अन्य पिछड़ा वर्ग (OBC)',
    catSC: 'अनुसूचित जाति (SC)',
    catST: 'अनुसूचित जनजाति (ST)',
    catMinority: 'अल्पसंख्यक (मुस्लिम, सिख, ईसाई, बौद्ध, जैन)',

    specialCategory: 'विशेष श्रेणी दर्जा',
    specNone: 'उपरोक्त में से कोई नहीं',
    specWomen: 'महिला उद्यमी (विशेष सब्सिडी कोटा)',
    specDivyangjan: 'दिव्यांगजन',
    specExServiceman: 'भूतपूर्व सैनिक',
    specYouth: 'ग्रामीण युवा',

    education: 'शैक्षणिक योग्यता',
    eduBelow8th: '8वीं से कम',
    eduPass8th: '8वीं उत्तीर्ण (10 लाख से अधिक विनिर्माण के लिए पात्र)',
    eduPass10th12th: '10वीं / 12वीं उत्तीर्ण',
    eduGraduate: 'स्नातक / ITI / डिप्लोमा',

    priorExperience: 'क्या इस कार्य का पूर्व अनुभव है?',
    edpTraining: 'क्या EDP / RSETI प्रशिक्षण पूरा किया है?',
    yes: 'हाँ',
    no: 'नहीं',

    submitButton: 'व्यवहार्यता जांचें और सरकारी योजनाएं खोजें',
    submittingText: 'पोर्टल खोज और रिपोर्ट तैयार की जा रही है...',
    resetButton: 'फॉर्म रीसेट करें',
    downloadPdfButton: 'PDF रिपोर्ट डाउनलोड करें',
    printReportButton: 'प्रिंट DPR',
    simulateButton: 'व्हाट-इफ सिम्युलेटर',
    askAdvisorButton: 'AI सलाहकार से पूछें',
    backToForm: 'फॉर्म पर वापस जाएं',

    reportHeading: 'विस्तृत व्यापार व्यवहार्यता एवं योजना रिपोर्ट',
    reportSubheading: 'ग्रामीण उद्यमिता के लिए बैंक-स्वीकृत परियोजना रिपोर्ट (DPR)',
    feasibilityScore: 'समग्र व्यवहार्यता स्कोर',
    verdict: 'मूल्यांकन निष्कर्ष',
    capitalBreakdown: 'पूंजी एवं सरकारी सब्सिडी संरचना',
    promoterShare: 'आपकी स्वयं की देय राशि (प्रमोटर इक्विटी)',
    govtSubsidy: 'अनुमानित सरकारी सब्सिडी (छूट)',
    netLoanRequired: 'अनुमानित बैंक ऋण आवश्यकता',
    monthlyEmi: 'अनुमानित मासिक बैंक EMI',
    estimatedProfit: 'अनुमानित शुद्ध मासिक लाभ',
    breakEven: 'लागत वसूली का समय (Break-Even)',
    marketAnalysis: 'स्थानीय बाजार एवं प्रतिस्पर्धी विश्लेषण',
    swotAnalysis: 'SWOT विश्लेषण',
    strengths: 'शक्तियाँ (Strengths)',
    weaknesses: 'कमजोरियाँ (Weaknesses)',
    opportunities: 'अवसर (Opportunities)',
    threats: 'जोखिम एवं चुनौतियाँ (Threats)',
    recommendedSchemes: 'अनुकूल सरकारी ऋण योजनाएं',
    subsidyRate: 'सब्सिडी दर',
    maxSubsidy: 'अधिकतम उपलब्ध सब्सिडी',
    applyOnPortal: 'आधिकारिक पोर्टल खोलें',
    roadmap: 'चरणबद्ध क्रियान्वयन योजना'
  },

  mr: {
    appTitle: 'ग्रामउद्योग AI',
    appSubtitle: 'ग्रामीण व्यवसाय व सरकारी योजना सुसाध्यता मंच',
    tagline: 'ग्रामीण उद्योजकांना स्थानिक बाजार विश्लेषण आणि सरकारी अनुदानाने सक्षम करणे',
    badgeGovtApproved: 'प्रमाणित भारत सरकार MSME व KVIC योजना इंजिन २०२६',

    navEvaluation: 'व्यवसाय मूल्यमापन',
    navSchemes: 'सरकारी योजना',
    navAdvisor: 'AI सल्लागार',
    navCompare: 'व्यवसाय तुलना',
    navSimulator: 'सिम्युलेटर',
    supabaseConnected: 'सुपाबेस क्लाउड जोडले आहे',
    supabaseLocal: 'स्थानिक ऑफलाइन मोड',
    connectSupabase: 'सुपाबेस सेटिंग्ज',

    formStep1: '१. स्थान आणि परिसर',
    formStep1Desc: 'ग्रामीण भागासाठी ३५% पर्यंत सरकारी अनुदान उपलब्ध आहे.',
    formStep2: '२. नियोजित व्यवसाय कल्पना',
    formStep2Desc: 'आपल्या उद्योगाचे क्षेत्र आणि कामाचे स्वरूप निवडा.',
    formStep3: '३. भांडवल आणि आर्थिक क्षमता',
    formStep3Desc: 'स्वतःची बचत आणि एकूण अंदाजित खर्च भरा.',
    formStep4: '४. सामाजिक प्रवर्ग आणि पार्श्वभूमी',
    formStep4Desc: 'विशेष प्रवर्गासाठी कमी स्व-भांडवल आणि जास्त अनुदान मिळते.',

    applicantName: 'अर्जदार / उद्योजकाचे नाव',
    applicantNamePlaceholder: 'उदा. रमेश शांताराम पाटील',
    contactNumber: 'मोबाईल नंबर (ऐच्छिक)',
    state: 'राज्य',
    selectState: 'राज्य निवडा...',
    district: 'जिल्हा',
    selectDistrict: 'जिल्हा निवडा...',
    blockOrTehsil: 'तालुका / ब्लॉक',
    blockPlaceholder: 'उदा. हवेली / बारामती / जुन्नर',
    villageOrTown: 'गाव / ग्रामपंचायत नाव',
    villagePlaceholder: 'उदा. शिवनगर गाव',
    localityType: 'भागाचा प्रकार',
    localityRural: 'ग्रामीण (गाव/ग्रामपंचायत - ३५% पर्यंत अनुदान)',
    localitySemiUrban: 'निम-शहरी (कस्बा)',
    localityUrban: 'शहरी भाग',

    businessCategory: 'व्यवसाय क्षेत्र',
    selectCategory: 'व्यवसाय क्षेत्र निवडा...',
    businessTitle: 'व्यवसाय प्रकल्पाचे नाव',
    businessTitlePlaceholder: 'उदा. १० गाईंचा आधुनिक दुग्ध व्यवसाय आणि चिलिंग युनिट',
    businessDescription: 'व्यवसायाचे संक्षिप्त वर्णन',
    businessDescPlaceholder: 'मशिनरी, उत्पादन आणि स्थानिक ग्राहकांविषयी माहिती द्या...',
    unitType: 'उद्योगाचा प्रकार',
    unitNew: 'नवीन उद्योग (PMEGP अनुदानासाठी पात्र)',
    unitExpansion: 'विद्यमान उद्योगाचा विस्तार',

    availableCapital: 'तुमचे उपलब्ध स्वतःचे भांडवल / बचत (₹)',
    availableCapitalHint: 'कर्जाशिवाय तुम्ही स्वतः गुंतवू शकणारी रक्कम.',
    estimatedCost: 'प्रकल्पाचा एकूण अंदाजित खर्च (₹)',
    estimatedCostHint: 'मशिनरी, शेड आणि खेळत्या भांडवलासह.',
    expectedMonthlyRevenue: 'अपेक्षित मासिक विक्री (₹ - ऐच्छिक)',

    socialCategory: 'सामाजिक प्रवर्ग',
    catGeneral: 'खुला प्रवर्ग (General)',
    catOBC: 'इतर मागासवर्गीय (OBC)',
    catSC: 'अनुसूचित जाती (SC)',
    catST: 'अनुसूचित जमाती (ST)',
    catMinority: 'अल्पसंख्याक प्रवर्ग',

    specialCategory: 'विशेष प्रवर्ग दर्जा',
    specNone: 'यांपैकी काहीही नाही',
    specWomen: 'महिला उद्योजक (जास्त अनुदान कोटा)',
    specDivyangjan: 'दिव्यांग व्यक्ती',
    specExServiceman: 'माजी सैनिक',
    specYouth: 'ग्रामीण युवक',

    education: 'सर्वोच्च शिक्षण',
    eduBelow8th: '८ वी पेक्षा कमी',
    eduPass8th: '८ वी उत्तीर्ण (PMEGP १० लाखांपेक्षा जास्त पात्र)',
    eduPass10th12th: '१० वी / १२ वी उत्तीर्ण',
    eduGraduate: 'पदवीधर / ITI / डिप्लोमा',

    priorExperience: 'या कामाचा आधीचा अनुभव आहे का?',
    edpTraining: 'EDP / RSETI कौशल्य प्रशिक्षण पूर्ण केले आहे का?',
    yes: 'होय',
    no: 'नाही',

    submitButton: 'व्यवहार्यता तपासा आणि सरकारी योजना शोधा',
    submittingText: 'पोर्टल शोधणे आणि अहवाल तयार करणे सुरू आहे...',
    resetButton: 'फॉर्म रीसेट करा',
    downloadPdfButton: 'PDF अहवाल डाउनलोड करा',
    printReportButton: 'DPR प्रिंट करा',
    simulateButton: 'सिम्युलेटर चालवा',
    askAdvisorButton: 'AI सल्लागाराशी चर्चा करा',
    backToForm: 'फॉर्मवर परत जा',

    reportHeading: 'सविस्तर व्यवसाय व्यवहार्यता व योजना अहवाल',
    reportSubheading: 'ग्रामीण उद्योजकतेसाठी बँक-मान्य प्रकल्प अहवाल (DPR)',
    feasibilityScore: 'एकूण व्यवहार्यता स्कोअर',
    verdict: 'मूल्यांकन निष्कर्ष',
    capitalBreakdown: 'भांडवल आणि सरकारी अनुदान रचना',
    promoterShare: 'तुमचा स्वतःचा वाटा (प्रमोटर इक्विटी)',
    govtSubsidy: 'पात्र सरकारी अनुदान (सबसिडी)',
    netLoanRequired: 'अंदाजित बँक कर्ज आवश्यकता',
    monthlyEmi: 'अंदाजित मासिक बँक हप्ता (EMI)',
    estimatedProfit: 'अंदाजित निव्वळ मासिक नफा',
    breakEven: 'गुंतवणूक परतफेडीचा कालावधी',
    marketAnalysis: 'स्थानिक बाजार आणि स्पर्धक विश्लेषण',
    swotAnalysis: 'SWOT विश्लेषण',
    strengths: 'सामर्थ्ये (Strengths)',
    weaknesses: 'उणिवा (Weaknesses)',
    opportunities: 'संधी (Opportunities)',
    threats: 'धोके आणि आव्हाने (Threats)',
    recommendedSchemes: 'शिफारस केलेल्या सरकारी कर्ज योजना',
    subsidyRate: 'अनुदान दर',
    maxSubsidy: 'कमाल उपलब्ध अनुदान',
    applyOnPortal: 'अधिकृत पोर्टल उघडा',
    roadmap: 'टप्प्याटप्प्याने अंमलबजावणी आराखडा'
  }
};
