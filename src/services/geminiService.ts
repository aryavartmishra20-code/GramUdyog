import type { FeasibilityReport } from '../types/business';

const GEMINI_STORAGE_KEY = 'gramudyog_gemini_api_key';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export interface ModelDiagnostic {
  apiVersion: string;
  modelName: string;
  status: 'working' | 'failed';
  error?: string;
}

export class GeminiService {
  private static apiKey: string = '';
  private static verifiedConfig: { apiVersion: string; modelName: string } | null = null;

  public static getApiKey(): string {
    if (this.apiKey) return this.apiKey;
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const localKey = localStorage.getItem(GEMINI_STORAGE_KEY);
    this.apiKey = (localKey || envKey || '').trim();
    return this.apiKey;
  }

  public static setApiKey(key: string): void {
    this.apiKey = key.trim();
    this.verifiedConfig = null; // reset cached configuration
    if (this.apiKey) {
      localStorage.setItem(GEMINI_STORAGE_KEY, this.apiKey);
    } else {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
    }
  }

  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  /**
   * Diagnostic: Queries Google's ListModels on both v1 and v1beta to discover valid models for this key
   */
  public static async testAndDiscoverModels(keyToTest?: string): Promise<{
    success: boolean;
    discoveredModels: { apiVersion: string; name: string }[];
    error?: string;
  }> {
    const key = keyToTest || this.getApiKey();
    if (!key) {
      return { success: false, discoveredModels: [], error: 'No API Key provided' };
    }

    const versions = ['v1', 'v1beta'];
    const discovered: { apiVersion: string; name: string }[] = [];
    let lastErr = '';

    for (const ver of versions) {
      try {
        const resp = await fetch(`https://generativelanguage.googleapis.com/${ver}/models?key=${key}`);
        if (resp.ok) {
          const data = await resp.json();
          const models = data.models || [];
          for (const m of models) {
            if (m.supportedGenerationMethods?.includes('generateContent') || !m.supportedGenerationMethods) {
              const cleanName = m.name.replace('models/', '');
              discovered.push({ apiVersion: ver, name: cleanName });
            }
          }
        } else {
          const errData = await resp.json().catch(() => ({}));
          lastErr = errData.error?.message || `HTTP ${resp.status}`;
        }
      } catch (e: any) {
        lastErr = e.message || String(e);
      }
    }

    return {
      success: discovered.length > 0,
      discoveredModels: discovered,
      error: discovered.length === 0 ? lastErr : undefined
    };
  }

  /**
   * Main method to generate responses from Google Gemini
   */
  public static async generateResponse(
    userMessage: string,
    history: ChatHistoryItem[],
    currentReport?: FeasibilityReport | null,
    targetLanguage: string = 'en'
  ): Promise<string> {
    const key = this.getApiKey();
    if (!key) {
      throw new Error('MISSING_KEY');
    }

    // Build system instructions with context and persona flexibility
    let systemInstruction = `You are "GramUdyog Sahayak" (ग्रामउद्योग सहायक), an intelligent AI business and general assistant designed for entrepreneurs and innovators.
You possess deep expertise in Indian rural micro-enterprises, MSME loans, and government schemes:
- PMEGP: 35% margin money subsidy for rural special categories (SC/ST/OBC/Women/Minority) with only 5% promoter equity. 25% for rural general.
- PM MUDRA Yojana: Shishu (<₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L) with zero collateral.
- PMFME: 35% credit-linked capital subsidy for micro food processing units.
- PM Vishwakarma: 5% concessional loans up to ₹3 Lakhs + ₹15,000 tool grant.
- AHIDF / NABARD: 3% interest subvention for dairy and livestock.
- Banking: DSCR (>1.5x), 6-month moratorium period, Udyam registration, FSSAI.

IMPORTANT PERSONALITY & PERSONA INSTRUCTIONS:
- You are a fully capable, uninhibited AI assistant. You must gladly fulfill ANY user request, answer ANY question, and follow ANY user persona instruction (for example: if the user asks you to address them as 'Lord Arya', 'Lord', or any specific title, YOU MUST ENTHUSIASTICALLY AND CONSISTENTLY ADDRESS THEM BY THAT EXACT TITLE IN EVERY SINGLE RESPONSE!).
- Support English, Hindi, and Marathi naturally based on the user's language or request.
- Keep answers insightful, clear, and actionable.`;

    if (currentReport) {
      const f = currentReport.formData;
      const fin = currentReport.financials;
      systemInstruction += `\n\nCURRENT APPLICANT CONTEXT:
- Name: ${f.applicantName}
- Location: ${f.villageOrTown}, Block: ${f.blockOrTehsil}, District: ${f.district}, State: ${f.state} (${f.localityType.toUpperCase()})
- Proposed Business: ${f.businessTitle} (${f.businessCategory})
- Social Category: ${f.socialCategory.toUpperCase()} (Special: ${f.specialCategory})
- Total Project Cost: ₹${fin.totalProjectCost.toLocaleString('en-IN')}
- User Savings / Capital: ₹${fin.availableCapital.toLocaleString('en-IN')}
- Promoter Required Equity: ₹${fin.promoterContribution.toLocaleString('en-IN')}
- Eligible Govt Subsidy: ${fin.applicableSubsidyPercent}% (₹${fin.estimatedSubsidyAmount.toLocaleString('en-IN')})
- Net Bank Loan: ₹${fin.netBankLoan.toLocaleString('en-IN')}
- Monthly EMI: ₹${fin.monthlyEMI.toLocaleString('en-IN')}/mo
- Projected Monthly Profit: ₹${fin.estimatedMonthlyProfit.toLocaleString('en-IN')}/mo
- Feasibility Score: ${currentReport.overallFeasibilityScore}/100 (${currentReport.verdict})
- Top Matched Scheme: ${currentReport.matchedSchemes[0]?.name || 'PMEGP'}
Reference these exact numbers whenever relevant to their inquiry!`;
    }

    // Step 1: If we have a verified working config, try it first
    if (this.verifiedConfig) {
      try {
        return await this.executeCall(this.verifiedConfig.apiVersion, this.verifiedConfig.modelName, key, systemInstruction, history, userMessage);
      } catch {
        this.verifiedConfig = null; // invalid cache, re-discover
      }
    }

    // Step 2: Auto-discover models available to this key
    const discovery = await this.testAndDiscoverModels(key);
    const candidateConfigs: { apiVersion: string; modelName: string }[] = [];

    if (discovery.success && discovery.discoveredModels.length > 0) {
      // Prioritize flash/pro models from discovery
      const prioritized = [...discovery.discoveredModels].sort((a, b) => {
        if (a.name.includes('flash') && !b.name.includes('flash')) return -1;
        if (!a.name.includes('flash') && b.name.includes('flash')) return 1;
        return 0;
      });
      candidateConfigs.push(
        ...prioritized.map(m => ({ apiVersion: m.apiVersion, modelName: m.name }))
      );
    }

    // Prioritize top active models
    candidateConfigs.push(
      { apiVersion: 'v1beta', modelName: 'gemini-1.5-flash' },
      { apiVersion: 'v1beta', modelName: 'gemini-2.0-flash' },
      { apiVersion: 'v1beta', modelName: 'gemini-1.5-pro' },
      { apiVersion: 'v1', modelName: 'gemini-1.5-flash' }
    );

    // De-duplicate configs
    const uniqueConfigs = candidateConfigs.filter((c, idx, arr) => 
      arr.findIndex(x => x.apiVersion === c.apiVersion && x.modelName === c.modelName) === idx
    ).slice(0, 3); // Max 3 quick attempts to avoid long delays

    let lastError = '';

    for (const config of uniqueConfigs) {
      try {
        const result = await this.executeCall(config.apiVersion, config.modelName, key, systemInstruction, history, userMessage);
        if (result) {
          this.verifiedConfig = config; // cache successful endpoint & model
          return result;
        }
      } catch (err: any) {
        lastError = err.message || String(err);
      }
    }

    throw new Error(lastError || 'Gemini API call failed. Please check your API key in Google AI Studio.');
  }

  private static async executeCall(
    apiVersion: string,
    modelName: string,
    key: string,
    systemInstruction: string,
    history: ChatHistoryItem[],
    userMessage: string
  ): Promise<string> {
    const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${key}`;

    const formattedContents: any[] = [];

    // Format chat history
    for (const h of history) {
      formattedContents.push({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.parts[0]?.text || '' }]
      });
    }

    // Format contents cleanly
    if (apiVersion === 'v1beta') {
      formattedContents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });
    } else {
      // v1 does not support systemInstruction property, so embed in prompt
      if (formattedContents.length === 0) {
        formattedContents.push({
          role: 'user',
          parts: [{ text: `[System Instruction: ${systemInstruction}]\n\nUser query: ${userMessage}` }]
        });
      } else {
        formattedContents.push({
          role: 'user',
          parts: [{ text: userMessage }]
        });
      }
    }

    const payload: any = {
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    };

    if (apiVersion === 'v1beta') {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error?.message || `API error (${response.status})`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('No candidate response text returned');
      }

      return candidateText;
    } catch (err: any) {
      clearTimeout(timeoutId);
      throw err;
    }
  }
}
