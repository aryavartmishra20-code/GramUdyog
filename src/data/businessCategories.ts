export interface BusinessTemplate {
  id: string;
  category: string;
  title: string;
  description: string;
  typicalInvestmentMin: number;
  typicalInvestmentMax: number;
  typicalMarginPercent: number; // e.g., 25%
  breakEvenMonthsTypical: number;
  machineryRequired: string[];
  rawMaterials: string[];
  keyCustomerSegments: string[];
  swotDefaults: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  pricingAdvice: string;
}

export const BUSINESS_CATEGORIES: string[] = [
  'Dairy & Animal Husbandry',
  'Food Processing & Milling',
  'Textiles, Apparel & Handloom',
  'Agriculture & Allied Services',
  'Rural Retail & Haat Trading',
  'Handicraft, Pottery & Woodwork',
  'Renewable Energy & Solar Kiosks',
  'Automotive & Machinery Repair'
];

export const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  {
    id: 'dairy_farming',
    category: 'Dairy & Animal Husbandry',
    title: 'Commercial Dairy Farming (10 Crossbred / Murrah Cattle)',
    description: 'Setting up a modern dairy farm with automated milking equipment, vermicompost pit, and direct tie-ups with local milk collection centers and sweet makers.',
    typicalInvestmentMin: 350000,
    typicalInvestmentMax: 1000000,
    typicalMarginPercent: 28,
    breakEvenMonthsTypical: 14,
    machineryRequired: ['Milking machine', 'Chaff cutter', 'Bulk milk cooler (BMC)', 'Cow mats & Shed infrastructure', 'Water pump & tanks'],
    rawMaterials: ['Green fodder (Hybrid Napier/Maize)', 'Dry fodder', 'Cattle feed concentrates', 'Veterinary care & mineral mixtures'],
    keyCustomerSegments: ['Local Milk Cooperatives (Amul/Mother Dairy/Verka)', 'Sweet shops & restaurants', 'Direct village households', 'Weekly village haats'],
    swotDefaults: {
      strengths: ['Year-round daily cash flow', 'Guaranteed local demand for pure milk', 'Valuable organic byproduct (cow dung & urine for vermicompost)'],
      weaknesses: ['Demands 24/7 labor and monitoring', 'Susceptible to cattle diseases if biosecurity is poor', 'Fluctuation in green fodder availability during dry summer'],
      opportunities: ['Value addition into Ghee, Paneer, Curd & Khoya doubles margins', 'NABARD / AHIDF subsidy of 3% interest subvention and PMEGP 35% subsidy', 'Supplying to nearby peri-urban towns at premium price'],
      threats: ['Sudden price spikes in commercial cattle feed concentrates', 'Disease outbreak (Lumpy Skin / FMD) if vaccination schedule is skipped', 'Local unorganized milk collectors delaying weekly payouts']
    },
    pricingAdvice: 'Price raw buffalo/cow milk competitively at ₹45–₹65/litre based on fat/SNF content. Reserve 20% milk for high-margin Paneer (₹320–₹380/kg) and Ghee (₹750–₹900/kg) during festival seasons.'
  },
  {
    id: 'flour_spice_mill',
    category: 'Food Processing & Milling',
    title: 'Mini Flour Mill (Atta Chakki), Masala & Besan Grinding Unit',
    description: 'A multi-grain pulverizer unit catering to village households, local dhabas, and nearby weekly markets for fresh wheat flour, chili, turmeric, and besan packaging.',
    typicalInvestmentMin: 200000,
    typicalInvestmentMax: 600000,
    typicalMarginPercent: 32,
    breakEvenMonthsTypical: 10,
    machineryRequired: ['Heavy-duty 10 HP Commercial Pulverizer', 'Spice Grinder / Hammer Mill', 'Grain Cleaner & Destoner', 'Digital Weighing Scale & Pouch Sealing Machine'],
    rawMaterials: ['Local whole wheat grains', 'Whole dried red chilies, turmeric fingers, coriander seeds', 'Food-grade packaging pouches'],
    keyCustomerSegments: ['Village households (custom milling service)', 'Kirana grocery stores', 'Rural wedding caterers & dhabas', 'Nearby primary school mid-day meal providers'],
    swotDefaults: {
      strengths: ['Essential staple consumption that never declines in recessions', 'Dual income: Job-work processing fees + self-branded retail packaged flour/spices', 'Low perishable waste compared to raw produce'],
      weaknesses: ['High dependency on reliable 3-phase rural power supply', 'Dust and noise pollution require appropriate ventilation and layout', 'Seasonal wheat harvest storage capital requirement'],
      opportunities: ['PMFME scheme offers 35% credit-linked capital subsidy up to ₹10 Lakhs', 'Packaging multigrain diet flours (Ragi, Jowar, Bajra) for health-conscious rural & town customers', 'Doorstep delivery subscriptions for 10-20kg bags'],
      threats: ['Power outages causing production delays if backup generator/solar is absent', 'Competition from cheap adulterated packet spices from national brands', 'High humidity damaging stored grain during monsoon months']
    },
    pricingAdvice: 'Job-work milling: ₹3–₹5 per kg for wheat, ₹15–₹25 per kg for spices. Packaged unadulterated whole wheat flour: ₹36–₹42/kg. Packaged pure turmeric & chili powder: 35-40% gross margin.'
  },
  {
    id: 'poultry_broiler',
    category: 'Dairy & Animal Husbandry',
    title: 'Broiler Poultry & Desi / Kadaknath Bird Farm (1000-2000 Birds)',
    description: 'Semi-automated environment-controlled poultry shed for broiler meat and high-value free-range indigenous poultry (Aseel / Kadaknath / Sonali).',
    typicalInvestmentMin: 250000,
    typicalInvestmentMax: 750000,
    typicalMarginPercent: 24,
    breakEvenMonthsTypical: 12,
    machineryRequired: ['Prefabricated shed with wire mesh', 'Automatic nipple drinkers & bell feeders', 'Foggers and curtain management system', 'Brooder heaters & solar power backup'],
    rawMaterials: ['Day-old chicks (DOC)', 'Starter, Grower, and Finisher poultry feed', 'Vaccines and bio-security disinfectants', 'Paddy husk or sawdust bedding'],
    keyCustomerSegments: ['Wholesale poultry traders and chicken butchers', 'Local weekly haats and bazaar stalls', 'Restaurants and roadside dhabas', 'Direct retail meat counter'],
    swotDefaults: {
      strengths: ['Fast turnover cycle: Broiler batches ready in 35-42 days', 'Desi chicken commands 2.5x higher market price in rural and semi-urban markets', 'High demand protein source with year-round consumption'],
      weaknesses: ['High mortality risk if temperatures fluctuate drastically', 'High initial feed costs account for 65-70% of operational expenditure', 'Odor management requires isolation from dense residential huts'],
      opportunities: ['Direct integration with poultry aggregators or contract farming to hedge price volatility', 'Animal Husbandry Infrastructure Development Fund (AHIDF) subsidy and interest subvention', 'Sale of rich poultry manure as organic fertilizer for vegetable farmers'],
      threats: ['Avian flu rumors causing temporary market price drops', 'Extreme summer heat waves causing bird mortality', 'Sharp spikes in maize and soymeal ingredient costs']
    },
    pricingAdvice: 'Target broiler production cost under ₹85–₹95 per kg live weight. Wholesale selling price ₹110–₹135/kg. For Kadaknath/Desi birds, retail live birds at ₹350–₹500 each.'
  },
  {
    id: 'tailoring_boutique',
    category: 'Textiles, Apparel & Handloom',
    title: 'Rural Garment Stitching, Embroidery & School Uniform Unit',
    description: 'A cluster sewing and tailoring workshop employing local rural women to stitch school uniforms, bridal wear, readymade kurtis, and agricultural work-wear.',
    typicalInvestmentMin: 120000,
    typicalInvestmentMax: 450000,
    typicalMarginPercent: 40,
    breakEvenMonthsTypical: 8,
    machineryRequired: ['High-speed industrial sewing machines (Jack / Juki)', 'Overlock 5-thread machine', 'Computerized single-head embroidery machine', 'Heavy steam iron and cutting table'],
    rawMaterials: ['Bulk cotton, synthetic and poly-cotton fabrics', 'Threads, zippers, buttons, elastic, interfacing canvas', 'Packaging polybags and brand labels'],
    keyCustomerSegments: ['Local private and government schools for uniform contracts', 'Village brides and women for festive custom lehengas and blouses', 'Local readymade clothing retailers', 'Panchayat and SHG groups'],
    swotDefaults: {
      strengths: ['High profit margins (35-50%) on custom tailoring and alterations', 'Low initial machinery depreciation and minimal electricity consumption', 'Empowers local rural women and Self-Help Groups (SHGs)'],
      weaknesses: ['Highly seasonal: peak revenue during school reopening (April-July) and wedding season (Nov-Feb)', 'Dependent on skilled stitchers and master cutters', 'Changes in fashion preferences require continuous learning'],
      opportunities: ['PM Vishwakarma scheme offers ₹15,000 toolkit voucher + collateral-free loan up to ₹3 Lakh @ 5% interest', 'PMEGP scheme 35% subsidy for rural women entrepreneurs', 'Bulk uniform supply contracts with surrounding village schools and health clinics'],
      threats: ['Arrival of cheap mass-produced synthetic readymade clothes from major city wholesale markets', 'Skilled tailors moving to nearby towns for factory employment', 'Late payments from institutional bulk buyers']
    },
    pricingAdvice: 'Custom blouse stitching: ₹180–₹350 (standard to designer). School uniform set: ₹450–₹650 with 35% net margin. Kurti stitching: ₹220–₹400.'
  },
  {
    id: 'oil_extraction',
    category: 'Food Processing & Milling',
    title: 'Cold Pressed Wood-Churn (Kachi Ghani) Edible Oil Extraction Unit',
    description: 'Pure cold-pressed oil extraction (Mustard / Groundnut / Sesame / Sunflower) using traditional wooden rotators (Lakdi Ghani) preserving natural nutrients, aroma and purity.',
    typicalInvestmentMin: 280000,
    typicalInvestmentMax: 850000,
    typicalMarginPercent: 30,
    breakEvenMonthsTypical: 11,
    machineryRequired: ['2 x Wooden Cold Press Ghani Machines (Lakdi Ghani)', 'Seed cleaner and filter press', 'Oil storage food-grade SS tanks', 'Automatic bottle filling and capping unit'],
    rawMaterials: ['Raw oilseeds (Mustard seeds, shelled groundnuts, sesame seeds, sunflower)', 'PET bottles (500ml, 1L, 5L) and tin cans', 'Printed labels with FSSAI & nutrition facts'],
    keyCustomerSegments: ['Health-conscious families in the village and neighboring towns', 'Local grocery stores and sweet vendors', 'Cattle owners purchasing nutrient-rich oil cake (Khal / Khali)', 'Direct-to-consumer rural doorstep delivery'],
    swotDefaults: {
      strengths: ['Huge consumer shift towards authentic cold-pressed oils away from refined chemical oils', 'Dual revenue: Premium edible oil + Oil cake byproduct sold at high rates as prime cattle feed', 'Locally procured raw seeds keep transportation logistics minimal'],
      weaknesses: ['Working capital tied up in buying oilseeds in bulk during harvest season', 'Extraction yield is lower (35-42%) compared to chemical solvent extraction', 'Regular wooden pestle maintenance needed every 12-18 months'],
      opportunities: ['PMFME 35% government subsidy up to ₹10 Lakhs', 'Selling packaged branded oil to towns within a 30 km radius at 40% premium', 'FSSAI certified rural brand creates immense trust'],
      threats: ['Crop failure of oilseeds due to drought driving raw material prices sky-high', 'Unscrupulous competitors blending cheap palm oil to undercut prices', 'Power fluctuations in rural grid']
    },
    pricingAdvice: 'Cold pressed mustard oil: ₹180–₹220/litre (30% margin). Cold pressed groundnut oil: ₹240–₹290/litre. Oil cake (Khal): ₹28–₹35/kg sold immediately to local dairy farmers for instant cash flow!'
  },
  {
    id: 'mushroom_cultivation',
    category: 'Agriculture & Allied Services',
    title: 'Oyster & Button Mushroom Indoor Cultivation & Drying Unit',
    description: 'High-yield indoor mushroom farming using agricultural straw waste, temperature-regulated dark rooms, and solar dehydrators for year-round harvesting.',
    typicalInvestmentMin: 100000,
    typicalInvestmentMax: 400000,
    typicalMarginPercent: 45,
    breakEvenMonthsTypical: 7,
    machineryRequired: ['Bamboo/bale racking structures in thatched or insulated room', 'Boiler / Steamer for straw sterilization', 'Humidifier / misting nozzles', 'Solar dehydrator for drying excess yield', 'Packaging sealer'],
    rawMaterials: ['Wheat / Paddy straw agricultural waste', 'High-quality certified mushroom spawn (seeds)', 'PP bags, calcium carbonate (gypsum), formalin disinfectant', 'Perforated plastic packaging trays'],
    keyCustomerSegments: ['Town vegetable markets and Mandi commission agents', 'Rural dhabas, marriage banquets, and restaurants', 'Dry mushroom buyers and Ayurvedic pharmaceutical vendors', 'Local village consumers seeking high-protein meat substitutes'],
    swotDefaults: {
      strengths: ['Requires very little land (can be set up in a 500 sq.ft spare room or thatched hut)', 'Fastest harvesting cycle in agriculture: first flush within 21-25 days!', 'Agricultural waste (paddy straw) utilized at near-zero raw material cost'],
      weaknesses: ['Perishable within 24-48 hours if not chilled or dehydrated', 'Requires strict hygiene to avoid green mold / fungal contamination', 'Summer temperature management can be challenging without cooling'],
      opportunities: ['Solar dehydrated dry mushrooms can be stored for 6 months and sold at ₹600–₹1,000/kg', 'National Horticulture Board (NHB) subsidies and PMEGP 35% subsidy', 'Supplying fresh protein rich food to local schools and anganwadis'],
      threats: ['Temperature exceeding 32°C in peak summer damaging spawn mycelium', 'Lack of quick transport to town mandis causing fresh spoilage', 'Contamination in spawn source']
    },
    pricingAdvice: 'Fresh oyster mushrooms: ₹100–₹150/kg (production cost ~₹40/kg). Dehydrated dry oyster mushrooms: ₹700–₹900/kg. High profit margin of 45-60%.'
  },
  {
    id: 'solar_agri_kiosk',
    category: 'Renewable Energy & Solar Kiosks',
    title: 'Solar Agri-Kiosk, Battery Recharging & Appliance Repair Service',
    description: 'Rural renewable power hub providing solar water pump maintenance, battery charging stations, inverter repair, and sales of solar streetlights and sprayers.',
    typicalInvestmentMin: 180000,
    typicalInvestmentMax: 550000,
    typicalMarginPercent: 35,
    breakEvenMonthsTypical: 9,
    machineryRequired: ['3 kW Solar Rooftop System with hybrid inverter', 'Battery charging and desulfation bench', 'Oscilloscope, multi-meters, soldering & rework station', 'Mobile service toolkit with ladders & drillers'],
    rawMaterials: ['Solar panels, charge controllers, solar sprayers', 'Replacement inverter circuit boards, capacitors, MOSFETs', 'Solar LED lanterns, DC fans, cables and connectors'],
    keyCustomerSegments: ['Farmers with PM KUSUM solar pumps needing repair', 'Rural homes and shops requiring solar inverters and backup power', 'Agricultural spray operators using electric knapsack sprayers', 'Gram Panchayats for solar street light maintenance'],
    swotDefaults: {
      strengths: ['Zero raw material perishability', 'Surging rural adoption of solar pumps and solar home lighting', 'High recurring service income and spare part markups'],
      weaknesses: ['Requires technical training and electronic troubleshooting skills', 'Capital investment in spare parts inventory', 'Customers expect on-site doorstep visits across multiple villages'],
      opportunities: ['Authorized service franchisee for top solar pump and inverter manufacturers', 'PM Surya Ghar & PM KUSUM government initiatives generating massive local installations', 'PMEGP 35% subsidy under Service Sector'],
      threats: ['Grid electricity reliability improvements temporarily reducing inverter sales', 'Low quality unbranded imported solar products flooding local market', 'Delays in getting OEM warranty replacement spares']
    },
    pricingAdvice: 'Service visit fee: ₹250–₹500 per visit. Annual Maintenance Contract (AMC) for farm solar pumps: ₹2,500/year. 20-30% margin on replacement batteries and solar spare parts.'
  },
  {
    id: 'agro_service_hardware',
    category: 'Automotive & Machinery Repair',
    title: 'Rural Tractor & Agro-Machinery Repair, Welding & Spare Parts Hub',
    description: 'A comprehensive workshop catering to tractors, rotavators, harvesters, submersible pumps, and electric sprayers with ARC welding and fabrication.',
    typicalInvestmentMin: 220000,
    typicalInvestmentMax: 650000,
    typicalMarginPercent: 38,
    breakEvenMonthsTypical: 10,
    machineryRequired: ['Heavy-duty ARC and MIG Welding machines', 'Air compressor and pneumatic impact wrenches', 'Hydraulic jack (20 Ton) and pullers', 'Bench grinder and drill press', 'Lath machine / turning attachment'],
    rawMaterials: ['Welding rods, cut-off wheels, tractor oils and lubricants (engine/hydraulic/gear oil)', 'Common fast-moving tractor filters, belts, bearings, hoses and pins'],
    keyCustomerSegments: ['Tractor and power tiller owners in 10-15 neighboring villages', 'Harvester combine operators during harvest seasons', 'Tube-well farmers needing motor repairs', 'Construction site tractors and trolleys'],
    swotDefaults: {
      strengths: ['Farmers cannot wait days for tractor repairs during sowing and harvesting seasons; local proximity is king', 'High labor margins on fabrication and welding repairs', 'Repeat loyal customer base built on trust and speedy service'],
      weaknesses: ['Demands physical labor and experienced mechanical knowledge', 'Seasonal surges during Rabi & Kharif harvesting followed by quieter intervals', 'Farmers often request credit until their crop is sold'],
      opportunities: ['Fabricating custom farm attachments (trolleys, cultivators, bund formers) with high margins', 'PM Vishwakarma tool grant & PMEGP loan scheme with 35% subsidy', 'Distributorship of branded agricultural lubricants and filters'],
      threats: ['Cash flow delays if farm credit recovery is poorly managed', 'Rapid introduction of computerized ECU sensors in new tractor models needing diagnostic scanners', 'Scrap steel price increases']
    },
    pricingAdvice: 'Daily mechanical labor charge: ₹600–₹1,200 per job. Welding repairs: ₹200–₹500. Lubricants & spares retail margin: 18-25%. Custom trolley fabrication: ₹20,000–₹35,000 net profit per unit.'
  }
];
