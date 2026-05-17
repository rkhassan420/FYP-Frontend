import React, { useEffect, useMemo, useState } from "react";
import { classService } from "../../../services";
import "./TeacherClasses.css";
import Icon from "./Icons";
import ClassList from "./ClassList";
import DeleteModal from "./DeleteModal";
import ViewAssignmentsModal from "./ViewAssignmentsModal";
import { useNavigate } from "react-router-dom";

const COLOR_KEYS = ["blue", "purple", "green", "orange", "pink"];

function normalizeClass(item) {
  const description = item.description || "";

  return {
    id: item.id,
    name: item.name || "",
    subject: item.subject || description || "Class",
    students: item.students || item.student_count || item.enrolled_students_count || 0,
    code: item.code || "",
    description,
    colorKey: item.colorKey || COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
  };
}

export default function TeacherClasses({ onCreateAssignment, onEditAssignment }) {

  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState("");
  const [loadState, setLoadState] = useState("idle");
  const [removingId, setRemovingId] = useState(null);
  const [classToDelete, setClassToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // ── Persist classToView in sessionStorage so modal survives reload ────────
  const [classToView, setClassToView] = useState(() => {
    try {
      const saved = sessionStorage.getItem("teacherClassToView");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });  

  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("teacherClassesViewMode") || "list";
  });

  const [form, setForm] = useState({
    name: "",
    subject: "",
  });

  useEffect(() => {
    localStorage.setItem("teacherClassesViewMode", viewMode);
  }, [viewMode]);

  async function loadClasses() {
    setLoadState("loading");
    setError("");

    try {
      const response = await classService.getClasses();
      const results = Array.isArray(response) ? response : response.results || [];
      console.log("API results:", results);
      setClasses(results.map(normalizeClass));
      setLoadState("success");
    } catch (err) {
      setError(err.message);
      setLoadState("error");
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

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

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.subject.trim()) {
      setError("Please fill in both Class Name and Description.");
      return;
    }

    setError("");
    setCreating(true);

    const payload = {
      name: form.name.trim(),
      description: form.subject.trim(),
    };

    try {
      if (editingId) {
        await classService.updateClass(editingId, payload);
        setEditingId(null);
      } else {
        await classService.createClass(payload);
      }

      const response = await classService.getClasses();
      const results = Array.isArray(response) ? response : response.results || [];
      setClasses(results.map(normalizeClass));

      setForm({ name: "", subject: "" });
      setCreated(true);
      setTimeout(() => setCreated(false), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async (cls) => {
    setError("");

    try {
      const freshClass = await classService.getClassByCode(cls.code);
      cls = normalizeClass(freshClass);
    } catch (err) {
      setError(err.message);
    }

    setEditingId(cls.code);
    setForm({
      name: cls.name,
      subject: cls.description || cls.subject,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", subject: "" });
    setError("");
  };

  const handleDelete = (code) => setClassToDelete(code);
  const cancelDelete = () => setClassToDelete(null);

  const confirmDelete = async () => {
    if (!classToDelete) return;

    const code = classToDelete;
    setClassToDelete(null);
    setRemovingId(code);
    setError("");

    try {
      await classService.deleteClass(code);
      setClasses((prev) => prev.filter((c) => c.code !== code));
    } catch (err) {
      setError(err.message);
    } finally {
      setRemovingId(null);
    }
  };

  // ── Save to sessionStorage when opening ──────────────────────────────────
  const handleView = async (cls) => {
    setError("");

    try {
      const freshClass = await classService.getClassByCode(cls.code);
      const normalized = normalizeClass(freshClass);
      setClassToView(normalized);
      sessionStorage.setItem("teacherClassToView", JSON.stringify(normalized));
      
    } catch (err) {
      setError(err.message);
      setClassToView(cls);
      sessionStorage.setItem("teacherClassToView", JSON.stringify(cls));
    
    }
  };

  // ── Clear sessionStorage when user explicitly closes ─────────────────────
  const closeView = () => {
    setClassToView(null);
    sessionStorage.removeItem("teacherClassToView");    
  };


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
          placeholder="Search classes by name, description, or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
            <label>Description</label>
            <input
              type="text"
              name="subject"
              className="mc-input"
              placeholder="e.g., This is a web dev class"
              value={form.subject}
              onChange={handleFormChange}
            />
          </div>
        </div>

        {error && <div className="mc-error">{error}</div>}
        {loadState === "loading" && <div className="mc-error">Loading classes...</div>}

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
              <><Icon name={editingId ? "edit-2" : "plus"} size={20} /> {editingId ? "Saving..." : "Creating..."}</>
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
        onCreateAssignment={onCreateAssignment}
        onEditAssignment={onEditAssignment}
      />
    </div>
  );
}