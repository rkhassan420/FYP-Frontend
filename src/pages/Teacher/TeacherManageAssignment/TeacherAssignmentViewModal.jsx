// import React from "react";
// import { Search, X, FileText, Download } from "lucide-react";

// /**
//  * TeacherAssignmentViewModal
//  *
//  * Props:
//  *  - isOpen             {boolean}   Whether the modal is visible
//  *  - assignment         {object}    The assignment being viewed (or null)
//  *  - submissions        {array}     List of student submission objects
//  *  - onClose            {function}  Called when the user closes the modal
//  */
// export default function TeacherAssignmentViewModal({
//   isOpen,
//   assignment,
//   submissions = [],
//   onClose,
// }) {
//   const [activeTab, setActiveTab] = React.useState("all");
//   const [studentSearchQuery, setStudentSearchQuery] = React.useState("");

//   // Reset state whenever modal opens
//   React.useEffect(() => {
//     if (isOpen) {
//       setActiveTab("all");
//       setStudentSearchQuery("");
//     }
//   }, [isOpen]);

//   if (!isOpen || !assignment) return null;

//   // ── Tab counts ───────────────────────────────────────────────────────────
//   const allCount = submissions.length;
//   const submittedCount = submissions.filter(
//     (s) => s.status.toLowerCase() === "submitted" || s.status.toLowerCase() === "late"
//   ).length;
//   const notSubmittedCount = submissions.filter(
//     (s) => s.status.toLowerCase() === "pending"
//   ).length;

//   // ── Filtered students ────────────────────────────────────────────────────
//   const filteredStudents = submissions.filter((sub) => {
//     let matchesTab = true;
//     if (activeTab === "submitted") {
//       matchesTab =
//         sub.status.toLowerCase() === "submitted" ||
//         sub.status.toLowerCase() === "late";
//     } else if (activeTab === "not_submitted") {
//       matchesTab = sub.status.toLowerCase() === "pending";
//     }

//     const q = studentSearchQuery.toLowerCase();
//     const matchesSearch =
//       sub.name.toLowerCase().includes(q) ||
//       sub.studentId.toLowerCase().includes(q) ||
//       sub.className.toLowerCase().includes(q);

//     return matchesTab && matchesSearch;
//   });

//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case "submitted": return "status-submitted";
//       case "late":      return "status-late";
//       default:          return "status-pending";
//     }
//   };

//   return (
//     <div className="assign-custom-modal-overlay">
//       <div className="assign-custom-modal-content assign-modal-fullscreen">

//         {/* Header */}
//         <div className="assign-modal-header">
//           <div className="assign-modal-header-titles">
//             <h3>{assignment.title}</h3>
//             <p>{assignment.className} • Due: {assignment.dueDate}</p>
//           </div>
//           <button className="assign-modal-close-btn" onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="assign-modal-body">
//           <div className="assign-modal-toolbar">

//             {/* Tabs */}
//             <div className="assign-modal-tabs">
//               <button
//                 className={`assign-tab-btn ${activeTab === "all" ? "active" : ""}`}
//                 onClick={() => setActiveTab("all")}
//               >
//                 All Students ({allCount})
//               </button>
//               <button
//                 className={`assign-tab-btn ${activeTab === "submitted" ? "active" : ""}`}
//                 onClick={() => setActiveTab("submitted")}
//               >
//                 Submitted ({submittedCount})
//               </button>
//               <button
//                 className={`assign-tab-btn ${activeTab === "not_submitted" ? "active" : ""}`}
//                 onClick={() => setActiveTab("not_submitted")}
//               >
//                 Not Submitted ({notSubmittedCount})
//               </button>
//             </div>

//             {/* Search */}
//             <div className="assign-modal-search-wrapper" style={{ paddingBottom: "12px" }}>
//               <Search size={16} className="assign-modal-search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search by name, ID, or class..."
//                 value={studentSearchQuery}
//                 onChange={(e) => setStudentSearchQuery(e.target.value)}
//                 className="assign-modal-search-input"
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="assign-view-table-wrapper">
//             <table className="assign-view-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Student Name</th>
//                   <th>Class</th>
//                   <th>Status</th>
//                   <th>Submitted Date</th>
//                   <th>Attachment</th>
//                   <th>Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="assign-empty-state" style={{ padding: "30px" }}>
//                       No students match your filter.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredStudents.map((sub) => (
//                     <tr key={sub.id}>
//                       <td className="assign-sub-id">{sub.studentId}</td>
//                       <td className="assign-student-name">{sub.name}</td>
//                       <td className="assign-sub-class">{sub.className}</td>
//                       <td>
//                         <span className={`assign-sub-status-badge ${getStatusClass(sub.status)}`}>
//                           {sub.status}
//                         </span>
//                       </td>
//                       <td className="assign-sub-date">{sub.date}</td>
//                       <td>
//                         {sub.file ? (
//                           <a href="#" className="assign-file-link">
//                             <FileText size={16} />
//                             <span className="assign-file-text" title={sub.file}>{sub.file}</span>
//                             <Download size={14} className="assign-file-download-icon" />
//                           </a>
//                         ) : (
//                           <span className="assign-no-file-text">No file</span>
//                         )}
//                       </td>
//                       <td className="assign-sub-grade">{sub.score}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { Search, X, FileText, Download, Loader2, AlertCircle } from "lucide-react";
// import { classService } from "../../../services";

// function formatDate(iso) {
//   if (!iso) return "—";
//   return new Date(iso).toLocaleString("en-US", {
//     month: "short", day: "numeric", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// }

// function formatFileSize(bytes) {
//   if (!bytes) return "";
//   if (bytes < 1024) return `${bytes} B`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//   return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
// }

// export default function TeacherAssignmentViewModal({
//   isOpen,
//   assignment,
//   classCode,
//   onClose,
// }) {
//   const [activeTab, setActiveTab] = React.useState("all");
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState("");
//   const [submissions, setSubmissions] = React.useState([]);
//   const [enrolledStudents, setEnrolledStudents] = React.useState([]);

//   React.useEffect(() => {
//     if (!isOpen || !assignment) return;

//     setActiveTab("all");
//     setSearchQuery("");
//     setError("");
//     setSubmissions([]);
//     setEnrolledStudents([]);

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const promises = [
//           classService.getAssignmentSubmissions(assignment.id),
//         ];
//         if (classCode) {
//           promises.push(classService.getEnrolledStudents(classCode));
//         }

//         const [submissionsRes, enrolledRes] = await Promise.all(promises);

//         const submissionList = submissionsRes?.results || submissionsRes || [];
//         setSubmissions(Array.isArray(submissionList) ? submissionList : []);

//         if (enrolledRes) {
//           const enrolledList = enrolledRes?.results || enrolledRes || [];
//           setEnrolledStudents(Array.isArray(enrolledList) ? enrolledList : []);
//         }
//       } catch (err) {
//         setError(err?.message || "Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isOpen, assignment?.id, classCode]);

//   if (!isOpen || !assignment) return null;

//   // ── Map submissions by student id ─────────────────────────────────────────
//   const submissionByStudentId = {};
//   submissions.forEach((sub) => {
//     if (sub.user?.id) submissionByStudentId[sub.user.id] = sub;
//   });

//   // ── Build unified rows ────────────────────────────────────────────────────
//   let rows = [];

//   if (enrolledStudents.length > 0) {
//     // enrolled API returns { id, student: {...}, enrolled_at }
//     // so we unwrap enrollment.student
//     rows = enrolledStudents.map((enrollment) => {
//       const student = enrollment.student ?? enrollment; // ← unwrap nested student
//       const sub = submissionByStudentId[student.id];
//       return {
//         studentId: student.id,
//         name: `${student.first_name || ""} ${student.last_name || ""}`.trim() || student.username || "—",
//         email: student.email || "—",
//         status: sub
//           ? (sub.status === "queued" ? "Processing" : sub.status)
//           : "Not Submitted",
//         submittedAt: sub?.submitted_at || null,
//         file: sub?.original_filename || null,
//         fileUrl: sub?.file_url || null,
//         fileSize: sub?.file_size || null,
//         score: sub?.score ?? "—",
//         submissionId: sub?.id || null,
//       };
//     });

//     // Add submissions from students not in enrolled list (edge case)
//     submissions.forEach((sub) => {
//       const alreadyAdded = rows.find((r) => r.studentId === sub.user?.id);
//       if (!alreadyAdded && sub.user?.id) {
//         rows.push({
//           studentId: sub.user.id,
//           name: `${sub.user.first_name || ""} ${sub.user.last_name || ""}`.trim() || sub.user.username || "Unknown",
//           email: sub.user.email || "—",
//           status: sub.status === "queued" ? "Processing" : sub.status,
//           submittedAt: sub.submitted_at,
//           file: sub.original_filename,
//           fileUrl: sub.file_url,
//           fileSize: sub.file_size,
//           score: sub.score ?? "—",
//           submissionId: sub.id,
//         });
//       }
//     });
//   } else {
//     // No enrolled data — show submissions only
//     rows = submissions.map((sub) => ({
//       studentId: sub.user?.id,
//       name: `${sub.user?.first_name || ""} ${sub.user?.last_name || ""}`.trim() || sub.user?.username || "Unknown",
//       email: sub.user?.email || "—",
//       status: sub.status === "queued" ? "Processing" : sub.status,
//       submittedAt: sub.submitted_at,
//       file: sub.original_filename,
//       fileUrl: sub.file_url,
//       fileSize: sub.file_size,
//       score: sub.score ?? "—",
//       submissionId: sub.id,
//     }));
//   }

//   // ── Tab counts ────────────────────────────────────────────────────────────
//   const submittedRows    = rows.filter((r) => r.status !== "Not Submitted");
//   const notSubmittedRows = rows.filter((r) => r.status === "Not Submitted");

//   // ── Filter by tab + search ────────────────────────────────────────────────
//   const filtered = rows.filter((row) => {
//     if (activeTab === "submitted"     && row.status === "Not Submitted") return false;
//     if (activeTab === "not_submitted" && row.status !== "Not Submitted") return false;
//     const q = searchQuery.toLowerCase();
//     if (!q) return true;
//     return (
//       row.name.toLowerCase().includes(q) ||
//       (row.email || "").toLowerCase().includes(q) ||
//       String(row.studentId).includes(q)
//     );
//   });

//   const getStatusClass = (status) => {
//     switch ((status || "").toLowerCase()) {
//       case "submitted":     return "status-submitted";
//       case "processing":    return "status-processing";
//       case "late":          return "status-late";
//       case "not submitted": return "status-pending";
//       default:              return "status-pending";
//     }
//   };

//   return (
//     <div className="assign-custom-modal-overlay">
//       <div className="assign-custom-modal-content assign-modal-fullscreen">

//         {/* Header */}
//         <div className="assign-modal-header">
//           <div className="assign-modal-header-titles">
//             <h3>{assignment.title}</h3>
//             <p>Due: {formatDate(assignment.deadline)}</p>
//           </div>
//           <button className="assign-modal-close-btn" onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="assign-modal-body">

//           {/* Toolbar */}
//           <div className="assign-modal-toolbar">
//             <div className="assign-modal-tabs">
//               <button
//                 className={`assign-tab-btn ${activeTab === "all" ? "active" : ""}`}
//                 onClick={() => setActiveTab("all")}
//               >
//                 All Students ({rows.length})
//               </button>
//               <button
//                 className={`assign-tab-btn ${activeTab === "submitted" ? "active" : ""}`}
//                 onClick={() => setActiveTab("submitted")}
//               >
//                 Submitted ({submittedRows.length})
//               </button>
//               <button
//                 className={`assign-tab-btn ${activeTab === "not_submitted" ? "active" : ""}`}
//                 onClick={() => setActiveTab("not_submitted")}
//               >
//                 Not Submitted ({notSubmittedRows.length})
//               </button>
//             </div>

//             <div className="assign-modal-search-wrapper" style={{ paddingBottom: "12px" }}>
//               <Search size={16} className="assign-modal-search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="assign-modal-search-input"
//               />
//             </div>
//           </div>

//           {/* Loading */}
//           {loading && (
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "40px", color: "var(--muted)" }}>
//               <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
//               <span>Loading submissions...</span>
//             </div>
//           )}

//           {/* Error */}
//           {!loading && error && (
//             <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px", color: "#ef4444", background: "#fee2e2", borderRadius: 8, margin: "0 0 16px" }}>
//               <AlertCircle size={16} /> {error}
//             </div>
//           )}

//           {/* Table */}
//           {!loading && !error && (
//             <div className="assign-view-table-wrapper">
//               <table className="assign-view-table">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Student Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Submitted At</th>
//                     <th>Submitted File</th>
//                     <th>AI Report</th>                  
//                     <th>Score</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.length === 0 ? (
//                     <tr>
//                       <td colSpan={8} className="assign-empty-state" style={{ padding: "30px" }}>
//                         No students match your filter.
//                       </td>
//                     </tr>
//                   ) : (
//                     filtered.map((row, i) => (
//                       <tr key={row.submissionId || row.studentId || i}>
//                         <td className="assign-sub-id">{i + 1}</td>
//                         <td className="assign-student-name">{row.name}</td>
//                         <td className="assign-sub-class" style={{ fontSize: 12, color: "var(--muted)" }}>{row.email}</td>
//                         <td>
//                           <span className={`assign-sub-status-badge ${getStatusClass(row.status)}`}>
//                             {row.status}
//                           </span>
//                         </td>
//                         <td className="assign-sub-date">{formatDate(row.submittedAt)}</td>
//                         <td>
//                           {row.file && row.fileUrl ? (
//                             <a
//                               href={row.fileUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="assign-file-link"
//                             >
//                               <FileText size={15} />
//                               <span className="assign-file-text" title={row.file}>{row.file}</span>
//                               <Download size={13} className="assign-file-download-icon" />
//                             </a>
//                           ) : (
//                             <span className="assign-no-file-text">—</span>
//                           )}
//                         </td>
//                         <td></td>                        
//                         <td className="assign-sub-grade">{row.score}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Search, X, FileText, Download, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { classService } from "../../../services";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function PctBadge({ value, label, color }) {
  const colors = {
    green:  { bg: "#dcfce7", text: "#16a34a" },
    orange: { bg: "#ffedd5", text: "#ea580c" },
    red:    { bg: "#fee2e2", text: "#dc2626" },
    blue:   { bg: "#dbeafe", text: "#2563eb" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span
      title={label}
      style={{
        display: "inline-block",
        background: c.bg,
        color: c.text,
        borderRadius: 4,
        padding: "2px 6px",
        fontSize: 11,
        fontWeight: 600,
        marginRight: 4,
        whiteSpace: "nowrap",
      }}
    >
      {label}: {Number(value).toFixed(0)}%
    </span>
  );
}

export default function TeacherAssignmentViewModal({
  isOpen,
  assignment,
  classCode,
  onClose,
}) {
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [submissions, setSubmissions] = React.useState([]);
  const [enrolledStudents, setEnrolledStudents] = React.useState([]);
  const [aiResults, setAiResults] = React.useState([]);

  React.useEffect(() => {
    if (!isOpen || !assignment) return;

    setActiveTab("all");
    setSearchQuery("");
    setError("");
    setSubmissions([]);
    setEnrolledStudents([]);
    setAiResults([]);

    const fetchData = async () => {
      setLoading(true);
      try {
        // Step 1: fetch submissions for this assignment
        const submissionsRes = await classService.getAssignmentSubmissions(assignment.id);
        const submissionList = submissionsRes?.results ?? submissionsRes ?? [];
        const cleanSubmissions = Array.isArray(submissionList) ? submissionList : [];
        setSubmissions(cleanSubmissions);

        // Step 2: collect the submission UUIDs for this assignment
        const assignmentSubmissionIds = new Set(cleanSubmissions.map((s) => s.id));

        // Step 3: fetch everything else in parallel
        const parallelPromises = [
          // Fetch ALL results (no server-side filter) — we filter client-side
          // by submission UUID so we don't rely on assignment_name matching
          classService.getResults(),
        ];
        if (classCode) {
          parallelPromises.push(classService.getEnrolledStudents(classCode));
        }

        const [resultsRes, enrolledRes] = await Promise.all(parallelPromises);

        // Keep only results whose submission UUID belongs to this assignment
        const allResults = resultsRes?.results ?? resultsRes ?? [];
        const relevantResults = Array.isArray(allResults)
          ? allResults.filter((r) => assignmentSubmissionIds.has(r.submission))
          : [];
        setAiResults(relevantResults);

        if (enrolledRes) {
          const enrolledList = enrolledRes?.results ?? enrolledRes ?? [];
          setEnrolledStudents(Array.isArray(enrolledList) ? enrolledList : []);
        }
      } catch (err) {
        setError(err?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, assignment?.id, classCode]);

  if (!isOpen || !assignment) return null;

  // ── Index submissions by student id ───────────────────────────────────────
  const submissionByStudentId = {};
  submissions.forEach((sub) => {
    if (sub.user?.id) submissionByStudentId[sub.user.id] = sub;
  });

  // ── Index AI results by submission UUID ───────────────────────────────────
  // result.submission === submission.id  (both are UUID strings)
  const resultBySubmissionId = {};
  aiResults.forEach((r) => {
    if (r.submission) resultBySubmissionId[r.submission] = r;
  });

  // ── Build a unified row per student ───────────────────────────────────────
  const buildRow = (student, sub) => {
    const result = sub?.id ? (resultBySubmissionId[sub.id] ?? null) : null;
    return {
      studentId:       student.id,
      name:            `${student.first_name || ""} ${student.last_name || ""}`.trim() || student.username || "—",
      email:           student.email || "—",
      status:          sub ? (sub.status === "queued" ? "Processing" : sub.status) : "Not Submitted",
      submittedAt:     sub?.submitted_at ?? null,
      file:            sub?.original_filename ?? null,
      fileUrl:         sub?.file_url ?? null,
      score:           sub?.score ?? "—",
      submissionId:    sub?.id ?? null,
      // AI fields — null = no result yet
      aiPercentage:    result?.ai_percentage    ?? null,
      humanPercentage: result?.human_percentage ?? null,
      grammarScore:    result?.grammar_score    ?? null,
      reportUrl:       result?.report_url       ?? null,
      totalParagraphs: result?.total_paragraphs ?? null,
      aiParagraphs:    result?.ai_paragraphs    ?? null,
    };
  };

  let rows = [];

  if (enrolledStudents.length > 0) {
    rows = enrolledStudents.map((enrollment) => {
      const student = enrollment.student ?? enrollment;
      const sub     = submissionByStudentId[student.id];
      return buildRow(student, sub);
    });
    // Edge-case: submissions from students not in enrolled list
    submissions.forEach((sub) => {
      if (!rows.find((r) => r.studentId === sub.user?.id) && sub.user?.id) {
        rows.push(buildRow(sub.user, sub));
      }
    });
  } else {
    rows = submissions.map((sub) => buildRow(sub.user ?? {}, sub));
  }

  // ── Tab counts ────────────────────────────────────────────────────────────
  const submittedRows    = rows.filter((r) => r.status !== "Not Submitted");
  const notSubmittedRows = rows.filter((r) => r.status === "Not Submitted");

  // ── Filter by tab + search ────────────────────────────────────────────────
  const visibleRows = rows.filter((row) => {
    if (activeTab === "submitted"     && row.status === "Not Submitted") return false;
    if (activeTab === "not_submitted" && row.status !== "Not Submitted") return false;
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      row.name.toLowerCase().includes(q) ||
      (row.email || "").toLowerCase().includes(q) ||
      String(row.studentId).includes(q)
    );
  });

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "submitted":     return "status-submitted";
      case "processing":    return "status-processing";
      case "late":          return "status-late";
      case "not submitted": return "status-pending";
      default:              return "status-pending";
    }
  };

  return (
    <div className="assign-custom-modal-overlay">
      <div className="assign-custom-modal-content assign-modal-fullscreen">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="assign-modal-header">
          <div className="assign-modal-header-titles">
            <h3>{assignment.title}</h3>
            <p>Due: {formatDate(assignment.deadline)}</p>
          </div>
          <button className="assign-modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="assign-modal-body">

          {/* Toolbar */}
          <div className="assign-modal-toolbar">
            <div className="assign-modal-tabs">
              <button
                className={`assign-tab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All Students ({rows.length})
              </button>
              <button
                className={`assign-tab-btn ${activeTab === "submitted" ? "active" : ""}`}
                onClick={() => setActiveTab("submitted")}
              >
                Submitted ({submittedRows.length})
              </button>
              <button
                className={`assign-tab-btn ${activeTab === "not_submitted" ? "active" : ""}`}
                onClick={() => setActiveTab("not_submitted")}
              >
                Not Submitted ({notSubmittedRows.length})
              </button>
            </div>

            <div className="assign-modal-search-wrapper" style={{ paddingBottom: "12px" }}>
              <Search size={16} className="assign-modal-search-icon" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="assign-modal-search-input"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "40px", color: "var(--muted)" }}>
              <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
              <span>Loading submissions...</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px", color: "#ef4444", background: "#fee2e2", borderRadius: 8, margin: "0 0 16px" }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <div className="assign-view-table-wrapper">
              <table className="assign-view-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Submitted At</th>
                    <th>Submitted File</th>
                    <th>AI Detection</th>
                    <th>AI Report</th>                    
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="assign-empty-state" style={{ padding: "30px" }}>
                        No students match your filter.
                      </td>
                    </tr>
                  ) : (
                    visibleRows.map((row, i) => (
                      <tr key={row.submissionId || row.studentId || i}>

                        <td className="assign-sub-id">{i + 1}</td>

                        <td className="assign-student-name">{row.name}</td>

                        <td className="assign-sub-class" style={{ fontSize: 12, color: "var(--muted)" }}>
                          {row.email}
                        </td>

                        <td>
                          <span className={`assign-sub-status-badge ${getStatusClass(row.status)}`}>
                            {row.status}
                          </span>
                        </td>

                        <td className="assign-sub-date">{formatDate(row.submittedAt)}</td>

                        {/* Submitted File */}
                        <td>
                          {row.file && row.fileUrl ? (
                            <a
                              href={row.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="assign-file-link"
                            >
                              <FileText size={15} />
                              <span className="assign-file-text" title={row.file}>{row.file}</span>
                              <Download size={13} className="assign-file-download-icon" />
                            </a>
                          ) : (
                            <span className="assign-no-file-text">—</span>
                          )}
                        </td>

                        {/* AI Detection */}
                        <td style={{ minWidth: 190 }}>
                          {row.aiPercentage !== null ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                              <PctBadge
                                value={row.aiPercentage}
                                label="AI"
                                color={Number(row.aiPercentage) >= 50 ? "red" : "orange"}
                              />
                              <PctBadge
                                value={row.humanPercentage}
                                label="Human"
                                color="green"
                              />
                              {row.totalParagraphs != null && (
                                <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 2 }}>
                                  ({row.aiParagraphs}/{row.totalParagraphs} para)
                                </span>
                              )}
                            </div>
                          ) : row.status === "Not Submitted" ? (
                            <span className="assign-no-file-text">—</span>
                          ) : (
                            <span style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic" }}>
                              Pending analysis
                            </span>
                          )}
                        </td>

                        {/* AI Report PDF */}
                        <td>
                          {row.reportUrl ? (
                            <a
                              href={row.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="assign-file-link"
                              title="Open AI Report PDF"
                            >
                              <FileText size={15} />
                              <span className="assign-file-text">Report</span>
                              <ExternalLink size={13} className="assign-file-download-icon" />
                            </a>
                          ) : (
                            <span className="assign-no-file-text">—</span>
                          )}
                        </td>

                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}