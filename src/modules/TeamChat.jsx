import React, { useState } from 'react';
import { 
  Hash, 
  Lock, 
  Plus, 
  Send, 
  Paperclip, 
  Smile, 
  Sparkles, 
  Mic, 
  MoreHorizontal, 
  CheckSquare, 
  MessageSquare, 
  Search,
  Pin,
  Bot,
  BarChart2,
  X,
  Phone,
  Video,
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TeamChat() {
  const { channels, activeChannel, setActiveChannel, addTask, setIsMeetingLive, setCurrentView, setDirectCallTarget } = useApp();
  
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [selectedMemberProfile, setSelectedMemberProfile] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      email: 'sarah@acme.com',
      role: 'VP Design',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      time: '10:40 AM',
      text: 'Hey team! The HSL color tokens and glassmorphism backdrop blurs for TeamOS 2.0 are finalized.',
      reactions: ['🚀 4', '🔥 2'],
      isPinned: true
    },
    {
      id: 2,
      sender: 'Alex Rivera',
      email: 'alex@acme.com',
      role: 'Staff AI Eng',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '10:42 AM',
      text: 'Awesome! Voice AI streaming protocol has 0ms latency in our webAudio tests. Here is the snippet:',
      code: 'const voiceAgent = new TeamOSVoiceStream({ sampleRate: 48000, model: "gpt-4o-realtime" });',
      reactions: ['👏 5']
    },
    {
      id: 3,
      sender: 'TeamOS AI Bot',
      isAi: true,
      avatar: null,
      time: '10:44 AM',
      text: '✨ **AI Thread Summary**: Team finalized design tokens and verified 0ms voice latency. 2 new linear tasks generated automatically.',
      reactions: ['🤖 8']
    }
  ]);

  const [input, setInput] = useState('');

  const teamMembers = [
    { name: 'Sarah Chen', role: 'VP of Design', email: 'sarah@acme.com', status: 'online', location: 'Bengaluru, India (IST)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { name: 'Alex Rivera', role: 'Staff AI Engineer', email: 'alex@acme.com', status: 'busy', location: 'San Francisco, USA (PST)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { name: 'Marcus Vance', role: 'Security & Infra Lead', email: 'marcus@acme.com', status: 'offline', location: 'London, UK (GMT)', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Elena Rostova',
      email: 'elena@acme.com',
      role: 'Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: input,
      reactions: []
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  const convertToTask = (msgText) => {
    const newTask = {
      id: `TSK-${Math.floor(Math.random() * 900) + 100}`,
      title: msgText.slice(0, 50),
      project: 'Team Chat Export',
      status: 'todo',
      priority: 'P1',
      assignee: 'Elena Rostova',
      assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      dueDate: 'Tomorrow',
      subtasks: [],
      tags: ['Chat Export', 'P1']
    };
    addTask(newTask);
    setToastMsg(`Created Linear task "${newTask.id}: ${newTask.title}"!`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Channels & DMs Sidebar */}
      <div className="glass-card" style={{ width: '260px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Channels</span>
          <button className="btn btn-ghost" style={{ padding: '4px' }}><Plus size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {channels.map((ch) => {
            const isSel = activeChannel.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSel ? 'var(--primary-light)' : 'transparent',
                  border: 'none',
                  color: isSel ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: isSel ? 600 : 400,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {ch.isPrivate ? <Lock size={14} /> : <Hash size={14} />}
                  <span>{ch.name}</span>
                </div>
                {ch.unread > 0 && <span className="badge badge-accent" style={{ fontSize: '10px' }}>{ch.unread}</span>}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px', marginTop: '12px' }}>DIRECT MESSAGES (CLICK PROFILE)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {teamMembers.map((dm, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMemberProfile(dm)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="glass-card-hover"
            >
              <div style={{ position: 'relative' }}>
                <img src={dm.avatar} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: '7px', height: '7px', borderRadius: '50%', backgroundColor: dm.status === 'online' ? '#22c55e' : '#f59e0b' }} />
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{dm.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Stream */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hash size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700, fontSize: '16px' }}>{activeChannel.name}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '10px' }}>{activeChannel.topic}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setShowWorkflowModal(true)} className="btn btn-ai" style={{ fontSize: '12px', padding: '6px 12px' }}>
              <Sparkles size={13} /> Create AI Workflow Canvas
            </button>
          </div>
        </div>

        {toastMsg && (
          <div className="badge badge-success" style={{ margin: '12px 20px 0 20px', padding: '8px 12px', fontSize: '12px' }}>
            <CheckCircle2 size={14} /> {toastMsg}
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {m.isAi ? (
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Bot size={18} />
                </div>
              ) : (
                <img
                  src={m.avatar}
                  onClick={() => setSelectedMemberProfile({ name: m.sender, email: m.email || 'user@acme.com', role: m.role || 'Team Member', status: 'online', location: 'Bengaluru, India (IST)', avatar: m.avatar })}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }}
                  title="Click to view user profile"
                />
              )}

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    onClick={() => !m.isAi && setSelectedMemberProfile({ name: m.sender, email: m.email || 'user@acme.com', role: m.role || 'Team Member', status: 'online', location: 'Bengaluru, India (IST)', avatar: m.avatar })}
                    style={{ fontWeight: 700, fontSize: '14px', color: m.isAi ? 'var(--accent)' : 'var(--text-primary)', cursor: m.isAi ? 'default' : 'pointer' }}
                  >
                    {m.sender}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.time}</span>
                  {m.isPinned && <span className="badge badge-warning" style={{ fontSize: '9px' }}><Pin size={10} /> Pinned</span>}
                </div>

                <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{m.text}</div>

                {m.code && (
                  <pre style={{ margin: '8px 0', padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--code-bg)', color: '#38bdf8', fontSize: '12px', overflowX: 'auto', fontFamily: 'monospace' }}>
                    {m.code}
                  </pre>
                )}

                {/* Reactions & Actions */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                  {m.reactions.map((r, ridx) => (
                    <span key={ridx} style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', fontSize: '11px', cursor: 'pointer' }}>
                      {r}
                    </span>
                  ))}
                  <button onClick={() => convertToTask(m.text)} className="btn btn-ghost" style={{ fontSize: '11px', padding: '2px 8px', color: 'var(--primary)' }}>
                    <CheckSquare size={12} /> Convert to Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <input
              type="text"
              placeholder={`Message #${activeChannel.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '14px' }}
            />
            <button className="btn btn-ghost" style={{ padding: '6px' }}><Paperclip size={16} /></button>
            <button className="btn btn-ghost" style={{ padding: '6px' }}><Smile size={16} /></button>
            <button onClick={handleSend} className="btn btn-primary" style={{ padding: '8px 14px' }}><Send size={15} /></button>
          </div>
        </div>
      </div>

      {/* 1. Team Member Profile Modal */}
      {selectedMemberProfile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="glass-card ai-glow-border" style={{
            width: '420px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button onClick={() => setSelectedMemberProfile(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <img
              src={selectedMemberProfile.avatar}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px auto', border: '3px solid var(--primary)' }}
            />
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{selectedMemberProfile.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{selectedMemberProfile.email}</p>
            <span className="badge badge-accent" style={{ marginBottom: '16px' }}>{selectedMemberProfile.role}</span>

            <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '20px', textAlign: 'left', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className={`badge badge-${selectedMemberProfile.status === 'online' ? 'success' : 'warning'}`}>{selectedMemberProfile.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Timezone:</span>
                <span style={{ fontWeight: 600 }}>{selectedMemberProfile.location}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setSelectedMemberProfile(null); setToastMsg(`Opened direct chat with ${selectedMemberProfile.name}`); }} className="btn btn-primary" style={{ flex: 1, fontSize: '12px' }}>
                <MessageSquare size={14} /> Send Message
              </button>
              <button onClick={() => { 
                const target = selectedMemberProfile;
                setSelectedMemberProfile(null); 
                setDirectCallTarget(target);
                setIsMeetingLive(true); 
                setCurrentView('meetings'); 
              }} className="btn btn-ai" style={{ flex: 1, fontSize: '12px' }}>
                <Video size={14} /> 1-on-1 Video Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Create AI Workflow Canvas Modal in Team Chat */}
      {showWorkflowModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '16px'
        }}>
          <div className="glass-card ai-glow-border" style={{
            width: '520px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: 'var(--tertiary-gold)' }}>
                <Sparkles size={18} /> Chat AI Workflow Canvas
              </div>
              <button onClick={() => setShowWorkflowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Automate channel message summaries, code review triggers, and Linear task generation for <strong>#{activeChannel.name}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)' }}>TRIGGER</div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>New message in #{activeChannel.name} containing key specs</div>
              </div>

              <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--accent)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)' }}>AI PROCESSOR</div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>GPT-4o Auto-Summarize & Extract Action Items</div>
              </div>

              <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)' }}>OUTPUT</div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>Create Linear Task & Post AI Summary to Channel</div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => setShowWorkflowModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button
                  onClick={() => {
                    setShowWorkflowModal(false);
                    setToastMsg(`Deployed AI Chat Workflow for #${activeChannel.name}!`);
                    setTimeout(() => setToastMsg(null), 4000);
                  }}
                  className="btn btn-ai"
                  style={{ flex: 1 }}
                >
                  Deploy Chat Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
