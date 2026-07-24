import React from 'react';
import { BarChart3, TrendingUp, Sparkles, Zap, Users, ShieldCheck } from 'lucide-react';

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Workspace Analytics & AI Forecasting</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Productivity Index, AI Adoption & Revenue Projections</p>
        </div>
        <button className="btn btn-ai"><Sparkles size={16} /> Export AI Telemetry</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Main Chart Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Team Productivity & Velocity Trend</h3>
            <span className="badge badge-success">+14.2% Growth</span>
          </div>

          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '20px 0', borderBottom: '1px solid var(--border-color)' }}>
            {[
              { label: 'Week 1', val: 65 },
              { label: 'Week 2', val: 78 },
              { label: 'Week 3', val: 84 },
              { label: 'Week 4', val: 94 }
            ].map((bar, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', height: `${bar.val}%`, background: 'linear-gradient(180deg, #2563eb, #7c3aed)', borderRadius: 'var(--radius-sm)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Adoption Metrics */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700 }}>AI Adoption Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Meeting Summarizer</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>96% Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Voice AI Agent</span>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>88% Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Task Generator</span>
              <span style={{ fontWeight: 700, color: 'var(--success)' }}>92% Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
