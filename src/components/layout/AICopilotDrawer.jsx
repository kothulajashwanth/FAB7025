import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  FileText, 
  Zap, 
  Code, 
  Mic, 
  CheckCircle2, 
  ArrowUpRight,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AICopilotDrawer() {
  const { isCopilotOpen, setIsCopilotOpen, currentView, addTask, workspaceMode } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello Elena! I'm your TeamOS AI Copilot monitoring the **${currentView.toUpperCase()}** module in **${workspaceMode === 'team' ? 'Team' : 'Individual'} Mode**. How can I assist your workflow right now?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isCopilotOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let response = `I evaluated your request for "${currentInput}" against the active workspace context in ${currentView}.`;

      if (currentInput.toLowerCase().includes('summarize')) {
        response = `✨ **Executive Summary (${currentView.toUpperCase()})**:\n- Active module status: **100% Healthy**\n- 0 P0 critical blockers detected.\n- 3 action items identified for immediate execution.`;
      } else if (currentInput.toLowerCase().includes('task') || currentInput.toLowerCase().includes('create')) {
        const taskId = `TSK-${Math.floor(Math.random() * 800) + 100}`;
        addTask({
          id: taskId,
          title: `AI Copilot: ${currentInput}`,
          project: 'AI Copilot Directives',
          status: 'todo',
          priority: 'P1',
          assignee: 'Elena Rostova',
          assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
          dueDate: 'Today',
          subtasks: [{ id: 'st-1', title: 'Execute Copilot directive', done: false }],
          tags: ['AI Generated', 'Copilot']
        });
        response = `🚀 **Task Created**: Added "${taskId}" ("${currentInput}") directly to your Linear Kanban board!`;
      } else if (currentInput.toLowerCase().includes('risk') || currentInput.toLowerCase().includes('predict')) {
        response = `⚡ **AI Risk Assessment**: Workspace velocity is at 94%. No capacity bottlenecks found for the current sprint.`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 700);
  };

  const quickPrompts = [
    { label: 'Summarize Page', icon: FileText },
    { label: 'Predict Risk', icon: Zap },
    { label: 'Create P0 Task', icon: CheckCircle2 },
    { label: 'Generate Code Spec', icon: Code }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '64px',
      right: 0,
      width: '380px',
      maxWidth: '100vw',
      height: 'calc(100vh - 64px)',
      backgroundColor: 'var(--bg-card)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 45,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.12))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            padding: '6px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            display: 'flex'
          }}>
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>AI Copilot Drawer</div>
            <div style={{ fontSize: '11px', color: 'var(--accent)' }}>Active View: {currentView}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={() => setMessages([])} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }} title="Clear Chat">
            <Trash2 size={15} />
          </button>
          <button 
            onClick={() => setIsCopilotOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div style={{ padding: '10px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderBottom: '1px solid var(--border-color)' }}>
        {quickPrompts.map((qp, idx) => {
          const Icon = qp.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                setInput(qp.label);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '11px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={12} color="var(--primary)" />
              <span>{qp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '12px 14px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: m.sender === 'user' ? 'var(--primary)' : 'var(--bg-surface)',
              color: m.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
              border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
              fontSize: '13px',
              lineHeight: '1.5'
            }}
          >
            {m.sender === 'ai' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--tertiary-gold)', marginBottom: '4px' }}>
                <Bot size={13} /> TeamOS AI
              </div>
            )}
            <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
            <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>{m.time}</div>
          </div>
        ))}

        {isThinking && (
          <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={14} className="animate-spin" color="var(--accent)" />
            <span style={{ color: 'var(--text-muted)' }}>Copilot thinking...</span>
          </div>
        )}
      </div>

      {/* Input Composer */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px 6px 14px',
          backgroundColor: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <input
            type="text"
            placeholder="Ask Copilot anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontFamily: 'var(--font-family)'
            }}
          />
          <button
            onClick={handleSend}
            className="btn btn-ai"
            style={{ padding: '8px', borderRadius: 'var(--radius-md)' }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
