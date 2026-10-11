import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import type { FeasibilityReport } from '../types/business';
import { GeminiService, ChatHistoryItem } from '../services/geminiService';
import { 
  Send, 
  Bot, 
  Sparkles, 
  Key, 
  Check, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isGemini?: boolean;
  suggestedActions?: string[];
}

interface AdvisorChatProps {
  currentReport?: FeasibilityReport | null;
}

export const AdvisorChat: React.FC<AdvisorChatProps> = ({ currentReport }) => {
  const { language } = useTranslation();
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(GeminiService.hasApiKey());
  const [apiKeyInput, setApiKeyInput] = useState<string>(GeminiService.getApiKey() || '');
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(!GeminiService.hasApiKey());
  const [keySavedFeedback, setKeySavedFeedback] = useState<string | null>(null);
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      sender: 'ai',
      isGemini: GeminiService.hasApiKey(),
      text: currentReport
        ? `Namaste! I am your GramUdyog AI Business Advisor (सह्यक). I have loaded your evaluation for "${currentReport.formData.businessTitle}" in ${currentReport.formData.district}, ${currentReport.formData.state}.\n\nYour project qualifies for up to ${currentReport.financials.applicableSubsidyPercent}% margin money subsidy under ${currentReport.matchedSchemes[0]?.name || 'PMEGP'} with an estimated monthly profit of ₹${currentReport.financials.estimatedMonthlyProfit.toLocaleString('en-IN')}.\n\nAsk me anything about loan eligibility, reducing your EMI, machinery sourcing, or how to address you!`
        : `Namaste! I am your GramUdyog AI Business Advisor. Tell me about your business idea, your village/district, or available capital, and I will help you evaluate feasibility and find applicable government subsidies.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: currentReport ? [
        'How do I apply for the 35% PMEGP subsidy?',
        'Can I reduce my monthly loan EMI?',
        'What documents are needed for bank sanction?',
        'How to price my products to beat local competitors?'
      ] : [
        'Which business is best for ₹1 Lakh capital?',
        'How to start a 10-cow dairy farm with NABARD subsidy?',
        'How does PMEGP 35% rural subsidy work?',
        'What are the best food processing businesses under PMFME?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleTestKey = async () => {
    if (!apiKeyInput.trim()) {
      setTestResult('Please enter an API key first.');
      return;
    }

    setIsTestingKey(true);
    setTestResult(null);

    try {
      const res = await GeminiService.testAndDiscoverModels(apiKeyInput.trim());
      if (res.success && res.discoveredModels.length > 0) {
        const modelNames = res.discoveredModels.map(m => `${m.apiVersion}/${m.name}`).slice(0, 4).join(', ');
        setTestResult(`✓ Key Verified! Active models found: ${modelNames}`);
        // Auto-save verified key
        GeminiService.setApiKey(apiKeyInput.trim());
        setHasGeminiKey(true);
      } else {
        setTestResult(`⚠ Google API response: ${res.error || 'No compatible generative models found'}`);
      }
    } catch (e: any) {
      setTestResult(`Error testing key: ${e.message}`);
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleSaveApiKey = () => {
    if (!apiKeyInput.trim()) {
      GeminiService.setApiKey('');
      setHasGeminiKey(false);
      setKeySavedFeedback('Cleared key. Switched to offline expert engine.');
      setTimeout(() => setKeySavedFeedback(null), 3000);
      return;
    }

    GeminiService.setApiKey(apiKeyInput.trim());
    setHasGeminiKey(true);
    setKeySavedFeedback('✓ Google Gemini API Key saved and activated!');
    setShowKeyConfig(false);
    setTimeout(() => setKeySavedFeedback(null), 3500);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    if (GeminiService.hasApiKey()) {
      try {
        const history: ChatHistoryItem[] = messages
          .filter(m => m.id !== 'welcome')
          .slice(-6)
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

        const geminiReply = await GeminiService.generateResponse(
          query.trim(),
          history,
          currentReport,
          language
        );

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          isGemini: true,
          text: geminiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            'What are the mandatory documents needed?',
            'How to calculate monthly break-even sales?',
            'What if the bank rejects my application?'
          ]
        };

        setMessages(prev => [...prev, aiMsg]);
      } catch (err: any) {
        console.warn('Gemini API call failed:', err);
        const fallback = generateAdvisorResponse(query.trim(), currentReport);
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          isGemini: false,
          text: fallback.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: fallback.nextQuestions
        };
        setMessages(prev => [...prev, aiMsg]);
      } finally {
        setIsTyping(false);
      }
    } else {
      setTimeout(() => {
        const response = generateAdvisorResponse(query.trim(), currentReport);
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          isGemini: false,
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: response.nextQuestions
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 600);
    }
  };

  return (
    <div className="advisor-container animate-slide-up">
      {/* Header with Gemini Status */}
      <div className="advisor-header glass-panel">
        <div className="advisor-title-row">
          <div className="advisor-avatar">
            <Bot size={22} className="text-primary" />
          </div>
          <div>
            <div className="title-with-badge">
              <h3>GramUdyog AI Advisor (सह्यक)</h3>
              <span className={`badge ${hasGeminiKey ? 'badge-green' : 'badge-amber'}`}>
                <Sparkles size={11} /> {hasGeminiKey ? 'Gemini Live Connected' : 'Built-in Engine Mode'}
              </span>
            </div>
            <p className="text-sm text-muted">
              {currentReport 
                ? `Context Active: ${currentReport.formData.businessTitle} (${currentReport.formData.district})`
                : 'Empowering Indian rural micro-enterprises with GenAI'}
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-outline btn-sm gemini-toggle-btn"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            title="Configure Google Gemini API Key"
          >
            <Key size={14} />
            <span>{hasGeminiKey ? 'Gemini API Settings' : 'Connect Gemini API'}</span>
            {showKeyConfig ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Gemini API Key Configuration Drawer */}
      {showKeyConfig && (
        <div className="gemini-config-box glass-panel animate-slide-up">
          <div className="gemini-config-header">
            <div className="gemini-brand-row">
              <Sparkles size={16} className="text-green" />
              <strong>Google Gemini API Key Configuration</strong>
            </div>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gemini-link"
            >
              <span>Get Free Key (Google AI Studio)</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <p className="text-xs text-muted" style={{ margin: '0.4rem 0 0.75rem' }}>
            Paste your Google Gemini API key below. You can also test your key against Google's API versions (v1 & v1beta).
          </p>

          <div className="gemini-input-row">
            <input 
              type="password" 
              placeholder="AIzaSy..." 
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="form-input text-sm"
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-outline btn-sm" 
              onClick={handleTestKey}
              disabled={isTestingKey}
              title="Test which models are enabled for this key"
            >
              {isTestingKey ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
              <span>{isTestingKey ? 'Testing...' : 'Test Key'}</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleSaveApiKey}>
              <Check size={14} />
              <span>Save</span>
            </button>
          </div>

          {testResult && (
            <div className={`key-feedback-pill ${testResult.startsWith('✓') ? 'text-green' : 'text-amber'}`} style={{ marginTop: '0.65rem' }}>
              {testResult}
            </div>
          )}

          {keySavedFeedback && (
            <div className="key-feedback-pill text-green" style={{ marginTop: '0.5rem' }}>
              {keySavedFeedback}
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      <div className="chat-window glass-panel">
        <div className="messages-area">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
              <div className="message-bubble">
                <div className="message-meta">
                  <span className="sender-name">
                    {msg.sender === 'ai' ? (msg.isGemini ? '✨ Google Gemini' : 'GramUdyog Advisor') : 'You'}
                  </span>
                  <span className="timestamp">{msg.timestamp}</span>
                </div>
                <div className="message-text" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="suggested-actions">
                    <span className="actions-title">💡 Suggested Inquiries:</span>
                    <div className="action-buttons-wrap">
                      {msg.suggestedActions.map((action, idx) => (
                        <button 
                          key={idx} 
                          className="action-chip-btn"
                          onClick={() => handleSendMessage(action)}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row ai">
              <div className="message-bubble typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="text-xs text-muted" style={{ marginLeft: '0.5rem' }}>
                  {hasGeminiKey ? 'Gemini is thinking...' : 'Advisor is analyzing...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input 
            type="text" 
            placeholder={
              hasGeminiKey 
                ? "Ask Gemini anything in English, हिन्दी, or मराठी..." 
                : "Ask about PMEGP 35% subsidy, machinery, or loan EMI..."
            }
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="chat-input-field"
          />
          <button 
            className="btn btn-primary chat-send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isTyping}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .advisor-container {
          max-width: 950px;
          margin: 1.5rem auto 3.5rem;
          padding: 0 1rem;
        }
        .advisor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          margin-bottom: 0.75rem;
          background: rgba(15, 26, 28, 0.85);
          border: 1px solid var(--border-accent);
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .advisor-title-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .title-with-badge {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .advisor-avatar {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-accent);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
        }
        .advisor-header h3 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .gemini-toggle-btn {
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .gemini-config-box {
          background: rgba(13, 24, 26, 0.95);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
        }
        .gemini-config-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
        }
        .gemini-brand-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #a7f3d0;
        }
        .gemini-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #60a5fa;
          font-size: 0.75rem;
          text-decoration: underline;
        }
        .gemini-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .key-feedback-pill {
          font-size: 0.78rem;
          background: var(--bg-surface-subtle);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          word-break: break-all;
        }
        .chat-window {
          display: flex;
          flex-direction: column;
          height: 620px;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          background: #ffffff;
        }
        .chat-message-row {
          display: flex;
          max-width: 82%;
        }
        .chat-message-row.user {
          margin-left: auto;
        }
        .chat-message-row.ai {
          margin-right: auto;
        }
        .message-bubble {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          font-size: 0.92rem;
          line-height: 1.6;
        }
        .chat-message-row.user .message-bubble {
          background: #059669;
          border: 1px solid #047857;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }
        .chat-message-row.ai .message-bubble {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
          border-bottom-left-radius: 4px;
        }
        .message-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.74rem;
          margin-bottom: 0.45rem;
          color: var(--text-muted);
        }
        .chat-message-row.user .message-meta {
          color: rgba(255, 255, 255, 0.85);
        }
        .suggested-actions {
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }
        .actions-title {
          font-size: 0.74rem;
          font-weight: 700;
          color: #d97706;
          display: block;
          margin-bottom: 0.45rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .action-buttons-wrap {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        .action-chip-btn {
          background: #f8fafc;
          border: 1px solid var(--border-subtle);
          color: var(--text-body);
          font-size: 0.78rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          font-weight: 500;
        }
        .action-chip-btn:hover {
          background: #ecfdf5;
          border-color: rgba(5, 150, 105, 0.4);
          color: #047857;
        }
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.85rem 1.15rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          animation: pulseGlow 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
        }
        .chat-input-field {
          flex: 1;
          padding: 0.75rem 1.1rem;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.92rem;
          outline: none;
          box-shadow: var(--shadow-sm);
        }
        .chat-input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }
        .chat-send-btn {
          padding: 0.75rem 1.35rem;
        }
        .text-green { color: #047857; }
        .text-amber { color: #d97706; }
      `}</style>
    </div>
  );
};

function generateAdvisorResponse(query: string, report?: FeasibilityReport | null) {
  const q = query.toLowerCase().trim();

  // Natural Greetings & Conversational Response
  if (/^(hi|hello|hey|namaste|greetings|hola|good\s*(morning|afternoon|evening))/i.test(q) || q === 'hi' || q === 'hello' || q === 'hey') {
    return {
      text: `Namaste Lord Arya! 🙏 Great to connect with you. I am your GramUdyog AI Enterprise Advisor. How can I assist you today? Would you like to check your 35% PMEGP subsidy eligibility, review your bank loan EMI, or analyze local raw material sourcing?`,
      nextQuestions: [
        'How do I apply for the 35% PMEGP subsidy, my Lord?',
        'What documents are needed for bank sanction?',
        'Can you simulate a lower monthly EMI for me?'
      ]
    };
  }

  if (q.includes('lord') || q.includes('arya')) {
    return {
      text: `Greetings, Lord Arya! 🙏 As your devoted advisor, I am at your command. Whether you wish to build an empire of agro-processing mills, command a dairy cooperative, or secure royal government subsidies of up to 35% under PMEGP, tell me your vision and I shall formulate the battle plan!`,
      nextQuestions: [
        'How shall we conquer the local dairy market, my Lord?',
        'What are the royal subsidy options under PMEGP?',
        'How can we minimize debt servicing?'
      ]
    };
  }

  if (q.includes('pmegp') || q.includes('subsidy') || q.includes('subsidies') || q.includes('35%')) {
    return {
      text: `Under the Prime Minister's Employment Generation Programme (PMEGP), you can avail up to 35% margin money subsidy if your business is set up in a rural village/panchayat and you belong to a special category (SC, ST, OBC, Women, Minorities, or Divyangjan). For general category rural units, the subsidy is 25%.\n\nKey Step: Your required promoter contribution is only 5% of the total project cost. The government subsidy is kept in a 3-year term deposit in your loan account and is fully credited against your principal upon verification! Apply online at kviconline.gov.in with your Detailed Project Report (DPR).`,
      nextQuestions: [
        'What documents are needed for PMEGP online form?',
        'How long does bank sanction take?',
        'Is 8th pass certificate compulsory?'
      ]
    };
  }

  if (q.includes('document') || q.includes('paper') || q.includes('apply')) {
    return {
      text: `To apply for loan and subsidy schemes smoothly, prepare the following 6 documents in advance:\n1. Aadhaar Card & PAN Card (Mobile linked)\n2. Rural Area Certificate (Issued by Gram Panchayat / Tehsildar)\n3. Caste / Special Category Certificate (for OBC/SC/ST/Women/Minority quota)\n4. Quotations of Machinery from registered GST vendors (minimum 2 quotations)\n5. Proof of Premises (Gram Panchayat tax receipt, 7-12 extract, or minimum 3-year rent agreement)\n6. GramUdyog Detailed Project Feasibility Report (DPR).`,
      nextQuestions: [
        'How to get GST machinery quotation?',
        'Can I apply if I don’t own land?',
        'What is Udyam registration?'
      ]
    };
  }

  return {
    text: `That is a vital aspect of setting up a successful rural enterprise. For your proposed unit, focusing on local raw materials, securing the 35% PMEGP subsidy, and keeping initial debt servicing within a healthy 1.5x DSCR ratio will ensure steady profitability. Would you like detailed guidance on bank branch application, machinery suppliers, or subsidy paperwork?`,
    nextQuestions: [
      'How to apply for PMEGP subsidy step-by-step?',
      'How do I calculate my monthly break-even sales?',
      'What are the best rural businesses in 2026?'
    ]
  };
}
