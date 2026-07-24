import React, { useState } from 'react';
import { 
  Kanban, 
  List, 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ChevronRight,
  Zap,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TaskManagement() {
  const { tasks, updateTaskStatus, addTask } = useApp();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list' | 'timeline'
  const [selectedTask, setSelectedTask] = useState(null);
  const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false);

  const columns = [
    { id: 'todo', title: 'To Do / Backlog', color: 'var(--text-muted)' },
    { id: 'in-progress', title: 'In Progress', color: 'var(--primary)' },
    { id: 'done', title: 'Completed', color: 'var(--success)' }
  ];

  const handleAutoGenerateSubtasks = () => {
    setIsGeneratingSubtasks(true);
    setTimeout(() => {
      setIsGeneratingSubtasks(false);
      const newTask = {
        id: `TSK-${Math.floor(Math.random() * 900) + 200}`,
        title: 'AI Generated: Implement Cross-Region Cloud Failover',
        project: 'Infra & Security',
        status: 'todo',
        priority: 'P0',
        assignee: 'Marcus Vance',
        assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        dueDate: 'Jul 29',
        subtasks: [
          { id: 'ai-1', title: 'Configure AWS Route53 health checks', done: false },
          { id: 'ai-2', title: 'Setup PostgreSQL multi-region replication', done: false }
        ],
        tags: ['Infra', 'P0', 'AI Auto']
      };
      addTask(newTask);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>Task & Sprint Management</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sprint #24 • Linear-Precision Task Tracking</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* View Switcher Pills */}
          <div style={{ display: 'flex', padding: '4px', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {[
              { id: 'kanban', label: 'Kanban Board', icon: Kanban },
              { id: 'list', label: 'List View', icon: List },
              { id: 'timeline', label: 'Timeline Gantt', icon: Clock }
            ].map((v) => {
              const Icon = v.icon;
              const isSel = viewMode === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setViewMode(v.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSel ? 'var(--bg-surface)' : 'transparent',
                    border: 'none',
                    color: isSel ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: isSel ? 600 : 400,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={14} />
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>

          <button onClick={handleAutoGenerateSubtasks} className="btn btn-ai" style={{ fontSize: '13px' }}>
            <Sparkles size={15} /> {isGeneratingSubtasks ? 'Generating AI Tasks...' : 'AI Auto-Task'}
          </button>
        </div>
      </div>

      {/* Main Board View */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', flex: 1, overflow: 'hidden' }}>
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: col.color }} />
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{col.title}</span>
                  </div>
                  <span className="badge badge-accent" style={{ fontSize: '10px' }}>{colTasks.length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="glass-card"
                      style={{
                        padding: '16px',
                        cursor: 'pointer',
                        backgroundColor: 'var(--bg-surface)',
                        borderLeft: `4px solid ${task.priority === 'P0' ? 'var(--danger)' : 'var(--primary)'}`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>{task.id}</span>
                        <span className={`badge ${task.priority === 'P0' ? 'badge-danger' : 'badge-primary'}`} style={{ fontSize: '10px' }}>
                          {task.priority}
                        </span>
                      </div>

                      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                        {task.title}
                      </div>

                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {task.tags.map((tag, idx) => (
                          <span key={idx} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <img src={task.assigneeAvatar} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{task.assignee}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card" style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`badge ${task.priority === 'P0' ? 'badge-danger' : 'badge-primary'}`}>{task.priority}</span>
                  <span style={{ fontWeight: 600, fontSize: '13px' }}>{task.id}</span>
                  <span style={{ fontSize: '14px' }}>{task.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{task.assignee}</span>
                  <span className="badge badge-accent">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Subtask Detail Drawer Modal */}
      {selectedTask && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'flex-end', zIndex: 90 }}>
          <div className="glass-card" style={{ width: '460px', height: '100%', padding: '28px', backgroundColor: 'var(--bg-card)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="badge badge-primary">{selectedTask.id}</span>
              <button onClick={() => setSelectedTask(null)} className="btn btn-ghost">Close</button>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{selectedTask.title}</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Project: {selectedTask.project}</div>

            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Subtasks ({selectedTask.subtasks.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {selectedTask.subtasks.map((st) => (
                <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  <input type="checkbox" defaultChecked={st.done} style={{ accentColor: 'var(--primary)' }} />
                  <span style={{ textDecoration: st.done ? 'line-through' : 'none', color: st.done ? 'var(--text-muted)' : 'var(--text-primary)' }}>{st.title}</span>
                </div>
              ))}
            </div>

            <button onClick={() => {
              updateTaskStatus(selectedTask.id, 'done');
              setSelectedTask(null);
            }} className="btn btn-primary" style={{ width: '100%' }}>
              Mark Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
