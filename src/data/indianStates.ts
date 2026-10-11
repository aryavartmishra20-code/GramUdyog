export interface StateDistrictMap {
  state: string;
  districts: string[];
  prominentClusters: string[];
}

export const INDIAN_STATES_DATA: StateDistrictMap[] = [
  {
    state: 'Maharashtra',
    districts: [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad (Chhatrapati Sambhajinagar)', 
      'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 
      'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 
      'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad (Dharashiv)', 
      'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 
      'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ],
    prominentClusters: ['Dairy & Sugarcane Processing', 'Cotton Ginning', 'Onion & Grape Agro-units', 'Handloom & Paithani Weaving', 'Poultry Farming']
  },
  {
    state: 'Uttar Pradesh',
    districts: [
      'Agra', 'Aligarh', 'Ayodhya', 'Azamgarh', 'Bareilly', 'Basti', 'Bijnor', 
      'Bulandshahr', 'Chandauli', 'Deoria', 'Etawah', 'Gorakhpur', 'Hardoi', 
      'Jaunpur', 'Jhansi', 'Kanpur Dehat', 'Lakhimpur Kheri', 'Mathura', 
      'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pratapgarh', 
      'Prayagraj', 'Rae Bareli', 'Saharanpur', 'Sitapur', 'Sultanpur', 'Varanasi'
    ],
    prominentClusters: ['Dairy & Milk Chilling', 'Flour & Pulse Mills', 'Brass & Metal Ware', 'Leather & Footwear', 'Pottery & Terracotta', 'Handloom Weaving']
  },
  {
    state: 'Madhya Pradesh',
    districts: [
      'Bhopal', 'Chhindwara', 'Dewas', 'Dhar', 'Gwalior', 'Hoshangabad (Narmadapuram)', 
      'Indore', 'Jabalpur', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 
      'Morena', 'Narsinghpur', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Ujjain'
    ],
    prominentClusters: ['Soybean & Mustard Oil Extraction', 'Wheat Milling', 'Dairy Farming', 'Medicinal Herb Processing', 'Handloom Chanderi & Maheshwari']
  },
  {
    state: 'Bihar',
    districts: [
      'Araria', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Darbhanga', 'Gaya', 
      'Gopalganj', 'Katihar', 'Madhubani', 'Muzaffarpur', 'Nalanda', 'Patna', 
      'Purnia', 'Rohtas', 'Samastipur', 'Saran', 'Siwan', 'Vaishali'
    ],
    prominentClusters: ['Makhana (Foxnut) Processing', 'Litchi & Honey Packaging', 'Dairy Cooperatives', 'Jute Handicrafts', 'Rice & Maize Mills']
  },
  {
    state: 'Rajasthan',
    districts: [
      'Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 
      'Bikaner', 'Chittorgarh', 'Churu', 'Dausa', 'Ganganagar', 'Hanumangarh', 
      'Jaipur', 'Jaisalmer', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Sikar', 'Udaipur'
    ],
    prominentClusters: ['Dairy & Camel Milk Units', 'Mustard Oil Mills', 'Spices & Cumin Processing', 'Handicraft & Marble Carving', 'Woolen Carpets']
  },
  {
    state: 'Gujarat',
    districts: [
      'Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 
      'Dahod', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Mehsana', 
      'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Vadodara'
    ],
    prominentClusters: ['Dairy Farming & Cold Chain', 'Groundnut Oil Milling', 'Cotton Textile & Diamond Polishing', 'Ceramic & Pottery', 'Solar Energy Installations']
  },
  {
    state: 'Karnataka',
    districts: [
      'Bagalkot', 'Belagavi', 'Ballari', 'Bidar', 'Chamarajanagar', 'Chikkamagaluru', 
      'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 
      'Hassan', 'Haveri', 'Kalaburagi', 'Mandya', 'Mysuru', 'Raichur', 'Shivamogga', 'Tumakuru', 'Vijayapura'
    ],
    prominentClusters: ['Silk Rearing & Reeling', 'Coffee & Spice Processing', 'Jaggery Production', 'Dairy & Cattle Breeding', 'Millets & Grain Processing']
  },
  {
    state: 'Tamil Nadu',
    districts: [
      'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 
      'Kanchipuram', 'Karur', 'Madurai', 'Nagapattinam', 'Namakkal', 'Perambalur', 
      'Pudukkottai', 'Ramanathapuram', 'Salem', 'Sivaganga', 'Thanjavur', 'Theni', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Vellore', 'Virudhunagar'
    ],
    prominentClusters: ['Poultry & Egg Production', 'Coir & Coconut Husk Processing', 'Powerloom & Apparel', 'Sago & Tapioca Processing', 'Dairy Farming']
  },
  {
    state: 'Punjab',
    districts: [
      'Amritsar', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Firozpur', 
      'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 
      'Moga', 'Muktsar', 'Patiala', 'Rupnagar', 'Sangrur', 'Tarn Taran'
    ],
    prominentClusters: ['High-Yield Dairy Farming', 'Agro-Machinery Repair & Fabrication', 'Food Processing & Flour Mills', 'Bee-keeping & Honey Extraction']
  },
  {
    state: 'Haryana',
    districts: [
      'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Fatehabad', 'Hisar', 'Jhajjar', 
      'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Palwal', 
      'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'
    ],
    prominentClusters: ['Murrah Buffalo Dairy Units', 'Handloom & Home Furnishing', 'Mushroom Farming', 'Mustard Milling & Cattle Feed']
  },
  {
    state: 'Odisha',
    districts: [
      'Balasore', 'Bhadrak', 'Cuttack', 'Ganjam', 'Jajpur', 'Kalahandi', 
      'Kendrapada', 'Keonjhar', 'Koraput', 'Mayurbhanj', 'Puri', 'Sambalpur', 'Sundargarh'
    ],
    prominentClusters: ['Pisciculture & Brackish Fish Farming', 'Cashew Nut Processing', 'Millet Value Addition', 'Bell Metal & Stone Carving', 'Poultry & Goat Rearing']
  },
  {
    state: 'West Bengal',
    districts: [
      'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Hooghly', 
      'Jalpaiguri', 'Jhargram', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 
      'Paschim Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas'
    ],
    prominentClusters: ['Jute Craft & Bags', 'Fish Seed Hatchery & Aquaculture', 'Mango & Food Pulping', 'Terracotta & Pottery', 'Dairy & Sweet Confectionery']
  },
  {
    state: 'Andhra Pradesh & Telangana',
    districts: [
      'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa', 'Krishna', 
      'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari',
      'Karimnagar', 'Khammam', 'Mahabubnagar', 'Medak', 'Nalgonda', 'Nizamabad', 'Warangal'
    ],
    prominentClusters: ['Chili & Turmeric Processing', 'Aquaculture & Shrimp Hatcheries', 'Dairy & Cattle Feed', 'Handloom Pochampally & Gadwal', 'Rice Milling']
  }
];

export const COMMON_VILLAGE_BLOCKS = [
  'Central Panchayat Block', 'Kisan Seva Kendra Circle', 'Gram Panchayat Block A',
  'Krishi Vigyan Kendra Area', 'Rural Haat / Mandi Perimeter', 'Cluster Industrial Zone'
];
