import React, { useState } from 'react';
import { Bell, CheckCheck, Sparkles, Filter, ShieldAlert, MessageSquare, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationsCenter() {
  const { notifications, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState('all');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>AI Notification Center</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI Prioritized Notifications & Digest Filters</p>
        </div>
        <button onClick={markAllNotificationsRead} className="btn btn-secondary"><CheckCheck size={16} /> Mark All Read</button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => (
            <div key={n.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: n.read ? 'var(--bg-surface)' : 'var(--primary-light)', border: '1px solid var(--border-color)' }}>
              <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'var(--bg-card)' }}>
                <Sparkles size={18} color="var(--accent)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{n.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{n.message}</div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
