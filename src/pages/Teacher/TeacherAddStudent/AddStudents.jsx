import React, { useState, useRef } from "react";
import "./AddStudents.css";
import DeleteModal from "./DeleteModal";
import { ViewStudentModal } from "./ViewStudentModal";
import { StudentList, INITIAL_STUDENTS } from "./StudentList";

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
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function AddStudents() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [form, setForm] = useState({ name: "", studentId: "", email: "", contact: "", className: "", shift: "", session: "" });  
  const [addState, setAddState] = useState("idle"); 
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isClosingDelete, setIsClosingDelete] = useState(false);
  const [studentToView, setStudentToView] = useState(null);
  const [isClosingView, setIsClosingView] = useState(false);

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
      };
      
      setStudents((prev) => [newStudent, ...prev]);
      setAddState("success");
      
      setTimeout(() => {
        setAddState("idle");
        setForm({ name: "", studentId: "", email: "", contact: "", className: "", shift: "", session: "" });
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
      session: student.session
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", studentId: "", email: "", contact: "", className: "", shift: "", session: "" });
    setError("");
  };

  const handleViewClick = (student) => {
    setIsClosingView(false);
    setStudentToView(student);
  };
  const closeViewModal = () => {
    setIsClosingView(true);
    setTimeout(() => {
      setStudentToView(null);
      setIsClosingView(false);
    }, 250); 
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

  const filtered = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q);
    const matchesClass = !selectedClass || (s.className && s.className === selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <header className="page-header fade-in">
          <h1 className="page-title">Manage Students</h1>
          <p className="page-subtitle">Enroll, edit, and manage students in your classes</p>
        </header>

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
            <label className="field-label">Search Students</label>
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

        <div className="card fade-in">
          <h3 className="card-title">{editingId ? "Edit Student" : "Enroll New Student"}</h3>
          
          <div className="form-grid student-form-grid">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input type="text" className="input-field" placeholder="e.g., John Smith" value={form.name} onChange={handleFormChange("name")} />
            </div>
            <div className="field-group">
              <label className="field-label">Student ID</label>
              <input type="text" className="input-field" placeholder="e.g., STU20250001" value={form.studentId} onChange={handleFormChange("studentId")} disabled={editingId !== null} />
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
              {addState === "success" ? <><CheckIcon /> Saved!</> : (editingId ? "Save Changes" : <><PlusIcon /> Add Student</>)}
            </button>
            {editingId && (
              <button className="btn-secondary-outline" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </div>      


        <StudentList
          students={filtered}
          deletingIds={deletingIds}
          onView={handleViewClick}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          Avatar={Avatar}
          Badge={Badge}
          IconButton={IconButton}
          EyeIcon={EyeIcon}
          EditIcon={EditIcon}
          TrashIcon={TrashIcon}
        />       


        <ViewStudentModal 
          student={studentToView}
          isClosing={isClosingView}
          onClose={closeViewModal}        
          Avatar={Avatar}
          Badge={Badge}
          CloseIcon={CloseIcon}
          DownloadIcon={DownloadIcon}
        />

        <DeleteModal 
          isOpen={studentToDelete !== null}
          isClosing={isClosingDelete}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
        />
        
       
      </div>
    </div>
  );
}

