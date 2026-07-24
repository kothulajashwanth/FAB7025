import React from 'react';
import { Users, DollarSign, TrendingUp, Sparkles, Building2, PhoneCall } from 'lucide-react';

export default function CRM() {
  const deals = [
    { company: 'Stripe Global Inc', val: '$140,000 / yr', stage: 'Demo Completed', probability: '88% Win', lead: 'Sarah Chen' },
    { company: 'Vercel Enterprise', val: '$85,000 / yr', stage: 'Proposal Sent', probability: '94% Win', lead: 'David Kim' },
    { company: 'Linear Systems', val: '$220,000 / yr', stage: 'Negotiation', probability: '75% Win', lead: 'Elena Rostova' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>CRM & Enterprise Sales Pipeline</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI Sentiment Analysis & Win Probability Engine</p>
        </div>
        <button className="btn btn-ai"><Sparkles size={16} /> AI Deal Scoring</button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Active Enterprise Deals</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {deals.map((d, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={16} color="var(--primary)" /> {d.company}
                </div>
                <span className="badge badge-success">{d.probability}</span>
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{d.val}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Stage: {d.stage} • Lead: {d.lead}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
