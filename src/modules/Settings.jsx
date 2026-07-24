import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Key, 
  Webhook, 
  CheckCircle2, 
  Copy, 
  Check, 
  RefreshCw, 
  Plus, 
  Users, 
  Building2, 
  Sparkles,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { theme, toggleTheme, workspaceProfile, setWorkspaceProfile, userName, setUserName } = useApp();

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'tokens' | 'members' | 'api'
  const [toastMsg, setToastMsg] = useState(null);

  // General & Branding State
  const [companyNameInput, setCompanyNameInput] = useState(workspaceProfile?.name || 'Acme Corporation');
  const [industryInput, setIndustryInput] = useState(workspaceProfile?.industry || 'SaaS / Enterprise Software');
  const [brandColorInput, setBrandColorInput] = useState('#7C3AED');
  const [accentColorInput, setAccentColorInput] = useState('#00F5FF');

  // Theme & HSL Tokens State
  const [primaryHsl, setPrimaryHsl] = useState('262 83% 58%');
  const [accentHsl, setAccentHsl] = useState('186 100% 50%');

  // Members State
  const [members, setMembers] = useState([
    { id: 'm-1', name: userName || 'Elena Rostova', email: 'elena@acme.com', role: 'Owner' },
    { id: 'm-2', name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Admin' },
    { id: 'm-3', name: 'Alex Rivera', email: 'alex@acme.com', role: 'Manager' },
    { id: 'm-4', name: 'Marcus Vance', email: 'marcus@acme.com', role: 'Member' }
  ]);

  // API Keys & Webhooks State
  const [apiKey, setApiKey] = useState('teamos_live_sk_9482710394857201');
  const [webhookUrl, setWebhookUrl] = useState('https://acme.com/api/teamos/webhooks');
  const [copiedKey, setCopiedKey] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setWorkspaceProfile(prev => ({ ...prev, name: companyNameInput, industry: industryInput }));
    triggerToast("Saved General Branding & Workspace Settings! ✅");
  };

  const handleSaveTokens = (e) => {
    e.preventDefault();
    triggerToast("Applied Custom HSL Design System Tokens! 🎨");
  };

  const handleGenerateNewApiKey = () => {
    const newKey = `teamos_live_sk_${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
    triggerToast("Generated New Production API Secret Key 🔑");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#050505',
          border: '1px solid #00F5FF',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 10px 30px rgba(0, 245, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} color="#00FFA3" /> {toastMsg}
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: 800 }}>Workspace Settings & Customization</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Brand Colors, Design Tokens, Member Roles & API Webhooks</p>
        </div>
        <button onClick={toggleTheme} className="btn btn-secondary">
          {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />} Toggle {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', flex: 1, overflow: 'hidden' }}>
        
        {/* Navigation Tabs */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { id: 'general', label: 'General & Branding', icon: Building2 },
            { id: 'tokens', label: 'Theme & HSL Tokens', icon: Sliders },
            { id: 'members', label: 'Members & Permissions', icon: Users },
            { id: 'api', label: 'API Keys & Webhooks', icon: Key }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSel ? 'var(--primary-light)' : 'transparent',
                  color: isSel ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isSel ? 700 : 400,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isSel ? 'var(--primary)' : 'var(--text-muted)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: GENERAL & BRANDING */}
        {activeTab === 'general' && (
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Workspace Branding & Identity</h2>
            
            <form onSubmit={handleSaveGeneral} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Company Workspace Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={companyNameInput}
                  onChange={(e) => setCompanyNameInput(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Industry Sector</label>
                <input
                  type="text"
                  className="input-field"
                  value={industryInput}
                  onChange={(e) => setIndustryInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Primary Brand Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" value={brandColorInput} onChange={(e) => setBrandColorInput(e.target.value)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }} />
                    <input type="text" className="input-field" value={brandColorInput} onChange={(e) => setBrandColorInput(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>AI Accent Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" value={accentColorInput} onChange={(e) => setAccentColorInput(e.target.value)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }} />
                    <input type="text" className="input-field" value={accentColorInput} onChange={(e) => setAccentColorInput(e.target.value)} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-ai" style={{ width: 'fit-content', marginTop: '10px' }}>
                <Save size={16} /> Save Branding Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: THEME & HSL TOKENS */}
        {activeTab === 'tokens' && (
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Theme & Custom HSL Design Tokens</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Configure global CSS design variables</p>

            <form onSubmit={handleSaveTokens} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>--primary HSL Token</label>
                <input type="text" className="input-field" value={primaryHsl} onChange={(e) => setPrimaryHsl(e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>--accent-cyan HSL Token</label>
                <input type="text" className="input-field" value={accentHsl} onChange={(e) => setAccentHsl(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '10px' }}>
                <Save size={16} /> Apply HSL Tokens
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MEMBERS & PERMISSIONS */}
        {activeTab === 'members' && (
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Members & Role Permissions</h2>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px' }}>Member</th>
                  <th style={{ padding: '10px' }}>Email</th>
                  <th style={{ padding: '10px' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{m.name}</td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{m.email}</td>
                    <td style={{ padding: '12px' }}><span className="badge badge-primary">{m.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: API KEYS & WEBHOOKS */}
        {activeTab === 'api' && (
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>API Secret Keys & Webhooks</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '580px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Production API Secret Key</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="input-field" value={apiKey} readOnly style={{ fontFamily: 'var(--font-mono)' }} />
                  <button type="button" onClick={handleCopyKey} className="btn btn-secondary">
                    {copiedKey ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                    {copiedKey ? 'Copied' : 'Copy'}
                  </button>
                  <button type="button" onClick={handleGenerateNewApiKey} className="btn btn-ai">
                    <RefreshCw size={14} /> Rotate
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Webhook Listener Endpoint</label>
                <input type="text" className="input-field" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
              </div>

              <button type="button" onClick={() => triggerToast("⚡ Test Webhook payload sent to server!")} className="btn btn-secondary" style={{ width: 'fit-content' }}>
                <Webhook size={16} /> Send Test Webhook Payload
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
