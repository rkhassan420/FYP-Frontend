import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Upload, Send, Check, BookOpen, Eye, Edit2, Trash2, X, ChevronDown, AlertCircle, FileText, Download
} from "lucide-react";
import "./AssignAssignments.css";

// ── MATCHING CLASSES ───────────────────────────────────────────────────────
const CLASS_OPTIONS = [
  { id: "chem101", label: "Chemistry 101 (CHEM101)", shortLabel: "Chemistry 101" },
  { id: "eng201", label: "English Lit II (ENG201)", shortLabel: "English Lit II" },
  { id: "bio101", label: "Biology Fundamentals (BIO101)", shortLabel: "Biology Fund." },
  { id: "phys201", label: "Physics Advanced (PHYS201)", shortLabel: "Physics Adv." },
  { id: "cs101", label: "Intro to Comp Sci (CS101)", shortLabel: "Comp Sci" },
];

// ── MATCHING ASSIGNMENTS (IDs 1 to 5) ──────────────────────────────────────
const INITIAL_ASSIGNMENTS = [
  { id: 1, title: "Chapter 5 Quiz on Stoichiometry", classIds: ["chem101"], className: "Chemistry 101", subject: "Chemistry", description: "This quiz covers all topics discussed in Chapter 5, including stoichiometry and balancing chemical equations.", dueDate: "2026-10-15", status: "Active", theme: "blue", fileName: "chapter5_guide.pdf" },
  { id: 2, title: "Essay on Shakespeare's Macbeth", classIds: ["eng201"], className: "English Lit II", subject: "English", description: "Write a 1500-word essay analyzing the themes of ambition and guilt in Macbeth.", dueDate: "2026-10-20", status: "Upcoming", theme: "purple", fileName: "macbeth_rubric.pdf" },
  { id: 3, title: "Photosynthesis Lab Report", classIds: ["bio101"], className: "Biology Fundamentals", subject: "Biology", description: "Submit your final lab report detailing the rate of photosynthesis under various light intensities.", dueDate: "2026-10-25", status: "Active", theme: "emerald", fileName: "lab_template.docx" },
  { id: 4, title: "Quantum Mechanics Problem Set", classIds: ["phys201"], className: "Physics Advanced", subject: "Physics", description: "Complete problems 1 through 15 in the assigned textbook chapter.", dueDate: "2026-11-02", status: "Upcoming", theme: "orange", fileName: null },
  { id: 5, title: "Build a React To-Do App", classIds: ["cs101"], className: "Intro to Comp Sci", subject: "Computer Science", description: "Create a fully functional React application that allows users to add, edit, and delete to-do items.", dueDate: "2026-11-10", status: "Completed", theme: "blue", fileName: "project_requirements.zip" },
];

// ── EXPANDED UNIQUE STUDENTS ───────────────────────────────────────────────
const generateMockSubmissions = () => {
  return [
    { id: 101, studentId: "S-5001", name: "Alice Johnson", className: "Chemistry 101", status: "Submitted", date: "2026-10-12", file: "alice_ans.pdf", score: "95/100" },
    { id: 102, studentId: "S-5002", name: "Bob Smith", className: "Chemistry 101", status: "Pending", date: "-", file: null, score: "-" },
    { id: 103, studentId: "S-5003", name: "Charlie Brown", className: "English Lit II", status: "Submitted", date: "2026-10-18", file: "charlie_report.docx", score: "88/100" },
    { id: 104, studentId: "S-5004", name: "Diana Prince", className: "Physics Advanced", status: "Late", date: "2026-11-03", file: "diana_hw.pdf", score: "Pending" },
    { id: 105, studentId: "S-5005", name: "Ethan Hunt", className: "Biology Fundamentals", status: "Pending", date: "-", file: null, score: "-" },
    { id: 106, studentId: "S-5006", name: "Fiona Gallagher", className: "Chemistry 101", status: "Submitted", date: "2026-10-13", file: "fiona_final.pdf", score: "92/100" },
    { id: 107, studentId: "S-5007", name: "George Costanza", className: "Biology Fundamentals", status: "Late", date: "2026-10-26", file: "george_v2.docx", score: "Pending" },
    { id: 108, studentId: "S-5008", name: "Hannah Abbott", className: "Intro to Comp Sci", status: "Submitted", date: "2026-11-08", file: "hannah_todo.zip", score: "100/100" },
    { id: 109, studentId: "S-5009", name: "Ian Malcolm", className: "Physics Advanced", status: "Pending", date: "-", file: null, score: "-" },
    { id: 110, studentId: "S-5010", name: "Julia Roberts", className: "English Lit II", status: "Submitted", date: "2026-10-19", file: "julia_macbeth.pdf", score: "94/100" },
    { id: 111, studentId: "S-5011", name: "Kevin Hart", className: "Intro to Comp Sci", status: "Late", date: "2026-11-12", file: "kevin_app.zip", score: "75/100" },
    { id: 112, studentId: "S-5012", name: "Luna Lovegood", className: "Biology Fundamentals", status: "Submitted", date: "2026-10-24", file: "luna_lab.pdf", score: "98/100" },
    { id: 113, studentId: "S-5013", name: "Michael Scott", className: "Chemistry 101", status: "Pending", date: "-", file: null, score: "-" },
    { id: 114, studentId: "S-5014", name: "Nina Dobrev", className: "Intro to Comp Sci", status: "Submitted", date: "2026-11-09", file: "nina_react.zip", score: "90/100" },
    { id: 115, studentId: "S-5015", name: "Oscar Martinez", className: "English Lit II", status: "Pending", date: "-", file: null, score: "-" },
  ];
};

export default function AssignAssignments() {

  const location = useLocation();  
  const navigate = useNavigate(); // Add this
  const cameFromClasses = useRef(false); // Add this
  
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingIds, setDeletingIds] = useState(new Set());

  const [formError, setFormError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [viewModal, setViewModal] = useState({ isOpen: false, assignment: null, submissions: [] });
  const [editingId, setEditingId] = useState(null);
  
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  // NEW: State for active tab in the View Modal
  const [activeTab, setActiveTab] = useState("all"); 

  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    classes: ["chem101", "eng201"], 
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    file: null
  });

  const [isAssigning, setIsAssigning] = useState(false);

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
  };

  const toggleClassSelection = (classId) => {
    setForm(prev => {
      const isSelected = prev.classes.includes(classId);
      return {
        ...prev,
        classes: isSelected 
          ? prev.classes.filter(id => id !== classId)
          : [...prev.classes, classId]                
      };
    });
    if (formError) setFormError(""); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, file: file || null }));
  };

  const handleEditClick = (assignment) => {
    setForm({
      classes: assignment.classIds || [], 
      title: assignment.title,
      subject: assignment.subject,
      description: assignment.description || "",
      dueDate: assignment.dueDate,
      file: null 
    });
    setEditingId(assignment.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ classes: [], title: "", subject: "", description: "", dueDate: "", file: null });
    setFormError("");
  };

  const handleViewClick = (assignment) => {
    // Filter the mock submissions so they ONLY show students in the class 
    // associated with the assignment being clicked
    const allStudents = generateMockSubmissions();
    const studentsForThisClass = allStudents.filter(student => 
      assignment.className.includes(student.className) || student.className.includes(assignment.className)
    );

    setViewModal({
      isOpen: true,
      assignment: assignment,
      submissions: studentsForThisClass 
    });
    setStudentSearchQuery(""); 
    setActiveTab("all"); // Reset tab on open
  };


useEffect(() => {
    // Check if we navigated here with an ID to open
    if (location.state && location.state.openAssignmentId) {
      const targetId = location.state.openAssignmentId;
      
      // Find the assignment that matches the ID
      const assignmentToOpen = assignments.find((a) => a.id === targetId);
      
      if (assignmentToOpen) {
        cameFromClasses.current = true; // <--- ADD THIS LINE
        
        // Automatically open the modal
        handleViewClick(assignmentToOpen);
        
        // Clear the state so it doesn't reopen if the user refreshes the page
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, assignments]);


  const closeViewModal = () => {
    setViewModal({ isOpen: false, assignment: null, submissions: [] });
    setStudentSearchQuery("");
    setActiveTab("all");

    // ADD THIS IF STATEMENT:
    if (cameFromClasses.current) {
      cameFromClasses.current = false; // Reset it
      navigate(-1); // Go back to the classes page
    }
  };

  // const closeViewModal = () => {
  //   setViewModal({ isOpen: false, assignment: null, submissions: [] });
  //   setStudentSearchQuery("");
  //   setActiveTab("all");
  // };

  const handleAssign = () => {
    if (!form.title.trim() || !form.subject.trim() || !form.dueDate || form.classes.length === 0) {
      setFormError("Please fill in Assignment Title, Subject, Due Date, and select at least one class.");
      return;
    }

    setFormError("");
    setIsAssigning(true);

    setTimeout(() => {
      const classNames = form.classes
        .map(id => CLASS_OPTIONS.find(c => c.id === id)?.shortLabel)
        .join(", ");

      if (editingId) {
        setAssignments((prev) => 
          prev.map(assignment => 
            assignment.id === editingId 
              ? {
                  ...assignment,
                  title: form.title,
                  classIds: form.classes,
                  className: classNames || "Unassigned",
                  subject: form.subject,
                  description: form.description,
                  dueDate: form.dueDate,
                  fileName: form.file ? form.file.name : assignment.fileName 
                }
              : assignment
          )
        );
        setEditingId(null);
      } else {
        const themes = ["blue", "purple", "emerald"];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];

        const newAssignment = {
          id: Date.now(),
          title: form.title,
          classIds: form.classes, 
          className: classNames || "Unassigned",
          subject: form.subject,
          description: form.description,
          dueDate: form.dueDate,
          status: "Active",
          theme: randomTheme,
          fileName: form.file ? form.file.name : null
        };

        setAssignments((prev) => [newAssignment, ...prev]);
      }

      setIsAssigning(false);
      setForm({ classes: [], title: "", subject: "", description: "", dueDate: "", file: null });
    }, 1000);
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    const idToDelete = deleteModal.id;
    setDeleteModal({ isOpen: false, id: null });
    
    setDeletingIds((prev) => new Set([...prev, idToDelete]));
    
    setTimeout(() => {
      setAssignments((prev) => prev.filter((a) => a.id !== idToDelete));
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(idToDelete);
        return newSet;
      });
      if (editingId === idToDelete) {
        handleCancelEdit();
      }
    }, 400); 
  };

  const filteredAssignments = assignments.filter((a) => {
    const query = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(query) || a.subject.toLowerCase().includes(query) || (a.description && a.description.toLowerCase().includes(query));
  });

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'submitted': return 'status-submitted';
      case 'late': return 'status-late';
      default: return 'status-pending';
    }
  };

  // Calculate Tab Counts based on the dynamically loaded submissions
  const allCount = viewModal.submissions.length;
  const submittedCount = viewModal.submissions.filter(s => s.status.toLowerCase() === 'submitted' || s.status.toLowerCase() === 'late').length;
  const notSubmittedCount = viewModal.submissions.filter(s => s.status.toLowerCase() === 'pending').length;

  // Filter by both Tab Status and Search Query
  const filteredStudents = viewModal.submissions.filter((sub) => {
    // 1. Tab Filter
    let matchesTab = true;
    if (activeTab === "submitted") {
      matchesTab = sub.status.toLowerCase() === 'submitted' || sub.status.toLowerCase() === 'late';
    } else if (activeTab === "not_submitted") {
      matchesTab = sub.status.toLowerCase() === 'pending';
    }

    // 2. Text Search Filter
    const q = studentSearchQuery.toLowerCase();
    const matchesSearch =
      sub.name.toLowerCase().includes(q) ||
      sub.studentId.toLowerCase().includes(q) ||
      sub.className.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  return (
    <div className="assign-page-wrapper">
      <div className="assign-page-inner">
        
        <header className="assign-page-header assign-fade-in">
          <h1 className="assign-page-title">Assign Assignment to Classes</h1>
          <p className="assign-page-subtitle">Create and distribute assignments to your classes</p>
        </header>

        <div className="assign-card assign-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="assign-section-title">
            {editingId ? "Edit Assignment" : "Create New Assignment"}
          </h3>
          
          <div className="assign-grid-half assign-section-margin">
            <div className="assign-field-group">
              <label className="assign-field-label">Assignment Title</label>
              <input type="text" name="title" value={form.title} onChange={handleInputChange} className="assign-input-field" placeholder="e.g., Chapter 5 Quiz" />
            </div>
            <div className="assign-field-group">
              <label className="assign-field-label">Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleInputChange} className="assign-input-field" placeholder="e.g., Chemistry" />
            </div>
          </div>

          <div className="assign-field-group assign-section-margin">
            <label className="assign-field-label">Description / Instructions</label>
            <textarea name="description" value={form.description} onChange={handleInputChange} className="assign-textarea-field" placeholder="Enter assignment instructions, guidelines, and any additional notes..."></textarea>
          </div>

          <div className="assign-grid-third assign-section-margin" style={{ position: 'relative', zIndex: 10 }}>
            <div className="assign-field-group">
              <label className="assign-field-label">Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleInputChange} className="assign-input-field" />
            </div>

            <div className="assign-field-group">
              <label className="assign-field-label">Select Classes</label>
              <div className="assign-multi-select-wrapper" ref={dropdownRef}>
                <div 
                  className={`assign-input-field assign-multi-select-box ${isClassDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                >
                  {form.classes.length === 0 ? (
                    <span className="assign-placeholder">Select classes...</span>
                  ) : (
                    <div className="assign-chips-container">
                      {form.classes.map(classId => {
                        const classObj = CLASS_OPTIONS.find(c => c.id === classId);
                        if (!classObj) return null;
                        
                        return (
                          <span key={classId} className="assign-chip" onClick={(e) => e.stopPropagation()}>
                            {classObj.shortLabel}
                            <button className="assign-chip-remove" onClick={(e) => {
                              e.stopPropagation(); 
                              toggleClassSelection(classId);
                            }}>
                              <X size={14} strokeWidth={3} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <ChevronDown size={18} className="assign-dropdown-icon" />
                </div>

                {isClassDropdownOpen && (
                  <div className="assign-multi-select-menu">
                    {CLASS_OPTIONS.map(option => (
                      <label key={option.id} className="assign-multi-select-item" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          className="assign-checkbox"
                          checked={form.classes.includes(option.id)}
                          onChange={() => toggleClassSelection(option.id)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="assign-field-group">
              <label className="assign-field-label">Attachment (Optional)</label>
              <div className="assign-file-input-wrapper">
                <input type="file" id="file-input" accept=".pdf,.doc,.docx,.txt,.zip" onChange={handleFileChange} />
                <label htmlFor="file-input" className="assign-file-input-label">
                  <Upload size={18} />
                  <span>
                    {form.file ? (form.file.name.length > 20 ? form.file.name.substring(0, 17) + '...' : form.file.name) : (editingId ? "Replace File" : "Upload File")}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {formError && (
            <div className="assign-error-message">
              <AlertCircle size={18} />
              {formError}
            </div>
          )}

          <div className="assign-form-actions">
            <button onClick={handleAssign} disabled={isAssigning} className="assign-btn-primary">
              {isAssigning ? (
                <><Check size={20} /> {editingId ? "Updated!" : "Created!"}</>
              ) : (
                <><Send size={20} /> {editingId ? "Update Assignment" : "Assign Assignment"}</>
              )}
            </button>
            
            {editingId && (
              <button onClick={handleCancelEdit} disabled={isAssigning} className="assign-btn-cancel">
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="assign-table-section assign-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="assign-table-header-row">
            <h3 className="assign-section-title">Class Assignments</h3>
            
            <div className="assign-search-wrapper">
              <span className="assign-search-icon"><Search size={18} /></span>
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
                    <th>Assignment Title</th>
                    <th>Description</th> 
                    <th>Class Name</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Attachment</th>
                    <th>Status</th>
                    <th className="assign-text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.length === 0 ? (
                     <tr>
                       <td colSpan={8} className="assign-empty-state">No assignments found.</td>
                     </tr>
                  ) : (
                    filteredAssignments.map((assignment, index) => (
                      <tr 
                        key={assignment.id} 
                        className={`assign-row ${deletingIds.has(assignment.id) ? 'deleting' : ''} ${editingId === assignment.id ? 'editing-row' : ''}`}
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <td>
                          <div className="assign-title-cell">
                            <div className={`assign-icon-wrapper assign-theme-${assignment.theme}`} style={{ flexShrink: 0 }}>
                              <BookOpen size={18} />
                            </div>
                            <p 
                              className="assign-text-strong assign-truncate-text" 
                              title={assignment.title}
                              style={{ maxWidth: '160px', margin: 0 }}
                            >
                              {assignment.title}
                            </p>
                          </div>
                        </td>
                        
                        <td>
                          <p 
                            className="assign-text-normal assign-truncate-text" 
                            title={assignment.description || "No description provided"}
                            style={{ maxWidth: '200px', margin: 0 }}
                          >
                            {assignment.description || "—"}
                          </p>
                        </td>

                        <td><p className="assign-text-strong">{assignment.className}</p></td>
                        <td><p className="assign-text-normal">{assignment.subject}</p></td>
                        <td><p className="assign-text-strong">{assignment.dueDate}</p></td>
                        
                        <td>
                          {assignment.fileName ? (
                            <p className="assign-table-filename" title={assignment.fileName}>
                              {assignment.fileName}
                            </p>
                          ) : (
                            <span className="assign-no-file">—</span>
                          )}
                        </td>

                        <td>
                          <span className={`assign-status-badge ${assignment.status.toLowerCase()}`}>{assignment.status}</span>
                        </td>
                        <td className="assign-text-right">
                          <div className="assign-actions-cell">
                            <button className="assign-icon-btn view" title="View assignment" onClick={() => handleViewClick(assignment)}>
                              <Eye size={18} />
                            </button>
                            <button className="assign-icon-btn edit" title="Edit assignment" onClick={() => handleEditClick(assignment)}>
                              <Edit2 size={18} />
                            </button>
                            <button className="assign-icon-btn delete" title="Delete assignment" onClick={() => handleDeleteClick(assignment.id)}>
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
      </div>

      {/* --- Full-Screen View Modal --- */}
      {viewModal.isOpen && viewModal.assignment && (
        <div className="assign-custom-modal-overlay">
          <div className="assign-custom-modal-content assign-modal-fullscreen">
            
            <div className="assign-modal-header">
              <div className="assign-modal-header-titles">
                <h3>{viewModal.assignment.title}</h3>
                <p>{viewModal.assignment.className} • Due: {viewModal.assignment.dueDate}</p>
              </div>
              <button className="assign-modal-close-btn" onClick={closeViewModal}>
                <X size={24} />
              </button>
            </div>

            <div className="assign-modal-body">
              <div className="assign-modal-toolbar">
                <div className="assign-modal-tabs">
                  <button 
                    className={`assign-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Students ({allCount})
                  </button>
                  <button 
                    className={`assign-tab-btn ${activeTab === 'submitted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submitted')}
                  >
                    Submitted ({submittedCount})
                  </button>
                  <button 
                    className={`assign-tab-btn ${activeTab === 'not_submitted' ? 'active' : ''}`}
                    onClick={() => setActiveTab('not_submitted')}
                  >
                    Not Submitted ({notSubmittedCount})
                  </button>
                </div>
                
                <div className="assign-modal-search-wrapper" style={{ paddingBottom: '12px' }}>
                  <Search size={16} className="assign-modal-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by name, ID, or class..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    className="assign-modal-search-input"
                  />
                </div>
              </div>

              <div className="assign-view-table-wrapper">
                <table className="assign-view-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Status</th>
                      <th>Submitted Date</th>
                      <th>Attachment</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="assign-empty-state" style={{ padding: '30px' }}>
                          No students match your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((sub) => (
                        <tr key={sub.id}>
                          <td className="assign-sub-id">{sub.studentId}</td>
                          <td className="assign-student-name">{sub.name}</td>
                          <td className="assign-sub-class">{sub.className}</td>
                          <td>
                            <span className={`assign-sub-status-badge ${getStatusClass(sub.status)}`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="assign-sub-date">{sub.date}</td>
                          <td>
                            {sub.file ? (
                              <a href="#" className="assign-file-link">
                                <FileText size={16} />
                                <span className="assign-file-text" title={sub.file}>{sub.file}</span>
                                <Download size={14} className="assign-file-download-icon" />
                              </a>
                            ) : (
                              <span className="assign-no-file-text">No file</span>
                            )}
                          </td>
                          <td className="assign-sub-grade">{sub.score}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- Delete Confirmation Modal --- */}
      {deleteModal.isOpen && (
        <div className="assign-custom-modal-overlay">
          <div className="assign-custom-modal-content assign-modal-small">
            <div className="assign-delete-modal-header">
              <div className="assign-delete-icon-wrapper">
                <Trash2 size={24} />
              </div>
              <h3>Delete Assignment</h3>
            </div>
            
            <p className="assign-delete-modal-text">
              Are you sure you want to delete this assignment? This action cannot be undone and will remove it from all assigned classes.
            </p>
            
            <div className="assign-delete-modal-actions">
              <button onClick={() => setDeleteModal({ isOpen: false, id: null })} className="assign-btn-cancel">
                Cancel
              </button>
              <button onClick={confirmDelete} className="assign-btn-delete-confirm">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}