import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  Award, 
  Briefcase, 
  Sparkles, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  DollarSign,
  TrendingUp,
  Building,
  Check,
  UserPlus
} from 'lucide-react';
import Tilt from '../components/ui/Tilt';

export default function HRPlatform() {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'employees' | 'attendance' | 'leave' | 'payroll' | 'performance' | 'recruitment'

  // State Datasets
  const [employees, setEmployees] = useState([
    { id: 'EMP-101', name: 'Elena Rostova', role: 'VP of Product', dept: 'Product', status: 'Active', salary: '₹28,50,000 / yr', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { id: 'EMP-102', name: 'Sarah Chen', role: 'Staff Product Designer', dept: 'Design', status: 'Active', salary: '₹22,00,000 / yr', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { id: 'EMP-103', name: 'Alex Rivera', role: 'Principal AI Architect', dept: 'Engineering', status: 'On Leave', salary: '₹34,00,000 / yr', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { id: 'EMP-104', name: 'Marcus Vance', role: 'Infra & Security Lead', dept: 'Engineering', status: 'Active', salary: '₹26,00,000 / yr', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'LV-301', name: 'Alex Rivera', type: 'Casual Leave', days: '3 Days', dates: 'Jul 24 - Jul 26', status: 'Pending' },
    { id: 'LV-302', name: 'Sarah Chen', type: 'Sick Leave', days: '1 Day', dates: 'Jul 28', status: 'Approved' }
  ]);

  const [payrollRecords, setPayrollRecords] = useState([
    { id: 'PAY-801', name: 'Elena Rostova', basic: '₹1,80,000', allowances: '₹40,000', deductions: '₹12,000', net: '₹2,08,000', status: 'Paid' },
    { id: 'PAY-802', name: 'Sarah Chen', basic: '₹1,40,000', allowances: '₹30,000', deductions: '₹8,000', net: '₹1,62,000', status: 'Pending' },
    { id: 'PAY-803', name: 'Alex Rivera', basic: '₹2,20,000', allowances: '₹50,000', deductions: '₹15,000', net: '₹2,55,000', status: 'Pending' }
  ]);

  const [candidates, setCandidates] = useState([
    { id: 'CND-1', name: 'Vikram Mehta', position: 'Senior Full Stack Lead', stage: 'Applied', rating: 4.8 },
    { id: 'CND-2', name: 'Priya Sharma', position: 'AI Voice Researcher', stage: 'Interview', rating: 4.9 },
    { id: 'CND-3', name: 'Rohan Gupta', position: 'UI/UX Specialist', stage: 'Offer', rating: 4.7 }
  ]);

  const handleApproveLeave = (id) => {
    setLeaveRequests((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'Approved' } : l)));
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'Rejected' } : l)));
  };

  const handleMarkPaid = (id) => {
    setPayrollRecords((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'Paid' } : p)));
  };

  const recruitmentStages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 800 }}>HR & People Ecosystem</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Attendance, Leave Workflow, Payroll ₹ INR, Performance & Recruitment</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-gold" style={{ fontSize: '12px', padding: '6px 12px' }}>
            <Award size={14} /> AI Evaluator Active
          </span>
          <button className="btn btn-ai"><UserPlus size={16} /> Onboard New Hire</button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '4px',
        backgroundColor: 'var(--bg-input)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'overview', label: 'HR Overview', icon: Users },
          { id: 'employees', label: 'Employee Directory', icon: UserCheck },
          { id: 'attendance', label: 'Attendance Logs', icon: Clock },
          { id: 'leave', label: 'Leave Requests', icon: Calendar },
          { id: 'payroll', label: 'Payroll (₹ INR)', icon: CreditCard },
          { id: 'performance', label: 'Performance Reviews', icon: Star },
          { id: 'recruitment', label: 'Recruitment Kanban', icon: Briefcase }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSel ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                color: isSel ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isSel ? 600 : 400,
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB CONTENTS */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* 1. OVERVIEW */}
        {activeSubTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 3D Tilt Stat Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Total Headcount', val: '42 Employees', sub: '12 Engineering, 8 Design', color: 'var(--primary)' },
                { label: 'On Leave Today', val: '2 Staff', sub: '1 Sick, 1 Casual', color: 'var(--warning)' },
                { label: 'Monthly Payroll', val: '₹48,50,000', sub: 'July 2026 Cycle', color: 'var(--tertiary-gold)' },
                { label: 'Avg Rating', val: '4.9 / 5.0', sub: 'AI Evaluated', color: 'var(--success)' },
                { label: 'Open Positions', val: '6 Roles', sub: '3 Engineering, 3 Sales', color: 'var(--accent)' }
              ].map((s, idx) => (
                <Tilt key={idx} max={8}>
                  <div className="glass-card" style={{ padding: '18px', height: '100%', borderLeft: `4px solid ${s.color}` }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.label}</div>
                    <div className="font-heading" style={{ fontSize: '22px', fontWeight: 800, margin: '6px 0', color: 'var(--text-primary)' }} style={{ transform: 'translateZ(20px)' }}>{s.val}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.sub}</div>
                  </div>
                </Tilt>
              ))}
            </div>

            {/* Pending Approvals & Recent Hires */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Pending Leave Approvals</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {leaveRequests.filter((l) => l.status === 'Pending').map((l) => (
                    <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{l.name} ({l.type})</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{l.dates} • {l.days}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleApproveLeave(l.id)} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '11px' }}><CheckCircle2 size={12} /> Approve</button>
                        <button onClick={() => handleRejectLeave(l.id)} className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--danger)' }}><XCircle size={12} /> Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Active Department Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { dept: 'Engineering & Tech', count: '18 members', pct: '42%' },
                    { dept: 'Product & Design', count: '12 members', pct: '28%' },
                    { dept: 'Sales & Marketing', count: '8 members', pct: '18%' },
                    { dept: 'Operations & HR', count: '4 members', pct: '12%' }
                  ].map((d, idx) => (
                    <div key={idx} style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500 }}>{d.dept}</span>
                      <span className="badge badge-accent">{d.count} ({d.pct})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. EMPLOYEES */}
        {activeSubTab === 'employees' && (
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Employee Directory ({employees.length})</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="input-field" style={{ width: '220px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Search size={14} color="var(--text-muted)" />
                  <input type="text" placeholder="Search staff..." style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '12px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {employees.map((emp) => (
                <div key={emp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={emp.avatar} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{emp.name} <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>({emp.id})</span></div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{emp.role} • {emp.dept}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--tertiary-gold)' }}>{emp.salary}</span>
                    <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{emp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ATTENDANCE */}
        {activeSubTab === 'attendance' && (
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Daily Attendance Logs (Today)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Elena Rostova', in: '09:00 AM', out: '06:15 PM', hrs: '9h 15m', status: 'Present' },
                { name: 'Sarah Chen', in: '09:12 AM', out: '06:00 PM', hrs: '8h 48m', status: 'Present' },
                { name: 'Alex Rivera', in: '-', out: '-', hrs: '0h', status: 'On Leave' },
                { name: 'Marcus Vance', in: '09:45 AM', out: 'In Progress', hrs: '7h 20m', status: 'Late Check-in' }
              ].map((att, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '13px' }}>
                  <div style={{ fontWeight: 600 }}>{att.name}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Check In: {att.in} | Check Out: {att.out}</div>
                  <div style={{ fontWeight: 600 }}>Total: {att.hrs}</div>
                  <span className={`badge ${att.status === 'Present' ? 'badge-success' : att.status === 'Late Check-in' ? 'badge-warning' : 'badge-danger'}`}>{att.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. LEAVE REQUESTS */}
        {activeSubTab === 'leave' && (
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Leave Requests Workflow</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {leaveRequests.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{l.name} — <span style={{ color: 'var(--primary)' }}>{l.type}</span></div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dates: {l.dates} ({l.days})</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className={`badge ${l.status === 'Approved' ? 'badge-success' : l.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>{l.status}</span>
                    {l.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleApproveLeave(l.id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>Approve</button>
                        <button onClick={() => handleRejectLeave(l.id)} className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: '11px', color: 'var(--danger)' }}>Reject</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PAYROLL */}
        {activeSubTab === 'payroll' && (
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Monthly Payroll Reconciliation (July 2026 - ₹ INR)</h3>
              <span className="badge badge-gold">Total Disbursed: ₹6,25,000</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {payrollRecords.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{p.name} <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({p.id})</span></div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Basic: {p.basic} | Allowances: {p.allowances} | Deductions: {p.deductions}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--tertiary-gold)' }}>Net: {p.net}</div>
                    <span className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
                    {p.status === 'Pending' && (
                      <button onClick={() => handleMarkPaid(p.id)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                        <Check size={12} /> Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. PERFORMANCE */}
        {activeSubTab === 'performance' && (
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>AI Performance Reviews & Evaluations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Sarah Chen', rating: 5, reviewer: 'Elena Rostova', feedback: 'Outstanding execution on TeamOS design tokens and glassmorphism specs.' },
                { name: 'Alex Rivera', rating: 5, reviewer: 'Elena Rostova', feedback: 'Pioneered zero-latency webAudio buffer streaming for Voice AI agent.' },
                { name: 'Marcus Vance', rating: 4, reviewer: 'Elena Rostova', feedback: 'Solid progress on SOC2 audit log webhook infrastructure.' }
              ].map((rev, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '16px', backgroundColor: 'var(--bg-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{rev.name}</span>
                    <div style={{ display: 'flex', color: 'var(--warning)' }}>
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '10px' }}>"{rev.feedback}"</p>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reviewer: {rev.reviewer}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. RECRUITMENT */}
        {activeSubTab === 'recruitment' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {recruitmentStages.map((stage) => {
              const stageCandidates = candidates.filter((c) => c.stage === stage);
              return (
                <div key={stage} className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', paddingBottom: '6px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{stage}</span>
                    <span className="badge badge-accent" style={{ fontSize: '9px' }}>{stageCandidates.length}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stageCandidates.map((cand) => (
                      <div key={cand.id} style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{cand.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cand.position}</div>
                        <div style={{ fontSize: '10px', color: 'var(--warning)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Star size={10} fill="currentColor" /> {cand.rating} Rating
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
