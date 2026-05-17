import React, { useState, useEffect, useRef } from "react";
import { Send, Check, X, ChevronDown, AlertCircle, Loader2 } from "lucide-react";
import "./AssignAssignments.css";
import { useLocation } from "react-router-dom";
import { classService } from "../../../services";
import TeacherAssignmentDeleteModal from "./TeacherAssignmentDeleteModal";
import TeacherAssignmentViewModal from "./TeacherAssignmentViewModal";
import TeacherAssignmentTable from "./TeacherAssignmentTable";

// ── localStorage keys ────────────────────────────────────────────────────────
const LS_CLASS_CODE  = "selectedClassCode";
const LS_EDIT_MODE   = "assignEditMode";
const LS_EDITING_ID  = "assignEditingId";
const LS_EDIT_FORM   = "assignEditForm";

// ── sessionStorage key for view modal ────────────────────────────────────────
const SS_VIEW_MODAL  = "assignViewModal";

function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}

function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function lsRemove(key) {
  try { localStorage.removeItem(key); } catch {}
}

function ssGet(key, fallback = null) {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch { return fallback; }
}

function ssSet(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function ssRemove(key) {
  try { sessionStorage.removeItem(key); } catch {}
}

// ── Loading Steps Component ───────────────────────────────────────────────────
const LOAD_STEPS = [
  { label: "Connecting to server"       },
  { label: "Fetching your classes"      },
  { label: "Loading assignments"        },
  { label: "Preparing the table"        },
];

const LoadingSteps = ({ activeStep = 0, done = false }) => (
  <div className="aa-steps-wrap">
    <div className="aa-step-list">
      {LOAD_STEPS.map((step, i) => {
        const isDone   = done || i < activeStep;
        const isActive = !done && i === activeStep;
        return (
          <div
            key={i}
            className={`aa-step-row ${isDone ? "aa-step-done" : isActive ? "aa-step-active" : "aa-step-wait"}`}
          >
            <div className="aa-step-icon">
              {isDone
                ? <Check size={14} />
                : isActive
                ? <Loader2 size={14} className="aa-spin" />
                : <span className="aa-step-dot" />}
            </div>
            <span className="aa-step-label">{step.label}</span>
            <span className="aa-step-badge">
              {isDone ? "done" : isActive ? "loading" : "pending"}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default function AssignAssignments({ preSelectedClass }) {

  const location = useLocation();
  const dropdownRef = useRef(null);

  const [classOptions, setClassOptions]         = useState([]);
  const [classesLoading, setClassesLoading]     = useState(false);
  const [assignments, setAssignments]           = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [deletingIds, setDeletingIds]           = useState(new Set());
  const [formError, setFormError]               = useState("");
  const [formSuccess, setFormSuccess]           = useState("");
  const [isAssigning, setIsAssigning]           = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [deleteModal, setDeleteModal]           = useState({ isOpen: false, id: null });
  const [loadStep, setLoadStep]                 = useState(0);
  const [loadDone, setLoadDone]                 = useState(false);

  const [viewModal, setViewModal] = useState(() => {
    const saved = ssGet(SS_VIEW_MODAL, null);
    return saved ?? { isOpen: false, assignment: null, classCode: null };
  });

  const persistedEditMode  = lsGet(LS_EDIT_MODE, false);
  const persistedEditingId = lsGet(LS_EDITING_ID, null);
  const persistedEditForm  = lsGet(LS_EDIT_FORM, null);
  const savedClassCode     = localStorage.getItem(LS_CLASS_CODE) || "";

  const [editMode, setEditMode]   = useState(persistedEditMode);
  const [editingId, setEditingId] = useState(persistedEditingId);

  const [form, setForm] = useState(() => {
    if (persistedEditMode && persistedEditForm) return persistedEditForm;
    return {
      classCode:    preSelectedClass?.classCode || savedClassCode,
      title:        "",
      description:  "",
      deadline:     "",
      deadlineTime: "23:59",      
    };
  });




  // useEffect(() => {
  //   if (preSelectedClass?.classCode && !editMode) {
  //     setForm((prev) => ({ ...prev, classCode: preSelectedClass.classCode }));
  //   }
  // }, [preSelectedClass]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   localStorage.setItem(LS_CLASS_CODE, form.classCode);
  // }, [form.classCode]);


  // Read state passed via navigate()
useEffect(() => {
  const navState = location.state;
  if (navState?.classCode && !editMode) {
    setForm((prev) => ({ ...prev, classCode: navState.classCode }));
    // Optional: also save to localStorage so it persists
    localStorage.setItem(LS_CLASS_CODE, navState.classCode);
  }
}, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
    if (editMode) {
      lsSet(LS_EDIT_MODE, true);
      lsSet(LS_EDITING_ID, editingId);
      lsSet(LS_EDIT_FORM, form);
    } else {
      lsRemove(LS_EDIT_MODE);
      lsRemove(LS_EDITING_ID);
      lsRemove(LS_EDIT_FORM);
    }
  }, [editMode, editingId, form]);

  // ── Load classes ──────────────────────────────────────────────────────────
  useEffect(() => {
    async function loadClasses() {
      setClassesLoading(true);
      setLoadDone(false);
      setLoadStep(0);
      try {
        setLoadStep(1);
        const res = await classService.getClasses();
        const results = Array.isArray(res) ? res : res.results || [];
        setClassOptions(results);
        setLoadStep(2);
      } catch (err) {
        console.error("Failed to load classes:", err.message);
      } finally {
        setClassesLoading(false);
      }
    }
    loadClasses();
  }, []);

  // ── Load assignments ──────────────────────────────────────────────────────
  useEffect(() => {
    async function loadAssignments() {
      if (!form.classCode && classOptions.length === 0) return;
      setAssignmentsLoading(true);
      setLoadStep(2);
      try {
        if (form.classCode) {
          const res = await classService.getClassAssignments(form.classCode);
          const results = Array.isArray(res) ? res : res.results || [];
          setAssignments(results);
        } else {
          const promises = classOptions.map((cls) =>
            classService.getClassAssignments(cls.code).catch(() => [])
          );
          const allResponses = await Promise.all(promises);
          const combinedAssignments = allResponses.flatMap((res) =>
            Array.isArray(res) ? res : res.results || []
          );
          const uniqueAssignments = Array.from(
            new Map(combinedAssignments.map((a) => [a.id, a])).values()
          );
          uniqueAssignments.sort((a, b) => b.id - a.id);
          setAssignments(uniqueAssignments);
        }
        setLoadStep(3);
        setLoadDone(true);
      } catch (err) {
        console.error("Failed to load assignments:", err.message);
        setAssignments([]);
        setLoadDone(true);
      } finally {
        setAssignmentsLoading(false);
      }
    }
    loadAssignments();
  }, [form.classCode, classOptions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClassDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
    if (formSuccess) setFormSuccess("");
  };

  const resetForm = () => {
    const freshForm = {
      classCode:    preSelectedClass?.classCode || localStorage.getItem(LS_CLASS_CODE) || "",
      title:        "",
      description:  "",
      deadline:     "",
      deadlineTime: "23:59",
      
    };
    setForm(freshForm);
    setFormError("");
    setEditMode(false);
    setEditingId(null);
    lsRemove(LS_EDIT_MODE);
    lsRemove(LS_EDITING_ID);
    lsRemove(LS_EDIT_FORM);
  };

  const handleSubmit = async () => {
    if (!form.classCode) return setFormError("Please select a class to assign this to.");
    if (!form.title.trim()) return setFormError("Please enter an assignment title.");
    if (!form.deadline) return setFormError("Please select a deadline date.");
    

    setFormError("");
    setIsAssigning(true);

    const deadline = `${form.deadline}T${form.deadlineTime}:00Z`;
    const payload = {
      title:       form.title.trim(),
      description: form.description.trim(),
      deadline,
      
    };

    try {
      if (editMode) {
        const updated = await classService.updateAssignment(editingId, payload);
        setAssignments((prev) =>
          prev.map((a) => (a.id === editingId ? updated : a))
        );
        setFormSuccess("Assignment updated successfully!");
      } else {
        const created = await classService.createAssignment(form.classCode, payload);
        setAssignments((prev) => [created, ...prev]);
        setFormSuccess("Assignment created successfully!");
      }
      resetForm();
      setTimeout(() => setFormSuccess(""), 2500);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleViewClick = (assignment) => {
    const classCode = form.classCode ||
      classOptions.find((c) =>
        assignment.class_obj && c.id === assignment.class_obj
      )?.code || null;
    const next = { isOpen: true, assignment, classCode };
    setViewModal(next);
    ssSet(SS_VIEW_MODAL, next);
  };

  const closeViewModal = () => {
    const next = { isOpen: false, assignment: null, classCode: null };
    setViewModal(next);
    ssRemove(SS_VIEW_MODAL);
  };

  const handleDeleteClick = (id) => setDeleteModal({ isOpen: true, id });

  const confirmDelete = async () => {
    const idToDelete = deleteModal.id;
    setDeleteModal({ isOpen: false, id: null });
    setDeletingIds((prev) => new Set([...prev, idToDelete]));
    try {
      await classService.deleteAssignment(idToDelete);
      setAssignments((prev) => prev.filter((a) => a.id !== idToDelete));
    } catch {
      setFormError("Failed to delete assignment.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(idToDelete);
        return next;
      });
    }
  };

  const handleEditClick = (assignment) => {
    const newForm = {
      classCode:    form.classCode,
      title:        assignment.title || "",
      description:  assignment.description || "",
      deadline:     assignment.deadline ? assignment.deadline.split("T")[0] : "",
      deadlineTime: assignment.deadline
        ? assignment.deadline.split("T")[1]?.slice(0, 5) || "23:59"
        : "23:59",
      
    };
    setEditMode(true);
    setEditingId(assignment.id);
    setForm(newForm);
    lsSet(LS_EDIT_MODE, true);
    lsSet(LS_EDITING_ID, assignment.id);
    lsSet(LS_EDIT_FORM, newForm);
  };

  const handleCancelEdit = () => resetForm();

  const selectedClass = classOptions.find((c) => c.code === form.classCode);
  const tableTitle    = form.classCode
    ? `Assignments for ${selectedClass?.name || form.classCode}`
    : "All Assignments";

  const isLoading = classesLoading || assignmentsLoading;

  return (
    <div className="assign-page-wrapper">
      <div className="assign-page-inner">

        <header className="assign-page-header assign-fade-in">
          <h1 className="assign-page-title">Assign Assignment to Classes</h1>
          <p className="assign-page-subtitle">Create and distribute assignments to your classes</p>
        </header>

        {/* ── Edit mode banner ── */}
        {editMode && (
          <div className="aa-edit-banner assign-fade-in">
            <AlertCircle size={16} />
            Editing assignment — make your changes below and click <strong>Update Assignment</strong>
          </div>
        )}

        <div className="assign-card assign-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="assign-section-title">
            {editMode ? "Edit Assignment" : "Create New Assignment"}
          </h3>

          <div className="assign-field-group assign-section-margin">
            <label className="assign-field-label">Select Class (Required for new assignments)</label>
            <div className="assign-multi-select-wrapper" ref={dropdownRef}>
              <div
                className={`assign-input-field assign-multi-select-box ${isClassDropdownOpen ? "active" : ""}`}
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
              >
                {selectedClass ? (
                  <div className="assign-chips-container">
                    <span className="assign-chip">
                      {selectedClass.name}
                      <button
                        className="assign-chip-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm((prev) => ({ ...prev, classCode: "" }));
                        }}
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </span>
                  </div>
                ) : (
                  <span className="assign-placeholder">
                    {classesLoading ? "Loading classes..." : "Select a class to filter or assign..."}
                  </span>
                )}
                <ChevronDown size={18} className="assign-dropdown-icon" />
              </div>

              {isClassDropdownOpen && (
                <div className="assign-multi-select-menu">
                  <label
                    className="assign-multi-select-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((prev) => ({ ...prev, classCode: "" }));
                      setIsClassDropdownOpen(false);
                    }}
                  >
                    All Classes (View Only)
                  </label>
                  <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid var(--border-color)" }} />
                  {classOptions.length === 0 && (
                    <div style={{ padding: "10px 14px", color: "var(--muted)", fontSize: "0.875rem" }}>
                      No classes found.
                    </div>
                  )}
                  {classOptions.map((cls) => (
                    <label
                      key={cls.code}
                      className="assign-multi-select-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({ ...prev, classCode: cls.code }));
                        setIsClassDropdownOpen(false);
                      }}
                    >
                      <input
                        type="radio"
                        className="assign-checkbox"
                        checked={form.classCode === cls.code}
                        onChange={() => {}}
                      />
                      {cls.name}
                      {cls.code && (
                        <span style={{ marginLeft: 6, fontSize: "0.75rem", color: "var(--muted)" }}>
                          ({cls.code})
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="assign-grid-half assign-grid-fr assign-section-margin">
            <div className="assign-field-group">
              <label className="assign-field-label">Assignment Title</label>
              <input
                type="text" name="title" value={form.title}
                onChange={handleInputChange} className="assign-input-field"
                placeholder="e.g., Chapter 5 Quiz"
              />
            </div>
             <div className="assign-field-group">
              <label className="assign-field-label">Deadline Date</label>
              <input
                type="date" name="deadline" value={form.deadline}
                onChange={handleInputChange} className="assign-input-field"
              />
            </div>
            <div className="assign-field-group">
              <label className="assign-field-label">Deadline Time</label>
              <input
                type="time" name="deadlineTime" value={form.deadlineTime}
                onChange={handleInputChange} className="assign-input-field"
              />
            </div>
           
          </div>

          <div className="assign-field-group assign-section-margin">
            <label className="assign-field-label">Description / Instructions</label>
            <textarea
              name="description" value={form.description}
              onChange={handleInputChange} className="assign-textarea-field"
              placeholder="Enter assignment instructions, guidelines, and any additional notes..."
            />
          </div>

          <div className="assign-grid-half assign-section-margin">
            {/* <div className="assign-field-group">
              <label className="assign-field-label">Deadline Date</label>
              <input
                type="date" name="deadline" value={form.deadline}
                onChange={handleInputChange} className="assign-input-field"
              />
            </div>
            <div className="assign-field-group">
              <label className="assign-field-label">Deadline Time</label>
              <input
                type="time" name="deadlineTime" value={form.deadlineTime}
                onChange={handleInputChange} className="assign-input-field"
              />
            </div> */}
          </div>

          {formError && (
            <div className="assign-error-message">
              <AlertCircle size={18} /> {formError}
            </div>
          )}

          {formSuccess && (
            <div className="assign-success-message">
              <Check size={18} /> {formSuccess}
            </div>
          )}

          <div className="assign-form-actions">
            <button onClick={handleSubmit} disabled={isAssigning} className="assign-btn-primary">
              {isAssigning ? (
                <><Loader2 size={18} className="aa-spin" /> {editMode ? "Updating..." : "Creating..."}</>
              ) : (
                <><Send size={20} /> {editMode ? "Update Assignment" : "Assign Assignment"}</>
              )}
            </button>
            {editMode && (
              <button type="button" onClick={handleCancelEdit} className="assign-btn-secondary">
                <X size={18} /> Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* ── Table / Loading Steps ── */}
        <div style={{ marginTop: "2rem" }}>
          {isLoading ? (
            <LoadingSteps activeStep={loadStep} done={loadDone} />
          ) : (
            <TeacherAssignmentTable
              title={tableTitle}
              assignments={assignments}
              deletingIds={deletingIds}
              onView={handleViewClick}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
            />
          )}
        </div>

      </div>

      <TeacherAssignmentViewModal
        isOpen={viewModal.isOpen}
        assignment={viewModal.assignment}
        classCode={viewModal.classCode}
        onClose={closeViewModal}
      />

      <TeacherAssignmentDeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}