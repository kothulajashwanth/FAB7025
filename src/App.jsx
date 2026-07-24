import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import CommandPalette from './components/layout/CommandPalette';
import AICopilotDrawer from './components/layout/AICopilotDrawer';
import Canvas3D from './components/ui/Canvas3D';
import CustomCursor from './components/ui/CustomCursor';

import LandingPage from './modules/LandingPage';
import Authentication from './modules/Authentication';
import WorkspaceCreation from './modules/WorkspaceCreation';
import HomeDashboard from './modules/HomeDashboard';
import AIAssistant from './modules/AIAssistant';
import TeamChat from './modules/TeamChat';
import VideoMeetings from './modules/VideoMeetings';
import TaskManagement from './modules/TaskManagement';
import Projects from './modules/Projects';
import AIAutomation from './modules/AIAutomation';
import CalendarView from './modules/CalendarView';
import FilesDrive from './modules/FilesDrive';
import CRM from './modules/CRM';
import HRPlatform from './modules/HRPlatform';
import Finance from './modules/Finance';
import Analytics from './modules/Analytics';
import NotificationsCenter from './modules/NotificationsCenter';
import Settings from './modules/Settings';
import AdminPanel from './modules/AdminPanel';
import SuperAdminConsole from './modules/SuperAdminConsole';

function WorkspaceRouter() {
  const { currentView, isAuthenticated } = useApp();

  // Public views (Landing, Auth)
  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'auth') return <Authentication />;

  // Protected routes: redirect to Auth if not authenticated
  if (!isAuthenticated) {
    return <Authentication />;
  }

  if (currentView === 'onboarding') return <WorkspaceCreation />;

  // Standard Workspace Shell views
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-scroll-view">
          {currentView === 'dashboard' && <HomeDashboard />}
          {currentView === 'ai-assistant' && <AIAssistant />}
          {currentView === 'chat' && <TeamChat />}
          {currentView === 'meetings' && <VideoMeetings />}
          {currentView === 'tasks' && <TaskManagement />}
          {currentView === 'projects' && <Projects />}
          {currentView === 'automation' && <AIAutomation />}
          {currentView === 'calendar' && <CalendarView />}
          {currentView === 'files' && <FilesDrive />}
          {currentView === 'crm' && <CRM />}
          {currentView === 'hr' && <HRPlatform />}
          {currentView === 'finance' && <Finance />}
          {currentView === 'analytics' && <Analytics />}
          {currentView === 'notifications' && <NotificationsCenter />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'admin' && <AdminPanel />}
          {currentView === 'super-admin' && <SuperAdminConsole />}
        </main>
      </div>

      <CommandPalette />
      <AICopilotDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Canvas3D />
      <CustomCursor />
      <WorkspaceRouter />
    </AppProvider>
  );
}
