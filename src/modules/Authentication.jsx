import React, { useState, useEffect } from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  KeyRound, 
  Building2, 
  UserCheck,
  Video
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Authentication() {
  const { 
    setCurrentView, 
    setIsAuthenticated, 
    pendingPaymentPlan, 
    setPendingPaymentPlan, 
    pendingTargetView,
    setPendingTargetView,
    openPaymentModal 
  } = useApp();

  const { isSignedIn, isLoaded } = useUser();
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'custom'
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState('elena.rostova@acme.com');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']);

  const isMeetingInvite = pendingTargetView === 'meetings' || window.location.search.includes('view=meetings') || window.location.search.includes('room=');

  // If user signs in via Clerk, automatically route into the app (Home Dashboard)
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsAuthenticated(true);
      if (pendingPaymentPlan) {
        const selectedPlan = pendingPaymentPlan;
        setPendingPaymentPlan(null);
        openPaymentModal(selectedPlan);
        setCurrentView('dashboard'); // Redirect to Home Page with Payment Modal
      } else if (isMeetingInvite) {
        setPendingTargetView(null);
        setCurrentView('meetings');
      } else {
        setCurrentView('dashboard'); // Redirect to Home Page
      }
    }
  }, [isLoaded, isSignedIn, pendingPaymentPlan, isMeetingInvite]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const handleOtpVerify = () => {
    setShowOtpModal(false);
    setIsAuthenticated(true);

    if (pendingPaymentPlan) {
      const selectedPlan = pendingPaymentPlan;
      setPendingPaymentPlan(null);
      openPaymentModal(selectedPlan);
      setCurrentView('dashboard'); // Redirect to Home Page with Payment Modal
    } else if (isMeetingInvite) {
      setPendingTargetView(null);
      setCurrentView('meetings');
    } else {
      setCurrentView('dashboard'); // Redirect to Home Page
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.1), var(--bg-app))',
      padding: '24px'
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px auto',
          boxShadow: '0 0 24px rgba(124, 58, 237, 0.4)'
        }}>
          <Sparkles size={24} color="#fff" />
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 800 }}>Welcome to Team<span className="ai-gradient-text">OS</span></h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {isMeetingInvite ? '📹 Sign in to join live video call room' : pendingPaymentPlan ? `Sign in to complete payment for ${pendingPaymentPlan.name}` : 'Enterprise AI Workspaces & Clerk Security Gateway'}
        </p>
      </div>

      {/* Video Call Room Invite Alert Banner */}
      {isMeetingInvite && (
        <div className="badge badge-success" style={{ padding: '12px 16px', maxWidth: '460px', width: '100%', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <Video size={16} /> <span>You've been invited to join <strong>Executive AI Video Call Room</strong></span>
        </div>
      )}

      {/* Selected Plan Alert Banner */}
      {pendingPaymentPlan && (
        <div className="badge badge-gold" style={{ padding: '10px 16px', maxWidth: '460px', width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Selected Plan: <strong>{pendingPaymentPlan.name}</strong></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>₹{pendingPaymentPlan.priceNum.toLocaleString('en-IN')}</span>
        </div>
      )}

      {/* Auth Tab Switcher */}
      <div style={{
        display: 'flex',
        padding: '4px',
        backgroundColor: 'var(--bg-input)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '24px',
        border: '1px solid var(--border-color)',
        width: '400px'
      }}>
        <button
          onClick={() => setTab('login')}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: tab === 'login' ? 'var(--bg-surface)' : 'transparent',
            color: tab === 'login' ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: tab === 'login' ? 700 : 500,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔐 Clerk Sign In
        </button>
        <button
          onClick={() => setTab('signup')}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: tab === 'signup' ? 'var(--bg-surface)' : 'transparent',
            color: tab === 'signup' ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: tab === 'signup' ? 700 : 500,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          ✨ Clerk Sign Up
        </button>
        <button
          onClick={() => setTab('custom')}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: tab === 'custom' ? 'var(--bg-surface)' : 'transparent',
            color: tab === 'custom' ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: tab === 'custom' ? 700 : 500,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          🔑 Quick Access
        </button>
      </div>

      {/* Main Authentication Container */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tab === 'login' && (
          <div style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '16px', overflow: 'hidden' }}>
            <SignIn routing="hash" />
          </div>
        )}

        {tab === 'signup' && (
          <div style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5)', borderRadius: '16px', overflow: 'hidden' }}>
            <SignUp routing="hash" />
          </div>
        )}

        {tab === 'custom' && (
          <div className="glass-card ai-glow-border" style={{
            width: '420px',
            padding: '32px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)'
          }}>
            {/* Quick Demo Form */}
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Work Email</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                  />
                  <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '12px' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '12px' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-ai" style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
                {isMeetingInvite ? 'Sign In & Enter Video Room' : 'Quick Access Sign In'}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div className="glass-card" style={{ width: '400px', padding: '28px', textAlign: 'center', backgroundColor: 'var(--bg-card)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <KeyRound size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Security Verification</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Enter 6-digit MFA passcode sent to {email}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  style={{
                    width: '40px',
                    height: '48px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-input)',
                    color: 'var(--text-primary)'
                  }}
                />
              ))}
            </div>

            <button onClick={handleOtpVerify} className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
              Verify & Enter Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
