import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Video, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  Calendar as CalendarIcon,
  MessageSquare,
  FileText,
  Zap,
  Bot,
  Edit3,
  X,
  Check,
  Tag,
  UserCheck,
  Activity,
  ShieldCheck,
  Radio,
  Cpu,
  Layers,
  Share2,
  Users,
  Play,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Tilt from '../components/ui/Tilt';

export default function HomeDashboard() {
  const { setCurrentView, tasks, setTasks, addTask, updateTaskStatus, setIsCopilotOpen, userName, setIsMeetingLive } = useApp();

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('Core Architecture');
  const [newPriority, setNewPriority] = useState('P0');
  const [newAssignee, setNewAssignee] = useState(userName || 'Elena Rostova');
  const [newDueDate, setNewDueDate] = useState('Today');
  const [newStatus, setNewStatus] = useState('in-progress');

  const activeTasks = tasks.filter((t) => t.status !== 'done');
  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const firstName = userName ? userName.split(' ')[0] : 'Elena';

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTaskObj = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      project: newProject,
      status: newStatus,
      priority: newPriority,
      assignee: newAssignee,
      assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      dueDate: newDueDate,
      subtasks: [],
      tags: ['Home Task', newPriority]
    };

    addTask(newTaskObj);
    setShowCreateTaskModal(false);
    setNewTitle('');
    triggerToast(`Task "${newTaskObj.id}: ${newTaskObj.title}" created!`);
  };

  const handleEditTaskSubmit = (e) => {
    e.preventDefault();
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? editingTask : t))
    );
    setEditingTask(null);
    triggerToast(`Task updated successfully!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          padding: '12px 20px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--primary)',
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: 'var(--shadow-card-hover)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} color="var(--success)" /> {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="font-heading" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>
              Good Day, <span className="ai-gradient-text">{firstName}</span> 👋
            </h1>
            <span className="badge badge-primary" style={{ fontSize: '11px', padding: '4px 12px' }}>
              <Flame size={12} color="#f59e0b" /> Executive Control Mode
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Autonomous Workspace Matrix • Real-Time WebRTC Video & AI Telemetry
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowCreateTaskModal(true)} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
            <Plus size={16} color="var(--primary)" /> + New Task
          </button>
          <button onClick={() => setIsCopilotOpen(true)} className="btn btn-ai" style={{ padding: '10px 24px' }}>
            <Sparkles size={16} /> Ask AI Executive
          </button>
        </div>
      </div>

      {/* Hero Aurora Glass Banner */}
      <Tilt>
        <div className="glass-card ai-glow-border" style={{
          padding: '32px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(236,72,153,0.12) 50%, rgba(245,158,11,0.08) 100%)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          boxShadow: 'var(--shadow-glass)'
        }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '12px', fontSize: '11px' }}>
              ✨ TEAMOS 2.0 EXECUTIVE INTELLIGENCE
            </span>
            <h2 className="font-heading" style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
              Workspace Productivity Index running at <span className="cyan-gradient-text">98.4% Efficiency</span>
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '620px', lineHeight: '1.6' }}>
              Zero packet drops on LiveKit WebRTC mesh stream. {activeTasks.length} pending linear tasks requiring team execution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={() => { setIsMeetingLive(true); setCurrentView('meetings'); }} className="btn btn-ai" style={{ padding: '12px 28px', fontSize: '14px' }}>
              <Video size={18} /> Join Live Studio (#842-194)
            </button>
          </div>
        </div>
      </Tilt>

      {/* 6 Dynamic Stat Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Total Meetings', val: '48', icon: Video, color: '#6366f1', badge: '+12% this week' },
          { label: 'Active WebRTC Rooms', val: '04', icon: Radio, color: '#0284c7', badge: '0ms Latency' },
          { label: 'Online Teammates', val: '24', icon: Users, color: '#059669', badge: 'Active' },
          { label: 'Files & Assets', val: '1,420', icon: FileText, color: '#d97706', badge: 'Encrypted' },
          { label: 'Recording Hours', val: '312h', icon: Clock, color: '#ec4899', badge: '1080p HD' },
          { label: 'Completion Rate', val: `${Math.round((completedTasksCount / (tasks.length || 1)) * 100)}%`, icon: TrendingUp, color: '#10b981', badge: 'P0 Passed' }
        ].map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: `${st.color}18`, color: st.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} />
                </div>
                <span className="badge" style={{ backgroundColor: `${st.color}18`, color: st.color, fontSize: '9px' }}>{st.badge}</span>
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>{st.val}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{st.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Tasks & AI Intelligence Widget */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
        
        {/* Active Tasks Matrix */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Active Priority Task Kanban</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{activeTasks.length} pending items assigned across team members</p>
            </div>

            <button onClick={() => setShowCreateTaskModal(true)} className="btn btn-ghost" style={{ fontSize: '12px', color: 'var(--primary)' }}>
              <Plus size={14} /> Add Task
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <button
                    onClick={() => {
                      const next = task.status === 'done' ? 'todo' : 'done';
                      updateTaskStatus(task.id, next);
                      triggerToast(next === 'done' ? `Marked "${task.id}" as Completed ✅` : `Reopened "${task.id}"`);
                    }}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: task.status === 'done' ? 'none' : '2px solid var(--border-color)',
                      backgroundColor: task.status === 'done' ? 'var(--success)' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {task.status === 'done' && <Check size={14} strokeWidth={3} />}
                  </button>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? 0.5 : 1 }}>
                      {task.title}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{task.id}</span>
                      <span>•</span>
                      <span>{task.project}</span>
                      <span>•</span>
                      <span className="badge badge-primary" style={{ fontSize: '9px' }}>{task.priority}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select
                    className="input-field"
                    value={task.status}
                    onChange={(e) => {
                      updateTaskStatus(task.id, e.target.value);
                      triggerToast(`Updated "${task.id}" status to ${e.target.value}`);
                    }}
                    style={{ fontSize: '11px', padding: '4px 8px', width: 'auto' }}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Completed ✅</option>
                  </select>

                  <button
                    onClick={() => setEditingTask(task)}
                    className="btn btn-ghost"
                    style={{ padding: '6px', color: 'var(--text-muted)' }}
                    title="Edit Task"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Copilot & Video Room Quick Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card ai-glow-border" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: 800, fontSize: '16px' }}>
              <Bot size={20} /> Autonomous AI Assistant
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              AI Assistant monitors workspace context, streams code solutions, and converts chat answers into Linear tasks.
            </p>

            <button onClick={() => setCurrentView('ai-assistant')} className="btn btn-ai" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>
              <Sparkles size={16} /> Open Universal AI Assistant
            </button>
          </div>

          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} /> WebRTC P2P Security Active
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Encrypted peer-to-peer audio & video mesh connected with 0ms latency.
            </div>
          </div>
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      {showCreateTaskModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '480px', padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Create New Task</h3>
              <button onClick={() => setShowCreateTaskModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Task Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Implement WebRTC audio equalizer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Project</label>
                  <input
                    type="text"
                    className="input-field"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Priority</label>
                  <select
                    className="input-field"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="P0">P0 (Critical)</option>
                    <option value="P1">P1 (High)</option>
                    <option value="P2">P2 (Medium)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCreateTaskModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TASK MODAL */}
      {editingTask && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '480px', padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Edit Task ({editingTask.id})</h3>
              <button onClick={() => setEditingTask(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditTaskSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Task Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Status</label>
                  <select
                    className="input-field"
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Completed ✅</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Priority</label>
                  <select
                    className="input-field"
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  >
                    <option value="P0">P0 (Critical)</option>
                    <option value="P1">P1 (High)</option>
                    <option value="P2">P2 (Medium)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setEditingTask(null)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
