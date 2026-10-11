import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { FeasibilityReport } from '../types/business';
import type { GovernmentScheme } from '../types/schemes';

const SUPABASE_URL_KEY = 'gramudyog_supabase_url';
const SUPABASE_ANON_KEY = 'gramudyog_supabase_anon_key';

class SupabaseService {
  private client: SupabaseClient | null = null;
  private url: string = '';
  private anonKey: string = '';

  constructor() {
    this.initClient();
  }

  public initClient() {
    // 1. Check environment variables
    const envUrl = import.meta.env.VITE_SUPABASE_URL;
    const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // 2. Check localStorage overrides
    const localUrl = localStorage.getItem(SUPABASE_URL_KEY);
    const localKey = localStorage.getItem(SUPABASE_ANON_KEY);

    let rawUrl = localUrl || envUrl || '';
    if (rawUrl) {
      rawUrl = rawUrl.trim();
      if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
        rawUrl = 'https://' + rawUrl;
      }
      if (!rawUrl.includes('.')) {
        rawUrl = rawUrl + '.supabase.co';
      }
    }
    this.url = rawUrl;
    this.anonKey = (localKey || envKey || '').trim();

    if (this.url && this.anonKey) {
      try {
        this.client = createClient(this.url, this.anonKey);
      } catch (err) {
        console.warn('Failed to initialize Supabase client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  public isConnected(): boolean {
    return !!this.client && !!this.url && !!this.anonKey;
  }

  public getConfig() {
    return {
      url: this.url,
      anonKey: this.anonKey ? `${this.anonKey.substring(0, 10)}...` : ''
    };
  }

  public setCredentials(url: string, anonKey: string) {
    if (url && anonKey) {
      localStorage.setItem(SUPABASE_URL_KEY, url.trim());
      localStorage.setItem(SUPABASE_ANON_KEY, anonKey.trim());
    } else {
      localStorage.removeItem(SUPABASE_URL_KEY);
      localStorage.removeItem(SUPABASE_ANON_KEY);
    }
    this.initClient();
  }

  /**
   * Save feasibility report to Supabase or fallback to LocalStorage
   */
  public async saveReport(report: FeasibilityReport): Promise<{ success: boolean; id: string; source: 'supabase' | 'local' }> {
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('feasibility_reports')
          .insert({
            id: report.id,
            applicant_name: report.formData.applicantName,
            business_title: report.formData.businessTitle,
            business_category: report.formData.businessCategory,
            state: report.formData.state,
            district: report.formData.district,
            village_or_town: report.formData.villageOrTown,
            locality_type: report.formData.localityType,
            social_category: report.formData.socialCategory,
            special_category: report.formData.specialCategory,
            available_capital: report.formData.availableCapital,
            estimated_project_cost: report.formData.estimatedProjectCost,
            feasibility_score: report.overallFeasibilityScore,
            verdict: report.verdict,
            report_data: report,
            created_at: report.createdAt
          })
          .select()
          .single();

        if (!error && data) {
          this.saveToLocal(report);
          return { success: true, id: report.id, source: 'supabase' };
        } else {
          console.warn('Supabase insert failed, saving to local:', error?.message);
        }
      } catch (e) {
        console.warn('Supabase error, falling back to local storage:', e);
      }
    }

    // Fallback to local storage
    this.saveToLocal(report);
    return { success: true, id: report.id, source: 'local' };
  }

  /**
   * Fetch all historical reports
   */
  public async getReports(): Promise<FeasibilityReport[]> {
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('feasibility_reports')
          .select('report_data')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(item => item.report_data as FeasibilityReport);
        }
      } catch (e) {
        console.warn('Supabase fetch failed, fetching from local:', e);
      }
    }

    return this.getFromLocal();
  }

  /**
   * Save scraped government schemes
   */
  public async saveScrapedSchemes(schemes: GovernmentScheme[]): Promise<void> {
    if (this.client) {
      try {
        const rows = schemes.map(s => ({
          scheme_id: s.id,
          name: s.name,
          ministry: s.ministry,
          max_project_cost: s.maxProjectCost,
          general_subsidy_rural: s.generalSubsidyPercent.rural,
          special_subsidy_rural: s.specialSubsidyPercent.rural,
          portal_url: s.officialPortalUrl,
          raw_data: s,
          updated_at: new Date().toISOString()
        }));

        await this.client
          .from('scraped_schemes')
          .upsert(rows, { onConflict: 'scheme_id' });
      } catch (e) {
        console.warn('Failed to upsert schemes in Supabase:', e);
      }
    }
  }

  // Local storage helpers
  private saveToLocal(report: FeasibilityReport) {
    try {
      const existing = this.getFromLocal();
      const filtered = existing.filter(r => r.id !== report.id);
      filtered.unshift(report);
      localStorage.setItem('gramudyog_reports', JSON.stringify(filtered.slice(0, 20)));
    } catch (e) {
      console.warn('Failed to save report to local storage:', e);
    }
  }

  private getFromLocal(): FeasibilityReport[] {
    try {
      const data = localStorage.getItem('gramudyog_reports');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}

export const supabaseService = new SupabaseService();
