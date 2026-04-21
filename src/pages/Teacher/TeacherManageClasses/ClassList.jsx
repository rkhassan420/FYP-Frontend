import React from "react";
import Icon from "./Icons"; 

// ── ClassCard sub-component ────────────────────────────────────────────────
function ClassCard({ cls, removing, onView, onEdit, onDelete, onCopy }) {
  return (
    <div className={`mc-class-card${removing ? " removing" : ""}`}>
      <div className="mc-card-inner">
        <div className="mc-card-body">

          <div className="mc-card-head">
            <div className={`mc-card-icon ${cls.colorKey}`}>
              <Icon name="book-open" size={24} />
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
            <Icon name="eye" size={18} />
          </button>

          <button className="icon-btn edit" title="Edit class" onClick={() => onEdit(cls)}>
            <Icon name="edit-2" size={18} />
          </button>

          <button className="icon-btn delete" title="Delete class" onClick={() => onDelete(cls.id)}>
            <Icon name="trash-2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ClassList component ────────────────────────────────────────────────────
/**
 * Props:
 *  - classes      {Array}    — filtered list of class objects to display
 *  - removingId   {number}   — id of the class currently being removed (for animation)
 *  - viewMode     {string}   — "list" | "grid"
 *  - onViewMode   {Function} — callback to change viewMode
 *  - onView       {Function} — callback(cls) to open the view modal
 *  - onEdit       {Function} — callback(cls) to begin editing
 *  - onDelete     {Function} — callback(id)  to trigger delete confirmation
 *  - onCopy       {Function} — callback(code) to copy class code
 */
export default function ClassList({
  classes,
  removingId,
  viewMode,
  onViewMode,
  onView,
  onEdit,
  onDelete,
  onCopy,
}) {
  return (
    <div>
      {/* Section header with toggle */}
      <div className="mc-list-header">
        <h3 className="mc-list-title">Your Classes</h3>

        <div className="mc-view-toggle">
          <button
            className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => onViewMode("list")}
          >
            <Icon name="list" size={16} /> List
          </button>
          <button
            className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => onViewMode("grid")}
          >
            <Icon name="grid" size={16} /> Grid
          </button>
        </div>
      </div>

      {/* Cards container */}
      <div className={`mc-classes-container ${viewMode === "grid" ? "grid-view" : "list-view"}`}>
        {classes.length === 0 ? (
          <div className="no-results" style={{ gridColumn: "1 / -1" }}>
            <Icon name="search-x" size={48} />
            <p>No classes found matching your search.</p>
          </div>
        ) : (
          classes.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              removing={removingId === cls.id}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onCopy={onCopy}
            />
          ))
        )}
      </div>
    </div>
  );
}
