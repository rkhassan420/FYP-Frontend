import React from "react";

// 1. Move and export the initial students here
export const INITIAL_STUDENTS = [
  { id: 1, name: "John Smith", studentId: "STU20250001", email: "john.smith@email.com", contact: "+1234567890", className: "CHEM101", shift: "Morning", session: "2025-26", color: "blue", initials: "JS" },
  { id: 2, name: "Sarah Anderson", studentId: "STU20250002", email: "sarah.anderson@email.com", contact: "+1987654321", className: "ENG201", shift: "Evening", session: "2025-26", color: "purple", initials: "SA" },
  { id: 3, name: "Michael Brown", studentId: "STU20250003", email: "michael.brown@email.com", contact: "+1122334455", className: "BIO101", shift: "Morning", session: "2025-26", color: "emerald", initials: "MB" },
  { id: 4, name: "Emma Johnson", studentId: "STU20250004", email: "emma.johnson@email.com", contact: "+1555666777", className: "CHEM101", shift: "Evening", session: "2025-26", color: "amber", initials: "EJ" },
];

export function StudentList({
  students,
  deletingIds,
  onView,
  onEdit,
  onDelete,
  Avatar,
  Badge,
  IconButton,
  EyeIcon,
  EditIcon,
  TrashIcon
}) {
  return (
    <div className="table-section fade-in">
      <div className="table-header-row">
        <h3 className="section-title" style={{ margin: 0 }}>Total Students ({students.length})</h3>
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
                <th className="align-center">Class</th>
                <th className="align-center">Shift</th>
                <th className="align-center">Session</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty-state">No students found.</td>
                </tr>
              ) : (
                students.map((student, i) => (
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
                        <IconButton variant="view" title="View student" onClick={() => onView(student)}><EyeIcon /></IconButton>
                        <IconButton variant="edit" title="Edit student" onClick={() => onEdit(student)}><EditIcon /></IconButton>
                        <IconButton variant="delete" title="Delete student" onClick={() => onDelete(student.id)}><TrashIcon /></IconButton>
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