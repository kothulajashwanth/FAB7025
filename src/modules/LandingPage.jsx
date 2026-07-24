import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Video, 
  MessageSquare, 
  FolderKanban, 
  Bot, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Cpu, 
  Lock, 
  Terminal, 
  ChevronRight,
  Sun,
  Moon,
  Layers,
  Activity,
  Code,
  Sliders,
  DollarSign,
  Check,
  ZapOff,
  Flame,
  CheckSquare,
  Repeat
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Tilt from '../components/ui/Tilt';

const COLOR_MIXES = {
  aurora: {
    id: 'aurora',
    name: 'Aurora Neon',
    primary: '#00f0ff',
    secondary: '#7000ff',
    tertiary: '#ff007a',
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 50%, #ff007a 100%)',
    heroGradient: 'linear-gradient(135deg, #00f0ff 0%, #a855f7 45%, #ff007a 100%)',
    badgeBg: 'rgba(0, 240, 255, 0.12)',
    badgeText: '#00f0ff',
    badgeBorder: 'rgba(0, 240, 255, 0.35)',
    bgGlow1: 'radial-gradient(circle, rgba(112, 0, 255, 0.28) 0%, rgba(0, 240, 255, 0.12) 100%)',
    bgGlow2: 'radial-gradient(circle, rgba(255, 0, 122, 0.28) 0%, rgba(112, 0, 255, 0.12) 100%)',
    cardBorder: 'rgba(112, 0, 255, 0.35)',
    glowShadow: '0 20px 60px rgba(112, 0, 255, 0.35)',
    btnGradient: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 50%, #ff007a 100%)',
    dots: ['#00f0ff', '#7000ff', '#ff007a']
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Coral',
    primary: '#ff416c',
    secondary: '#ff4b2b',
    tertiary: '#f7b731',
    gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #f7b731 100%)',
    heroGradient: 'linear-gradient(135deg, #ff416c 0%, #ff758c 50%, #f7b731 100%)',
    badgeBg: 'rgba(255, 75, 43, 0.12)',
    badgeText: '#ff758c',
    badgeBorder: 'rgba(255, 75, 43, 0.35)',
    bgGlow1: 'radial-gradient(circle, rgba(255, 65, 108, 0.28) 0%, rgba(255, 75, 43, 0.12) 100%)',
    bgGlow2: 'radial-gradient(circle, rgba(247, 183, 49, 0.28) 0%, rgba(255, 65, 108, 0.12) 100%)',
    cardBorder: 'rgba(255, 75, 43, 0.35)',
    glowShadow: '0 20px 60px rgba(255, 75, 43, 0.35)',
    btnGradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #f7b731 100%)',
    dots: ['#ff416c', '#ff4b2b', '#f7b731']
  },
  emerald: {
    id: 'emerald',
    name: 'Cyber Emerald',
    primary: '#10b981',
    secondary: '#06b6d4',
    tertiary: '#3b82f6',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    heroGradient: 'linear-gradient(135deg, #34d399 0%, #06b6d4 50%, #3b82f6 100%)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeText: '#34d399',
    badgeBorder: 'rgba(16, 185, 129, 0.35)',
    bgGlow1: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(6, 182, 212, 0.12) 100%)',
    bgGlow2: 'radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(16, 185, 129, 0.12) 100%)',
    cardBorder: 'rgba(16, 185, 129, 0.35)',
    glowShadow: '0 20px 60px rgba(16, 185, 129, 0.35)',
    btnGradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)',
    dots: ['#10b981', '#06b6d4', '#3b82f6']
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire Ocean',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    tertiary: '#ec4899',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
    heroGradient: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
    badgeBg: 'rgba(59, 130, 246, 0.12)',
    badgeText: '#60a5fa',
    badgeBorder: 'rgba(59, 130, 246, 0.35)',
    bgGlow1: 'radial-gradient(circle, rgba(59, 130, 246, 0.28) 0%, rgba(139, 92, 246, 0.12) 100%)',
    bgGlow2: 'radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, rgba(59, 130, 246, 0.12) 100%)',
    cardBorder: 'rgba(59, 130, 246, 0.35)',
    glowShadow: '0 20px 60px rgba(59, 130, 246, 0.35)',
    btnGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
    dots: ['#3b82f6', '#8b5cf6', '#ec4899']
  }
};

const LIGHT_RICH_MIX = {
  id: 'light-rich',
  name: 'Rich Platinum Indigo',
  primary: '#4f46e5',
  secondary: '#7c3aed',
  tertiary: '#0284c7',
  gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0284c7 100%)',
  heroGradient: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #0284c7 100%)',
  badgeBg: 'rgba(79, 70, 229, 0.08)',
  badgeText: '#4338ca',
  badgeBorder: 'rgba(79, 70, 229, 0.25)',
  bgGlow1: 'radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, rgba(2, 132, 199, 0.05) 100%)',
  bgGlow2: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(79, 70, 229, 0.05) 100%)',
  cardBorder: 'rgba(79, 70, 229, 0.18)',
  glowShadow: '0 20px 48px rgba(79, 70, 229, 0.16)',
  btnGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0284c7 100%)',
  dots: ['#4f46e5', '#7c3aed', '#0284c7']
};

export default function LandingPage() {
  const { setCurrentView, theme, toggleTheme, handlePlanCheckoutSelect, launchWorkspaceGate, isAuthenticated } = useApp();
  const [heroTab, setHeroTab] = useState('chat');
  const [teamSize, setTeamSize] = useState(25);
  const [billingCycle, setBillingCycle] = useState('annual');
  const [activeMixKey, setActiveMixKey] = useState('aurora');

  const mix = theme === 'light' ? LIGHT_RICH_MIX : COLOR_MIXES[activeMixKey];

  const perSeatPriceINR = billingCycle === 'annual' ? 1499 : 1799;
  const starterPriceINR = billingCycle === 'annual' ? 499 : 599;
  const flatPriceINR = billingCycle === 'annual' ? 4999 : 5999;
  const fragmentedCostPerUserINR = 4800;
  const annualSavingsINR = Math.round((fragmentedCostPerUserINR - perSeatPriceINR) * teamSize * 12);

  const productSurfaces = [
    { id: 'chat', label: '1. Unified Chat', icon: MessageSquare, tag: 'Stream API', color: '#00f0ff' },
    { id: 'video', label: '2. Live Video Studio', icon: Video, tag: 'LiveKit Cloud', color: '#ff416c' },
    { id: 'kanban', label: '3. Linear Kanban', icon: FolderKanban, tag: 'Auto-Tasking', color: '#f7b731' },
    { id: 'ai', label: '4. GPT-4o Copilot', icon: Bot, tag: 'Vector RAG', color: '#10b981' }
  ];

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-app)', 
      color: 'var(--text-primary)', 
      minHeight: '100vh', 
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Dynamic Animated Ambient Background Blobs */}
      <div 
        className="ambient-blob" 
        style={{ 
          top: '-100px', 
          left: '-100px', 
          width: '650px', 
          height: '650px', 
          background: mix.bgGlow1, 
          opacity: theme === 'light' ? 0.05 : 0.45,
          transition: 'all 0.8s ease'
        }} 
      />
      <div 
        className="ambient-blob" 
        style={{ 
          top: '30%', 
          right: '-150px', 
          width: '700px', 
          height: '700px', 
          background: mix.bgGlow2, 
          opacity: theme === 'light' ? 0.05 : 0.45,
          transition: 'all 0.8s ease'
        }} 
      />
      <div 
        className="ambient-blob" 
        style={{ 
          top: '1200px', 
          left: '10%', 
          width: '800px', 
          height: '800px', 
          background: mix.bgGlow1, 
          transition: 'all 0.8s ease'
        }} 
      />

      {/* Sticky Handcrafted Navigation Bar */}
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '72px',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: mix.gradient,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 16px ${mix.badgeText}40`,
            transition: 'all 0.4s ease'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span className="font-heading" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>TeamOS</span>
            <span style={{ 
              marginLeft: '10px', 
              fontSize: '11px', 
              fontFamily: 'var(--font-mono)', 
              padding: '2px 8px', 
              borderRadius: '999px',
              backgroundColor: mix.badgeBg,
              color: mix.badgeText,
              border: `1px solid ${mix.badgeBorder}`,
              fontWeight: 700
            }}>
              v2.4 COLOUR
            </span>
          </div>
        </div>

        {/* Center Links */}
        <div style={{ display: 'flex', gap: '28px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <a href="#architecture" style={{ color: 'inherit', textDecoration: 'none' }}>Architecture</a>
          <a href="#paradigm" style={{ color: 'inherit', textDecoration: 'none' }}>Paradigm Shift</a>
          <a href="#calculator" style={{ color: 'inherit', textDecoration: 'none' }}>ROI Calculator</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
        </div>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={toggleTheme} className="btn btn-ghost" style={{ padding: '8px' }}>
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {isAuthenticated ? (
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className="btn"
              style={{
                background: mix.btnGradient,
                color: '#ffffff',
                boxShadow: mix.glowShadow,
                padding: '10px 22px',
                fontWeight: 800,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              Continue to Dashboard <ArrowRight size={14} />
            </button>
          ) : (
            <>
              <button onClick={() => setCurrentView('auth')} className="btn btn-secondary">
                Sign In / Sign Up
              </button>
              <button 
                onClick={() => launchWorkspaceGate('dashboard')} 
                className="btn"
                style={{
                  background: mix.btnGradient,
                  color: '#ffffff',
                  boxShadow: mix.glowShadow,
                  padding: '10px 20px',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                Launch Workspace <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* SECTION 1: EDITORIAL HERO (Asymmetrical Composition with Vivid Mixes) */}
      <section style={{ padding: '80px 40px 60px 40px', maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left Column */}
          <div>
            <div style={{ 
              marginBottom: '20px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: theme === 'light' ? '#e0e7ff' : mix.badgeBg,
              border: `1px solid ${theme === 'light' ? '#c7d2fe' : mix.badgeBorder}`,
              color: theme === 'light' ? '#3730a3' : mix.badgeText,
              fontSize: '12px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: mix.primary, boxShadow: `0 0 10px ${mix.primary}` }} />
              [ TEAMOS 2.4 — VIVID COLOUR SUITE ]
            </div>

            <h1 className="font-heading" style={{ 
              fontSize: '52px', 
              fontWeight: 900, 
              lineHeight: '1.15',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              color: 'var(--text-primary)'
            }}>
              The Operating System for{' '}
              <span style={theme === 'light' ? {
                color: '#4338ca',
                fontWeight: 900
              } : {
                background: mix.heroGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                High-Velocity Teams.
              </span>
            </h1>

            <p style={{ 
              fontSize: '18px', 
              color: theme === 'light' ? '#1e293b' : 'var(--text-secondary)', 
              lineHeight: '1.6', 
              marginBottom: '36px', 
              maxWidth: '540px',
              fontWeight: 500
            }}>
              Consolidating Slack, Zoom, Notion, Linear, Loom, and ChatGPT into one high-performance, AI-native environment.
            </p>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '48px' }}>
              <button 
                onClick={() => isAuthenticated ? setCurrentView('dashboard') : setCurrentView('auth')} 
                className="btn"
                style={{ 
                  background: mix.btnGradient,
                  color: '#ffffff',
                  boxShadow: mix.glowShadow,
                  padding: '16px 32px', 
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
              >
                {isAuthenticated ? 'Continue to Dashboard' : 'Start 14-Day Free Trial'} <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <ShieldCheck size={18} style={{ color: mix.primary }} /> SOC2 Type II Scoped
              </div>
            </div>

            {/* Key Metric Indicators */}
            <div style={{ 
              borderTop: '1px solid var(--border-color)', 
              paddingTop: '28px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '20px' 
            }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface)', border: `1px solid ${mix.badgeBorder}` }}>
                <div className="font-mono" style={{ fontSize: '26px', fontWeight: 800, background: mix.heroGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>0ms</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Audio Voice Latency</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div className="font-mono" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>SOC2</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Type II Certified</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div className="font-mono" style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b' }}>100%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Zero Data Retention</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Product Canvas with Neon Color Borders */}
          <Tilt>
            <div className="glass-card" style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: mix.glowShadow,
              border: `1.5px solid ${mix.cardBorder}`,
              transition: 'all 0.5s ease'
            }}>
              {/* Product Canvas Header */}
              <div style={{ 
                padding: '14px 20px', 
                borderBottom: '1px solid var(--border-color)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: 'var(--bg-elevated)' 
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>teamos.app/preview</span>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '3px 10px', 
                  borderRadius: '999px', 
                  backgroundColor: mix.badgeBg, 
                  color: mix.badgeText,
                  border: `1px solid ${mix.badgeBorder}`
                }}>
                  ● Live Engine
                </span>
              </div>

              {/* Surface Switcher Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
                {productSurfaces.map((s) => {
                  const Icon = s.icon;
                  const isSel = heroTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setHeroTab(s.id)}
                      style={{
                        flex: 1,
                        padding: '14px 10px',
                        backgroundColor: isSel ? 'var(--bg-surface)' : 'transparent',
                        border: 'none',
                        borderBottom: isSel ? `3px solid ${s.color}` : '3px solid transparent',
                        color: isSel ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontWeight: isSel ? 800 : 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={14} style={{ color: isSel ? s.color : 'inherit' }} /> {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Surface Canvas Viewport */}
              <div style={{ padding: '28px', minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {heroTab === 'chat' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%', border: `2px solid ${mix.primary}` }} />
                      <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-input)', fontSize: '13px', flex: 1, border: '1px solid var(--border-color)' }}>
                        <div style={{ fontWeight: 700, marginBottom: '2px' }}>Sarah Chen <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>10:42 AM</span></div>
                        Voice AI streaming buffer is live at 0ms audio latency!
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: mix.gradient, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot size={18} />
                      </div>
                      <div style={{ 
                        padding: '14px', 
                        borderRadius: 'var(--radius-md)', 
                        backgroundColor: mix.badgeBg, 
                        border: `1px solid ${mix.badgeBorder}`, 
                        fontSize: '13px', 
                        flex: 1 
                      }}>
                        <div style={{ fontWeight: 800, color: mix.badgeText, marginBottom: '2px' }}>TeamOS Copilot</div>
                        ✨ Created Linear Task <strong>TSK-102: Voice AI Waveform Buffer</strong> & assigned to Alex Rivera.
                      </div>
                    </div>
                  </div>
                )}

                {heroTab === 'video' && (
                  <div style={{ backgroundColor: '#090b10', borderRadius: 'var(--radius-md)', padding: '20px', color: '#fff', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '12px' }}>
                      <span style={{ fontWeight: 700, color: '#10b981' }}>🟢 LiveKit WebRTC HD Studio</span>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', fontWeight: 700, fontSize: '11px' }}>REC 00:04:14</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: '180px' }}>
                      <div style={{ backgroundColor: '#141824', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #ff416c' }} />
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>Elena Rostova (Host)</span>
                      </div>
                      <div style={{ backgroundColor: '#141824', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid #00f0ff' }} />
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>Alex Rivera (Staff AI)</span>
                      </div>
                    </div>
                  </div>
                )}

                {heroTab === 'kanban' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Linear Sprint Backlog</span>
                      <span style={{ fontSize: '11px', color: '#f7b731', fontWeight: 700 }}>Sprint 24 ● Active</span>
                    </div>
                    {[
                      { id: 'TSK-101', title: 'Design TeamOS Dark/Light Tokens', priority: 'P0', tag: 'UI/UX', color: '#ff007a' },
                      { id: 'TSK-102', title: 'WebRTC Audio Stream Buffer', priority: 'P0', tag: 'AI Voice', color: '#00f0ff' }
                    ].map((t) => (
                      <div key={t.id} style={{ 
                        padding: '14px', 
                        borderRadius: 'var(--radius-md)', 
                        backgroundColor: 'var(--bg-input)', 
                        border: `1px solid var(--border-color)`, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: t.color }} />
                          <span style={{ fontWeight: 700, fontSize: '13px' }}>{t.id}: {t.title}</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: `${t.color}20`, color: t.color }}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                )}

                {heroTab === 'ai' && (
                  <div style={{ 
                    padding: '20px', 
                    borderRadius: 'var(--radius-md)', 
                    backgroundColor: mix.badgeBg, 
                    border: `1px solid ${mix.badgeBorder}` 
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: mix.badgeText, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} /> GPT-4o Workspace RAG Vector Search
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
                      "Analyzed 42 video meeting transcripts, 128 code files, and Notion docs. Zero blockers found for Q3 launch."
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* SECTION 2: EDITORIAL TYPOGRAPHIC STATEMENT (UPGRADED PARADIGM SHIFT) */}
      <section id="paradigm" style={{ padding: '100px 40px', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Tilt>
          <div className="glass-card" style={{
            padding: '64px 48px',
            borderRadius: 'var(--radius-xl)',
            background: `radial-gradient(ellipse at top, ${mix.badgeBg}, var(--bg-surface))`,
            border: `1.5px solid ${mix.cardBorder}`,
            boxShadow: mix.glowShadow,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Shimmering Eyebrow Badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '8px 20px', 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: 'var(--bg-elevated)', 
              border: `1px solid ${mix.badgeBorder}`, 
              marginBottom: '28px' 
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: mix.primary, boxShadow: `0 0 12px ${mix.primary}` }} />
              <span className="font-mono" style={{ fontSize: '12px', fontWeight: 800, color: mix.badgeText, letterSpacing: '0.1em' }}>
                ✨ [ THE PARADIGM SHIFT ]
              </span>
            </div>

            {/* Glowing Cinematic Headline Quote */}
            <h2 className="font-heading" style={{
              fontSize: '42px',
              fontWeight: 900,
              lineHeight: '1.3',
              maxWidth: '960px',
              margin: '0 auto 28px auto',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>
              "We didn't just build another chat or video app. We built the{' '}
              <span style={theme === 'light' ? {
                color: '#4338ca',
                fontWeight: 900,
                textDecoration: 'underline decoration-wavy #6366f1'
              } : { 
                background: mix.heroGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'underline decoration-wavy decoration-primary' 
              }}>
                AI layer that connects work capture automatically.
              </span>"
            </h2>

            {/* Subtitle Statement */}
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 48px auto',
              lineHeight: '1.6',
              fontWeight: 500
            }}>
              Stop wasting hours manually taking meeting minutes, creating Jira issues, or updating status channels. TeamOS handles the execution glue.
            </p>

            {/* High-Impact Visual Contrast Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'left' }}>
              <div style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
                  <ZapOff size={16} /> <span>MANUAL PROCESS</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>45 Mins Taking Meeting Notes</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manually writing summaries, typing task lists, and emailing updates to teammates.</div>
              </div>

              <div style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: mix.badgeBg, border: `1px solid ${mix.badgeBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: mix.badgeText, fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
                  <Sparkles size={16} /> <span>TEAMOS AUTOMATION</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px', color: mix.badgeText }}>0ms Real-Time AI Extraction</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>GPT-4o records, transcribes, and creates Linear/Jira tasks with assigned owners automatically.</div>
              </div>

              <div style={{ padding: '24px', borderRadius: 'var(--radius-lg)', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '12px', fontWeight: 800, marginBottom: '8px' }}>
                  <Flame size={16} /> <span>TOTAL SYNC VELOCITY</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '6px', color: '#f59e0b' }}>Single-Window OS</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Unified Chat, WebRTC Video, Backlog, & Vector RAG Memory in one workspace.</div>
              </div>
            </div>
          </div>
        </Tilt>
      </section>

      {/* SECTION 3: TECHNICAL CASE STUDY & BENCHMARKS (#architecture) */}
      <section id="architecture" style={{ padding: '100px 40px', maxWidth: '1380px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '4px 14px', 
          borderRadius: '999px', 
          backgroundColor: mix.badgeBg, 
          color: mix.badgeText, 
          fontSize: '11px', 
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          marginBottom: '16px' 
        }}>
          [ SECTION 4.1 & 5 — ENGINEERING SPECIFICATION ]
        </div>
        <h2 className="font-heading" style={{ fontSize: '38px', fontWeight: 900, marginBottom: '48px' }}>
          Enterprise System Architecture & Managed Infrastructure
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {/* Card 1 */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: mix.btnGradient, color: '#ffffff', width: 'fit-content', marginBottom: '20px', boxShadow: mix.glowShadow }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Frontend & Core API Layer</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Next.js 14 App Router paired with NestJS Node.js core backend enforcing multi-tenant Row-Level Security (RLS) across Postgres.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', color: '#ffffff', width: 'fit-content', marginBottom: '20px', boxShadow: '0 10px 24px rgba(255, 65, 108, 0.3)' }}>
              <Video size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>LiveKit Cloud WebRTC Video</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Low-latency WebRTC video rooms, participant recording hooks, and automated audio transcription webhooks.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', color: '#ffffff', width: 'fit-content', marginBottom: '20px', boxShadow: '0 10px 24px rgba(16, 185, 129, 0.3)' }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Python FastAPI AI Microservice</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              High-throughput FastAPI microservice powering GPT-4o action item extraction, RAG vector indexing, and AI Caller Agents.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FINANCIAL ROI CALCULATOR (#calculator) */}
      <section id="calculator" style={{ padding: '100px 40px', backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '4px 14px', 
            borderRadius: '999px', 
            backgroundColor: mix.badgeBg, 
            color: mix.badgeText, 
            fontSize: '11px', 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800,
            marginBottom: '16px' 
          }}>
            [ COST CONSOLIDATION ENGINE ]
          </div>
          <h2 className="font-heading" style={{ fontSize: '38px', fontWeight: 900, marginBottom: '12px' }}>
            Calculate Your Team's SaaS Cost Savings
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            Replace 6+ separate subscriptions with one flat or per-seat invoice.
          </p>

          <div className="glass-card" style={{ padding: '40px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: `1px solid ${mix.badgeBorder}` }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontWeight: 800, fontSize: '18px' }}>
                <span>Team Size: <strong style={{ color: mix.badgeText }}>{teamSize} Members</strong></span>
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 700 }}>Annual Billing Model</span>
              </div>

              <input
                type="range"
                min="5"
                max="250"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: mix.primary, cursor: 'pointer', height: '8px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '28px' }}>
              <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 800, marginBottom: '4px' }}>Fragmented Stack Cost</div>
                <div className="font-mono" style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  ₹{(fragmentedCostPerUserINR * teamSize * 12).toLocaleString('en-IN')} / yr
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Slack + Zoom + Notion + Linear + Loom</div>
              </div>

              <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 800, marginBottom: '4px' }}>TeamOS Consolidated Cost</div>
                <div className="font-mono" style={{ fontSize: '26px', fontWeight: 900, color: '#10b981' }}>
                  ₹{(perSeatPriceINR * teamSize * 12).toLocaleString('en-IN')} / yr
                </div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, marginTop: '4px' }}>
                  Saves ₹{annualSavingsINR.toLocaleString('en-IN')} every year!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GLASSY PRICING TIERS (#pricing) */}
      <section id="pricing" style={{
        padding: '100px 40px',
        maxWidth: '1380px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '4px 14px', 
            borderRadius: '999px', 
            backgroundColor: mix.badgeBg, 
            color: mix.badgeText, 
            fontSize: '11px', 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 800,
            marginBottom: '14px' 
          }}>
            [ DUAL PRICING ARCHITECTURE — SECTION 12 ]
          </div>
          <h2 className="font-heading" style={{ fontSize: '40px', fontWeight: 900, marginBottom: '12px' }}>
            Predictable Pricing for Growing Companies
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Choose between per-seat flexibility or flat per-team budget predictability.
          </p>

          {/* Interactive Billing Cycle Toggle */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 8px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color-strong)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                background: billingCycle === 'monthly' ? mix.btnGradient : 'transparent',
                color: billingCycle === 'monthly' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                background: billingCycle === 'annual' ? mix.btnGradient : 'transparent',
                color: billingCycle === 'annual' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              <span>Annual Billing</span>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontWeight: 800 }}>Save 20%</span>
            </button>
          </div>
        </div>

        {/* 3D Glassy Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Card 1: Starter Tier */}
          <Tilt>
            <div className="glass-card" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Starter Tier</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>UP TO 10 SEATS</span>
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>Starter</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                  Essential collaboration suite for early startups & small teams.
                </p>

                <div className="font-mono" style={{ fontSize: '40px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '24px' }}>
                  ₹{starterPriceINR.toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/ seat / mo</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', marginBottom: '24px' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#10b981" /> Unified Team Chat & DMs</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#10b981" /> 720p HD Video Meetings</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#10b981" /> Basic Kanban Task Boards</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#10b981" /> 5GB Storage per User</li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanCheckoutSelect({ name: 'Starter Plan', priceNum: starterPriceINR })}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: 'var(--radius-lg)', fontWeight: 700 }}
              >
                Choose Starter Plan
              </button>
            </div>
          </Tilt>

          {/* Card 2: Pro Enterprise (Featured Vivid Highlight) */}
          <Tilt>
            <div className="glass-card" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px 36px',
              borderRadius: 'var(--radius-xl)',
              border: `2px solid ${mix.primary}`,
              boxShadow: mix.glowShadow,
              position: 'relative',
              transform: 'scale(1.04)',
              zIndex: 2,
              backgroundColor: 'var(--bg-card)'
            }}>
              <span style={{ 
                position: 'absolute', 
                top: '-16px', 
                right: '28px', 
                padding: '6px 16px', 
                borderRadius: '999px', 
                background: mix.gradient, 
                color: '#ffffff', 
                fontWeight: 800, 
                fontSize: '12px',
                boxShadow: mix.glowShadow
              }}>
                ⭐ Most Popular Enterprise
              </span>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px', backgroundColor: mix.badgeBg, color: mix.badgeText, border: `1px solid ${mix.badgeBorder}` }}>Per-Seat Model</span>
                  <span style={{ fontSize: '11px', color: mix.badgeText, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>UNLIMITED SCALE</span>
                </div>

                <h3 className="font-heading" style={{ fontSize: '30px', fontWeight: 900, marginBottom: '6px', color: 'var(--text-primary)' }}>Pro Enterprise</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                  Complete AI intelligence suite with LiveKit HD video studio & Vector RAG.
                </p>

                <div className="font-mono" style={{ fontSize: '46px', fontWeight: 900, background: mix.heroGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
                  ₹{perSeatPriceINR.toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/ seat / mo</span>
                </div>

                <div style={{ height: '1px', backgroundColor: mix.badgeBorder, marginBottom: '24px' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-primary)', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color={mix.badgeText} /> <strong>Everything in Starter</strong></li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color={mix.badgeText} /> 1080p HD LiveKit Video Studio</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color={mix.badgeText} /> GPT-4o Meeting-to-Task Pipeline</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color={mix.badgeText} /> Voice AI Real-Time Agent</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} color={mix.badgeText} /> SOC2 & SAML SSO Enforcer</li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanCheckoutSelect({ name: 'Pro Enterprise Plan', priceNum: perSeatPriceINR })}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '15px', 
                  borderRadius: 'var(--radius-lg)', 
                  background: mix.btnGradient,
                  color: '#ffffff',
                  fontWeight: 800,
                  border: 'none',
                  boxShadow: mix.glowShadow,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
              >
                <Sparkles size={18} /> Upgrade to Pro Enterprise
              </button>
            </div>
          </Tilt>

          {/* Card 3: Flat Per-Team Unlimited */}
          <Tilt>
            <div className="glass-card" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(245, 158, 11, 0.4)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>Flat Team Model</span>
                  <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>50 SEATS CAP</span>
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>Flat Per-Team</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
                  Single predictable flat rate for up to 50 members (Basecamp model).
                </p>

                <div className="font-mono" style={{ fontSize: '40px', fontWeight: 900, color: '#f59e0b', marginBottom: '24px' }}>
                  ₹{flatPriceINR.toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/ team / mo</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'var(--border-color)', marginBottom: '24px' }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#f59e0b" /> Single Flat Monthly Invoice</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#f59e0b" /> Up to 50 Team Members Cap</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#f59e0b" /> Unlimited Video Meetings</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Check size={18} color="#f59e0b" /> Full Document AI RAG Memory</li>
                </ul>
              </div>

              <button
                onClick={() => handlePlanCheckoutSelect({ name: 'Flat Per-Team Unlimited', priceNum: flatPriceINR })}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '14px', fontSize: '14px', borderRadius: 'var(--radius-lg)', fontWeight: 700 }}
              >
                Choose Flat Per-Team
              </button>
            </div>
          </Tilt>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        padding: '44px 40px', 
        backgroundColor: 'var(--bg-surface)', 
        textAlign: 'center', 
        fontSize: '13px', 
        color: 'var(--text-muted)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div>© 2026 TeamOS Inc. All Rights Reserved. SOC2 Type II Certified.</div>
          <div style={{ display: 'flex', gap: '24px', fontWeight: 600 }}>
            <span style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => launchWorkspaceGate('super-admin')}>Super Admin Console</span>
            <span style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => launchWorkspaceGate('admin')}>Company Admin</span>
            <span style={{ cursor: 'pointer', color: mix.badgeText }} onClick={() => launchWorkspaceGate('dashboard')}>Enter Workspace</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
