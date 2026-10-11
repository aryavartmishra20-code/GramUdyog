# GramUdyog AI (ग्रामउद्योग) 🌾
### GenAI-Powered Rural Enterprise Feasibility & Government Scheme Platform

GramUdyog is an intelligent, hyper-local web application that empowers aspiring rural Indian entrepreneurs to evaluate business opportunities, assess financial viability, and match with verified central and state government credit-linked capital subsidy schemes.

---

## 🚀 Key Features Built

### 1. Interactive Rural Business Evaluation Form
- **Hyper-Local Demographics**: Village, Gram Panchayat, Block/Tehsil, District, and State selection with rural cluster mapping.
- **Rural Priority Scoring**: Automatically detects rural vs urban locality (qualifying rural ventures for maximum **35% PMEGP subsidy**).
- **Social & Priority Category Quota**: Supports General, OBC, SC, ST, Minorities, Women Entrepreneurs, and Divyangjan with dynamic promoter equity adjustments (down to **5% margin money**).
- **1-Click Demo Presets**: Test instantly with real-world rural models (10-Cow Commercial Dairy, Atta Chakki & Spice Mill, Women Apparel Tailoring, Cold Pressed Oil Extraction).

### 2. Smart Government Scheme Scraper & Matcher
- **Live Scraping & Search Engine**: Real-time retrieval and matching across official portals (`myscheme.gov.in`, `kviconline.gov.in`, `mudra.org.in`, `pmfme.mofpi.gov.in`, `pmvishwakarma.gov.in`, `standupmitra.in`).
- **Deep Verified Scheme Matrix**:
  - **PMEGP**: Up to 35% margin money subsidy, ₹50 Lakh project limit, 5% promoter equity for special categories.
  - **PM MUDRA Yojana**: Shishu (up to ₹50k), Kishore (₹50k–₹5L), Tarun (₹5L–₹10L) with zero collateral.
  - **PMFME**: 35% credit-linked capital subsidy for micro food processing (up to ₹10 Lakhs).
  - **Stand-Up India**: Bank loans ₹10 Lakhs to ₹1 Crore for Women and SC/ST entrepreneurs.
  - **PM Vishwakarma**: Collateral-free loans up to ₹3 Lakhs @ 5% interest + ₹15,000 tool grant.
  - **AHIDF / NABARD**: 3% interest subvention for dairy, poultry, and animal husbandry units.
  - **State CMEGP Schemes**: State-level single window subsidies.

### 3. Detailed Feasibility & Bank Project Report (DPR)
- **Feasibility Index**: 0–100 composite viability score with color-coded verdict and confetti celebration.
- **Financial Architecture**: Total Project Cost, Promoter Equity (5–10%), Government Subsidy (25–35%), Net Bank Loan, Monthly EMI, Moratorium terms, and Net Monthly Profit.
- **Debt Service Coverage Ratio (DSCR)**: Verified against banking benchmarks to ensure safe debt servicing.
- **Hyper-Local Market Analysis**: Estimated customer catchment in 15 km perimeter, competitor density, distribution channels, and unmet local gaps.
- **SWOT Matrix**: 4-quadrant strategic matrix customized for rural operations.
- **Operational Risks & Pricing Strategy**: Suggested pricing formulas and mitigation plans.
- **4-Phase Implementation Roadmap**: Step-by-step milestones from Udyam registration to commercial launch.

### 4. Corner PDF Download & Print
- High-resolution, official DPR document generation via `jspdf` and `html2canvas`.
- Pinned in the top-right corner of the feasibility report (`#download-pdf-corner-btn`) for bank loan applications.

### 5. Brownie Points Included
- 🌐 **Multilingual Support**: Seamless toggle between **English**, **हिन्दी (Hindi)**, and **मराठी (Marathi)**.
- 💬 **Conversational AI Advisor**: Natural language business consultation for rural entrepreneurs.
- 🎛 **What-If Scenario Simulator**: Interactive sliders to adjust capital, setup investment, and interest rates with real-time recalculation.
- ⚖ **Business Comparison Engine**: Side-by-side comparison of Dairy vs Flour Mill vs Tailoring on setup cost, margins, break-even, and subsidies.

---

## 🔑 What You Need to Provide (API Keys & Credentials)

As an AI assistant, I cannot directly generate or access your private third-party accounts. Here is what you need to provide if you wish to connect external cloud services:

| Service | What to Provide | Where to Put It | Is It Required? |
| :--- | :--- | :--- | :--- |
| **Supabase Database** | `VITE_SUPABASE_URL`<br>`VITE_SUPABASE_ANON_KEY` | `.env` file or via the in-app **Supabase Settings** modal in the top navbar | **Optional**: The app already functions **100% offline** with built-in LocalStorage fallback! Adding your keys enables cloud persistence across devices. |
| **Generative AI (Optional)** | `VITE_GEMINI_API_KEY` or `VITE_OPENAI_API_KEY` | `.env` | **Optional**: The built-in Rural Enterprise Knowledge Engine already generates complete, realistic DPR reports and answers questions. |

---

## 🗄 Supabase Setup Instructions

1. Create a free project on [Supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase_schema.sql` from this repository and run the script to create the tables (`feasibility_reports`, `scraped_schemes`, `advisor_inquiries`) and Row Level Security (RLS) policies.
4. Go to **Project Settings -> API** and copy:
   - Project URL
   - `anon` `public` key
5. Paste them into `.env` or click the **Configure Supabase** badge in the top navbar.

---

## 💻 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Build production bundle
npm run build
```
The server will start at `http://localhost:5174/`.
