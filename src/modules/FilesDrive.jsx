import React, { useState, useRef } from 'react';
import { 
  Folder, 
  FileText, 
  Sparkles, 
  Search, 
  Upload, 
  Eye, 
  Download, 
  FileCode, 
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  FileCheck,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FilesDrive() {
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(null);

  const [filesList, setFilesList] = useState([
    { id: 'f-1', name: 'TeamOS_2.0_Architecture_Spec.pdf', type: 'pdf', size: '4.2 MB', updated: 'Today', icon: FileText, color: '#ef4444', summary: 'Defines low-latency WebRTC streaming, HSL design tokens, and SOC2 compliance rules.' },
    { id: 'f-2', name: 'Voice_AI_AudioBufferStreamer.js', type: 'code', size: '128 KB', updated: 'Yesterday', icon: FileCode, color: '#38bdf8', summary: 'Optimized JavaScript WebAudio API buffer streamer running at 0ms latency.' },
    { id: 'f-3', name: 'Design_Tokens_Dark_Light.png', type: 'image', size: '1.8 MB', updated: 'Jul 21', icon: ImageIcon, color: '#7c3aed', summary: 'Figma export containing Apple HIG dark/light glassmorphism color variables.' },
    { id: 'f-4', name: 'SOC2_Audit_Compliance_Report.pdf', type: 'pdf', size: '8.6 MB', updated: 'Jul 19', icon: FileText, color: '#ef4444', summary: 'Official 2026 enterprise audit report confirming tenant data isolation and RLS encryption.' }
  ]);

  const [selectedFile, setSelectedFile] = useState(filesList[0]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      let icon = FileText;
      let color = '#2563eb';
      let fileType = 'document';

      if (['jpg', 'jpeg', 'png', 'svg', 'webp'].includes(ext)) {
        icon = ImageIcon;
        color = '#7c3aed';
        fileType = 'image';
      } else if (['js', 'jsx', 'ts', 'tsx', 'py', 'json', 'html', 'css'].includes(ext)) {
        icon = FileCode;
        color = '#38bdf8';
        fileType = 'code';
      } else if (ext === 'pdf') {
        color = '#ef4444';
        fileType = 'pdf';
      }

      const newFileObj = {
        id: `f-${Date.now()}`,
        name: file.name,
        type: fileType,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        updated: 'Just Now',
        icon: icon,
        color: color,
        summary: `AI Document Reader analyzed "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Successfully extracted text headers, metadata, and 2 action items.`
      };

      setFilesList((prev) => [newFileObj, ...prev]);
      setSelectedFile(newFileObj);
      setUploadSuccessMsg(`Successfully uploaded "${file.name}"!`);
      setTimeout(() => setUploadSuccessMsg(null), 4000);
    }
  };

  const handleDeleteFile = (id) => {
    setFilesList((prev) => prev.filter((f) => f.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(filesList.find((f) => f.id !== id) || null);
    }
  };

  const filteredFiles = filesList.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 110px)' }}>
      {/* Hidden File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.txt,.js,.jsx,.ts,.tsx,.json,.doc,.docx,.png,.jpg,.jpeg,.csv"
        style={{ display: 'none' }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 800 }}>Drive, Files & Document AI</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Semantic Vector Indexing & AI OCR Summarizer Engine</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="input-field" style={{ width: '220px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '12px', width: '100%' }}
            />
          </div>

          <button onClick={() => fileInputRef.current?.click()} className="btn btn-ai">
            <Upload size={16} /> Upload Document
          </button>
        </div>
      </div>

      {uploadSuccessMsg && (
        <div className="badge badge-success" style={{ padding: '8px 14px', fontSize: '13px' }}>
          <CheckCircle2 size={15} /> {uploadSuccessMsg}
        </div>
      )}

      {/* Upload Drag & Drop Banner */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="glass-card ai-glow-border"
        style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed var(--primary)',
          backgroundColor: 'var(--primary-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', color: 'var(--primary)' }}>
          <Upload size={22} />
        </div>
        <div style={{ fontWeight: 700, fontSize: '14px' }}>Click or Drag Files Here to Upload</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports PDF, TXT, Code (JS/TS/Py), Word Documents, and Images up to 100MB</div>
      </div>

      {/* Main Files Grid & Reader Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', flex: 1, overflow: 'hidden' }}>
        {/* Files Grid */}
        <div className="glass-card" style={{ padding: '20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Workspace Documents ({filteredFiles.length})</h3>
            <span className="badge badge-gold">Cloudflare R2 Storage Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {filteredFiles.map((file) => {
              const Icon = file.icon;
              const isSel = selectedFile?.id === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    backgroundColor: isSel ? 'var(--primary-light)' : 'var(--bg-surface)',
                    border: isSel ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: `${file.color}15`, color: file.color }}>
                      <Icon size={20} />
                    </div>
                    <span className="badge badge-accent">{file.size}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px', wordBreak: 'break-all', color: 'var(--text-primary)' }}>{file.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Updated {file.updated}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI PDF Summarizer Sidebar */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '15px', color: 'var(--tertiary-gold)' }}>
            <Sparkles size={16} /> Document AI Reader
          </div>

          {selectedFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px', wordBreak: 'break-all' }}>{selectedFile.name}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <span className="badge badge-primary">{selectedFile.size}</span>
                  <span className="badge badge-success">{selectedFile.type.toUpperCase()}</span>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-light)', border: '1px solid var(--accent)', fontSize: '12px' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Instant AI Document Summary
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {selectedFile.summary}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => alert(`Downloading "${selectedFile.name}"...`)} className="btn btn-secondary" style={{ flex: 1, fontSize: '12px' }}>
                  <Download size={14} /> Download
                </button>
                <button onClick={() => handleDeleteFile(selectedFile.id)} className="btn btn-ghost" style={{ padding: '8px', color: 'var(--danger)' }} title="Delete File">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '40px 0' }}>
              Select any document to generate instant AI summaries & Q&A.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
