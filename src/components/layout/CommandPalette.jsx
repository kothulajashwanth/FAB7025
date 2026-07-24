import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckSquare, 
  Video, 
  MessageSquare, 
  Zap, 
  Moon, 
  Sun, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommandPalette() {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    setCurrentView, 
    toggleTheme, 
    theme 
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const actions = [
    { label: 'Go to AI Assistant', icon: Sparkles, category: 'Navigation', view: 'ai-assistant' },
    { label: 'Go to Task Kanban Board', icon: CheckSquare, category: 'Navigation', view: 'tasks' },
    { label: 'Start Instant Video Meeting', icon: Video, category: 'Action', view: 'meetings' },
    { label: 'Open Team Chat', icon: MessageSquare, category: 'Navigation', view: 'chat' },
    { label: 'Run AI Risk Analysis Workflow', icon: Zap, category: 'AI Command', view: 'automation' },
    { label: 'Go to Admin Security Panel', icon: ShieldCheck, category: 'Admin', view: 'admin' },
    { label: `Toggle Theme (Currently ${theme})`, icon: theme === 'dark' ? Sun : Moon, category: 'Preferences', action: toggleTheme }
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item) => {
    if (item.view) setCurrentView(item.view);
    if (item.action) item.action();
    setIsCommandPaletteOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '120px',
      zIndex: 100
    }}>
      <div className="glass-card" style={{
        width: '580px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color-strong)',
        overflow: 'hidden'
      }}>
        {/* Search Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <Search size={20} color="var(--primary)" />
          <input
            type="text"
            placeholder="Type a command or ask TeamOS AI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontFamily: 'var(--font-family)'
            }}
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ padding: '12px', maxHeight: '340px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
              No commands found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-accent" style={{ fontSize: '10px' }}>{item.category}</span>
                    <ArrowRight size={14} color="var(--text-muted)" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Footer */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <span>Press <kbd style={{ background: 'var(--bg-input)', padding: '2px 6px', borderRadius: '4px' }}>ESC</kbd> to exit</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="var(--accent)" /> TeamOS AI Copilot Engine
          </span>
        </div>
      </div>
    </div>
  );
}
