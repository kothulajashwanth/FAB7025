import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  Sparkles, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  PenTool, 
  CheckCircle2, 
  Play, 
  Download,
  Bot,
  Trash2,
  Radio,
  Plus,
  RefreshCw,
  Camera,
  AlertCircle,
  Wifi,
  Copy,
  Check,
  Share2,
  UserPlus,
  PhoneCall,
  ExternalLink,
  Shield,
  ShieldAlert,
  Lock,
  Unlock,
  Smile,
  Send,
  Paperclip,
  Maximize2,
  Grid,
  User,
  MoreVertical,
  Volume2,
  VolumeX,
  Sliders,
  X,
  Hand,
  Layers,
  Settings,
  Circle,
  HelpCircle,
  QrCode,
  Calendar,
  Clock,
  Info,
  ChevronDown,
  Keyboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Helper: Format Google Meet Style Code (e.g., abc-defg-hij)
function generateGoogleMeetCode() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const part1 = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const part3 = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  return `${part1}-${part2}-${part3}`;
}

// Helper: Generate Full Credentials Object
function generateFullCredentials() {
  const meetCode = generateGoogleMeetCode();
  const passcode = Math.floor(100000 + Math.random() * 900000).toString();
  const hostKey = `HK-${Math.floor(1000 + Math.random() * 9000)}`;
  const pin = Math.floor(100000 + Math.random() * 900000).toString();
  
  return {
    code: meetCode,
    link: `https://meet.teamos.app/${meetCode}`,
    passcode: passcode,
    hostKey: hostKey,
    dialIn: `+1 555-019-2834 (PIN: ${pin}#)`,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

// ----------------------------------------------------
// Participant Video Tile Component (Google Meet Style)
// ----------------------------------------------------
function VideoTile({ participant, isLocal, localVideoRef, onRequestCamera, webcamErrMsg, isSpeakerView }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: isSpeakerView ? '400px' : '240px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: participant.isSpeaking ? '3px solid #22c55e' : participant.isHandRaised ? '3px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: '#1f2125',
      boxShadow: participant.isSpeaking ? '0 0 24px rgba(34, 197, 94, 0.4)' : '0 8px 32px rgba(0,0,0,0.6)',
      transition: 'all 0.3s ease'
    }}>
      {isLocal && participant.isCam && participant.hasWebcamAccess ? (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: participant.isMirrored ? 'scaleX(-1)' : 'none',
              filter: participant.bgBlur ? 'blur(3px) contrast(1.1)' : 'none'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#22c55e',
            fontSize: '10px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(34, 197, 94, 0.4)'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'pulse 1s infinite' }} />
            HD 1080p
          </div>
        </div>
      ) : isLocal && participant.isCam && !participant.hasWebcamAccess ? (
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <img
            src={participant.avatar}
            alt={participant.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '14px',
              border: '3px solid #3b82f6',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
            }}
          />
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
            Camera Offline / Requesting Access
          </div>
          {webcamErrMsg ? (
            <div style={{ fontSize: '11px', color: '#ef4444', marginBottom: '12px', maxWidth: '80%' }}>
              ⚠️ {webcamErrMsg}
            </div>
          ) : (
            <button
              onClick={onRequestCamera}
              className="btn btn-primary"
              style={{ fontSize: '11px', padding: '6px 14px', borderRadius: '8px' }}
            >
              <Camera size={14} /> Enable Camera
            </button>
          )}
        </div>
      ) : participant.isCam ? (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <img
            src={participant.avatar}
            alt={participant.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.95)'
            }}
          />
        </div>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, #2d3748 0%, #1a202c 100%)'
        }}>
          <img
            src={participant.avatar}
            alt={participant.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: participant.isSpeaking ? '3px solid #22c55e' : '3px solid #4a5568',
              boxShadow: participant.isSpeaking ? '0 0 30px rgba(34, 197, 94, 0.5)' : 'none'
            }}
          />
          <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>
            {participant.name}
          </div>
        </div>
      )}

      {/* Raised Hand Pill */}
      {participant.isHandRaised && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          padding: '6px 12px',
          borderRadius: '999px',
          backgroundColor: '#f59e0b',
          color: '#000',
          fontSize: '12px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
        }}>
          ✋ Hand Raised
        </div>
      )}

      {/* Name Overlay Label (Google Meet Style) */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        padding: '6px 14px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid rgba(255, 255, 255, 0.15)'
      }}>
        <span style={{ fontWeight: 700 }}>{participant.name}</span>
        {participant.isHost && <span style={{ backgroundColor: '#7c3aed', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Host</span>}
        
        {/* Speaking Audio Equalizer Bar */}
        {participant.isSpeaking && (
          <span style={{ display: 'flex', gap: '3px', alignItems: 'center', marginLeft: '4px' }}>
            <span style={{ width: '3px', height: '12px', backgroundColor: '#22c55e', borderRadius: '2px' }} />
            <span style={{ width: '3px', height: '16px', backgroundColor: '#22c55e', borderRadius: '2px' }} />
            <span style={{ width: '3px', height: '10px', backgroundColor: '#22c55e', borderRadius: '2px' }} />
          </span>
        )}
      </div>

      {/* Mic Status Icon Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: participant.isSpeaking ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.85)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
      }}>
        {participant.isSpeaking ? <Mic size={16} /> : <MicOff size={16} />}
      </div>
    </div>
  );
}

export default function VideoMeetings() {
  const { isMeetingLive, setIsMeetingLive, userName, directCallTarget } = useApp();

  // Active Credentials State
  const [credentials, setCredentials] = useState(() => generateFullCredentials());
  const [joinInputCode, setJoinInputCode] = useState('');
  
  // Meeting Controls State
  const [isHost, setIsHost] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasWebcamAccess, setHasWebcamAccess] = useState(false);
  const [webcamErrMsg, setWebcamErrMsg] = useState(null);
  const [isMirrored, setIsMirrored] = useState(true);
  const [bgBlur, setBgBlur] = useState(false);
  
  // UI Panels
  const [activePanel, setActivePanel] = useState(null); // 'people' | 'chat' | 'info' | 'ai'
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'new-created' | 'credentials-info'
  const [floatingReactions, setFloatingReactions] = useState([]);

  // In-Call Chat & Transcript
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Sarah Chen', text: 'Welcome team! LiveKit HD stream active.', time: '10:22 AM' },
    { id: 2, sender: 'Alex Rivera', text: 'GPT-4o voice pipeline connected at 0ms latency!', time: '10:24 AM' }
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  // Synchronized Active Participants
  const [participants, setParticipants] = useState([
    { id: 'p-me', name: `${userName || 'Elena Rostova'} (You)`, role: 'Host', isHost: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', isSpeaking: true, isCam: true, isHandRaised: false, isMirrored: true, bgBlur: false, hasWebcamAccess: false },
    { id: 'p-1', name: 'Alex Rivera', role: 'Staff AI Eng', isHost: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', isSpeaking: true, isCam: true },
    { id: 'p-2', name: 'Sarah Chen', role: 'VP Design', isHost: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80', isSpeaking: false, isCam: true },
    { id: 'p-3', name: 'Marcus Vance', role: 'Security Lead', isHost: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', isSpeaking: false, isCam: false }
  ]);

  const localVideoRef = useRef(null);
  const screenShareVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);

  // Toast Notification Helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Hardware Webcam Handler
  const requestHardwareWebcam = async () => {
    if (streamRef.current && streamRef.current.getVideoTracks().some(t => t.readyState === 'live')) {
      setHasWebcamAccess(true);
      if (localVideoRef.current && localVideoRef.current.srcObject !== streamRef.current) {
        localVideoRef.current.srcObject = streamRef.current;
        localVideoRef.current.play().catch(console.warn);
      }
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setWebcamErrMsg("Browser does not support camera API.");
      return;
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' },
        audio: true
      });

      streamRef.current = stream;
      setHasWebcamAccess(true);
      setWebcamErrMsg(null);

      setParticipants(prev => prev.map(p => p.id === 'p-me' ? { ...p, hasWebcamAccess: true, isCam: true } : p));

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch(console.warn);
      }
    } catch (err) {
      console.warn("Camera request info:", err);
      setHasWebcamAccess(false);
      setWebcamErrMsg('Camera stream active or restricted in browser permissions.');
    }
  };

  useEffect(() => {
    if (isCamOn && isMeetingLive) {
      requestHardwareWebcam();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setHasWebcamAccess(false);
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, [isCamOn, isMeetingLive]);

  // Handle Create Meeting for Later
  const handleCreateMeetingForLater = () => {
    const creds = generateFullCredentials();
    setCredentials(creds);
    setNewMenuOpen(false);
    setActiveModal('new-created');
  };

  // Handle Start Instant Meeting
  const handleStartInstantMeeting = () => {
    const creds = generateFullCredentials();
    setCredentials(creds);
    setNewMenuOpen(false);
    setIsHost(true);
    setIsMeetingLive(true);
    showToast(`🟢 Google Meet call live! Code: ${creds.code}`);
  };

  // Handle Join by Input Code
  const handleJoinWithCode = (e) => {
    e.preventDefault();
    if (!joinInputCode.trim()) return;
    const cleanCode = joinInputCode.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    const newCreds = {
      code: cleanCode,
      link: `https://meet.teamos.app/${cleanCode}`,
      passcode: '849201',
      hostKey: 'HK-9921',
      dialIn: '+1 555-019-2834 (PIN: 882192#)',
      createdAt: 'Just now'
    };
    setCredentials(newCreds);
    setIsHost(false);
    setIsMeetingLive(true);
    showToast(`🟢 Joined meeting "${cleanCode}" successfully!`);
  };

  // Copy Credentials Link Helper
  const handleCopyCredentials = () => {
    navigator.clipboard.writeText(`Meeting Link: ${credentials.link}\nMeeting Code: ${credentials.code}\nPasscode: ${credentials.passcode}\nDial-in: ${credentials.dialIn}`);
    showToast("📋 Joining info copied to clipboard!");
  };

  // Real Screen Share
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(t => t.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);
      showToast("Stopped screen sharing.");
    } else {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        alert("Screen sharing is not supported by your browser.");
        return;
      }

      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        screenStreamRef.current = displayStream;
        setIsScreenSharing(true);
        showToast("🖥️ Screen sharing live!");

        displayStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          screenStreamRef.current = null;
        };
      } catch (err) {
        console.warn("Screen share info:", err);
      }
    }
  };

  // Send Chat Message
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: `${userName || 'Elena Rostova'} (You)`,
      text: newChatMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, msg]);
    setNewChatMessage('');
  };

  // Floating Reactions
  const triggerReaction = (emoji) => {
    const id = Date.now() + Math.random();
    const xPos = Math.random() * 60 + 20;
    setFloatingReactions(prev => [...prev, { id, emoji, xPos }]);
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== id));
    }, 2500);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 'calc(100vh - 80px)', 
      backgroundColor: '#17181b', 
      color: '#ffffff',
      borderRadius: '24px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '12px 24px',
          borderRadius: '999px',
          backgroundColor: '#202124',
          border: '1px solid #3b82f6',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} color="#3b82f6" /> {toastMsg}
        </div>
      )}

      {/* Floating Emojis Layer */}
      {floatingReactions.map(r => (
        <div
          key={r.id}
          style={{
            position: 'absolute',
            bottom: '100px',
            left: `${r.xPos}%`,
            fontSize: '40px',
            zIndex: 999,
            pointerEvents: 'none',
            animation: 'floatUpReaction 2.5s ease-out forwards'
          }}
        >
          {r.emoji}
        </div>
      ))}

      {/* ---------------------------------------------------- */}
      {/* SCREEN A: PRE-JOIN / GOOGLE MEET HOME (isMeetingLive === false) */}
      {/* ---------------------------------------------------- */}
      {!isMeetingLive ? (
        <div style={{ 
          flex: 1, 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          padding: '60px 80px', 
          alignItems: 'center', 
          gap: '60px',
          background: 'radial-gradient(circle at 10% 20%, #1e2026 0%, #111215 100%)'
        }}>
          {/* Left Column: Google Meet Header & Actions */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontWeight: 800, fontSize: '12px', marginBottom: '24px' }}>
              <Video size={16} /> TeamOS Meet — Enterprise HD Studio
            </div>

            <h1 className="font-heading" style={{ fontSize: '48px', fontWeight: 900, lineHeight: '1.15', marginBottom: '20px' }}>
              Video calls and meetings for everyone.
            </h1>

            <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '40px', maxWidth: '520px' }}>
              Connect, collaborate, and celebrate from anywhere with high-definition WebRTC video and real-time AI transcription.
            </p>

            {/* Action Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {/* New Meeting Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setNewMenuOpen(!newMenuOpen)}
                  style={{
                    backgroundColor: '#1a73e8',
                    color: '#ffffff',
                    padding: '14px 24px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 20px rgba(26, 115, 232, 0.4)'
                  }}
                >
                  <Video size={18} /> New meeting <ChevronDown size={16} />
                </button>

                {newMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 100,
                    width: '280px',
                    backgroundColor: '#202124',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <button
                      onClick={handleCreateMeetingForLater}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'transparent',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <Info size={16} color="#60a5fa" /> Create a meeting for later
                    </button>
                    <button
                      onClick={handleStartInstantMeeting}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'transparent',
                        color: '#e8eaed',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <Plus size={16} color="#34d399" /> Start an instant meeting
                    </button>
                  </div>
                )}
              </div>

              {/* Enter Code Input */}
              <form onSubmit={handleJoinWithCode} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <Keyboard size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Enter a code or link"
                    value={joinInputCode}
                    onChange={(e) => setJoinInputCode(e.target.value)}
                    style={{
                      padding: '13px 16px 13px 44px',
                      borderRadius: '10px',
                      backgroundColor: '#202124',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      width: '220px'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!joinInputCode.trim()}
                  style={{
                    backgroundColor: joinInputCode.trim() ? '#1a73e8' : 'transparent',
                    color: joinInputCode.trim() ? '#ffffff' : '#5f6368',
                    border: 'none',
                    padding: '13px 20px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: joinInputCode.trim() ? 'pointer' : 'default'
                  }}
                >
                  Join
                </button>
              </form>
            </div>

            {/* Subtext */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '13px', color: '#94a3b8', display: 'flex', gap: '20px' }}>
              <span>🔒 End-to-end encrypted</span>
              <span>⚡ 0ms WebAudio Latency</span>
              <span>✨ Built-in AI Copilot</span>
            </div>
          </div>

          {/* Right Column: Video Preview & Test */}
          <div style={{ 
            backgroundColor: '#202124', 
            borderRadius: '24px', 
            padding: '28px', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Ready to join?</span>
              <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 700 }}>● Device Check</span>
            </div>

            {/* Video Test Box */}
            <div style={{
              width: '100%',
              height: '240px',
              borderRadius: '16px',
              backgroundColor: '#000000',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                alt="Camera preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '16px', display: 'flex', gap: '12px' }}>
                <button onClick={() => setIsMicOn(!isMicOn)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: isMicOn ? 'rgba(255,255,255,0.2)' : '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button onClick={() => setIsCamOn(!isCamOn)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: isCamOn ? 'rgba(255,255,255,0.2)' : '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleStartInstantMeeting}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#1a73e8',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(26, 115, 232, 0.4)'
              }}
            >
              Start Instant Meeting Now
            </button>
          </div>
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* SCREEN B: GOOGLE MEET ACTIVE CALL (isMeetingLive === true) */
        /* ---------------------------------------------------- */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          
          {/* Top Header Controls Bar */}
          <div style={{
            height: '60px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#202124'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="font-mono" style={{ fontSize: '15px', fontWeight: 800, color: '#e8eaed' }}>
                {credentials.code}
              </span>
              <span style={{ padding: '3px 10px', borderRadius: '999px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#34d399', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={12} /> End-to-End Encrypted
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {isRecording && (
                <span style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🔴 REC 00:04:18
                </span>
              )}
              <button
                onClick={() => setActivePanel(activePanel === 'info' ? null : 'info')}
                style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: activePanel === 'info' ? 'rgba(255,255,255,0.2)' : 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Info size={16} /> Meeting Details
              </button>
            </div>
          </div>

          {/* Main Content Area: Video Grid + Sidebar Drawer */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
            
            {/* Stage Grid */}
            <div style={{
              flex: 1,
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: participants.length <= 2 ? '1fr 1fr' : 'repeat(2, 1fr)',
              gridTemplateRows: participants.length <= 2 ? '1fr' : '1fr 1fr',
              gap: '20px',
              alignItems: 'center',
              backgroundColor: '#17181b',
              position: 'relative'
            }}>
              {participants.map((p) => (
                <VideoTile
                  key={p.id}
                  participant={p}
                  isLocal={p.id === 'p-me'}
                  localVideoRef={localVideoRef}
                  onRequestCamera={requestHardwareWebcam}
                  webcamErrMsg={webcamErrMsg}
                />
              ))}

              {/* Live Captions Overlay Banner (Google Meet Style) */}
              {isCaptionsOn && (
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  maxWidth: '700px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}>
                  <span style={{ color: '#3b82f6', fontWeight: 800 }}>[CC] Sarah Chen: </span>
                  "We have deployed the LiveKit WebRTC pipeline with 0ms latency for TeamOS Meet."
                </div>
              )}
            </div>

            {/* Right Drawer Panels (Google Meet Parity) */}
            {activePanel && (
              <div style={{
                width: '360px',
                backgroundColor: '#202124',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
              }}>
                {/* Panel Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800 }}>
                    {activePanel === 'people' && `Participants (${participants.length})`}
                    {activePanel === 'chat' && 'In-call Messages'}
                    {activePanel === 'info' && 'Meeting Credentials'}
                    {activePanel === 'ai' && 'GPT-4o Copilot & Notes'}
                  </h3>
                  <button onClick={() => setActivePanel(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>

                {/* Panel Content Body */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                  
                  {/* People Panel */}
                  {activePanel === 'people' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {participants.map(p => (
                        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={p.avatar} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 700 }}>{p.name}</div>
                              {p.isHost && <div style={{ fontSize: '10px', color: '#a78bfa' }}>Meeting Host</div>}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', color: '#94a3b8' }}>
                            {p.isSpeaking ? <Mic size={16} color="#34d399" /> : <MicOff size={16} color="#ef4444" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Chat Panel */}
                  {activePanel === 'chat' && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', marginBottom: '16px' }}>
                        {chatMessages.map(m => (
                          <div key={m.id} style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.05)', fontSize: '13px' }}>
                            <div style={{ fontWeight: 700, fontSize: '12px', color: '#3b82f6', marginBottom: '2px' }}>{m.sender} <span style={{ fontSize: '10px', color: '#94a3b8' }}>{m.time}</span></div>
                            <div>{m.text}</div>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleSendChatMessage} style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          placeholder="Send a message..."
                          value={newChatMessage}
                          onChange={(e) => setNewChatMessage(e.target.value)}
                          style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '13px', outline: 'none' }}
                        />
                        <button type="submit" style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', cursor: 'pointer' }}>
                          <Send size={16} />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Credentials / Info Panel */}
                  {activePanel === 'info' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 800, marginBottom: '4px' }}>JOINING INFORMATION</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>{credentials.link}</div>
                        <button onClick={handleCopyCredentials} className="btn btn-primary" style={{ width: '100%', fontSize: '12px', padding: '8px' }}>
                          <Copy size={14} /> Copy Joining Info
                        </button>
                      </div>

                      <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#94a3b8' }}>
                        <div><strong>Meeting Code:</strong> <span className="font-mono" style={{ color: '#fff' }}>{credentials.code}</span></div>
                        <div><strong>Passcode:</strong> <span className="font-mono" style={{ color: '#fff' }}>{credentials.passcode}</span></div>
                        <div><strong>Host Key:</strong> <span className="font-mono" style={{ color: '#fff' }}>{credentials.hostKey}</span></div>
                        <div><strong>Dial-in Phone:</strong> <span style={{ color: '#fff' }}>{credentials.dialIn}</span></div>
                      </div>
                    </div>
                  )}

                  {/* AI Copilot Panel */}
                  {activePanel === 'ai' && (
                    <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                      <div style={{ fontWeight: 800, color: '#a78bfa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} /> GPT-4o Meeting Intelligence
                      </div>
                      <p style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '1.5' }}>
                        "Auto-extracted 2 action items: Alex Rivera to verify LiveKit WebRTC audio buffer; Sarah Chen to complete Figma tokens."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Floating Control Bar (Google Meet Style) */}
          <div style={{
            height: '80px',
            backgroundColor: '#202124',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px'
          }}>
            {/* Bottom Left Code & Time */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8eaed', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>|</span>
              <span className="font-mono">{credentials.code}</span>
            </div>

            {/* Center Google Meet Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Mic Button */}
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isMicOn ? '#3c4043' : '#ea4335',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>

              {/* Cam Button */}
              <button
                onClick={() => setIsCamOn(!isCamOn)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isCamOn ? '#3c4043' : '#ea4335',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s ease'
                }}
              >
                {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>

              {/* Captions [CC] Button */}
              <button
                onClick={() => setIsCaptionsOn(!isCaptionsOn)}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isCaptionsOn ? '#8ab4f8' : '#3c4043',
                  color: isCaptionsOn ? '#202124' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                CC
              </button>

              {/* Raise Hand Button */}
              <button
                onClick={() => {
                  setIsHandRaised(!isHandRaised);
                  triggerReaction('✋');
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isHandRaised ? '#f59e0b' : '#3c4043',
                  color: isHandRaised ? '#000' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✋
              </button>

              {/* Present Screen Share Button */}
              <button
                onClick={toggleScreenShare}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: isScreenSharing ? '#8ab4f8' : '#3c4043',
                  color: isScreenSharing ? '#202124' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Monitor size={20} />
              </button>

              {/* Emoji Reactions */}
              <button
                onClick={() => triggerReaction('💖')}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#3c4043',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                💖
              </button>

              {/* Leave / End Call Button */}
              <button
                onClick={() => setIsMeetingLive(false)}
                style={{
                  width: '64px',
                  height: '50px',
                  borderRadius: '25px',
                  backgroundColor: '#ea4335',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(234, 67, 53, 0.5)'
                }}
              >
                <PhoneOff size={22} />
              </button>
            </div>

            {/* Bottom Right Drawer Toggle Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setActivePanel(activePanel === 'info' ? null : 'info')}
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activePanel === 'info' ? 'rgba(255,255,255,0.2)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Info size={18} />
              </button>

              <button
                onClick={() => setActivePanel(activePanel === 'people' ? null : 'people')}
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activePanel === 'people' ? 'rgba(255,255,255,0.2)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Users size={18} />
              </button>

              <button
                onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activePanel === 'chat' ? 'rgba(255,255,255,0.2)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <MessageSquare size={18} />
              </button>

              <button
                onClick={() => setActivePanel(activePanel === 'ai' ? null : 'ai')}
                style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activePanel === 'ai' ? 'rgba(255,255,255,0.2)' : 'transparent', color: '#a78bfa', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL 1: NEW MEETING CREATED CREDENTIALS MODAL */}
      {/* ---------------------------------------------------- */}
      {activeModal === 'new-created' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '440px',
            backgroundColor: '#202124',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Here's the link to your meeting</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '20px' }}>
              Copy this link and send it to the people you want to meet with. Be sure to save it so you can use it later, too.
            </p>

            {/* Generated Credentials Card */}
            <div style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: '#17181b',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <span className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#e8eaed' }}>
                {credentials.link}
              </span>
              <button onClick={handleCopyCredentials} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>
                <Copy size={18} />
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>• Meeting Code: <strong style={{ color: '#fff' }}>{credentials.code}</strong></div>
              <div>• Passcode: <strong style={{ color: '#fff' }}>{credentials.passcode}</strong></div>
              <div>• Dial-in: <strong style={{ color: '#fff' }}>{credentials.dialIn}</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setIsMeetingLive(true);
                }}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >
                Join Meeting Now
              </button>
              <button
                onClick={() => setActiveModal(null)}
                style={{ padding: '12px 20px', borderRadius: '10px', backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
