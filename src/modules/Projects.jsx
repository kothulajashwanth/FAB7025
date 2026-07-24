import React, { useState } from 'react';
import { 
  FolderKanban, 
  TrendingUp, 
  Target, 
  Users, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Zap,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export default function Projects() {
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [forecastToast, setForecastToast] = useState(null);

  const roadmaps = [
    { name: 'TeamOS 2.0 Enterprise Release', progress: 88, status: 'On Track', milestone: 'Q3 Launch', lead: 'Sarah Chen', forecastDate: 'Jul 28, 2026' },
    { name: 'Voice AI Real-Time Agent', progress: 94, status: 'Ahead', milestone: 'WebRTC Protocol', lead: 'Alex Rivera', forecastDate: 'Jul 25, 2026' },
    { name: 'SOC2 & HIPAA Compliance Enforcer', progress: 65, status: 'At Risk', milestone: 'Audit Log API', lead: 'Marcus Vance', forecastDate: 'Aug 04, 2026' }
  ];

  const handleRealignForecast = () => {
    setShowForecastModal(false);
    setForecastToast('AI Velocity Engine re-aligned! Recalculated velocity to 98% with 0 blockers.');
    setTimeout(() => setForecastToast(null), 4500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 800 }}>Projects, Roadmaps & OKRs</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Enterprise Milestone Tracking & AI Risk Detection</p>
        </div>
        <button onClick={() => setShowForecastModal(true)} className="btn btn-ai">
          <Sparkles size={16} /> AI Velocity Forecast
        </button>
      </div>

      {forecastToast && (
        <div className="badge badge-success" style={{ padding: '10px 16px', fontSize: '13px' }}>
          <CheckCircle2 size={16} /> {forecastToast}
        </div>
      )}

      {/* Portfolio Roadmaps */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Active Portfolio Milestones</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {roadmaps.map((r, idx) => (
            <div key={idx} style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>{r.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '12px' }}>Lead: {r.lead}</span>
                  <span style={{ fontSize: '12px', color: 'var(--primary)', marginLeft: '12px' }}>Forecast: {r.forecastDate}</span>
                </div>
                <span className={`badge ${r.status === 'On Track' || r.status === 'Ahead' ? 'badge-success' : 'badge-danger'}`}>
                  {r.status}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'var(--bg-input)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.progress}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, width: '45px' }}>{r.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OKR & Team Workload Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>
            <Target size={18} color="var(--primary)" /> Q3 Objectives & Key Results (OKRs)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600 }}>KR 1: Achieve sub-100ms latency across 100% of voice agent streams</div>
              <div style={{ fontSize: '11px', color: 'var(--success)', marginTop: '4px' }}>AI Confidence Score: 96%</div>
            </div>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600 }}>KR 2: Complete SOC2 Type II audit compliance certification</div>
              <div style={{ fontSize: '11px', color: 'var(--warning)', marginTop: '4px' }}>AI Confidence Score: 78% (Requires Audit Log API finish)</div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>
            <Users size={18} color="var(--accent)" /> Team Workload Heatmap
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Alex Rivera (AI)', load: '92% (Heavy)', status: 'danger' },
              { name: 'Sarah Chen (UX)', load: '78% (Optimal)', status: 'success' },
              { name: 'Marcus Vance (Infra)', load: '85% (High)', status: 'warning' }
            ].map((w, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{w.name}</span>
                <span className={`badge badge-${w.status}`}>{w.load}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Velocity Forecast Modal */}
      {showForecastModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="glass-card ai-glow-border" style={{
            width: '560px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: 'var(--tertiary-gold)' }}>
                <Sparkles size={18} /> AI Velocity & Risk Forecast Engine
              </div>
              <button onClick={() => setShowForecastModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--primary)' }}>Sprint Completion Forecast</span>
                <span className="badge badge-success">94% Confidence</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Based on Jira/Linear commit velocity and WebRTC audio tests, <strong>TeamOS 2.0 Enterprise Release</strong> is projected for completion on <strong>July 28, 2026</strong>.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '12px' }}>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>🔥 <strong>Ahead of Schedule</strong>: Voice AI Real-Time Agent</span>
                <span className="badge badge-success">Jul 25, 2026</span>
              </div>
              <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>⚠️ <strong>Potential Bottleneck</strong>: SOC2 Audit Log Webhooks</span>
                <span className="badge badge-warning">Requires 2 Days Extra</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowForecastModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Close</button>
              <button onClick={handleRealignForecast} className="btn btn-ai" style={{ flex: 1 }}>
                <Zap size={14} /> Re-align Velocity Forecast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
