import React, { useEffect, useState, useMemo } from "react";
import { classService } from "../../../services";
import Icon from "./Icons";
import { Trash2, Pencil, UserMinus, Eye } from "lucide-react";
import "./ViewAssignmentsModal.css";
import { useNavigate, useLocation } from "react-router-dom";
import TeacherAssignmentDeleteModal from "../TeacherManageAssignment/TeacherAssignmentDeleteModal";
import TeacherAssignmentViewModal from "../TeacherManageAssignment/TeacherAssignmentViewModal";
import { DeleteModal } from "../TeacherAddStudent/DeleteModal";

// ── Same localStorage keys used in AssignAssignments ─────────────────────────
const LS_CLASS_CODE = "selectedClassCode";
const LS_EDIT_MODE  = "assignEditMode";
const LS_EDITING_ID = "assignEditingId";
const LS_EDIT_FORM  = "assignEditForm";

function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

function formatDeadline(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function ViewAssignmentsModal({
  cls,
  onClose,
  onCreateAssignment,
  onEditAssignment,
}) {


  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("students");

  // Students state
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  // Remove student modal
  const [removeModal, setRemoveModal] = useState({ isOpen: false, isClosing: false, student: null });
  const [removingStudentIds, setRemovingStudentIds] = useState(new Set());

  // Assignments state
  const [assignments, setAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [assignmentsError, setAssignmentsError] = useState("");
  const [assignmentSearch, setAssignmentSearch] = useState("");

  const [deletingIds, setDeletingIds] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // ── View submissions modal state ──────────────────────────────────────────
  const [viewModal, setViewModal] = useState({ isOpen: false, assignment: null });

  useEffect(() => {
    if (!cls?.code) return;

    setStudents([]);
    setAssignments([]);
    setStudentsError("");
    setAssignmentsError("");
    setStudentSearch("");
    setAssignmentSearch("");
    setActiveTab("students");

    async function loadStudents() {
      setStudentsLoading(true);
      try {
        const res = await classService.getEnrolledStudents(cls.code);
        setStudents(Array.isArray(res) ? res : res.results || []);
      } catch (err) {
        setStudentsError(err.message);
      } finally {
        setStudentsLoading(false);
      }
    }

    async function loadAssignments() {
      setAssignmentsLoading(true);
      try {
        const res = await classService.getClassAssignments(cls.code);
        setAssignments(Array.isArray(res) ? res : res.results || []);
      } catch (err) {
        setAssignmentsError(err.message);
      } finally {
        setAssignmentsLoading(false);
      }
    }

    loadStudents();
    loadAssignments();
  }, [cls]);

  const filteredStudents = useMemo(() => {
    const q = studentSearch.toLowerCase().trim();
    if (!q) return students;
    return students.filter((item) => {
      const s = item.student || item;
      const name = [s.first_name, s.last_name].filter(Boolean).join(" ").toLowerCase();
      return (
        name.includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        (s.username || "").toLowerCase().includes(q)
      );
    });
  }, [students, studentSearch]);

  const filteredAssignments = useMemo(() => {
    const q = assignmentSearch.toLowerCase().trim();
    if (!q) return assignments;
    return assignments.filter(
      (a) =>
        (a.title || "").toLowerCase().includes(q) ||
        (a.description || "").toLowerCase().includes(q)
    );
  }, [assignments, assignmentSearch]);

  if (!cls) return null;

  // ── Remove Student ────────────────────────────────────────────────────────
  const handleRemoveStudentClick = (item) => {
    const student = item.student || item;
    setRemoveModal({ isOpen: true, isClosing: false, student });
  };

  const closeRemoveModal = () => {
    setRemoveModal((prev) => ({ ...prev, isClosing: true }));
    setTimeout(() => setRemoveModal({ isOpen: false, isClosing: false, student: null }), 250);
  };

  const confirmRemoveStudent = async () => {
    const { student } = removeModal;
    const studentId = student.id;

    closeRemoveModal();
    setRemovingStudentIds((prev) => new Set([...prev, studentId]));
    setStudentsError("");

    try {
      await classService.removeStudentFromClass(cls.code, studentId);
      setStudents((prev) =>
        prev.filter((item) => {
          const s = item.student || item;
          return s.id !== studentId;
        })
      );
    } catch (err) {
      setStudentsError(err.message || "Failed to remove student.");
      setTimeout(() => setStudentsError(""), 3000);
    } finally {
      setRemovingStudentIds((prev) => {
        const next = new Set(prev);
        next.delete(studentId);
        return next;
      });
    }
  };

  // ── Delete Assignment ─────────────────────────────────────────────────────
  const handleDeleteClick = (id) => setDeleteModal({ isOpen: true, id });

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ isOpen: false, id: null });
    setDeletingIds((prev) => new Set([...prev, id]));
    try {
      await classService.deleteAssignment(id);
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setAssignmentsError("Failed to delete assignment.");
      setTimeout(() => setAssignmentsError(""), 2500);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // ── Edit Assignment ───────────────────────────────────────────────────────

  const handleEditClick = (assignment) => {
  onClose();
  navigate("/teacher/dashboard/assignments", {
    state: {
      classCode:   cls.code,
      className:   cls.name,
      editMode:    true,
      editingId:   assignment.id,
      editForm: {
        classCode:    cls.code,
        title:        assignment.title || "",
        description:  assignment.description || "",
        deadline:     assignment.deadline ? assignment.deadline.split("T")[0] : "",
        deadlineTime: assignment.deadline
          ? assignment.deadline.split("T")[1]?.slice(0, 5) || "23:59"
          : "23:59",
        
      },
    },
  });
};
  // const handleEditClick = (assignment) => {
  //   const editForm = {
  //     classCode:    cls.code,
  //     title:        assignment.title || "",
  //     description:  assignment.description || "",
  //     deadline:     assignment.deadline ? assignment.deadline.split("T")[0] : "",
  //     deadlineTime: assignment.deadline
  //       ? assignment.deadline.split("T")[1]?.slice(0, 5) || "23:59"
  //       : "23:59",
  //     maxScore: assignment.max_score || "",
  //   };

  //   localStorage.setItem(LS_CLASS_CODE, cls.code);
  //   lsSet(LS_EDIT_MODE, true);
  //   lsSet(LS_EDITING_ID, assignment.id);
  //   lsSet(LS_EDIT_FORM, editForm);

  //   onClose();
  //   onEditAssignment?.();
  // };

  // ── View Submissions ──────────────────────────────────────────────────────
  const handleViewClick = (assignment) => {
    setViewModal({ isOpen: true, assignment });
  };


  const closeViewModal = () => {
    setViewModal({ isOpen: false, assignment: null });
  };

  
  return (
    <>
      <div className="sam-overlay" onClick={onClose}>
        <div className="sam-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="sam-header">
            <div className="sam-header-info">
              <h3 className="sam-title">{cls.name}</h3>
              <span className="sam-code-badge">
                <Icon name="hash" size={13} />
                {cls.code}
              </span>
            </div>
            <button className="sam-close-btn" onClick={onClose}>
              <Icon name="x" size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="sam-tabs">
            <button
              className={`sam-tab ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              <Icon name="users" size={15} />
              Students
              {students.length > 0 && <span className="sam-tab-count">{students.length}</span>}
            </button>
            <button
              className={`sam-tab ${activeTab === "assignments" ? "active" : ""}`}
              onClick={() => setActiveTab("assignments")}
            >
              <Icon name="file-text" size={15} />
              Assignments
              {assignments.length > 0 && <span className="sam-tab-count">{assignments.length}</span>}
            </button>
          </div>

          {/* ── STUDENTS TAB ── */}
          {activeTab === "students" && (
            <>
              <div className="sam-search-wrap">
                <span className="sam-search-icon"><Icon name="search" size={16} /></span>
                <input
                  className="sam-search-input"
                  type="text"
                  placeholder="Search by name, email or username..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
                {studentSearch && (
                  <button className="sam-clear-btn" onClick={() => setStudentSearch("")}>
                    <Icon name="x" size={14} />
                  </button>
                )}
              </div>

              <div className="sam-table-wrap">
                {studentsLoading && <div className="sam-state-msg">Loading students...</div>}
                {studentsError && <div className="sam-state-msg sam-error">{studentsError}</div>}
                {!studentsLoading && !studentsError && students.length === 0 && (
                  <div className="sam-state-msg">No students enrolled yet.</div>
                )}
                {!studentsLoading && !studentsError && students.length > 0 && filteredStudents.length === 0 && (
                  <div className="sam-state-msg">No students match your search.</div>
                )}
                {!studentsLoading && filteredStudents.length > 0 && (
                  <table className="sam-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((item, index) => {
                        const student = item.student || item;
                        const name = [student.first_name, student.last_name].filter(Boolean).join(" ");
                        const initials = name
                          ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                          : (student.username || student.email || "?")[0].toUpperCase();
                        const isRemoving = removingStudentIds.has(student.id);

                        return (
                          <tr key={item.id || student.id || student.email}>
                            <td className="sam-td-num">{index + 1}</td>
                            <td>
                              <div className="sam-name-cell">
                                <div className="sam-avatar">{initials}</div>
                                <span>{name || student.username || "—"}</span>
                              </div>
                            </td>
                            <td className="sam-td-muted">{student.username || "—"}</td>
                            <td className="sam-td-muted">{student.email || "—"}</td>
                            <td>
                              <button
                                className="sam-icon-btn sam-remove-student-btn"
                                title="Remove from class"
                                disabled={isRemoving}
                                onClick={() => handleRemoveStudentClick(item)}
                              >
                                {isRemoving
                                  ? <span className="sam-spinner" />
                                  : <UserMinus size={15} />
                                }
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {!studentsLoading && students.length > 0 && (
                <div className="sam-footer">
                  {studentSearch
                    ? `Showing ${filteredStudents.length} of ${students.length} students`
                    : `${students.length} student${students.length !== 1 ? "s" : ""} enrolled`}
                </div>
              )}
            </>
          )}

          {/* ── ASSIGNMENTS TAB ── */}
          {activeTab === "assignments" && (
            <>
              <div className="sam-action-row">
                <div className="sam-search-wrap" style={{ margin: 0, flex: 1, maxWidth: "400px" }}>
                  <span className="sam-search-icon"><Icon name="search" size={16} /></span>
                  <input
                    className="sam-search-input"
                    type="text"
                    placeholder="Search assignments..."
                    value={assignmentSearch}
                    onChange={(e) => setAssignmentSearch(e.target.value)}
                  />
                  {assignmentSearch && (
                    <button className="sam-clear-btn" onClick={() => setAssignmentSearch("")}>
                      <Icon name="x" size={14} />
                    </button>
                  )}
                </div>

                <button
                  className="sam-create-btn"
                  // onClick={() => {
                  //   onClose();
                  //   onCreateAssignment({ classCode: cls.code, className: cls.name });
                  // }}
                  onClick={() => {
                    onClose();
                    navigate("/teacher/dashboard/assignments", {
  state: { classCode: cls.code, className: cls.name }
});
                  }}
                >
                  + Create Assignment
                </button>

              </div>

              <div className="sam-table-wrap">
                {assignmentsLoading && <div className="sam-state-msg">Loading assignments...</div>}
                {assignmentsError && <div className="sam-state-msg sam-error">{assignmentsError}</div>}
                {!assignmentsLoading && !assignmentsError && assignments.length === 0 && (
                  <div className="sam-state-msg">No assignments for this class yet.</div>
                )}
                {!assignmentsLoading && !assignmentsError && assignments.length > 0 && filteredAssignments.length === 0 && (
                  <div className="sam-state-msg">No assignments match your search.</div>
                )}
                {!assignmentsLoading && filteredAssignments.length > 0 && (
                  <table className="sam-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>                        
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssignments.map((a, index) => (
                        <tr key={a.id}>
                          <td className="sam-td-num">{index + 1}</td>
                          <td><div className="sam-assignment-title">{a.title}</div></td>
                          <td><div className="sam-assignment-desc">{a.description || "—"}</div></td>
                          <td className="sam-td-muted">{formatDeadline(a.deadline)}</td>                          
                          <td>
                            {a.is_past_deadline ? (
                              <span className="sam-badge sam-badge-expired">Expired</span>
                            ) : (
                              <span className="sam-badge sam-badge-active">Active</span>
                            )}
                          </td>
                          <td>
                            <div className="sam-action-btns">
                              {/* ── View Submissions ── */}
                              <button
                                className="sam-icon-btn sam-view-btn"
                                title="View submissions"
                                onClick={() => handleViewClick(a)}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                className="sam-icon-btn sam-edit-btn"
                                title="Edit assignment"
                                onClick={() => handleEditClick(a)}
                              >
                                <Pencil size={15} />
                              </button>
                              <button
                                className="sam-icon-btn sam-delete-btn"
                                title="Delete assignment"
                                disabled={deletingIds.has(a.id)}
                                onClick={() => handleDeleteClick(a.id)}
                              >
                                {deletingIds.has(a.id) ? "..." : <Trash2 size={15} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {!assignmentsLoading && assignments.length > 0 && (
                <div className="sam-footer">
                  {assignmentSearch
                    ? `Showing ${filteredAssignments.length} of ${assignments.length} assignments`
                    : `${assignments.length} assignment${assignments.length !== 1 ? "s" : ""}`}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Remove Student Modal ── */}
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteModal
            isOpen={removeModal.isOpen}
            isClosing={removeModal.isClosing}
            onClose={closeRemoveModal}
            onConfirm={confirmRemoveStudent}
          />
        </div>

        {/* ── Delete Assignment Modal ── */}
        <div onClick={(e) => e.stopPropagation()}>
          <TeacherAssignmentDeleteModal
            isOpen={deleteModal.isOpen}
            onCancel={() => setDeleteModal({ isOpen: false, id: null })}
            onConfirm={confirmDelete}
          />
        </div>
      </div>

      {/* ── View Submissions Modal — rendered outside sam-overlay so it sits on top ── */}
      <TeacherAssignmentViewModal
        isOpen={viewModal.isOpen}
        assignment={viewModal.assignment}
        classCode={cls?.code}
        onClose={closeViewModal}
      />
    </>
  );
}

