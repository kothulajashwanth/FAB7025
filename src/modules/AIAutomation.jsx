import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Bot, 
  Video, 
  MessageSquare, 
  CheckSquare,
  X,
  Sliders,
  Bell,
  Mail,
  FileCode
} from 'lucide-react';

export default function AIAutomation() {
  const [showCanvasModal, setShowCanvasModal] = useState(false);
  const [workflowName, setWorkflowName] = useState('New Custom AI Automation');
  const [selectedTrigger, setSelectedTrigger] = useState('Video Meeting Finished');
  const [selectedAi, setSelectedAi] = useState('GPT-4o Action Extractor');
  const [selectedOutput, setSelectedOutput] = useState('Create Linear Task & Send WhatsApp Alert');
  const [testRunSuccessMsg, setTestRunSuccessMsg] = useState(null);

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Meeting → Linear Tasks Automation',
      trigger: 'Zoom Meeting Ends',
      aiAction: 'Whisper AI Transcribe + Task Extraction',
      output: 'Create Linear P1 Tasks & Notify #proj-launch',
      active: true,
      executions: '142 runs'
    },
    {
      id: 2,
      name: 'Negative CRM Sentiment Escalation',
      trigger: 'Client Email Received',
      aiAction: 'Sentiment Analysis < 0.3',
      output: 'Notify VP of Product & Schedule Emergency Sync',
      active: true,
      executions: '28 runs'
    },
    {
      id: 3,
      name: 'Daily Autonomous Standup Bot',
      trigger: 'Schedule: 09:30 AM IST Mon-Fri',
      aiAction: 'Ping engineers & summarize blockers',
      output: 'Post AI Digest to #announcements',
      active: true,
      executions: '450 runs'
    }
  ]);

  const handleSaveWorkflow = () => {
    const newWf = {
      id: Date.now(),
      name: workflowName,
      trigger: selectedTrigger,
      aiAction: selectedAi,
      output: selectedOutput,
      active: true,
      executions: '1 run (Just created)'
    };
    setWorkflows((prev) => [newWf, ...prev]);
    setShowCanvasModal(false);
    setTestRunSuccessMsg(`Successfully created & deployed "${workflowName}"!`);
    setTimeout(() => setTestRunSuccessMsg(null), 4000);
  };

  const handleTestRun = (wfName) => {
    setTestRunSuccessMsg(`Test run completed for "${wfName}" - 0 errors, 100% success!`);
    setTimeout(() => setTestRunSuccessMsg(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 800 }}>Autonomous AI Workflows & Automation</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>No-Code Trigger-Action AI Canvas Rules across 18 Modules</p>
        </div>
        <button onClick={() => setShowCanvasModal(true)} className="btn btn-ai">
          <Plus size={16} /> Create AI Workflow Canvas
        </button>
      </div>

      {testRunSuccessMsg && (
        <div className="badge badge-success" style={{ padding: '10px 16px', fontSize: '13px' }}>
          <CheckCircle2 size={16} /> {testRunSuccessMsg}
        </div>
      )}

      {/* Visual Canvas Demo Box */}
      <div className="glass-card ai-glow-border" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.12))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--tertiary-gold)' }}>
            <Sparkles size={18} /> Interactive Workflow Canvas Builder #101
          </div>
          <button onClick={() => setShowCanvasModal(true)} className="btn btn-secondary" style={{ fontSize: '11px', padding: '4px 10px' }}>
            <Sliders size={13} /> Edit Node Graph
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          {/* Node 1: Trigger */}
          <div className="glass-card" style={{ padding: '16px', flex: 1, backgroundColor: 'var(--bg-card)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>1. TRIGGER</div>
            <div style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={16} color="var(--primary)" /> {selectedTrigger}
            </div>
          </div>

          <ArrowRight size={20} color="var(--accent)" />

          {/* Node 2: AI Processor */}
          <div className="glass-card" style={{ padding: '16px', flex: 1, backgroundColor: 'var(--bg-card)', border: '1px solid var(--accent)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent)', marginBottom: '4px' }}>2. AI AGENT</div>
            <div style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={16} color="var(--accent)" /> {selectedAi}
            </div>
          </div>

          <ArrowRight size={20} color="var(--accent)" />

          {/* Node 3: Output */}
          <div className="glass-card" style={{ padding: '16px', flex: 1, backgroundColor: 'var(--bg-card)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', marginBottom: '4px' }}>3. OUTPUT ACTION</div>
            <div style={{ fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckSquare size={16} color="var(--success)" /> {selectedOutput}
            </div>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Active Enterprise Workflows</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {workflows.map((wf) => (
            <div key={wf.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{wf.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '12px' }}>
                  <span>Trigger: <strong>{wf.trigger}</strong></span>
                  <span>•</span>
                  <span>AI: <strong>{wf.aiAction}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="badge badge-accent">{wf.executions}</span>
                <button onClick={() => handleTestRun(wf.name)} className="btn btn-secondary" style={{ fontSize: '12px' }}>
                  <Play size={12} /> Test Run
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create AI Workflow Canvas Modal */}
      {showCanvasModal && (
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
            width: '560px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: 'var(--tertiary-gold)' }}>
                <Sparkles size={18} /> Create AI Workflow Canvas
              </div>
              <button onClick={() => setShowCanvasModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Workflow Name</label>
                <input type="text" className="input-field" value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>1. Select Trigger Node</label>
                <select className="input-field" value={selectedTrigger} onChange={(e) => setSelectedTrigger(e.target.value)}>
                  <option>Video Meeting Finished</option>
                  <option>Client Email / Message Received</option>
                  <option>Daily Cron Schedule (09:30 AM IST)</option>
                  <option>Linear Issue P0 Tagged</option>
                  <option>New User Self-Serve Signup</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>2. Select AI Processing Node</label>
                <select className="input-field" value={selectedAi} onChange={(e) => setSelectedAi(e.target.value)}>
                  <option>GPT-4o Action Extractor & Summarizer</option>
                  <option>Whisper Speech Transcribe Engine</option>
                  <option>Claude 3.5 Sonnet Code Spec Reviewer</option>
                  <option>CRM Negative Sentiment Classifier</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>3. Select Output Action Node</label>
                <select className="input-field" value={selectedOutput} onChange={(e) => setSelectedOutput(e.target.value)}>
                  <option>Create Linear Task & Send WhatsApp Alert</option>
                  <option>Post AI Digest to Slack #announcements</option>
                  <option>Schedule Emergency Video Call</option>
                  <option>Generate Invoice & Send Email Receipt</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button onClick={() => setShowCanvasModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleSaveWorkflow} className="btn btn-ai" style={{ flex: 1 }}>Save & Deploy Node Flow</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
