import React, { useState, useRef } from "react";
// You can reuse the exact same CSS file to keep the styling consistent!
import "../../css/Teacher/AddStudents.css"; 

// Helper function to generate a strong 8-character password
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const INITIAL_STUDENTS = [
  { id: 1, name: "John Smith", studentId: "STU20250001", email: "john.smith@email.com", contact: "+1234567890", className: "CHEM101", shift: "Morning", session: "2025-26", color: "blue", initials: "JS", password: "aB3!x9Qz" },
  { id: 2, name: "Sarah Anderson", studentId: "STU20250002", email: "sarah.anderson@email.com", contact: "+1987654321", className: "ENG201", shift: "Evening", session: "2025-26", color: "purple", initials: "SA", password: "mP8#k2Lw" },
  { id: 3, name: "Michael Brown", studentId: "STU20250003", email: "michael.brown@email.com", contact: "+1122334455", className: "BIO101", shift: "Morning", session: "2025-26", color: "emerald", initials: "MB", password: "vN4$r7Ty" },
  { id: 4, name: "Emma Johnson", studentId: "STU20250004", email: "emma.johnson@email.com", contact: "+1555666777", className: "CHEM101", shift: "Evening", session: "2025-26", color: "amber", initials: "EJ", password: "cW1@h5Fs" },
];

const COLOR_MAP = {
  blue: { bg: "#dbeafe", text: "#1d4ed8" },
  purple: { bg: "#f3e8ff", text: "#7c3aed" },
  emerald: { bg: "#d1fae5", text: "#059669" },
  amber: { bg: "#fef3c7", text: "#d97706" },
  rose: { bg: "#ffe4e6", text: "#e11d48" },
  teal: { bg: "#ccfbf1", text: "#0d9488" },
};

const PALETTE = ["blue", "purple", "emerald", "amber", "rose", "teal"];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function Avatar({ name, color }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;
  return (
    <div className="avatar" style={{ background: c.bg }}>
      <span style={{ color: c.text }}>{getInitials(name)}</span>
    </div>
  );
}

function Badge({ type, children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function IconButton({ variant, title, onClick, children }) {
  return (
    <button className={`icon-btn icon-btn-${variant}`} title={title} onClick={onClick}>
      {children}
    </button>
  );
}

// SVG Icons
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const SmallEyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="spinner-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default function UserManagement() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  
  // Added 'password' to the form state
  const [form, setForm] = useState({ 
    name: "", 
    studentId: "", 
    email: "", 
    contact: "", 
    className: "", 
    shift: "", 
    session: "", 
    password: "" 
  });
  
  const [addState, setAddState] = useState("idle"); 
  const [deletingIds, setDeletingIds] = useState(new Set());
  
  const [visiblePasswords, setVisiblePasswords] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isClosingDelete, setIsClosingDelete] = useState(false);
  
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isClosingExport, setIsClosingExport] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  const [exportConfig, setExportConfig] = useState({
    classFilter: "", 
    format: "excel",
    fields: {
      name: true,
      studentId: true,
      email: true,
      contact: true,
      password: true,
      className: true,
      shift: true,
      session: true
    }
  });

  const nextId = useRef(5);
  const nextColor = useRef(0);
  const [error, setError] = useState("");

  const handleFormChange = (field) => (e) => {
    setError(""); 
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.studentId.trim()) {    
      setError("Please fill in Full Name and Student ID.");
      return;
    }

    if (editingId) {
      setStudents((prev) => prev.map((s) => {
        if (s.id === editingId) {
          return {
            ...s,
            name: form.name.trim(),
            studentId: form.studentId.trim(),
            email: form.email.trim() || "N/A",
            contact: form.contact.trim() || "N/A",
            className: form.className || "Unassigned",
            shift: form.shift || "Morning",
            session: form.session.trim() || "2025-26",
            password: form.password.trim() || s.password, // Update password if provided
            initials: getInitials(form.name.trim()),
          };
        }
        return s;
      }));
      setAddState("success");
      setTimeout(() => {
        setAddState("idle");
        cancelEdit();
      }, 1500);
    } else {
      const color = PALETTE[nextColor.current % PALETTE.length];
      nextColor.current++;
      
      const newStudent = {
        id: nextId.current++,
        name: form.name.trim(),
        studentId: form.studentId.trim(),
        email: form.email.trim() || "N/A",
        contact: form.contact.trim() || "N/A", 
        className: form.className || "Unassigned", 
        shift: form.shift || "Morning",
        session: form.session.trim() || "2025-26",
        color,
        initials: getInitials(form.name.trim()),
        password: form.password.trim() || generatePassword(), // Generate if left empty
      };
      
      setStudents((prev) => [newStudent, ...prev]);
      setAddState("success");
      
      setTimeout(() => {
        setAddState("idle");
        setForm({ name: "", studentId: "", email: "", contact: "", className: "", shift: "", session: "", password: "" });
      }, 1500);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      studentId: student.studentId,
      email: student.email === "N/A" ? "" : student.email,
      contact: student.contact === "N/A" ? "" : student.contact,
      className: student.className === "Unassigned" ? "" : student.className,
      shift: student.shift,
      session: student.session,
      password: student.password // Populate the password so admin can edit
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", studentId: "", email: "", contact: "", className: "", shift: "", session: "", password: "" });
    setError("");
  };

  const handleDeleteClick = (id) => {
    setIsClosingDelete(false);
    setStudentToDelete(id);
  };
  
  const closeDeleteModal = () => {
    setIsClosingDelete(true);
    setTimeout(() => {
      setStudentToDelete(null);
      setIsClosingDelete(false);
    }, 250);
  };

  const confirmDelete = () => {
    const id = studentToDelete;
    setIsClosingDelete(true);
    setTimeout(() => {
      setStudentToDelete(null);
      setIsClosingDelete(false);
      setDeletingIds((prev) => new Set([...prev, id]));
      setTimeout(() => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        setDeletingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      }, 350);
    }, 250);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const openExportModal = () => {
    setExportConfig(prev => ({ ...prev, classFilter: selectedClass }));
    setIsClosingExport(false);
    setIsDownloading(false);
    setDownloadProgress(0);
    setIsExportOpen(true);
  };
  
  const closeExportModal = () => {
    if (isDownloading) return; 
    setIsClosingExport(true);
    setTimeout(() => {
      setIsExportOpen(false);
      setIsClosingExport(false);
    }, 250);
  };
  
  const toggleExportField = (field) => {
    setExportConfig(prev => ({
      ...prev,
      fields: { ...prev.fields, [field]: !prev.fields[field] }
    }));
  };

  const handleDownloadExport = () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10; 
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          setIsExportOpen(false);
        }, 400); 
      }
      setDownloadProgress(progress);
    }, 200); 
  };

  const filtered = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q);
    const matchesClass = !selectedClass || (s.className && s.className === selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        
        {/* Class Select + Search */}
        <div className="top-row fade-in">
          <div className="field-group">
            <label className="field-label">Filter by Class</label>
            <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">All Classes</option>
              <option value="CHEM101">Chemistry 101 (CHEM101)</option>
              <option value="ENG201">English Literature II (ENG201)</option>
              <option value="BIO101">Biology Fundamentals (BIO101)</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Search Users</label>
            <div className="search-wrapper">
              <span className="search-icon"><SearchIcon /></span>
              <input
                type="text"
                className="input-field search-input"
                placeholder="Search by name or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Enroll / Edit Form */}
        <div className="card fade-in">
          <h3 className="card-title">{editingId ? "Edit Student Account" : "Register New Student"}</h3>
          
          <div className="form-grid student-form-grid">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input type="text" className="input-field" placeholder="e.g., John Smith" value={form.name} onChange={handleFormChange("name")} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Student ID</label>
              <input type="text" className="input-field" placeholder="e.g., STU20250001" value={form.studentId} onChange={handleFormChange("studentId")} disabled={editingId !== null} />
            </div>

            {/* Added Password Field */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder={editingId ? "Update password" : "Leave empty to auto-generate"} 
                value={form.password} 
                onChange={handleFormChange("password")} 
              />
            </div>
            
            <div className="field-group">
              <label className="field-label">Email</label>
              <input type="email" className="input-field" placeholder="e.g., john@example.com" value={form.email} onChange={handleFormChange("email")} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Contact Number</label>
              <input type="tel" className="input-field" placeholder="e.g., +1234567890" value={form.contact} onChange={handleFormChange("contact")} />
            </div>

            <div className="field-group">
              <label className="field-label">Assign Class</label>
              <select className="input-field" value={form.className} onChange={handleFormChange("className")}>
                <option value="">Select Class</option>
                <option value="CHEM101">Chemistry 101 (CHEM101)</option>
                <option value="ENG201">English Literature II (ENG201)</option>
                <option value="BIO101">Biology Fundamentals (BIO101)</option>
              </select>
            </div>

            <div className="field-group">
              <div className="form-row-split">
                <div className="form-col-half">
                  <label className="field-label">Shift</label>
                  <select className="input-field" value={form.shift} onChange={handleFormChange("shift")}>
                    <option value="">Select Shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                <div className="form-col-half">
                  <label className="field-label">Session</label>
                  <input type="text" className="input-field" placeholder="e.g., 2025-26" value={form.session} onChange={handleFormChange("session")} />
                </div>
              </div>
            </div>

            {error && <p className="form-error-message">{error}</p>}
          </div>
          
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSubmit} disabled={addState === "success"}>
              {addState === "success" ? <><CheckIcon /> Saved!</> : (editingId ? "Save Changes" : <><PlusIcon /> Register Student</>)}
            </button>
            {editingId && (
              <button className="btn-secondary-outline" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Students Table */}
        <div className="table-section fade-in">
          <div className="table-header-row">
            <h3 className="section-title" style={{ margin: 0 }}>Registered Students ({filtered.length})</h3>
            <button className="btn-export" onClick={openExportModal}>
              <ExportIcon /> Export Data
            </button>
          </div>
          <div className="table-card">
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>System Password</th>
                    <th className="align-center">Class</th>
                    <th className="align-center">Shift</th>
                    <th className="align-center">Session</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="empty-state">No users found.</td>
                    </tr>
                  ) : (
                    filtered.map((student, i) => (
                      <tr
                        key={student.id}
                        className={`student-row ${deletingIds.has(student.id) ? "deleting" : ""}`}
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <td>
                          <div className="student-name-cell">
                            <Avatar name={student.name} color={student.color} />
                            <span className="student-name">{student.name}</span>
                          </div>
                        </td>
                        <td><span className="student-id">{student.studentId}</span></td>
                        <td><span className="student-email">{student.email}</span></td>
                        <td><span className="student-contact">{student.contact}</span></td>
                        
                        {/* Password Masking with eye toggle */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span 
                              className="student-password" 
                              style={{ 
                                fontFamily: visiblePasswords.has(student.id) ? 'inherit' : 'monospace',
                                letterSpacing: visiblePasswords.has(student.id) ? 'normal' : '1px',
                                minWidth: '70px',
                                display: 'inline-block'
                              }}
                            >
                              {visiblePasswords.has(student.id) ? student.password : "••••••••"}
                            </span>
                            <button 
                              onClick={() => togglePasswordVisibility(student.id)}
                              style={{ 
                                background: 'transparent', border: 'none', cursor: 'pointer', 
                                color: 'var(--text-muted, #64748b)', padding: '4px', 
                                display: 'flex', alignItems: 'center', borderRadius: '4px',
                                transition: 'background-color 0.2s'
                              }}
                              title={visiblePasswords.has(student.id) ? "Hide Password" : "Show Password"}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              {visiblePasswords.has(student.id) ? <EyeOffIcon /> : <SmallEyeIcon />}
                            </button>
                          </div>
                        </td>
                        
                        <td className="align-center">
                          <div className="badge-wrapper"><Badge type="class">{student.className}</Badge></div>
                        </td>
                        <td className="align-center">
                          <div className="badge-wrapper"><Badge type="shift">{student.shift}</Badge></div>
                        </td>
                        <td className="align-center">
                          <div className="badge-wrapper"><Badge type="session">{student.session}</Badge></div>
                        </td>
                        
                        <td>
                          <div className="actions-cell">
                            <IconButton variant="view" title="View student records" ><EyeIcon /></IconButton>
                            <IconButton variant="edit" title="Edit student info" onClick={() => handleEdit(student)}><EditIcon /></IconButton>
                            <IconButton variant="delete" title="Delete account" onClick={() => handleDeleteClick(student.id)}><TrashIcon /></IconButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODALS */}
        
        {/* 1. Export Data Modal */}
        {isExportOpen && (
          <div className={`modal-overlay ${isClosingExport ? 'closing' : ''}`} onClick={closeExportModal}>
            <div className={`card modal-card ${isClosingExport ? 'closing' : ''}`} style={{ maxWidth: '500px', textAlign: 'left' }} onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title" style={{ marginBottom: '24px' }}>Export Student Accounts</h3>
              
              <div className="export-section">
                <p className="export-section-title">Select Class to Export</p>
                <select 
                  className="input-field" 
                  value={exportConfig.classFilter} 
                  onChange={(e) => setExportConfig({...exportConfig, classFilter: e.target.value})}
                  disabled={isDownloading}
                >
                  <option value="">All Classes</option>
                  <option value="CHEM101">Chemistry 101 (CHEM101)</option>
                  <option value="ENG201">English Literature II (ENG201)</option>
                  <option value="BIO101">Biology Fundamentals (BIO101)</option>
                </select>
              </div>

              <div className="export-section">
                <p className="export-section-title">Include Columns</p>
                <div className="export-checkbox-grid">
                  {Object.keys(exportConfig.fields).map((key) => (
                    <label key={key} className="checkbox-label" style={{ opacity: isDownloading ? 0.6 : 1 }}>
                      <input 
                        type="checkbox" 
                        className="checkbox-input" 
                        checked={exportConfig.fields[key]} 
                        onChange={() => toggleExportField(key)}
                        disabled={isDownloading}
                      />
                      {key.charAt(0).toUpperCase() + key.slice(1).replace('Id', ' ID').replace('Name', ' Name')}
                    </label>
                  ))}
                </div>
              </div>

              <div className="export-section">
                <p className="export-section-title">Export Format</p>
                <div className="export-format-group">
                  {['excel', 'pdf', 'word'].map((fmt) => (
                    <label key={fmt} className="radio-label" style={{ opacity: isDownloading ? 0.6 : 1 }}>
                      <input 
                        type="radio" 
                        name="exportFormat" 
                        className="radio-input"
                        value={fmt} 
                        checked={exportConfig.format === fmt}
                        onChange={(e) => setExportConfig({...exportConfig, format: e.target.value})}
                        disabled={isDownloading}
                      />
                      {fmt.toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-buttons" style={{ marginTop: '32px' }}>
                <button 
                  className="modal-btn-cancel" 
                  onClick={closeExportModal}
                  disabled={isDownloading}
                  style={{ opacity: isDownloading ? 0.6 : 1 }}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleDownloadExport} 
                  disabled={isDownloading}
                  style={{ flex: 1, padding: '10px 16px', justifyContent: 'center' }}
                >
                  {isDownloading ? (
                    <>
                      <div className="download-progress-bg" style={{ width: `${downloadProgress}%` }}></div>
                      <div className="btn-content-relative">
                        <SpinnerIcon /> Exporting... {downloadProgress}%
                      </div>
                    </>
                  ) : (
                    <><DownloadIcon /> Download File</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

       
        {/* 3. Delete Modal */}
        {studentToDelete !== null && (
          <div className={`modal-overlay ${isClosingDelete ? 'closing' : ''}`}>
            <div className={`card modal-card ${isClosingDelete ? 'closing' : ''}`}>
              <div className="modal-icon-wrapper">
                <svg className="modal-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="modal-title">Delete User Account?</h3>
              <p className="modal-desc">Are you sure you want to permanently remove this student from the system? This will delete all associated data.</p>
              <div className="modal-buttons">
                <button className="modal-btn-cancel" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button className="modal-btn-delete" onClick={confirmDelete}>
                  Yes, Delete User
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}