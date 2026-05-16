import React from "react";


function getMockAssignments(studentName) {
  return [
    { id: 101, title: "Algebra Worksheet 1", dueDate: "Apr 10, 2026 - 23:59", submittedDate: "Apr 09, 2026 - 14:30", status: "Submitted", file: "algebra_ws1.pdf" },
    { id: 102, title: "Science Lab Report", dueDate: "Apr 12, 2026 - 17:00", submittedDate: "Apr 12, 2026 - 16:45", status: "Submitted", file: "lab_report_final.docx" },
    { id: 103, title: "History Essay Draft", dueDate: "Apr 15, 2026 - 23:59", submittedDate: null, status: "Pending",  file: null },
    { id: 104, title: "Literature Review", dueDate: "Apr 20, 2026 - 23:59", submittedDate: null, status: "Pending", file: null },
  ];
}

export function ViewStudentModal({ 
  student, 
  isClosing, 
  onClose, 
  Avatar, 
  Badge, 
  CloseIcon,
  DownloadIcon 
}) {
  if (!student) return null;

  // Fetch the assignments using the moved function
  const assignments = getMockAssignments(student.name);

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={onClose}>
      <div className={`card modal-card modal-card-large ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar name={student.name} color={student.color} />
            <div>
              <h3 className="modal-title" style={{ margin: 0, fontSize: '1.5rem' }}>{student.name}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{student.studentId}</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>
        
        <div className="modal-body-custom">
          <h4 className="section-title" style={{ marginBottom: '16px' }}>Assignment History</h4>
          <div className="table-card">
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Assignment Title</th>
                    <th>Due Date</th>
                    <th>Submitted Date</th>
                    <th>Status</th>                    
                    <th className="text-right">File</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td style={{ fontWeight: '500', color: 'var(--text-main)' }}>{assignment.title}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{assignment.dueDate}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{assignment.submittedDate || "—"}</td>
                      <td><Badge type={assignment.status.toLowerCase()}>{assignment.status}</Badge></td>                      
                      <td className="text-right">
                        {assignment.file ? (
                          <a href="#" className="file-download-btn" title={`Download ${assignment.file}`} onClick={(e) => { e.preventDefault(); alert(`Downloading: ${assignment.file}`); }}><DownloadIcon /></a>
                        ) : (
                          <span style={{ color: 'var(--text-light)', paddingRight: '12px' }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}