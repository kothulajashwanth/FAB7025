import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import PaymentModal from '../components/payment/PaymentModal';

const AppContext = createContext();

export const initialTasks = [
  {
    id: 'TSK-101',
    title: 'Design TeamOS Dark/Light Design Tokens & Glassmorphism Spec',
    project: 'Core UI/UX System',
    status: 'in-progress',
    priority: 'P0',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    dueDate: 'Today',
    subtasks: [
      { id: 'sub-1', title: 'Define HSL color system', done: true },
      { id: 'sub-2', title: 'Create glassmorphism backdrop blurs', done: true },
      { id: 'sub-3', title: 'Test Apple HIG contrast compliance', done: false }
    ],
    tags: ['Design System', 'P0', 'Frontend']
  },
  {
    id: 'TSK-102',
    title: 'Implement Voice AI Waveform & Real-time Audio Stream',
    project: 'AI Copilot Engine',
    status: 'in-progress',
    priority: 'P0',
    assignee: 'Alex Rivera',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    dueDate: 'Tomorrow',
    subtasks: [
      { id: 'sub-4', title: 'WebAudio API visualizer buffer', done: true },
      { id: 'sub-5', title: 'Voice agent latency optimization', done: false }
    ],
    tags: ['AI', 'Voice', 'Audio']
  },
  {
    id: 'TSK-103',
    title: 'Configure SOC2 Compliance & SAML SSO Enforcer',
    project: 'Enterprise Admin Panel',
    status: 'todo',
    priority: 'P1',
    assignee: 'Marcus Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    dueDate: 'Jul 26',
    subtasks: [
      { id: 'sub-6', title: 'Okta / Azure AD OIDC provider', done: false },
      { id: 'sub-7', title: 'Audit log streaming webhooks', done: false }
    ],
    tags: ['Security', 'Admin']
  },
  {
    id: 'TSK-104',
    title: 'Deploy Automated Meeting-to-Task AI Pipeline',
    project: 'AI Workflows',
    status: 'done',
    priority: 'P1',
    assignee: 'Elena Rostova',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    dueDate: 'Yesterday',
    subtasks: [
      { id: 'sub-8', title: 'Whisper live transcription parser', done: true },
      { id: 'sub-9', title: 'Auto-assign action items in Linear', done: true }
    ],
    tags: ['AI Workflows', 'Automation']
  },
  {
    id: 'TSK-105',
    title: 'Q3 Enterprise Sales Pipeline & ARR Forecasting Model',
    project: 'CRM & Growth',
    status: 'todo',
    priority: 'P2',
    assignee: 'David Kim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    dueDate: 'Jul 28',
    subtasks: [
      { id: 'sub-10', title: 'Stripe MRR webhook reconciliation', done: false }
    ],
    tags: ['Finance', 'Sales']
  }
];

export const initialChannels = [
  { id: 'c1', name: 'announcements', unread: 2, isPrivate: false, topic: 'Company-wide updates & product news' },
  { id: 'c2', name: 'proj-teamos-launch', unread: 5, isPrivate: true, topic: 'Launch readiness for v2.0 Enterprise' },
  { id: 'c3', name: 'eng-ai-copilot', unread: 0, isPrivate: false, topic: 'AI Agent & LLM orchestration' },
  { id: 'c4', name: 'design-system', unread: 0, isPrivate: false, topic: 'Figma tokens & Linear UI parity' }
];

export const initialNotifications = [
  { id: 1, type: 'ai', title: 'AI Risk Alert', message: 'Project "TeamOS v2.0" velocity dropped 8% due to backend API blockers.', time: '10m ago', read: false, category: 'action' },
  { id: 2, type: 'mention', title: 'Alex Rivera mentioned you', message: 'Can you review the Voice AI visualizer spec in #eng-ai-copilot?', time: '25m ago', read: false, category: 'mention' },
  { id: 3, type: 'meeting', title: 'Meeting Ready', message: 'Executive AI Strategy Sync starts in 5 minutes.', time: '1h ago', read: true, category: 'updates' }
];

// Helper to detect initial user OS device theme preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(getSystemTheme);
  const [currentView, setCurrentView] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState(null);
  const [pendingTargetView, setPendingTargetView] = useState(null); // Direct meeting invite redirect
  const [workspaceMode, setWorkspaceMode] = useState('team');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentPlanData, setPaymentPlanData] = useState(null);
  
  // User Profile & Workspace Setup Profile States
  const [userName, setUserName] = useState('Elena Rostova');
  const [workspaceProfile, setWorkspaceProfile] = useState({
    name: 'Acme Corporation',
    industry: 'SaaS / Enterprise Software',
    timezone: 'UTC+5:30 (IST - Indian Standard Time)'
  });
  const [userRole, setUserRole] = useState('VP of Product');
  const [invitedTeammates, setInvitedTeammates] = useState(['alex@acme.com', 'sarah@acme.com', 'marcus@acme.com']);
  const [aiCopilotConfig, setAiCopilotConfig] = useState({
    persona: 'Autonomous Technical Lead (Proactive & Precise)',
    autoMeetingTasks: true
  });

  // Data States
  const [tasks, setTasks] = useState(initialTasks);
  const [channels] = useState(initialChannels);
  const [activeChannel, setActiveChannel] = useState(initialChannels[1]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMeetingLive, setIsMeetingLive] = useState(true);
  const [directCallTarget, setDirectCallTarget] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Sync Clerk Authentication State with App Context
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        setIsAuthenticated(true);
        const name = user.fullName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0];
        if (name) setUserName(name);
      } else if (!isSignedIn) {
        setIsAuthenticated(false);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Comprehensive Clerk Sign Out Handler
  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
    } catch (err) {
      console.warn("Clerk SignOut Exception:", err);
    } finally {
      setIsAuthenticated(false);
      setUserName('User');
      setPendingPaymentPlan(null);
      setPendingTargetView(null);
      setCurrentView('landing');
    }
  };

  // Check URL parameters on mount for direct meeting invite links (?view=meetings or ?room=...)
  useEffect(() => {
    const search = window.location.search;
    const hash = window.location.hash;
    if (search.includes('view=meetings') || search.includes('room=') || hash.includes('meetings')) {
      console.log("🔗 Detected Direct Video Call Room Invite Link!");
      setPendingTargetView('meetings');
    }
  }, []);

  // Listen for real-time user OS system theme changes (Light / Dark mode switch)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleWorkspaceMode = () => {
    setWorkspaceMode((prev) => (prev === 'team' ? 'individual' : 'team'));
  };

  const launchWorkspaceGate = (targetView = 'dashboard') => {
    const destination = pendingTargetView || targetView;
    if (!isAuthenticated) {
      if (destination === 'meetings') setPendingTargetView('meetings');
      setCurrentView('auth');
    } else {
      setCurrentView(destination);
    }
  };

  const handlePlanCheckoutSelect = (planData) => {
    if (!isAuthenticated) {
      setPendingPaymentPlan(planData);
      setCurrentView('auth');
    } else {
      openPaymentModal(planData);
    }
  };

  const updateWorkspaceProfileData = ({ fullName, companyName, industry, timezone, role, invitedEmails, aiPersonality }) => {
    if (fullName) setUserName(fullName);
    if (companyName) setWorkspaceProfile((prev) => ({ ...prev, name: companyName, industry, timezone }));
    if (role) setUserRole(role);
    if (invitedEmails) {
      const emailArray = invitedEmails.split(',').map((e) => e.trim()).filter(Boolean);
      setInvitedTeammates(emailArray);
    }
    if (aiPersonality) {
      setAiCopilotConfig((prev) => ({ ...prev, persona: aiPersonality }));
    }
  };

  const openPaymentModal = (planData) => {
    setPaymentPlanData(planData);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentPlanData(null);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        isAuthenticated,
        setIsAuthenticated,
        pendingPaymentPlan,
        setPendingPaymentPlan,
        pendingTargetView,
        setPendingTargetView,
        workspaceMode,
        toggleWorkspaceMode,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCopilotOpen,
        setIsCopilotOpen,
        isPaymentModalOpen,
        paymentPlanData,
        openPaymentModal,
        closePaymentModal,
        handlePlanCheckoutSelect,
        launchWorkspaceGate,
        userName,
        setUserName,
        workspaceProfile,
        setWorkspaceProfile,
        userRole,
        setUserRole,
        invitedTeammates,
        setInvitedTeammates,
        aiCopilotConfig,
        setAiCopilotConfig,
        updateWorkspaceProfileData,
        tasks,
        setTasks,
        updateTaskStatus,
        addTask,
        channels,
        activeChannel,
        setActiveChannel,
        notifications,
        setNotifications,
        isVoiceActive,
        setIsVoiceActive,
        isMeetingLive,
        setIsMeetingLive,
        directCallTarget,
        setDirectCallTarget,
        clerkUser: user,
        clerkSignOut: signOut,
        handleSignOut,
        isClerkLoaded: isLoaded
      }}
    >
      {children}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        planData={paymentPlanData}
      />
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
