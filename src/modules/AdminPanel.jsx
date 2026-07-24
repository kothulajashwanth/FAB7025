import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Key, 
  Lock, 
  Users, 
  Activity, 
  FileText, 
  CheckCircle2, 
  UserCheck, 
  UserPlus, 
  Trash2, 
  Sliders, 
  Check, 
  X, 
  Bot, 
  MessageSquare, 
  CreditCard,
  Building2,
  Sparkles,
  Zap,
  Globe,
  Plus,
  RefreshCw,
  Send,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminPanel() {
  const { openPaymentModal } = useApp();
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'matrix' | 'billing' | 'ai-settings' | 'integrations'
  
  // Pricing Mode
  const [billingMode, setBillingMode] = useState('per_seat');
  const [autoTaskMode, setAutoTaskMode] = useState('suggest-for-review');
  const [autoTranscription, setAutoTranscription] = useState(true);
  const [aiCallerSchedule, setAiCallerSchedule] = useState('Daily at 05:00 PM');
  
  // Invite Member Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');
  const [toastMsg, setToastMsg] = useState(null);

  // Integration States
  const [slackConnected, setSlackConnected] = useState(true);
  const [whatsappConnected, setWhatsappConnected] = useState(true);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [companyMembers, setCompanyMembers] = useState([
    { id: 'usr-1', name: 'Elena Rostova', email: 'elena@acme.com', role: 'Owner', status: 'Active', joined: 'Jan 12, 2026' },
    { id: 'usr-2', name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Admin', status: 'Active', joined: 'Feb 04, 2026' },
    { id: 'usr-3', name: 'Alex Rivera', email: 'alex@acme.com', role: 'Manager', status: 'Active', joined: 'Mar 18, 2026' },
    { id: 'usr-4', name: 'Marcus Vance', email: 'marcus@acme.com', role: 'Member', status: 'Active', joined: 'Apr 22, 2026' },
    { id: 'usr-5', name: 'David Kim', email: 'david@acme.com', role: 'Guest/Client', status: 'Active', joined: 'May 30, 2026' }
  ]);

  const [rolesMatrix, setRolesMatrix] = useState([
    { role: 'Owner', manageBilling: 'Yes', manageUsers: 'Yes', viewChannels: 'Yes (All)', editTasks: 'Yes', adminMedia: 'Yes' },
    { role: 'Admin', manageBilling: 'View Only', manageUsers: 'Yes', viewChannels: 'Yes (All)', editTasks: 'Yes', adminMedia: 'Yes' },
    { role: 'Manager', manageBilling: 'No', manageUsers: 'No (Own Team)', viewChannels: 'Own Team Only', editTasks: 'Yes', adminMedia: 'No' },
    { role: 'Member', manageBilling: 'No', manageUsers: 'No', viewChannels: 'Invited Only', editTasks: 'Yes', adminMedia: 'No' },
    { role: 'Guest/Client', manageBilling: 'No', manageUsers: 'No', viewChannels: 'Specific Only', editTasks: 'No', adminMedia: 'No' }
  ]);

  const handleRoleChange = (id, newRole) => {
    setCompanyMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    triggerToast(`Updated user role to ${newRole}`);
  };

  const handleRemoveMember = (id) => {
    setCompanyMembers((prev) => prev.filter((m) => m.id !== id));
    triggerToast(`Removed member from workspace`);
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      id: `usr-${Date.now()}`,
      name: inviteName.trim() || inviteEmail.split('@')[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'Active',
      joined: 'Just now'
    };

    setCompanyMembers(prev => [...prev, newMember]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
    triggerToast(`🎉 Invited ${newMember.email} as ${newMember.role}!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)', position: 'relative' }}>
      
      {/* Toast Notification Banner */}
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
          <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: 800 }}>Company Admin Console</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tenant RBAC, User Management, Billing Models & AI Settings</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '12px' }}>
            <ShieldCheck size={14} /> SOC2 Type II Scoped
          </span>
          <button onClick={() => setShowInviteModal(true)} className="btn btn-ai">
            <UserPlus size={16} /> Invite Team Member
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '4px',
        backgroundColor: 'var(--bg-input)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'users', label: 'User & Role Management', icon: Users },
          { id: 'matrix', label: 'Roles & Permissions Matrix', icon: ShieldAlert },
          { id: 'billing', label: 'Pricing & Billing Model', icon: CreditCard },
          { id: 'ai-settings', label: 'Meeting & AI Settings', icon: Bot },
          { id: 'integrations', label: 'Slack & WhatsApp Bridge', icon: Globe }
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
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: USER & ROLE MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Workspace Members ({companyMembers.length})</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manage seat assignments, roles, and security access levels</p>
            </div>

            <button onClick={() => setShowInviteModal(true)} className="btn btn-primary" style={{ fontSize: '12px' }}>
              <Plus size={14} /> Add Member
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Member</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Joined Date</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companyMembers.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{m.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{m.email}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      className="input-field"
                      value={m.role}
                      onChange={(e) => handleRoleChange(m.id, e.target.value)}
                      style={{ fontSize: '12px', padding: '4px 8px', width: 'auto' }}
                    >
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Member">Member</option>
                      <option value="Guest/Client">Guest/Client</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-success">{m.status}</span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{m.joined}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {m.role !== 'Owner' && (
                      <button onClick={() => handleRemoveMember(m.id)} className="btn btn-ghost" style={{ color: 'var(--danger)', padding: '6px' }} title="Remove Member">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: ROLES MATRIX */}
      {activeTab === 'matrix' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Roles & Permissions Matrix</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Granular Access Control Policies (RBAC)</p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Role Name</th>
                <th style={{ padding: '12px' }}>Manage Billing</th>
                <th style={{ padding: '12px' }}>Manage Users</th>
                <th style={{ padding: '12px' }}>View Channels</th>
                <th style={{ padding: '12px' }}>Edit Tasks</th>
                <th style={{ padding: '12px' }}>Admin Media</th>
              </tr>
            </thead>
            <tbody>
              {rolesMatrix.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>{r.role}</td>
                  <td style={{ padding: '12px' }}>{r.manageBilling}</td>
                  <td style={{ padding: '12px' }}>{r.manageUsers}</td>
                  <td style={{ padding: '12px' }}>{r.viewChannels}</td>
                  <td style={{ padding: '12px' }}>{r.editTasks}</td>
                  <td style={{ padding: '12px' }}>{r.adminMedia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PRICING & BILLING */}
      {activeTab === 'billing' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Pricing & Billing Model Selector</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Choose your workspace billing structure</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div
              onClick={() => { setBillingMode('per_seat'); triggerToast("Selected Per-Seat Enterprise Plan"); }}
              className="glass-card"
              style={{
                padding: '24px',
                border: billingMode === 'per_seat' ? '2px solid #00F5FF' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Per-Seat Pricing ($19/seat/mo)</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Best for growing enterprise teams with dynamic seat scaling.</div>
            </div>

            <div
              onClick={() => { setBillingMode('flat_team'); triggerToast("Selected Flat Per-Team Plan ($99/mo)"); }}
              className="glass-card"
              style={{
                padding: '24px',
                border: billingMode === 'flat_team' ? '2px solid #00F5FF' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Flat Per-Team Pricing ($99/mo)</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Unlimited members with fixed monthly billing.</div>
            </div>
          </div>

          <button onClick={() => openPaymentModal('Enterprise Admin Plan')} className="btn btn-ai" style={{ padding: '12px 24px', alignSelf: 'flex-start' }}>
            <CreditCard size={16} /> Upgrade / Manage Stripe Subscription
          </button>
        </div>
      )}

      {/* TAB 4: MEETING & AI SETTINGS */}
      {activeTab === 'ai-settings' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Meeting & AI Automation Settings</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>Auto Transcription Engine</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automatically transcribe WebRTC meeting recordings.</div>
            </div>
            <input type="checkbox" checked={autoTranscription} onChange={(e) => setAutoTranscription(e.target.checked)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>AI Daily Call Schedule</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated executive task summary broadcast.</div>
            </div>
            <select className="input-field" value={aiCallerSchedule} onChange={(e) => setAiCallerSchedule(e.target.value)} style={{ width: 'auto' }}>
              <option value="Daily at 05:00 PM">Daily at 05:00 PM</option>
              <option value="Daily at 09:00 AM">Daily at 09:00 AM</option>
              <option value="Weekly Mondays">Weekly Mondays</option>
            </select>
          </div>
        </div>
      )}

      {/* TAB 5: INTEGRATIONS */}
      {activeTab === 'integrations' && (
        <div className="glass-card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Slack & WhatsApp Bridges</h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>💬 Slack Workspace Bridge</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sync team chat channels directly with Slack API.</div>
            </div>
            <button onClick={() => { setSlackConnected(!slackConnected); triggerToast(slackConnected ? "Slack Disconnected" : "Slack Connected!"); }} className={slackConnected ? "btn btn-secondary" : "btn btn-ai"}>
              {slackConnected ? "Connected ✅" : "Connect Slack"}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px' }}>💚 WhatsApp Meeting Dispatch</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Send 1-click meeting invite links over WhatsApp Web.</div>
            </div>
            <button onClick={() => { setWhatsappConnected(!whatsappConnected); triggerToast(whatsappConnected ? "WhatsApp Disconnected" : "WhatsApp Connected!"); }} className={whatsappConnected ? "btn btn-secondary" : "btn btn-ai"}>
              {whatsappConnected ? "Connected ✅" : "Connect WhatsApp"}
            </button>
          </div>
        </div>
      )}

      {/* INVITE MEMBER MODAL */}
      {showInviteModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '460px', padding: '32px', backgroundColor: '#050505', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Invite New Member</h3>
              <button onClick={() => setShowInviteModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input type="text" className="input-field" placeholder="e.g. Marcus Vance" value={inviteName} onChange={(e) => setInviteName(e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input type="email" className="input-field" placeholder="e.g. marcus@acme.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Assign Role</label>
                <select className="input-field" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                  <option value="Guest/Client">Guest/Client</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowInviteModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
