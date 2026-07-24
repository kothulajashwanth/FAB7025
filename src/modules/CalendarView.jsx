import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Sparkles, 
  Video, 
  CheckCircle2, 
  Globe,
  Copy,
  Check,
  Users,
  X,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CalendarView() {
  const { isMeetingLive, setIsMeetingLive, setCurrentView } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showMutualSlotModal, setShowMutualSlotModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [scheduleToast, setScheduleToast] = useState(null);
  
  // Selected Active Date Index (Default: Today = Index 3)
  const [selectedDateIdx, setSelectedDateIdx] = useState(3);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('02:00 PM');
  const [eventType, setEventType] = useState('Meeting');

  const bookingLink = 'https://teamos.ai/schedule/elena-rostova';

  const days = [
    { label: 'Mon', dateNum: '20', month: 'Jul 2026', full: 'Monday, July 20, 2026' },
    { label: 'Tue', dateNum: '21', month: 'Jul 2026', full: 'Tuesday, July 21, 2026' },
    { label: 'Wed', dateNum: '22', month: 'Jul 2026', full: 'Wednesday, July 22, 2026' },
    { label: 'Thu', dateNum: '23', month: 'Jul 2026', full: 'Thursday, July 23, 2026 (Today)' },
    { label: 'Fri', dateNum: '24', month: 'Jul 2026', full: 'Friday, July 24, 2026' }
  ];

  const [calendarEvents, setCalendarEvents] = useState([
    { dayIdx: 0, time: '09:00 AM', title: 'Weekly Ops Sync', type: 'ops', color: 'var(--primary)' },
    { dayIdx: 1, time: '02:00 PM', title: 'Architecture Review', type: 'arch', color: 'var(--accent)' },
    { dayIdx: 2, time: '11:30 AM', title: 'Client Demo Call', type: 'demo', color: 'var(--success)' },
    { dayIdx: 3, time: '11:00 AM', title: 'Executive AI Strategy Sync', type: 'live', color: 'var(--primary)', isLive: true },
    { dayIdx: 3, time: '03:30 PM', title: 'WebRTC Mesh Benchmark Test', type: 'tech', color: '#00F5FF' },
    { dayIdx: 4, time: '04:00 PM', title: 'Retro & Demo Day', type: 'retro', color: 'var(--warning)' }
  ]);

  const mutualSlots = [
    { time: '03:00 PM - 04:00 PM', overlap: '4/4 Free (100% Match)', attendees: ['Elena Rostova', 'Sarah Chen', 'Alex Rivera', 'Marcus Vance'] },
    { time: '10:00 AM - 11:00 AM', overlap: '4/4 Free (100% Match)', attendees: ['Elena Rostova', 'Sarah Chen', 'Alex Rivera', 'Marcus Vance'] },
    { time: '02:00 PM - 03:00 PM', overlap: '3/4 Free (75% Match)', attendees: ['Elena Rostova', 'Sarah Chen', 'Alex Rivera'] }
  ];

  const handleShareLink = () => {
    navigator.clipboard.writeText(bookingLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleBookMutualSlot = (slot) => {
    const newEvent = {
      dayIdx: selectedDateIdx,
      time: slot.time.split(' - ')[0],
      title: 'AI Scheduled Mutual Sync',
      type: 'sync',
      color: 'var(--tertiary-gold)'
    };
    setCalendarEvents((prev) => [...prev, newEvent]);
    setShowMutualSlotModal(false);
    setScheduleToast(`Scheduled "${newEvent.title}" for ${days[selectedDateIdx].label} at ${slot.time}!`);
    setTimeout(() => setScheduleToast(null), 4000);
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvt = {
      dayIdx: selectedDateIdx,
      time: eventTime,
      title: eventTitle.trim(),
      type: eventType,
      color: 'var(--primary)'
    };

    setCalendarEvents(prev => [...prev, newEvt]);
    setShowNewEventModal(false);
    setEventTitle('');
    setScheduleToast(`Added event "${newEvt.title}" for ${days[selectedDateIdx].full}!`);
    setTimeout(() => setScheduleToast(null), 4000);
  };

  const selectedDateEvents = calendarEvents.filter(e => e.dayIdx === selectedDateIdx);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '28px', fontWeight: 800 }}>Calendar & Smart AI Scheduling</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Synced with Google Calendar, Microsoft Outlook & LiveKit Video</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setShowNewEventModal(true)} className="btn btn-secondary" style={{ fontSize: '12px' }}>
            <Plus size={14} color="var(--primary)" /> Add Event
          </button>
          
          <button onClick={handleShareLink} className="btn btn-secondary" style={{ fontSize: '12px' }}>
            {copiedLink ? <Check size={14} color="var(--success)" /> : <Globe size={14} />}
            {copiedLink ? 'Copied Link!' : 'Share Booking Link'}
          </button>

          <button onClick={() => setShowMutualSlotModal(true)} className="btn btn-ai" style={{ fontSize: '12px' }}>
            <Sparkles size={16} /> AI Find Mutual Slot
          </button>
        </div>
      </div>

      {scheduleToast && (
        <div className="badge badge-success" style={{ padding: '10px 16px', fontSize: '13px' }}>
          <CheckCircle2 size={16} /> {scheduleToast}
        </div>
      )}

      {/* Week Day Matrix Selector Bar */}
      <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--primary)' }}>
            July 2026 • {days[selectedDateIdx].full}
          </div>
          <span className="badge badge-primary">Selected: {days[selectedDateIdx].label} {days[selectedDateIdx].dateNum}</span>
        </div>

        {/* Day Selector Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {days.map((d, idx) => {
            const isSel = selectedDateIdx === idx;
            const evtCount = calendarEvents.filter(e => e.dayIdx === idx).length;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDateIdx(idx)}
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isSel ? 'var(--primary-light)' : 'var(--bg-surface)',
                  border: isSel ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  color: isSel ? 'var(--primary)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>{d.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 900, margin: '4px 0' }}>{d.dateNum}</div>
                <span className="badge" style={{ fontSize: '10px', backgroundColor: isSel ? 'var(--primary)' : 'var(--bg-input)', color: isSel ? '#fff' : 'var(--text-secondary)' }}>
                  {evtCount} Events
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Events Stream */}
      <div className="glass-card" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Events for {days[selectedDateIdx].full}</h2>
          <button onClick={() => setShowNewEventModal(true)} className="btn btn-ghost" style={{ fontSize: '12px', color: 'var(--primary)' }}>
            <Plus size={14} /> Schedule Event
          </button>
        </div>

        {selectedDateEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No scheduled events for this date. Click <strong>"Add Event"</strong> or <strong>"AI Find Mutual Slot"</strong> to schedule!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {selectedDateEvents.map((evt, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  borderLeft: `4px solid ${evt.color}`,
                  borderTop: '1px solid var(--border-color)',
                  borderRight: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>{evt.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Clock size={14} /> {evt.time} • {evt.type.toUpperCase()}
                  </div>
                </div>

                {evt.isLive ? (
                  <button onClick={() => { setIsMeetingLive(true); setCurrentView('meetings'); }} className="btn btn-ai" style={{ fontSize: '12px' }}>
                    <Video size={14} /> Join Call
                  </button>
                ) : (
                  <span className="badge badge-cyan" style={{ fontSize: '11px' }}>Scheduled</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI MUTUAL SLOT MODAL */}
      {showMutualSlotModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '520px', padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>AI Find Mutual Slot</h3>
              <button onClick={() => setShowMutualSlotModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {mutualSlots.map((slot, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{slot.time}</div>
                    <div style={{ fontSize: '11px', color: 'var(--success)', marginTop: '2px' }}>{slot.overlap}</div>
                  </div>
                  <button onClick={() => handleBookMutualSlot(slot)} className="btn btn-ai" style={{ fontSize: '11px', padding: '6px 14px' }}>
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW EVENT MODAL */}
      {showNewEventModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div className="glass-card ai-glow-border" style={{ width: '460px', padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Add Event for {days[selectedDateIdx].label} {days[selectedDateIdx].dateNum}</h3>
              <button onClick={() => setShowNewEventModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleCreateEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Event Title</label>
                <input type="text" className="input-field" placeholder="e.g. Design Token Review" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Time</label>
                  <input type="text" className="input-field" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Category</label>
                  <select className="input-field" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    <option value="Meeting">Meeting</option>
                    <option value="Review">Review</option>
                    <option value="Demo">Demo</option>
                    <option value="Sync">Sync</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowNewEventModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
