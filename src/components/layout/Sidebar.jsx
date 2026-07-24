import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Video,
  CheckSquare,
  FolderKanban,
  Zap,
  Calendar as CalendarIcon,
  Folder,
  Users,
  UserCheck,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  PlusCircle,
  Building2,
  Globe,
  UserPlus,
  SlidersHorizontal,
  ShieldAlert,
  Check,
  Plus,
  Edit3,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar() {
  const { currentView, setCurrentView, workspaceProfile, setWorkspaceProfile, userRole } = useApp();
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [activeWorkspaceList, setActiveWorkspaceList] = useState([
    { id: 'ws-1', name: 'Acme Corporation', industry: 'SaaS / Enterprise Software', active: true },
    { id: 'ws-2', name: 'Staykaro Operations', industry: 'Hospitality Tech', active: false },
    { id: 'ws-3', name: 'Vercel Cloud Partner', industry: 'Cloud Engineering', active: false },
    { id: 'ws-4', name: 'Personal Sandbox', industry: 'R&D', active: false }
  ]);

  const menuSections = [
    {
      title: 'CORE WORKSPACE',
      items: [
        { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'GPT-4o' },
        { id: 'chat', label: 'Team Chat', icon: MessageSquare, badge: '5' },
        { id: 'meetings', label: 'Video Meetings', icon: Video, badge: 'Live' },
        { id: 'tasks', label: 'Task Management', icon: CheckSquare, badge: '12' },
        { id: 'projects', label: 'Projects & Goals', icon: FolderKanban, badge: null }
      ]
    },
    {
      title: 'WORKFLOW & STORAGE',
      items: [
        { id: 'automation', label: 'AI Automation', icon: Zap, badge: 'New' },
        { id: 'calendar', label: 'Calendar', icon: CalendarIcon, badge: null },
        { id: 'files', label: 'Drive & Files', icon: Folder, badge: null }
      ]
    },
    {
      title: 'OPERATIONS & PEOPLE',
      items: [
        { id: 'crm', label: 'CRM & Pipeline', icon: Users, badge: null },
        { id: 'hr', label: 'HR & People', icon: UserCheck, badge: null },
        { id: 'finance', label: 'Finance & Billing', icon: CreditCard, badge: null }
      ]
    },
    {
      title: 'ADMIN & SUPER ADMIN',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null },
        { id: 'admin', label: 'Company Admin', icon: ShieldCheck, badge: 'RBAC' },
        { id: 'super-admin', label: 'Super Admin Console', icon: ShieldAlert, badge: 'Staykaro' }
      ]
    },
    {
      title: 'PUBLIC & ONBOARDING',
      items: [
        { id: 'landing', label: 'Landing Page', icon: Globe, badge: 'Public' },
        { id: 'auth', label: 'Auth Screens', icon: UserPlus, badge: null },
        { id: 'onboarding', label: 'Workspace Setup', icon: SlidersHorizontal, badge: null }
      ]
    }
  ];

  const handleSelectWorkspace = (ws) => {
    setActiveWorkspaceList(prev => prev.map(w => ({ ...w, active: w.id === ws.id })));
    setWorkspaceProfile(prev => ({ ...prev, name: ws.name, industry: ws.industry }));
    setShowWorkspaceModal(false);
  };

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      zIndex: 30,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentView('dashboard')}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(236, 72, 153, 0.4)'
          }}>
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <div className="font-heading" style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
              Team<span className="ai-gradient-text">OS</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enterprise AI Hub</div>
          </div>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '10px' }}>v2.4</span>
      </div>

      {/* Interactive Workspace Switcher Button */}
      <div style={{ padding: '12px 16px 4px 16px' }}>
        <button 
          onClick={() => setShowWorkspaceModal(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '13px'
          }}
          title="Switch, Edit, or Create Workspace"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={15} color="var(--primary)" />
            <span style={{ fontWeight: 600 }}>{workspaceProfile?.name || 'Acme Corporation'}</span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </button>
      </div>

      {/* Navigation List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 12px'
      }}>
        {menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              padding: '0 8px 6px 8px'
            }}>
              {section.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '13px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`badge ${isActive ? 'badge-primary' : 'badge-gold'}`} style={{ fontSize: '9px' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* WORKSPACE SWITCHER & CREATION MODAL */}
      {showWorkspaceModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '16px'
        }}>
          <div className="glass-card ai-glow-border" style={{ width: '440px', padding: '24px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Workspace Manager</h3>
              <button onClick={() => setShowWorkspaceModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Switch active workspace or set up a new enterprise environment:
            </div>

            {/* List of Workspaces */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {activeWorkspaceList.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => handleSelectWorkspace(ws)}
                  style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: ws.active ? 'var(--primary-light)' : 'var(--bg-surface)',
                    border: ws.active ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building2 size={16} color={ws.active ? 'var(--primary)' : 'var(--text-muted)'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: ws.active ? 'var(--primary)' : 'var(--text-primary)' }}>{ws.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{ws.industry}</div>
                    </div>
                  </div>
                  {ws.active && <Check size={16} color="var(--primary)" />}
                </div>
              ))}
            </div>

            {/* Actions: Edit Current or Create New */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowWorkspaceModal(false);
                  setCurrentView('onboarding');
                }}
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '12px' }}
              >
                <Edit3 size={14} /> Edit Current Settings
              </button>

              <button
                onClick={() => {
                  setShowWorkspaceModal(false);
                  setCurrentView('landing');
                }}
                className="btn btn-ai"
                style={{ flex: 1, fontSize: '12px' }}
              >
                <Plus size={14} /> + Create New Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
