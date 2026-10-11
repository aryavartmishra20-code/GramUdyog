-- ====================================================================
-- GramUdyog (ग्रामउद्योग) Supabase Database Schema
-- Run this script in your Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql
-- ====================================================================

-- 1. Create Feasibility Reports Table
CREATE TABLE IF NOT EXISTS public.feasibility_reports (
    id TEXT PRIMARY KEY,
    applicant_name TEXT NOT NULL,
    business_title TEXT NOT NULL,
    business_category TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    village_or_town TEXT NOT NULL,
    locality_type TEXT NOT NULL,
    social_category TEXT NOT NULL,
    special_category TEXT NOT NULL,
    available_capital NUMERIC NOT NULL,
    estimated_project_cost NUMERIC NOT NULL,
    feasibility_score INTEGER NOT NULL,
    verdict TEXT NOT NULL,
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Scraped Government Schemes Cache Table
CREATE TABLE IF NOT EXISTS public.scraped_schemes (
    scheme_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    ministry TEXT NOT NULL,
    max_project_cost NUMERIC,
    general_subsidy_rural NUMERIC,
    special_subsidy_rural NUMERIC,
    portal_url TEXT,
    raw_data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Advisor Chat Inquiries Table (Optional for AI Q&A logging)
CREATE TABLE IF NOT EXISTS public.advisor_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id TEXT REFERENCES public.feasibility_reports(id) ON DELETE SET NULL,
    user_query TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.feasibility_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Open Read/Write Policies for Public Anon Access (or customize for Auth)
CREATE POLICY "Allow public read access to feasibility_reports"
    ON public.feasibility_reports FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to feasibility_reports"
    ON public.feasibility_reports FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public read access to scraped_schemes"
    ON public.scraped_schemes FOR SELECT
    USING (true);

CREATE POLICY "Allow public upsert to scraped_schemes"
    ON public.scraped_schemes FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow public insert to advisor_inquiries"
    ON public.advisor_inquiries FOR INSERT
    WITH CHECK (true);
