import React, { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { 
  Search, 
  Sparkles, 
  Mic, 
  Bell, 
  Sun, 
  Moon, 
  ChevronDown, 
  ShieldAlert, 
  Globe, 
  UserPlus, 
  CheckCheck,
  Command,
  Users,
  User,
  SlidersHorizontal,
  LogOut,
  ShieldCheck,
  Circle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { 
    theme, 
    toggleTheme, 
    currentView, 
    setCurrentView, 
    workspaceMode,
    toggleWorkspaceMode,
    userName,
    setIsCommandPaletteOpen,
    isCopilotOpen,
    setIsCopilotOpen,
    notifications,
    markAllNotificationsRead,
    isVoiceActive,
    setIsVoiceActive,
    userRole,
    handleSignOut
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userStatus, setUserStatus] = useState('Online'); // 'Online' | 'Busy' | 'Away' | 'DND'

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="glass-panel" style={{
      height: '64px',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 40,
      borderBottom: '1px solid var(--border-color)',
      position: 'relative'
    }}>
      {/* Left: Search & Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => setIsCommandPaletteOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '13px',
            width: '260px',
            textAlign: 'left'
          }}
        >
          <Search size={16} color="var(--primary)" />
          <span>Search or ask AI...</span>
          <span style={{
            marginLeft: 'auto',
            padding: '2px 6px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <Command size={10} /> K
          </span>
        </button>

        {/* Workspace Mode Switcher Pill */}
        <button
          onClick={toggleWorkspaceMode}
          className={`btn ${workspaceMode === 'team' ? 'badge-primary' : 'badge-gold'}`}
          style={{ fontSize: '12px', padding: '6px 12px', cursor: 'pointer' }}
          title="Switch between Team Company Mode & Individual Solo Mode"
        >
          {workspaceMode === 'team' ? <Users size={14} /> : <User size={14} />}
          <span>{workspaceMode === 'team' ? 'Team Mode' : 'Individual Mode'}</span>
        </button>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Voice AI Agent Toggle */}
        <button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          className={isVoiceActive ? 'btn btn-ai animate-pulse-glow' : 'btn btn-secondary'}
          style={{ fontSize: '13px', padding: '7px 12px' }}
          title="Toggle Voice AI Assistant Mode"
        >
          <Mic size={15} color={isVoiceActive ? '#ffffff' : 'var(--accent)'} />
          {isVoiceActive ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Voice AI Live
              <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <span className="voice-wave-bar" style={{ animationDelay: '0.1s' }} />
                <span className="voice-wave-bar" style={{ animationDelay: '0.3s' }} />
                <span className="voice-wave-bar" style={{ animationDelay: '0.2s' }} />
              </span>
            </span>
          ) : (
            'Voice Agent'
          )}
        </button>

        {/* AI Copilot Drawer Toggle */}
        <button
          onClick={() => setIsCopilotOpen(!isCopilotOpen)}
          className="btn btn-ai"
          style={{ fontSize: '13px', padding: '7px 14px' }}
        >
          <Sparkles size={15} />
          Copilot
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="btn btn-ghost" 
          style={{ width: '38px', height: '38px', padding: 0, borderRadius: 'var(--radius-full)' }}
          title="Toggle Dark / Light Mode"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="btn btn-ghost"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: 'var(--radius-full)', position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--danger)',
                borderRadius: '50%',
                boxShadow: '0 0 8px var(--danger)'
              }} />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '340px',
              zIndex: 50,
              padding: '16px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>Notifications ({unreadCount})</span>
                <button 
                  onClick={markAllNotificationsRead} 
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <CheckCheck size={14} /> Mark all read
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: n.read ? 'transparent' : 'var(--primary-light)',
                    border: '1px solid var(--border-color)',
                    fontSize: '12px'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{n.title}</div>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>{n.message}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Profile Dropdown Widget (Dynamic userName) */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserButton afterSignOutUrl="/" />
            <div
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px 4px 6px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{userName || 'Elena Rostova'}</span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </div>
          </div>

          {/* Interactive Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="glass-card" style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '240px',
              zIndex: 50,
              padding: '12px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{userName || 'Elena Rostova'}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>user@teamos.app</div>
                <span className="badge badge-accent" style={{ marginTop: '4px', fontSize: '10px' }}>{userRole || 'VP of Product'}</span>
              </div>

              {/* Status Picker */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>STATUS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  {['Online', 'Busy', 'Away', 'DND'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setUserStatus(st)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: userStatus === st ? 'var(--primary-light)' : 'transparent',
                        color: userStatus === st ? 'var(--primary)' : 'var(--text-secondary)',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Links */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => {
                    setCurrentView('onboarding');
                    setShowProfileDropdown(false);
                  }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '12px', padding: '6px 8px' }}
                >
                  <SlidersHorizontal size={14} color="var(--primary)" /> Setup Profile & Name
                </button>

                <button
                  onClick={() => {
                    setCurrentView('admin');
                    setShowProfileDropdown(false);
                  }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '12px', padding: '6px 8px' }}
                >
                  <ShieldCheck size={14} color="var(--success)" /> Company Admin Console
                </button>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    handleSignOut();
                  }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '12px', padding: '6px 8px', color: 'var(--danger)' }}
                >
                  <LogOut size={14} /> Sign Out (Clerk Session Exit)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
