import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Bot, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  UserCheck,
  ShieldCheck,
  Mail,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WorkspaceCreation() {
  const { setCurrentView, updateWorkspaceProfileData, workspaceProfile, userRole, invitedTeammates, aiCopilotConfig, userName } = useApp();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState(userName || 'Elena Rostova');
  const [companyName, setCompanyName] = useState(workspaceProfile.name || 'Acme Corporation');
  const [industry, setIndustry] = useState(workspaceProfile.industry || 'SaaS / Enterprise Software');
  const [timezone, setTimezone] = useState(workspaceProfile.timezone || 'UTC+5:30 (IST - Indian Standard Time)');
  const [role, setRole] = useState(userRole || 'VP of Product');
  const [invitedEmails, setInvitedEmails] = useState(invitedTeammates ? invitedTeammates.join(', ') : 'alex@acme.com, sarah@acme.com, marcus@acme.com');
  const [aiPersonality, setAiPersonality] = useState(aiCopilotConfig.persona || 'Autonomous Technical Lead (Proactive & Precise)');

  const steps = [
    { num: 1, title: 'Setup Workspace Profile', icon: Building2 },
    { num: 2, title: 'Your Role in Organization', icon: Users },
    { num: 3, title: 'Invite Teammates', icon: Mail },
    { num: 4, title: 'Configure Workspace AI Copilot', icon: Sparkles }
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      updateWorkspaceProfileData({
        fullName,
        companyName,
        industry,
        timezone,
        role,
        invitedEmails,
        aiPersonality
      });
      setCurrentView('dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-app)',
      padding: '32px'
    }}>
      <div className="glass-card ai-glow-border" style={{
        width: '680px',
        maxWidth: '100%',
        padding: '40px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Wizard Header Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {steps.map((s) => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? 'var(--primary)' : isDone ? 'var(--success)' : 'var(--bg-surface)',
                  color: isCurrent || isDone ? '#fff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: isCurrent ? '2px solid var(--primary-light)' : '1px solid var(--border-color)'
                }}>
                  {isDone ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: isCurrent ? 700 : 400,
                  color: isCurrent ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {s.title}
                </span>
                {s.num < 4 && <ChevronRight size={12} color="var(--border-color-strong)" />}
              </div>
            );
          })}
        </div>

        {/* Step 1: Setup Workspace Profile & Your Full Name */}
        {step === 1 && (
          <div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>1. Setup Workspace Profile</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Define your profile name and organization settings. Your name will be displayed across the website shell.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Your Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Jashwanth / Elena Rostova"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Workspace / Company Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Industry Sector</label>
                <select className="input-field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option>SaaS / Enterprise Software</option>
                  <option>Fintech & Banking</option>
                  <option>Artificial Intelligence / ML</option>
                  <option>Healthcare & Biotech</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Primary Timezone</label>
                <select className="input-field" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  <option>UTC+5:30 (IST - Indian Standard Time)</option>
                  <option>UTC-5 (Eastern Time - New York)</option>
                  <option>UTC-8 (Pacific Time - San Francisco)</option>
                  <option>UTC+1 (Central European Time - London/Paris)</option>
                  <option>UTC+8 (Singapore / Asia Time)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Your Role in Organization */}
        {step === 2 && (
          <div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>2. Your Role in Organization</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              TeamOS customizes your workspace widgets, Linear Kanban priority rules, and AI suggestions based on your role.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { title: 'VP of Product & Design', desc: 'Linear roadmap, Figma token sync, product specs' },
                { title: 'Engineering Lead & Tech', desc: 'GitHub sync, code AI assistant, sprint velocity' },
                { title: 'Executive & Founder', desc: 'ARR dashboard, high-level AI briefings, budget' },
                { title: 'Sales & CRM Lead', desc: 'Deals pipeline, meeting AI follow-up, client insights' }
              ].map((r, idx) => (
                <div
                  key={idx}
                  onClick={() => setRole(r.title)}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderColor: role === r.title ? 'var(--primary)' : 'var(--border-color)',
                    backgroundColor: role === r.title ? 'var(--primary-light)' : 'transparent'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: 'var(--text-primary)' }}>{r.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Invite Teammates */}
        {step === 3 && (
          <div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>3. Invite Teammates</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Add comma-separated emails to provision seats automatically. Enforces seat caps specified in your plan.
            </p>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Team Member Emails</label>
              <textarea
                className="input-field"
                rows={4}
                value={invitedEmails}
                onChange={(e) => setInvitedEmails(e.target.value)}
              />
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Default channels (`#general`, `#announcements`) will be created via Stream API upon activation.
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Configure Workspace AI Copilot */}
        {step === 4 && (
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}><Sparkles size={12} /> Autonomous AI Setup</div>
            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>4. Configure Workspace AI Copilot</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Select your AI persona style, auto-transcription rules, and automated meeting action item triggers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>AI Persona Style</label>
                <select className="input-field" value={aiPersonality} onChange={(e) => setAiPersonality(e.target.value)}>
                  <option>Autonomous Technical Lead (Proactive & Precise)</option>
                  <option>Executive Strategist (High-level Summaries)</option>
                  <option>Creative Product Designer (User-Centric & Aesthetic)</option>
                </select>
              </div>

              <div className="glass-card" style={{ padding: '16px', backgroundColor: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>Auto-Extract Action Items from Video Meetings</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Creates Linear tasks automatically when meetings end.</div>
                  </div>
                  <span className="badge badge-success">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn btn-secondary">Previous Step</button>
          ) : <div />}

          <button onClick={handleNext} className="btn btn-ai" style={{ padding: '10px 24px' }}>
            {step === 4 ? 'Save & Launch Upgraded Workspace' : 'Continue Step'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
