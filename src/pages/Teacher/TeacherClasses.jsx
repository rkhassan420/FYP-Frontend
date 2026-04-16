import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo, useRef } from "react";
import "../../css/Teacher/TeacherClasses.css"

// ── Lucide-style inline SVG icons ──────────────────────────────────────────
const Icon = ({ name, size = 18 }) => {
  const icons = {
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    "book-open": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    list: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    grid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    "edit-2": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
    "trash-2": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    ),
    "search-x": (
      <svg width={48} height={48} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="8" x2="14" y2="14" />
        <line x1="14" y1="8" x2="8" y2="14" />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    "file-text": (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  };
  return icons[name] ?? null;
};

// ── 5 Unique Seed Classes ──────────────────────────────────────────────────
const SEED_CLASSES = [
  { id: 1, name: "Chemistry 101", subject: "Chemistry", shift: "Morning", session: "2025-26", students: 32, code: "CHEM101", colorKey: "blue" },
  { id: 2, name: "English Lit II", subject: "English", shift: "Evening", session: "2025-26", students: 54, code: "ENG201", colorKey: "purple" },
  { id: 3, name: "Biology Fundamentals", subject: "Biology", shift: "Morning", session: "2025-26", students: 40, code: "BIO101", colorKey: "green" },
  { id: 4, name: "Physics Advanced", subject: "Physics", shift: "Morning", session: "2025-26", students: 28, code: "PHYS201", colorKey: "orange" },
  { id: 5, name: "Intro to Comp Sci", subject: "Computer Science", shift: "Evening", session: "2025-26", students: 60, code: "CS101", colorKey: "pink" },
];

// ── Utility: generate a simple class code ─────────────────────────────────
function generateCode(name, subject) {
  const prefix = (subject || name).replace(/\s+/g, "").substring(0, 4).toUpperCase();
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${prefix}${suffix}`;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function TeacherClasses() {

  const navigate = useNavigate();

  const [classes, setClasses]     = useState(SEED_CLASSES);
  const [search, setSearch]       = useState("");
  const [creating, setCreating]   = useState(false);  
  const [created, setCreated]     = useState(false);
  const [error, setError] = useState("");
  
  const [removingId, setRemovingId] = useState(null);
  const [classToDelete, setClassToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  // Track which class is currently being viewed in the Assignments modal
  const [classToView, setClassToView] = useState(null);
  
  // View mode state with localStorage persistence
  const [viewMode, setViewMode] = useState(() => {
    const savedMode = localStorage.getItem("teacherClassesViewMode");
    return savedMode ? savedMode : "list";
  });

  // Save viewMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("teacherClassesViewMode", viewMode);
  }, [viewMode]);

  // Form state
  const [form, setForm] = useState({
    name: "", subject: "", shift: "", session: "", maxStudents: "",
  });

  const COLOR_KEYS = ["blue", "purple", "green", "orange", "pink"];

  // ── Filtered list ──
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return classes;
    return classes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [classes, search]);

  // ── Handlers ──
  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.subject.trim()) {
      setError("Please fill in both Class Name and Subject.");
      return;
    }

    setError("");
    setCreating(true);
    
    setTimeout(() => {
      if (editingId) {
        setClasses((prev) =>
          prev.map((c) =>
            c.id === editingId
              ? { ...c, ...form, name: form.name.trim(), subject: form.subject.trim(), session: form.session.trim() }
              : c
          )
        );
        setEditingId(null);
      } else {
        const newClass = {
          id: Date.now(),
          name:       form.name.trim(),
          subject:    form.subject.trim(),
          shift:      form.shift || "Morning",
          session:    form.session.trim() || "—",        
          students:   0,
          code:       generateCode(form.name, form.subject),
          colorKey:   COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
        };
        setClasses((prev) => [newClass, ...prev]);
      }

      setForm({ name: "", subject: "", shift: "", session: "" });
      setCreating(false);
      setCreated(true);
      setTimeout(() => setCreated(false), 1800);
    }, 800);
  };

  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setForm({
      name: cls.name,
      subject: cls.subject,
      shift: cls.shift,
      session: cls.session,
      maxStudents: cls.maxStudents || "",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", subject: "", shift: "", session: "" });
    setError("");
  };

  const handleDelete = (id) => {
    setClassToDelete(id); 
  };

  const confirmDelete = () => {
    if (!classToDelete) return;
    const id = classToDelete;
    setClassToDelete(null); 
    setRemovingId(id); 
    setTimeout(() => {
      setClasses((prev) => prev.filter((c) => c.id !== id));
      setRemovingId(null);
    }, 320);
  };

  const cancelDelete = () => setClassToDelete(null);

  // Open View Modal
  const handleView = (cls) => {
    setClassToView(cls);
  };
  
  const closeView = () => setClassToView(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  // ── 5 Unique Assignments ─────────────────────────────────────────────────
  const mockAssignments = [
    { id: 1, classId: 1, title: "Chapter 5 Quiz on Stoichiometry", dueDate: "Oct 15, 2026", status: "Active" },
    { id: 2, classId: 2, title: "Essay on Shakespeare's Macbeth", dueDate: "Oct 20, 2026", status: "Upcoming" },
    { id: 3, classId: 3, title: "Photosynthesis Lab Report", dueDate: "Oct 25, 2026", status: "Active" },
    { id: 4, classId: 4, title: "Quantum Mechanics Problem Set", dueDate: "Nov 02, 2026", status: "Upcoming" },
    { id: 5, classId: 5, title: "Build a React To-Do App", dueDate: "Nov 10, 2026", status: "Completed" },
  ];

  // Filter assignments so it only shows assignments for the clicked class
  const classAssignments = classToView 
    ? mockAssignments.filter(a => a.classId === classToView.id) 
    : [];

  // ── Render ──
  return (
    <div className="mc-wrapper">

      {/* Header */}
      <div className="mc-header fade-in">
        <h2>Manage Your Classes</h2>
        <p>Create and manage all your classes efficiently</p>
      </div>

      {/* Search */}
      <div className="mc-search-wrap">
        <span className="mc-search-icon">
          <Icon name="search" size={18} />
        </span>
        <input
          type="text"
          className="mc-search-input"
          placeholder="Search classes by name, subject, or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Create / Edit Class Card */}
      <div className="mc-create-card">
        <h3>{editingId ? "Edit Class Details" : "Create New Class"}</h3>

        <div className="mc-form-grid">
          <div className="mc-field">
            <label>Class Name</label>
            <input
              type="text"
              name="name"
              className="mc-input"
              placeholder="e.g., Chemistry 101"
              value={form.name}
              onChange={handleFormChange}
            />
          </div>

          <div className="mc-field">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              className="mc-input"
              placeholder="e.g., Chemistry"
              value={form.subject}
              onChange={handleFormChange}
            />
          </div>

          <div className="mc-field">
            <label>Shift</label>
            <select
              name="shift"
              className="mc-input"
              value={form.shift}
              onChange={handleFormChange}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div className="mc-field">
            <label>Session</label>
            <input
              type="text"
              name="session"
              className="mc-input"
              placeholder="e.g., 2025-26"
              value={form.session}
              onChange={handleFormChange}
            />
          </div>
        </div>

        {error && <div className="mc-error">{error}</div>}

        <div className="mc-form-actions">
          {editingId && (
            <button className="btn-cancel-edit" onClick={cancelEdit} disabled={creating || created}>
              Cancel
            </button>
          )}

          <button
            className="btn-create-class"
            onClick={handleSubmit}
            disabled={creating || created}
            style={editingId ? { backgroundColor: '#3b82f6' } : {}}
          >
            {created ? (
              <><Icon name="check" size={20} /> {editingId ? "Saved!" : "Class Created!"}</>
            ) : creating ? (
              <><Icon name={editingId ? "edit-2" : "plus"} size={20} /> {editingId ? "Saving…" : "Creating…"}</>
            ) : (
              <><Icon name={editingId ? "check" : "plus"} size={20} /> {editingId ? "Save Changes" : "Create Class"}</>
            )}
          </button>
        </div>
      </div>

      {/* Classes List / Grid Header */}
      <div>
        <div className="mc-list-header">
          <h3 className="mc-list-title">Your Classes</h3>
          
          <div className="mc-view-toggle">
            <button 
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <Icon name="list" size={16} /> List
            </button>
            <button 
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Icon name="grid" size={16} /> Grid
            </button>
          </div>
        </div>

        <div className={`mc-classes-container ${viewMode === "grid" ? "grid-view" : "list-view"}`}>
          {filtered.length === 0 ? (
            <div className="no-results" style={{ gridColumn: "1 / -1" }}>
              <Icon name="search-x" size={48} />
              <p>No classes found matching your search.</p>
            </div>
          ) : (
            filtered.map((cls) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                removing={removingId === cls.id}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopy={copyToClipboard}
              />
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {classToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal">
            <div className="mc-modal-icon">
              <Icon name="trash-2" size={24} />
            </div>
            <h3>Delete Class?</h3>
            <p>Are you sure you want to remove this class?</p>
            <div className="mc-modal-actions">
              <button className="btn-cancel" onClick={cancelDelete}>Cancel</button>
              <button className="btn-delete" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Assignments Modal */}
      {classToView && (
        <div className="mc-modal-overlay" onClick={closeView}>
          <div className="mc-modal view-modal" onClick={(e) => e.stopPropagation()}>
            
            <div className="view-modal-header">
              <div>
                <h3>{classToView.name}</h3>
                <p className="view-modal-subtitle">Class Code: <span className="highlight-code">{classToView.code}</span></p>
              </div>
              <button className="icon-btn close-btn" onClick={closeView}>
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="view-modal-content">
              <h4 className="section-heading">Assigned Work</h4>
              
              <div className="assignments-list">
                {classAssignments.length === 0 ? (
                  <p style={{ color: "#666", padding: "10px" }}>No assignments for this class yet.</p>
                ) : (
                  classAssignments.map((assignment) => (
                    <div
                      key={assignment.id} 
                      className="assignment-card"                  
                      onClick={() => {
                        // Ensure your route exactly matches what's in App.js
                        navigate('/assign/assignments', { state: { openAssignmentId: assignment.id } });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="assignment-icon">
                        <Icon name="file-text" size={20} />
                      </div>
                      <div className="assignment-info">
                        <p className="assignment-title">{assignment.title}</p>
                        <p className="assignment-due">Due: {assignment.dueDate}</p>
                      </div>
                      <div className={`assignment-status status-${assignment.status.toLowerCase()}`}>
                        {assignment.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── ClassCard sub-component ────────────────────────────────────────────────
function ClassCard({ cls, removing, onView, onEdit, onDelete, onCopy }) {
  return (
    <div className={`mc-class-card${removing ? " removing" : ""}`}>
      <div className="mc-card-inner">
        <div className="mc-card-body">

          <div className="mc-card-head">
            <div className={`mc-card-icon ${cls.colorKey}`}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <p className="mc-card-name">{cls.name}</p>
              <p className="mc-card-subject">{cls.subject}</p>
            </div>
          </div>

          <div className="mc-card-meta">
            <div>
              <p className="mc-meta-label">Class Code</p>
              <div className="mc-code-row">
                <span className="class-code">{cls.code}</span>
                <button className="copy-btn" onClick={() => onCopy(cls.code)}>Copy</button>
              </div>
            </div>

            <div>
              <p className="mc-meta-label">Details</p>
              <div className="badge-row">
                {cls.shift   && <span className="badge shift">{cls.shift}</span>}
                {cls.session && <span className="badge session">{cls.session}</span>}
              </div>
            </div>

            <div>
              <p className="mc-meta-label">Students</p>
              <p className="mc-students-count">
                {cls.students} Student{cls.students !== 1 ? "s" : ""}
                {cls.maxStudents ? ` / ${cls.maxStudents}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="mc-actions">
          <button className="icon-btn view" title="View assignments" onClick={() => onView(cls)}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          <button className="icon-btn edit" title="Edit class" onClick={() => onEdit(cls)}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </button>

          <button className="icon-btn delete" title="Delete class" onClick={() => onDelete(cls.id)}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}