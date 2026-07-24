# TeamOS (v2.4 System) — Enterprise AI-Native Work Operating System

> **The Operating System for High-Velocity Engineering, Product & Executive Teams.**  
> Consolidating Slack, Zoom, Notion, Linear, Loom, and ChatGPT into one high-performance, unified, AI-native environment.

---

## 🌟 Overview

**TeamOS** is a next-generation workspace platform designed to remove context-switching friction for modern software and product organizations. Instead of managing half a dozen disconnected SaaS subscriptions, TeamOS brings chat, LiveKit WebRTC HD video, Linear-style sprint task boards, document storage, and multi-modal GPT-4o vector AI capabilities into a single seamless interface.

### Key Value Propositions
- ⚡ **Zero Context Switching**: Everything from team discussions to video standups and task backlogs happens inside one application shell.
- 🤖 **Automated Meeting-to-Task Pipeline**: Real-time AI transcription converts video standups and voice chats directly into structured sprint tasks with assigned owners.
- 🔒 **Enterprise-Grade Security**: Built with Row-Level Security (RLS), SOC2 Type II compliance standards, SAML 2.0 SSO enforcers, and Zero-Data Retention policies for AI context.
- 💰 **Consolidated SaaS Billing**: Replaces Slack, Zoom, Notion, Linear, Loom, and OpenAI with a single per-seat or flat per-team subscription.

---

## 📁 Repository & Directory Architecture

```
pro/
├── index.html                  # HTML entry point with modern web fonts
├── package.json                # Project manifest, dependencies, and npm scripts
├── vite.config.js              # Vite bundler configuration & React plugin
├── README.md                   # Complete system documentation & user guide
├── public/                     # Public static assets & favicons
└── src/                        # Source codebase
    ├── main.jsx                # Application mounting entry point
    ├── App.jsx                 # Master router & layout orchestrator
    ├── App.css                 # Custom component animations & layout styles
    ├── index.css               # Centralized tokenized design system & HSL colors
    ├── assets/                 # SVGs, icons, and static images
    ├── context/
    │   └── AppContext.jsx      # Global React Context state (Routing, Tasks, Auth, Themes, Checkout)
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx           # Global top navigation bar with search & theme controls
    │   │   ├── Sidebar.jsx          # Multi-tier collateral workspace navigation
    │   │   ├── CommandPalette.jsx   # Quick action keyboard shortcut (Cmd+K / Ctrl+K)
    │   │   └── AICopilotDrawer.jsx  # Floating persistent right-side GPT-4o assistant
    │   ├── payment/
    │   │   └── PaymentModal.jsx     # Full checkout system (Card, UPI, NetBanking, Invoice)
    │   └── ui/
    │       ├── Canvas3D.jsx         # WebGL / Three.js animated background canvas
    │       ├── CustomCursor.jsx     # Fluid custom pointer dot & aura trail
    │       └── Tilt.jsx             # 3D interactive tilt container wrapper
    └── modules/                     # 20 Specialized Workspace Applications
        ├── LandingPage.jsx          # Public editorial hero, ROI calculator, & pricing tiers
        ├── Authentication.jsx       # Sign In, Sign Up, SSO SAML, & OTP authentication
        ├── WorkspaceCreation.jsx    # Onboarding wizard for new organization setup
        ├── HomeDashboard.jsx        # Command center with velocity metrics & quick launchpad
        ├── AIAssistant.jsx          # Multi-modal AI Copilot with RAG vector search
        ├── TeamChat.jsx             # Real-time channels (#announcements, #eng) & DMs
        ├── VideoMeetings.jsx        # LiveKit WebRTC HD video studio with live transcript
        ├── TaskManagement.jsx       # Linear-style sprint backlog & drag-and-drop Kanban
        ├── Projects.jsx             # High-level portfolio tracking & sprint roadmaps
        ├── AIAutomation.jsx         # Trigger-action workflow builder & AI dispatchers
        ├── CalendarView.jsx         # Team schedule & meeting booking calendar
        ├── FilesDrive.jsx           # Secure cloud file drive & document RAG indexer
        ├── CRM.jsx                  # Enterprise deal pipeline & account tracking
        ├── HRPlatform.jsx           # Team directory, onboarding, & leave management
        ├── Finance.jsx              # MRR forecasting, budget tracking, & invoices
        ├── Analytics.jsx            # Velocity metrics & system telemetry dashboard
        ├── NotificationsCenter.jsx  # Centralized feed for AI alerts & team mentions
        ├── Settings.jsx             # Profile, API key, & notification preferences
        ├── AdminPanel.jsx           # Organization security, SAML SSO, & audit logs
        └── SuperAdminConsole.jsx    # Tenant orchestration & platform feature flags
```

---

## 🚀 Key Modules & Functional Features

| Module | Description | Core Capabilities |
| :--- | :--- | :--- |
| 🌐 **Landing Page** | High-impact product overview | Interactive live engine preview, SaaS ROI cost calculator, architecture breakdown, dual pricing tiers. |
| 📊 **Home Dashboard** | Executive & engineer command center | Sprint velocity charts, pending AI action items, quick launch actions, live team status. |
| 📹 **Video Meetings** | LiveKit WebRTC HD Studio | 1080p HD video conferencing, screen sharing, live audio visualizer, real-time transcript & task creation. |
| 💬 **Team Chat** | Instant channel messaging | Public & private channels, direct messages, rich code blocks, file sharing, AI bot `@TeamOS` mentions. |
| 📋 **Task Management** | Linear-style Kanban board | Drag-and-drop task status columns (To Do, In Progress, Review, Done), subtasks, P0/P1/P2 priorities. |
| 🤖 **AI Assistant** | GPT-4o Multi-Modal RAG | Query workspace documents, generate technical specs/code, extract action items, search vector indices. |
| ⚡ **AI Automation** | Workflow trigger engine | Automatic meeting summaries to Jira/Linear tasks, webhook dispatchers, automated AI caller agents. |
| 💳 **Checkout System** | Multi-channel payment gateway | Razorpay/Stripe modal supporting UPI (GPay, PhonePe), Credit/Debit Cards, NetBanking, and Enterprise Invoicing. |
| 🛡️ **Enterprise Admin** | SOC2 & SAML Enforcer | Okta/Azure AD SSO configuration, member role RBAC, audit log streaming, security policies. |

---

## 🛠️ Technology Stack

- **Core Library**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`vite`, `@vitejs/plugin-react`)
- **Icons**: Lucide React (`lucide-react`)
- **Linter**: Oxlint (`oxlint`)
- **Design System**: Vanilla CSS with CSS Custom Properties, Glassmorphism backdrop-blur, HSL color tokens, and responsive flex/grid layouts.
- **Visual Extensions**: Three.js WebGL particle canvas background (`Canvas3D.jsx`), 3D spatial mouse tilt effects (`Tilt.jsx`).

---

## 📖 Complete User & Administrator Guide

### 1. Navigation & Workspace Controls
- **Command Palette (`Cmd + K` / `Ctrl + K`)**: Press `Cmd + K` anywhere in the app to open the quick launcher. Type any view name (e.g., "Tasks", "Meetings", "Analytics") or action to navigate instantly.
- **AI Copilot Drawer**: Click the glowing AI Sparkle button in the top-right header (or bottom right) to toggle the side drawer assistant without leaving your active task.
- **Dark / Light Theme Toggle**: Click the Sun/Moon icon in the top header bar to switch between Billion-Dollar Dark Obsidian and Stripe Platinum Light themes.

### 2. Live Video Standups & Meetings
1. Navigate to **Meetings** from the sidebar or Command Palette.
2. Click **Start Instant Meeting** or select an upcoming scheduled call.
3. Toggle Mic, Camera, or Screen Share from the bottom control bar.
4. Enable **AI Auto-Transcription** to capture meeting notes and automatically create sprint tasks assigned to participants upon meeting conclusion.

### 3. Task Management & Linear Kanban
1. Navigate to **Tasks**.
2. Filter tasks by Priority (`P0`, `P1`, `P2`), Assignee, or Search query.
3. Click **+ New Task** to create a task, or drag and drop cards between status columns (`To Do` ➔ `In Progress` ➔ `In Review` ➔ `Done`).
4. Click any task to expand subtask checklists and view linked meeting transcripts.

### 4. Admin & Security Configuration
1. Navigate to **Admin Panel** or **Super Admin Console**.
2. Configure Organization Name, Domain Restrictions, and SAML SSO endpoints.
3. Monitor Security Audit Logs for login attempts, role changes, and API token usage.

---

## ⚡ Getting Started Locally

### Prerequisites
Ensure you have **Node.js (v18.0.0 or higher)** installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kothulajashwanth/pro.git
   cd pro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The local dev server will launch at **`http://localhost:5173/`**.

---

## 📜 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run dev`** | `vite` | Launches the local dev server with Hot Module Replacement (HMR). |
| **`npm run build`** | `vite build` | Compiles and optimizes production assets into the `/dist` folder. |
| **`npm run preview`** | `vite preview` | Previews the production build locally. |
| **`npm run lint`** | `oxlint` | Runs fast Oxlint code analysis to check for syntax and code errors. |

---

## 🛡️ License & Copyright

© 2026 TeamOS Inc. All Rights Reserved. Built for high-velocity teams.
