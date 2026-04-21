import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import "./TeacherClasses.css";
import Icon from "./Icons";           // ← shared icons
import ClassList from "./ClassList";
import DeleteModal from "./DeleteModal";
import ViewAssignmentsModal from "./ViewAssignmentsModal";

const SEED_CLASSES = [
  { id: 1, name: "Chemistry 101",        subject: "Chemistry",        shift: "Morning", session: "2025-26", students: 32, code: "CHEM101", colorKey: "blue"   },
  { id: 2, name: "English Lit II",       subject: "English",          shift: "Evening", session: "2025-26", students: 54, code: "ENG201",  colorKey: "purple" },
  { id: 3, name: "Biology Fundamentals", subject: "Biology",          shift: "Morning", session: "2025-26", students: 40, code: "BIO101",  colorKey: "green"  },
  { id: 4, name: "Physics Advanced",     subject: "Physics",          shift: "Morning", session: "2025-26", students: 28, code: "PHYS201", colorKey: "orange" },
  { id: 5, name: "Intro to Comp Sci",    subject: "Computer Science", shift: "Evening", session: "2025-26", students: 60, code: "CS101",   colorKey: "pink"   },
];


function generateCode(name, subject) {
  const prefix = (subject || name).replace(/\s+/g, "").substring(0, 4).toUpperCase();
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${prefix}${suffix}`;
}

export default function TeacherClasses() {
  const navigate = useNavigate();

  const [classes, setClasses]             = useState(SEED_CLASSES);
  const [search, setSearch]               = useState("");
  const [creating, setCreating]           = useState(false);
  const [created, setCreated]             = useState(false);
  const [error, setError]                 = useState("");
  const [removingId, setRemovingId]       = useState(null);
  const [classToDelete, setClassToDelete] = useState(null);
  const [editingId, setEditingId]         = useState(null);
  const [classToView, setClassToView]     = useState(null);

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("teacherClassesViewMode") || "list";
  });

  useEffect(() => {
    localStorage.setItem("teacherClassesViewMode", viewMode);
  }, [viewMode]);

  const [form, setForm] = useState({
    name: "", subject: "", shift: "", session: "", maxStudents: "",
  });

  const COLOR_KEYS = ["blue", "purple", "green", "orange", "pink"];

  // ── Filtered list ──────────────────────────────────────────────────────
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

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
          id:       Date.now(),
          name:     form.name.trim(),
          subject:  form.subject.trim(),
          shift:    form.shift || "Morning",
          session:  form.session.trim() || "—",
          students: 0,
          code:     generateCode(form.name, form.subject),
          colorKey: COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
        };
        setClasses((prev) => [newClass, ...prev]);
      }
      setForm({ name: "", subject: "", shift: "", session: "", maxStudents: "" });
      setCreating(false);
      setCreated(true);
      setTimeout(() => setCreated(false), 1800);
    }, 800);
  };

  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setForm({
      name:        cls.name,
      subject:     cls.subject,
      shift:       cls.shift,
      session:     cls.session,
      maxStudents: cls.maxStudents || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", subject: "", shift: "", session: "", maxStudents: "" });
    setError("");
  };

  const handleDelete  = (id) => setClassToDelete(id);
  const cancelDelete  = ()   => setClassToDelete(null);
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

  const handleView = (cls) => setClassToView(cls);
  const closeView  = ()    => setClassToView(null);

  const copyToClipboard = (text) =>
    navigator.clipboard.writeText(text).catch(() => {});


  return (
    <div className="mc-wrapper">

      <div className="mc-header fade-in">
        <h2>Manage Your Classes</h2>
        <p>Create and manage all your classes efficiently</p>
      </div>

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

      <div className="mc-create-card">
        <h3>{editingId ? "Edit Class Details" : "Create New Class"}</h3>

        <div className="mc-form-grid">
          <div className="mc-field">
            <label>Class Name</label>
            <input type="text" name="name" className="mc-input"
              placeholder="e.g., Chemistry 101" value={form.name} onChange={handleFormChange} />
          </div>
          <div className="mc-field">
            <label>Subject</label>
            <input type="text" name="subject" className="mc-input"
              placeholder="e.g., Chemistry" value={form.subject} onChange={handleFormChange} />
          </div>
          <div className="mc-field">
            <label>Shift</label>
            <select name="shift" className="mc-input" value={form.shift} onChange={handleFormChange}>
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div className="mc-field">
            <label>Session</label>
            <input type="text" name="session" className="mc-input"
              placeholder="e.g., 2025-26" value={form.session} onChange={handleFormChange} />
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
            style={editingId ? { backgroundColor: "#3b82f6" } : {}}
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

      <ClassList
        classes={filtered}
        removingId={removingId}
        viewMode={viewMode}
        onViewMode={setViewMode}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCopy={copyToClipboard}
      />

      <DeleteModal
        isOpen={!!classToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ViewAssignmentsModal
        cls={classToView}
        onClose={closeView}
      />

    </div>
  );
}
