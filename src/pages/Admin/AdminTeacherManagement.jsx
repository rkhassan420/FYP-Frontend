import React, { useState, useRef } from "react";
// Reusing your existing CSS for a consistent Admin experience!
import "../Teacher/TeacherAddStudent/AddStudents.css"; 

// Helper function to generate a strong 8-character password
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Mock Classes data for the View Modal
function getTeacherClasses(teacherName) {
  return [
    { id: 1, courseCode: "CHEM101", title: "Chemistry 101", enrolled: 45, status: "Active" },
    { id: 2, courseCode: "CHEM201", title: "Organic Chemistry", enrolled: 32, status: "Active" },
  ];
}

const INITIAL_TEACHERS = [
  { id: 1, name: "Dr. Alan Turing", teacherId: "EMP001", email: "alan.turing@university.edu", contact: "+1234567890", department: "Computer Science", color: "blue", initials: "AT", password: "aB3!x9Qz" },
  { id: 2, name: "Prof. Marie Curie", teacherId: "EMP002", email: "marie.curie@university.edu", contact: "+1987654321", department: "Chemistry", color: "purple", initials: "MC", password: "mP8#k2Lw" },
  { id: 3, name: "Dr. Richard Feynman", teacherId: "EMP003", email: "richard.feynman@university.edu", contact: "+1122334455", department: "Physics", color: "emerald", initials: "RF", password: "vN4$r7Ty" },
];

const COLOR_MAP = {
  blue: { bg: "#dbeafe", text: "#1d4ed8" },
  purple: { bg: "#f3e8ff", text: "#7c3aed" },
  emerald: { bg: "#d1fae5", text: "#059669" },
  amber: { bg: "#fef3c7", text: "#d97706" },
  rose: { bg: "#ffe4e6", text: "#e11d48" },
  teal: { bg: "#ccfbf1", text: "#0d9488" },
};

const PALETTE = ["blue", "purple", "emerald", "amber", "rose", "teal"];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function Avatar({ name, color }) {
  const c = COLOR_MAP[color] || COLOR_MAP.blue;
  return (
    <div className="avatar" style={{ background: c.bg }}>
      <span style={{ color: c.text }}>{getInitials(name)}</span>
    </div>
  );
}

function Badge({ type, children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function IconButton({ variant, title, onClick, children }) {
  return (
    <button className={`icon-btn icon-btn-${variant}`} title={title} onClick={onClick}>
      {children}
    </button>
  );
}

// SVG Icons
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const CheckIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const EyeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const SmallEyeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const EyeOffIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>;
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" /></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  
  const [form, setForm] = useState({ 
    name: "", 
    teacherId: "", 
    email: "", 
    contact: "", 
    department: "", 
    password: "" 
  });
  
  const [addState, setAddState] = useState("idle"); 
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [visiblePasswords, setVisiblePasswords] = useState(new Set());
  
  const [editingId, setEditingId] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [isClosingDelete, setIsClosingDelete] = useState(false);
  const [teacherToView, setTeacherToView] = useState(null);
  const [isClosingView, setIsClosingView] = useState(false);

  const nextId = useRef(4);
  const nextColor = useRef(0);
  const [error, setError] = useState("");

  const handleFormChange = (field) => (e) => {
    setError(""); 
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.teacherId.trim()) {    
      setError("Please fill in Full Name and Employee ID.");
      return;
    }

    if (editingId) {
      setTeachers((prev) => prev.map((t) => {
        if (t.id === editingId) {
          return {
            ...t,
            name: form.name.trim(),
            teacherId: form.teacherId.trim(),
            email: form.email.trim() || "N/A",
            contact: form.contact.trim() || "N/A",
            department: form.department || "Unassigned",
            password: form.password.trim() || t.password,
            initials: getInitials(form.name.trim()),
          };
        }
        return t;
      }));
      setAddState("success");
      setTimeout(() => { setAddState("idle"); cancelEdit(); }, 1500);
    } else {
      const color = PALETTE[nextColor.current % PALETTE.length];
      nextColor.current++;
      
      const newTeacher = {
        id: nextId.current++,
        name: form.name.trim(),
        teacherId: form.teacherId.trim(),
        email: form.email.trim() || "N/A",
        contact: form.contact.trim() || "N/A", 
        department: form.department || "Unassigned", 
        color,
        initials: getInitials(form.name.trim()),
        password: form.password.trim() || generatePassword(), 
      };
      
      setTeachers((prev) => [newTeacher, ...prev]);
      setAddState("success");
      setTimeout(() => {
        setAddState("idle");
        setForm({ name: "", teacherId: "", email: "", contact: "", department: "", password: "" });
      }, 1500);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher.id);
    setForm({
      name: teacher.name,
      teacherId: teacher.teacherId,
      email: teacher.email === "N/A" ? "" : teacher.email,
      contact: teacher.contact === "N/A" ? "" : teacher.contact,
      department: teacher.department === "Unassigned" ? "" : teacher.department,
      password: teacher.password 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", teacherId: "", email: "", contact: "", department: "", password: "" });
    setError("");
  };

  const handleViewClick = (teacher) => {
    setIsClosingView(false);
    setTeacherToView(teacher);
  };

  const closeViewModal = () => {
    setIsClosingView(true);
    setTimeout(() => { setTeacherToView(null); setIsClosingView(false); }, 250); 
  };

  const handleDeleteClick = (id) => {
    setIsClosingDelete(false);
    setTeacherToDelete(id);
  };

  const closeDeleteModal = () => {
    setIsClosingDelete(true);
    setTimeout(() => { setTeacherToDelete(null); setIsClosingDelete(false); }, 250);
  };

  const confirmDelete = () => {
    const id = teacherToDelete;
    setIsClosingDelete(true);
    setTimeout(() => {
      setTeacherToDelete(null);
      setIsClosingDelete(false);
      setDeletingIds((prev) => new Set([...prev, id]));
      setTimeout(() => {
        setTeachers((prev) => prev.filter((t) => t.id !== id));
        setDeletingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
      }, 350);
    }, 250);
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const filtered = teachers.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.teacherId.toLowerCase().includes(q);
    const matchesDept = !selectedDepartment || (t.department && t.department === selectedDepartment);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        
       

        {/* Filters & Search */}
        <div className="top-row fade-in">
          <div className="field-group">
            <label className="field-label">Filter by Department</label>
            <select className="input-field" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Search Staff</label>
            <div className="search-wrapper">
              <span className="search-icon"><SearchIcon /></span>
              <input type="text" className="input-field search-input" placeholder="Search by name or Employee ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        <div className="card fade-in">
          <h3 className="card-title">{editingId ? "Edit Educator Account" : "Register New Educator"}</h3>
          
          <div className="form-grid student-form-grid">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input type="text" className="input-field" placeholder="e.g., Dr. Alan Turing" value={form.name} onChange={handleFormChange("name")} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Employee ID</label>
              <input type="text" className="input-field" placeholder="e.g., EMP001" value={form.teacherId} onChange={handleFormChange("teacherId")} disabled={editingId !== null} />
            </div>

            <div className="field-group">
              <label className="field-label">System Password</label>
              <input type="text" className="input-field" placeholder={editingId ? "Update password" : "Leave empty to auto-generate"} value={form.password} onChange={handleFormChange("password")} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Official Email</label>
              <input type="email" className="input-field" placeholder="e.g., alan@university.edu" value={form.email} onChange={handleFormChange("email")} />
            </div>
            
            <div className="field-group">
              <label className="field-label">Contact Number</label>
              <input type="tel" className="input-field" placeholder="e.g., +1234567890" value={form.contact} onChange={handleFormChange("contact")} />
            </div>

            <div className="field-group">
              <label className="field-label">Assign Department</label>
              <select className="input-field" value={form.department} onChange={handleFormChange("department")}>
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            {error && <p className="form-error-message">{error}</p>}
          </div>
          
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSubmit} disabled={addState === "success"}>
              {addState === "success" ? <><CheckIcon /> Saved!</> : (editingId ? "Save Changes" : <><PlusIcon /> Register Educator</>)}
            </button>
            {editingId && <button className="btn-secondary-outline" onClick={cancelEdit}>Cancel</button>}
          </div>
        </div>

        {/* Teachers Table */}
        <div className="table-section fade-in">
          <div className="table-header-row">
            <h3 className="section-title" style={{ margin: 0 }}>Active Educators ({filtered.length})</h3>
          </div>
          <div className="table-card">
            <div className="table-responsive">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Educator Name</th>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Password</th>
                    <th className="align-center">Department</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} className="empty-state">No educators found.</td></tr>
                  ) : (
                    filtered.map((t, i) => (
                      <tr key={t.id} className={`student-row ${deletingIds.has(t.id) ? "deleting" : ""}`} style={{ animationDelay: `${i * 0.08}s` }}>
                        <td>
                          <div className="student-name-cell">
                            <Avatar name={t.name} color={t.color} />
                            <span className="student-name">{t.name}</span>
                          </div>
                        </td>
                        <td><span className="student-id">{t.teacherId}</span></td>
                        <td><span className="student-email">{t.email}</span></td>
                        <td><span className="student-contact">{t.contact}</span></td>
                        
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: visiblePasswords.has(t.id) ? 'inherit' : 'monospace', minWidth: '70px', display: 'inline-block' }}>
                              {visiblePasswords.has(t.id) ? t.password : "••••••••"}
                            </span>
                            <button onClick={() => togglePasswordVisibility(t.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                              {visiblePasswords.has(t.id) ? <EyeOffIcon /> : <SmallEyeIcon />}
                            </button>
                          </div>
                        </td>
                        
                        <td className="align-center"><div className="badge-wrapper"><Badge type="class">{t.department}</Badge></div></td>
                        
                        <td>
                          <div className="actions-cell">
                            <IconButton variant="view" title="View Assigned Classes" onClick={() => handleViewClick(t)}><EyeIcon /></IconButton>
                            <IconButton variant="edit" title="Edit details" onClick={() => handleEdit(t)}><EditIcon /></IconButton>
                            <IconButton variant="delete" title="Remove account" onClick={() => handleDeleteClick(t.id)}><TrashIcon /></IconButton>
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

        {/* View Teacher Classes Modal */}
        {teacherToView && (
          <div className={`modal-overlay ${isClosingView ? 'closing' : ''}`} onClick={closeViewModal}>
            <div className={`card modal-card modal-card-large ${isClosingView ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-custom">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Avatar name={teacherToView.name} color={teacherToView.color} />
                  <div>
                    <h3 className="modal-title" style={{ margin: 0, fontSize: '1.5rem' }}>{teacherToView.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{teacherToView.department} Department</p>
                  </div>
                </div>
                <button className="icon-btn" onClick={closeViewModal} style={{ background: 'transparent', border: '1px solid var(--border)' }}><CloseIcon /></button>
              </div>
              <div className="modal-body-custom">
                <h4 className="section-title" style={{ marginBottom: '16px' }}>Assigned Classes</h4>
                <div className="table-card">
                  <div className="table-responsive">
                    <table className="students-table">
                      <thead>
                        <tr>
                          <th>Course Code</th>
                          <th>Class Title</th>
                          <th className="align-center">Enrolled Students</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTeacherClasses(teacherToView.name).map((course) => (
                          <tr key={course.id}>
                            <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{course.courseCode}</td>
                            <td style={{ color: 'var(--text-muted)' }}>{course.title}</td>
                            <td className="align-center" style={{ color: 'var(--text-muted)' }}>{course.enrolled}</td>
                            <td><Badge type="success">{course.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer-custom">
                <button className="btn-secondary-outline" onClick={closeViewModal}>Close Profile</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {teacherToDelete !== null && (
          <div className={`modal-overlay ${isClosingDelete ? 'closing' : ''}`}>
            <div className={`card modal-card ${isClosingDelete ? 'closing' : ''}`}>
              <div className="modal-icon-wrapper">
                <svg className="modal-icon-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
              <h3 className="modal-title">Remove Educator?</h3>
              <p className="modal-desc">Are you sure you want to permanently remove this educator from the system? Their classes will need to be reassigned.</p>
              <div className="modal-buttons">
                <button className="modal-btn-cancel" onClick={closeDeleteModal}>Cancel</button>
                <button className="modal-btn-delete" onClick={confirmDelete}>Yes, Remove</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}