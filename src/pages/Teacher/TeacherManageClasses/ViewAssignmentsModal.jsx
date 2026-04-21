import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icons"; // ← shared icons

// ── Temporary mock data — replace this block with a real DB/API fetch later ──
const MOCK_ASSIGNMENTS = [
  { id: 1, classId: 1, title: "Chapter 5 Quiz on Stoichiometry", dueDate: "Oct 15, 2026", status: "Active"    },
  { id: 2, classId: 2, title: "Essay on Shakespeare's Macbeth",  dueDate: "Oct 20, 2026", status: "Upcoming"  },
  { id: 3, classId: 3, title: "Photosynthesis Lab Report",       dueDate: "Oct 25, 2026", status: "Active"    },
  { id: 4, classId: 4, title: "Quantum Mechanics Problem Set",   dueDate: "Nov 02, 2026", status: "Upcoming"  },
  { id: 5, classId: 5, title: "Build a React To-Do App",        dueDate: "Nov 10, 2026", status: "Completed" },
];
// ── End of mock data ──────────────────────────────────────────────────────

/**
 * ViewAssignmentsModal
 *
 * Props:
 *  - cls     {object|null} — the class being viewed (null = closed)
 *  - onClose {Function}    — called to close the modal
 *
 * TODO: When the backend is ready, remove MOCK_ASSIGNMENTS above and replace
 * the line below with a useEffect that fetches assignments by cls.id:
 *
 *   useEffect(() => {
 *     if (!cls) return;
 *     fetch(`/api/assignments?classId=${cls.id}`)
 *       .then(res => res.json())
 *       .then(data => setAssignments(data));
 *   }, [cls]);
 */
export default function ViewAssignmentsModal({ cls, onClose }) {
  const navigate = useNavigate();

  if (!cls) return null;

  // TODO: replace with state populated from a DB/API fetch (see comment above)
  const assignments = MOCK_ASSIGNMENTS.filter((a) => a.classId === cls.id);

  return (
    <div className="mc-modal-overlay" onClick={onClose}>
      <div className="mc-modal view-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="view-modal-header">
          <div>
            <h3>{cls.name}</h3>
            <p className="view-modal-subtitle">
              Class Code: <span className="highlight-code">{cls.code}</span>
            </p>
          </div>
          <button className="icon-btn close-btn" onClick={onClose}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="view-modal-content">
          <h4 className="section-heading">Assigned Work</h4>

          <div className="assignments-list">
            {assignments.length === 0 ? (
              <p style={{ color: "#666", padding: "10px" }}>
                No assignments for this class yet.
              </p>
            ) : (
              assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="assignment-card"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate("/assign/assignments", {
                      state: { openAssignmentId: assignment.id },
                    })
                  }
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
  );
}
