import React, { useState } from 'react';
import { supabaseService } from '../services/supabase';
import { Database, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, X, ShieldAlert } from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigUpdated
}) => {
  const currentConfig = supabaseService.getConfig();
  const [url, setUrl] = useState(currentConfig.url || '');
  const [anonKey, setAnonKey] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const isConnected = supabaseService.isConnected();

  if (!isOpen) return null;

  const handleSave = () => {
    if (!url.trim() || !anonKey.trim()) {
      setStatusMessage('Please enter both Supabase Project URL and Anon Public Key.');
      return;
    }

    try {
      supabaseService.setCredentials(url.trim(), anonKey.trim());
      setStatusMessage('Supabase credentials successfully saved and activated!');
      onConfigUpdated();
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (e: any) {
      setStatusMessage(`Error saving configuration: ${e.message}`);
    }
  };

  const handleDisconnect = () => {
    supabaseService.setCredentials('', '');
    setUrl('');
    setAnonKey('');
    setStatusMessage('Switched back to Local Storage Cache mode.');
    onConfigUpdated();
  };

  const copySqlSnippet = () => {
    const sql = `-- GramUdyog Database Schema
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
);`;
    navigator.clipboard.writeText(sql);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glass-panel modal-card animate-slide-up">
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-wrap">
              <Database size={22} className="text-primary" />
            </div>
            <div>
              <h3>Supabase Backend Configuration</h3>
              <p className="text-muted text-sm">Persist reports and scraped schemes to your private Supabase database</p>
            </div>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className={`status-banner ${isConnected ? 'connected' : 'offline'}`}>
            {isConnected ? (
              <>
                <CheckCircle2 size={18} className="text-green" />
                <div>
                  <strong>Active Connection:</strong> Reports are syncing to Supabase Cloud!
                </div>
              </>
            ) : (
              <>
                <AlertCircle size={18} className="text-amber" />
                <div>
                  <strong>Local Offline Mode:</strong> Reports are saved securely in your browser's LocalStorage. Add your Supabase project keys below to sync to cloud database.
                </div>
              </>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Supabase Project URL</span>
              <span className="form-label-hint">https://xxxx.supabase.co</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="https://xyzproject.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Supabase Anon Public API Key</span>
              <span className="form-label-hint">anon public key (safe in browser)</span>
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
            />
          </div>

          {statusMessage && (
            <div className="status-feedback">
              {statusMessage}
            </div>
          )}

          <div className="schema-help-box">
            <div className="schema-header">
              <span>Database Table Schema</span>
              <button className="btn btn-outline btn-sm" onClick={copySqlSnippet}>
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{isCopied ? 'Copied SQL' : 'Copy SQL'}</span>
              </button>
            </div>
            <p className="text-xs text-muted" style={{ marginTop: '0.4rem' }}>
              We've created a ready-to-run <code>supabase_schema.sql</code> file in the project root. Paste it in your Supabase SQL editor to create the tables and RLS policies.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          {isConnected && (
            <button className="btn btn-outline" onClick={handleDisconnect}>
              Disconnect (Use Local)
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave}>
            Save & Connect
          </button>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }
        .modal-card {
          width: 100%;
          max-width: 600px;
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          padding: 2rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          color: var(--text-main);
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }
        .modal-title-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .modal-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #059669;
        }
        .btn-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.35rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .btn-close:hover {
          color: var(--text-main);
          background: var(--bg-surface-subtle);
        }
        .status-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.15rem;
          border-radius: var(--radius-md);
          font-size: 0.86rem;
          margin-bottom: 1.25rem;
          line-height: 1.45;
        }
        .status-banner.connected {
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.3);
          color: #065f46;
        }
        .status-banner.offline {
          background: #fffbeb;
          border: 1px solid rgba(217, 119, 6, 0.3);
          color: #92400e;
        }
        .status-feedback {
          padding: 0.75rem 1rem;
          background: #ecfdf5;
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          color: #065f46;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .schema-help-box {
          background: var(--bg-surface-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.15rem;
          margin-top: 1.15rem;
        }
        .schema-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
          margin-top: 1.25rem;
        }
      `}</style>
    </div>
  );
};
