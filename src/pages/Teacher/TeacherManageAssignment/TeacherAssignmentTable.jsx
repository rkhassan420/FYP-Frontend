import React from "react";
import { Search, BookOpen, Eye, Trash2, Clock } from "lucide-react";
import Icon from "../TeacherManageClasses/Icons";

function formatDeadline(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TeacherAssignmentTable({
  title,
  assignments = [],
  deletingIds = new Set(),
  onView, 
  onDelete,
  onEdit,
}) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filtered = assignments.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      (a.title || "").toLowerCase().includes(q) ||
      (a.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="assign-table-section assign-fade-in" style={{ animationDelay: "0.2s" }}>

      <div className="assign-table-header-row">
        <h3 className="assign-section-title">{title}</h3>
        <div className="assign-search-wrapper">
          <span className="assign-search-icon">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="assign-search-field"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="assign-table-card">
        <div className="assign-table-responsive">
          <table className="assign-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>                
                <th>Submissions</th>
                <th>Status</th>
                <th className="assign-text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="assign-empty-state">
                    No assignments found.
                  </td>
                </tr>
              ) : (
                filtered.map((assignment, index) => (
                  <tr
                    key={assignment.id}
                    className={[
                      "assign-row",
                      deletingIds.has(assignment.id) ? "deleting" : "",
                    ].filter(Boolean).join(" ")}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Title */}
                    <td>
                      <div className="assign-title-cell">
                        <div className="assign-icon-wrapper assign-theme-blue" style={{ flexShrink: 0 }}>
                          <BookOpen size={18} />
                        </div>
                        <p
                          className="assign-text-strong assign-truncate-text"
                          title={assignment.title}
                          style={{ maxWidth: "160px", margin: 0 }}
                        >
                          {assignment.title || "—"}
                        </p>
                      </div>
                    </td>

                    {/* Description */}
                    <td>
                      <p
                        className="assign-text-normal assign-truncate-text"
                        title={assignment.description || "No description"}
                        style={{ maxWidth: "200px", margin: 0 }}
                      >
                        {assignment.description || "—"}
                      </p>
                    </td>

                    {/* Deadline */}
                    <td>
                      <p className="assign-text-strong">{formatDeadline(assignment.deadline)}</p>
                    </td>

                   

                    {/* Submissions */}
                    <td>
                      <p className="assign-text-normal">{assignment.submission_count ?? 0}</p>
                    </td>

                    {/* Status */}
                    <td>
                      {assignment.is_past_deadline ? (
                        <span className="assign-status-badge Completed">Expired</span>
                      ) : (
                        <span className="assign-status-badge Active">Active</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="assign-text-right">
                      <div className="assign-actions-cell">
                        <button
                          className="assign-icon-btn view"
                          title="View assignment"
                          onClick={() => onView(assignment)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
  className="assign-icon-btn edit"
  title="Edit assignment"
  onClick={() => onEdit(assignment)}
>
   <Icon name="edit-2" size={18} />
</button>
                       
                        <button
                          className="assign-icon-btn delete"
                          title="Delete assignment"
                          onClick={() => onDelete(assignment.id)}
                        >
                          <Trash2 size={18} />
                        </button>
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
  );
}