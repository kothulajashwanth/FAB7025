import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  Activity, 
  Users, 
  LogIn, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Sliders,
  DollarSign,
  Radio,
  Plus,
  X,
  RefreshCw,
  Power
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SuperAdminConsole() {
  const { setCurrentView, setWorkspaceProfile } = useApp();
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'revenue' | 'infra' | 'flags'
  const [impersonatingCompany, setImpersonatingCompany] = useState(null);

  // New Tenant Modal State
  const [showTenantModal, setShowTenantModal] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [tenantPlan, setTenantPlan] = useState('Pro Enterprise');
  const [tenantSeats, setTenantSeats] = useState(25);

  const [toastMsg, setToastMsg] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [tenants, setTenants] = useState([
    { id: 'tn-101', name: 'Acme Enterprise HQ', plan: 'Pro Enterprise', billingMode: 'per_seat', seats: 42, mrr: '₹62,958', signupDate: 'Jan 12, 2026', health: 'Healthy', chatMau: '1,420 msgs/day', videoMins: '840 mins/mo' },
    { id: 'tn-102', name: 'Staykaro Operations', plan: 'Flat Per-Team', billingMode: 'flat_team', seats: 28, mrr: '₹4,999', signupDate: 'Feb 01, 2026', health: 'Healthy', chatMau: '3,890 msgs/day', videoMins: '1,250 mins/mo' },
    { id: 'tn-103', name: 'Vercel Cloud Partner', plan: 'Pro Enterprise', billingMode: 'per_seat', seats: 120, mrr: '₹1,79,880', signupDate: 'Mar 15, 2026', health: 'Healthy', chatMau: '8,400 msgs/day', videoMins: '4,100 mins/mo' },
    { id: 'tn-104', name: 'Stripe Payments Dev', plan: 'Flat Per-Team', billingMode: 'flat_team', seats: 48, mrr: '₹4,999', signupDate: 'Apr 10, 2026', health: 'High Usage', chatMau: '12,500 msgs/day', videoMins: '7,800 mins/mo' }
  ]);

  const [featureFlags, setFeatureFlags] = useState([
    { id: 'flag-1', name: 'WebRTC 4K Video Streaming', key: 'ENABLE_4K_WEBRTC', status: true, scope: 'Global' },
    { id: 'flag-2', name: 'DeepSeek R1 AI Reasoning Engine', key: 'ENABLE_DEEPSEEK_R1', status: true, scope: 'Global' },
    { id: 'flag-3', name: 'Multi-Tab BroadcastChannel Mesh', key: 'ENABLE_BC_MESH', status: true, scope: 'Global' },
    { id: 'flag-4', name: 'Autonomous WhatsApp Video Invites', key: 'ENABLE_WA_INVITES', status: true, scope: 'Pro Enterprise' }
  ]);

  const handleImpersonate = (company) => {
    setImpersonatingCompany(company);
    setWorkspaceProfile(prev => ({ ...prev, companyName: company.name }));
    triggerToast(`🔑 Logged in as Audit Super Admin for "${company.name}"`);
    setTimeout(() => {
      setCurrentView('dashboard');
    }, 1200);
  };

  const handleToggleStatus = (id) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, health: t.health === 'Suspended' ? 'Healthy' : 'Suspended' } : t))
    );
    triggerToast("Updated tenant organization status");
  };

  const handleCreateTenantSubmit = (e) => {
    e.preventDefault();
    if (!tenantName.trim()) return;

    const newTenant = {
      id: `tn-${Math.floor(100 + Math.random() * 900)}`,
      name: tenantName.trim(),
      plan: tenantPlan,
      billingMode: 'per_seat',
      seats: Number(tenantSeats),
      mrr: `₹${(Number(tenantSeats) * 1499).toLocaleString('en-IN')}`,
      signupDate: 'Today',
      health: 'Healthy',
      chatMau: '0 msgs/day',
      videoMins: '0 mins/mo'
    };

    setTenants(prev => [...prev, newTenant]);
    setShowTenantModal(false);
    setTenantName('');
    triggerToast(`🎉 Tenant Workspace "${newTenant.name}" created!`);
  };

  const handleToggleFlag = (id) => {
    setFeatureFlags(prev => prev.map(f => f.id === id ? { ...f, status: !f.status } : f));
    triggerToast("Updated global feature flag status");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)', position: 'relative' }}>
      
      {/* Toast Banner */}
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
          <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: 800 }}>Super Admin Console</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Multi-Tenant Directory, Tenant Impersonation, MRR & LiveKit Stream Telemetry</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-gold" style={{ padding: '6px 12px', fontSize: '12px' }}>
            <ShieldCheck size={14} /> Super Admin Level Access
          </span>
          <button onClick={() => setShowTenantModal(true)} className="btn btn-ai">
            <Plus size={16} /> Create Tenant Workspace
          </button>
        </div>
      </div>

      {/* Impersonation Banner */}
      {impersonatingCompany && (
        <div className="badge badge-warning" style={{ padding: '12px 20px', fontSize: '13px', justifyContent: 'space-between' }}>
          <span>Switching to Tenant Admin: <strong>{impersonatingCompany.name}</strong>...</span>
          <RefreshCw className="animate-spin" size={16} />
        </div>
      )}

      {/* Sub-Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '4px',
        backgroundColor: 'var(--bg-input)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        {[
          { id: 'directory', label: 'Tenant Directory', icon: Building2 },
          { id: 'revenue', label: 'MRR & Revenue Dashboard', icon: TrendingUp },
          { id: 'infra', label: 'Stream & LiveKit Telemetry', icon: Activity },
          { id: 'flags', label: 'Global Feature Flags', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSel ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                color: isSel ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isSel ? 600 : 400,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: TENANT DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Active Multi-Tenant Workspaces ({tenants.length})</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Audit access, impersonate tenant accounts, or toggle active status</p>
            </div>

            <button onClick={() => setShowTenantModal(true)} className="btn btn-primary" style={{ fontSize: '12px' }}>
              <Plus size={14} /> Add Tenant
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Tenant Organization</th>
                <th style={{ padding: '12px' }}>Plan</th>
                <th style={{ padding: '12px' }}>Active Seats</th>
                <th style={{ padding: '12px' }}>MRR Revenue</th>
                <th style={{ padding: '12px' }}>Health Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 700 }}>{t.name}</td>
                  <td style={{ padding: '12px' }}><span className="badge badge-primary">{t.plan}</span></td>
                  <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>{t.seats} seats</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#00FFA3' }}>{t.mrr}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={t.health === 'Suspended' ? 'badge badge-danger' : 'badge badge-success'}>
                      {t.health}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleImpersonate(t)} className="btn btn-secondary" style={{ fontSize: '11px', padding: '6px 12px' }}>
                        <LogIn size={13} /> Impersonate
                      </button>
                      <button onClick={() => handleToggleStatus(t.id)} className="btn btn-ghost" style={{ padding: '6px', color: t.health === 'Suspended' ? 'var(--success)' : 'var(--danger)' }}>
                        <Power size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: MRR & REVENUE */}
      {activeTab === 'revenue' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Platform MRR & Revenue Analytics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Platform MRR</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#00FFA3', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>₹2,50,836</div>
            </div>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ARR Run Rate</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#00F5FF', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>₹30,10,032</div>
            </div>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Active Paid Tenants</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#A855F7', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>4 Workspaces</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STREAM & LIVEKIT TELEMETRY */}
      {activeTab === 'infra' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>LiveKit WebRTC Stream Telemetry</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#00FFA3', marginBottom: '8px' }}>🟢 Active Audio/Video Streams</div>
              <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>14 Live Streams</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>0 packet drops across mesh network</div>
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#00F5FF', marginBottom: '8px' }}>⚡ BroadcastChannel Multi-Tab Sync</div>
              <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>0ms Latency</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>100% room sync accuracy</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FEATURE FLAGS */}
      {activeTab === 'flags' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Global Platform Feature Flags</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {featureFlags.map((flag) => (
              <div key={flag.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{flag.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{flag.key} • Scope: {flag.scope}</div>
                </div>

                <button onClick={() => handleToggleFlag(flag.id)} className={flag.status ? "btn btn-ai" : "btn btn-secondary"} style={{ fontSize: '12px' }}>
                  {flag.status ? "Enabled ✅" : "Disabled ❌"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE NEW TENANT MODAL */}
      {showTenantModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '460px', padding: '32px', backgroundColor: '#050505', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Create New Tenant Workspace</h3>
              <button onClick={() => setShowTenantModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateTenantSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Organization Name</label>
                <input type="text" className="input-field" placeholder="e.g. OpenAI Global HQ" value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Plan Tier</label>
                  <select className="input-field" value={tenantPlan} onChange={(e) => setTenantPlan(e.target.value)}>
                    <option value="Pro Enterprise">Pro Enterprise</option>
                    <option value="Flat Per-Team">Flat Per-Team</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Initial Seats</label>
                  <input type="number" className="input-field" value={tenantSeats} onChange={(e) => setTenantSeats(e.target.value)} min={1} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowTenantModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>Create Tenant</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
