// import React, { useState, useEffect, useRef } from "react";
// import {
//   UploadCloud, FileText, CheckCircle, Clock,
//   AlertCircle, X, FileCheck, ArrowLeft, ClipboardList, Ban,
// } from "lucide-react";
// import "../../css/Student/StudentAssignments.css";
// import { classService } from "../../services/classService";
// import { useLocation, useNavigate } from "react-router-dom";

// // ─── LocalStorage Helpers ─────────────────────────────────────────────────────
// const STORAGE_KEY    = "submitted_assignments";
// const PROC_START_KEY = "proc_start_";

// function getSubmittedMap() {
//   try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
//   catch { return {}; }
// }

// function saveSubmission(assignmentId, submissionId) {
//   const map = getSubmittedMap();
//   map[assignmentId] = submissionId;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
// }

// function getOrCreateProcStart(submissionId) {
//   const key = PROC_START_KEY + submissionId;
//   try {
//     const stored = localStorage.getItem(key);
//     if (stored) return parseInt(stored, 10);
//     const now = Date.now();
//     localStorage.setItem(key, String(now));
//     return now;
//   } catch { return Date.now(); }
// }

// function clearProcStart(submissionId) {
//   try {
//     localStorage.removeItem(PROC_START_KEY + submissionId);
//   } catch { /* ignore */ }
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function formatDate(dateStr) {
//   if (!dateStr) return "No due date";
//   return new Date(dateStr).toLocaleDateString("en-US", {
//     month: "short", day: "numeric", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   });
// }

// function getStatusInfo(a) {
//   if (a.status === "submitted")
//     return { label: "Submitted", color: "#10b981", bg: "#d1fae5", icon: <CheckCircle size={13} /> };
//   if (a.is_past_deadline)
//     return { label: "Overdue", color: "#ef4444", bg: "#fee2e2", icon: <AlertCircle size={13} /> };
//   return { label: "Pending", color: "#f59e0b", bg: "#fef3c7", icon: <Clock size={13} /> };
// }

// // ─── Processing Messages ──────────────────────────────────────────────────────
// const PROCESSING_MESSAGES = [
//   "Extracting text from PDF...",
//   "Running AI detection model...",
//   "Checking grammar patterns...",
//   "Analysing sentence structure...",
//   "Calculating perplexity scores...",
//   "Mapping BERT embeddings...",
//   "Finalising results...",
// ];

// function padTwo(n) { return String(Math.floor(n)).padStart(2, "0"); }

// function formatElapsed(ms) {
//   const totalSec = Math.floor(ms / 1000);
//   const h = Math.floor(totalSec / 3600);
//   const m = Math.floor((totalSec % 3600) / 60);
//   const s = totalSec % 60;
//   return `${padTwo(h)} : ${padTwo(m)} : ${padTwo(s)}`;
// }

// // ─── Processing Loader ────────────────────────────────────────────────────────
// function ProcessingLoader({ isComplete, percentage, submissionId, onTerminate }) {
//   const startTimeRef = useRef(getOrCreateProcStart(submissionId));

//   const [elapsed, setElapsed] = useState(() => Date.now() - startTimeRef.current);
//   const [msgIdx, setMsgIdx] = useState(0);
//   const [terminateLoading, setTerminateLoading] = useState(false);

//   const elapsedSec = elapsed / 1000;
//   const fakePct    = Math.min(90, Math.round(90 * (1 - Math.exp(-elapsedSec / 60))));
//   const displayPct = isComplete ? 100 : (percentage > 0 ? percentage : fakePct);

//   useEffect(() => {
//     if (isComplete) {
//       clearProcStart(submissionId);
//       return;
//     }

//     const timerInterval = setInterval(() => {
//       setElapsed(Date.now() - startTimeRef.current);
//     }, 1000);

//     const msgInterval = setInterval(() => {
//       setMsgIdx(i => (i + 1) % PROCESSING_MESSAGES.length);
//     }, 2500);

//     return () => {
//       clearInterval(timerInterval);
//       clearInterval(msgInterval);
//     };
//   }, [isComplete, submissionId]);

//   const handleTerminate = async () => {
//     if (!window.confirm("Terminate processing? This will clear all results and let you resubmit.")) return;
//     setTerminateLoading(true);
//     try {
//       await onTerminate();
//     } catch { /* ignore */ }
//     finally { setTerminateLoading(false); }
//   };

//   return (
//     <div className="proc-loader-card">

//       {/* ── Top row: message + timer ── */}
//       <div className="proc-top-row">
//         <div className="proc-left">
//           <p className="proc-title">
//             {isComplete ? "Analysis complete" : "Analysing your submission"}
//           </p>
//           <div className="proc-msg-box">
//             {!isComplete && (
//               <span className="proc-msg" key={msgIdx}>
//                 {PROCESSING_MESSAGES[msgIdx]}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="proc-right">
//           <span className="proc-timer">{formatElapsed(elapsed)}</span>
//           <span className="proc-pct">{displayPct}%</span>
//         </div>
//       </div>

//       {/* ── Progress bar ── */}
//       <div className="proc-track">
//         <div className="proc-fill" style={{ width: `${displayPct}%` }} />
//         {!isComplete && <div className="proc-sweep" />}
//       </div>
//       <div className="proc-track-labels">
//         <span>Start</span><span>Complete</span>
//       </div>

//       {/* ── Terminate button ── */}
//       {!isComplete && (
//         <div style={{
//           display: "flex", justifyContent: "flex-end", marginTop: "12px"
//         }}>
//           <button
//             onClick={handleTerminate}
//             disabled={terminateLoading}
//             style={{
//               display: "flex", alignItems: "center", gap: "6px",
//               padding: "7px 16px", borderRadius: "8px", border: "none",
//               background: "#ef4444", color: "#fff",
//               fontWeight: 600, fontSize: "13px", cursor: "pointer",
//               opacity: terminateLoading ? 0.7 : 1,
//             }}
//           >
//             <X size={14} />
//             {terminateLoading ? "Terminating..." : "Terminate"}
//           </button>
//         </div>
//       )}

//       {/* ── Done state ── */}
//       {isComplete && (
//         <div className="proc-done-row">
//           <CheckCircle size={15} color="#10b981" />
//           <span>Analysis complete — 100%</span>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Assignment Detail ────────────────────────────────────────────────────────
// function AssignmentDetail({ assignment, onBack, onSubmitSuccess }) {
//   const [selectedFile, setSelectedFile]     = useState(null);
//   const [isDragging, setIsDragging]         = useState(false);
//   const [uploadState, setUploadState]       = useState("idle");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [errorMessage, setErrorMessage]     = useState("");
//   const [submissionData, setSubmissionData] = useState(
//     assignment.status === "submitted" ? assignment.previousSubmission || true : null
//   );
//   const [processingStatus, setProcessingStatus] = useState(null);
//   const fileInputRef = useRef(null);
//   const pollingRef   = useRef(null);

//   const submissionId = getSubmittedMap()[assignment.id] || null;

//   useEffect(() => {
//     if (assignment.status === "submitted" && submissionId) {
//       setTimeout(() => startPolling(submissionId), 500);
//     }
//     return () => clearInterval(pollingRef.current);
//   }, []);

//   const startPolling = (sid) => {
//     clearInterval(pollingRef.current);
//     pollingRef.current = setInterval(async () => {
//       try {
//         const res = await classService.getSubmissionStatus(sid);
//         setProcessingStatus(res);
//         if (res.is_complete) clearInterval(pollingRef.current);
//       } catch {
//         clearInterval(pollingRef.current);
//       }
//     }, 3000);
//   };

//   const handleTerminate = async () => {
//     await classService.terminateSubmission(submissionId);
//     clearInterval(pollingRef.current);
//     clearProcStart(submissionId);
//     const map = getSubmittedMap();
//     delete map[assignment.id];
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
//     setProcessingStatus(null);
//     setSubmissionData(null);
//     setUploadState("idle");
//   };

//   const isBlocked = assignment.is_past_deadline && !assignment.allow_late_submissions;
//   const statusKey  = assignment.status === "submitted" ? "submitted"
//     : assignment.is_past_deadline ? "late" : "pending";

//   const handleFile = (file) => {
//     setErrorMessage("");
//     if (!file) return;
//     const ext = "." + file.name.split(".").pop().toLowerCase();
//     if (!["application/pdf"].includes(file.type) && ext !== ".pdf") {
//       setErrorMessage("Invalid file type. Only PDF files are supported.");
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setErrorMessage("File too large. Maximum size is 10MB.");
//       return;
//     }
//     setSelectedFile(file);
//     setUploadState("idle");
//   };

//   const handleSubmit = async () => {
//     if (!selectedFile) return;
//     setUploadState("uploading");
//     setUploadProgress(0);
//     setErrorMessage("");

//     const progressInterval = setInterval(() => {
//       setUploadProgress(prev => (prev < 85 ? prev + 10 : prev));
//     }, 200);

//     try {
//       const res = await classService.submitAssignment(
//         assignment.id, assignment.title, selectedFile
//       );
//       clearInterval(progressInterval);
//       setUploadProgress(100);
//       setUploadState("success");
//       setSubmissionData({ name: selectedFile.name, date: new Date().toLocaleString() });
//       setSelectedFile(null);
//       saveSubmission(res.assignment, res.id);
//       getOrCreateProcStart(res.id);
//       onSubmitSuccess?.(res.assignment);
//       setTimeout(() => startPolling(res.id), 2000);
//     } catch (err) {
//       clearInterval(progressInterval);
//       if (err?.code === "ERR_CANCELED" || err?.message === "canceled") return;
//       setUploadState("idle");
//       setUploadProgress(0);
//       setErrorMessage(
//         err?.data?.detail || err?.data?.message || err?.message ||
//         "Submission failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="page-inner" style={{ maxWidth: "1100px" }}>
//         <button className="back-btn" onClick={onBack} style={{ marginBottom: "16px" }}>
//           <ArrowLeft size={16} /> Back to Assignments
//         </button>

//         <div className="assignment-layout fade-in">
//           {/* ── Left: Details ── */}
//           <div className="assignment-details">
//             <div className="detail-header">
//               <h1 className="assignment-title">{assignment.title}</h1>
//               <p className="assignment-meta">
//                 {assignment.created_by?.first_name} {assignment.created_by?.last_name}
//               </p>
//               <div className="status-row">
//                 <span className={`status-badge badge-${statusKey}`}>
//                   {statusKey === "submitted" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
//                   {statusKey.toUpperCase()}
//                 </span>
//                 <span className="due-date">
//                   <Clock size={14} /> Due: {formatDate(assignment.deadline)}
//                 </span>
//               </div>
//             </div>
//             <div className="detail-body">
//               <h3>Instructions</h3>
//               <p>{assignment.description || "No instructions provided."}</p>
//               <div className="meta-chips">
//                 <div className={`meta-chip ${assignment.allow_late_submissions ? "chip-success" : "chip-danger"}`}>
//                   <span className="meta-chip-label">Late Submissions</span>
//                   <span className="meta-chip-value">
//                     {assignment.allow_late_submissions ? "Allowed" : "Not Allowed"}
//                   </span>
//                 </div>
//                 {!assignment.is_active && (
//                   <div className="meta-chip chip-muted">
//                     <span className="meta-chip-value">Inactive</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ── Right: Submission ── */}
//           <div className="submission-panel">
//             <h2 className="panel-title">Your Work</h2>
//             {isBlocked && assignment.status !== "submitted" ? (
//               <div className="submission-blocked">
//                 <Ban size={32} color="#ef4444" />
//                 <p className="blocked-title">Submissions Closed</p>
//                 <p className="blocked-desc">
//                   The deadline has passed and late submissions are not allowed.
//                 </p>
//               </div>
//             ) : submissionData ? (
//               <div className="submitted-state">
//                 <div className="file-preview success-preview">
//                   <FileCheck size={32} color="var(--green)" style={{ marginRight: "12px" }} />
//                   <div className="file-info">
//                     <p className="file-name">
//                       {typeof submissionData === "object" ? submissionData.name : "Submitted"}
//                     </p>
//                     <p className="file-size">
//                       {typeof submissionData === "object"
//                         ? `Submitted on ${submissionData.date}`
//                         : "Already submitted"}
//                     </p>
//                   </div>
//                 </div>

//                 {processingStatus && submissionId && (
//                   <ProcessingLoader
//                     isComplete={processingStatus.is_complete}
//                     percentage={processingStatus.processing_percentage || 0}
//                     submissionId={submissionId}
//                     onTerminate={handleTerminate}
//                   />
//                 )}
//               </div>
//             ) : (
//               <div className="upload-state">
//                 {!selectedFile ? (
//                   <div
//                     className={`drop-zone ${isDragging ? "dragging" : ""}`}
//                     onClick={() => fileInputRef.current.click()}
//                     onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
//                     onDragLeave={() => setIsDragging(false)}
//                     onDrop={e => {
//                       e.preventDefault(); setIsDragging(false);
//                       if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
//                     }}
//                   >
//                     <input
//                       type="file" ref={fileInputRef} hidden accept=".pdf"
//                       onChange={e => handleFile(e.target.files[0])}
//                     />
//                     <UploadCloud size={40} className="upload-icon" />
//                     <h4>Click or drag file to upload</h4>
//                     <p>PDF only · Max 10MB</p>
//                   </div>
//                 ) : (
//                   <div className="file-preview">
//                     <FileText size={28} className="file-type-icon" />
//                     <div className="file-info">
//                       <p className="file-name">{selectedFile.name}</p>
//                       <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                     </div>
//                     {uploadState === "idle" && (
//                       <button className="remove-file-btn" onClick={() => setSelectedFile(null)}>
//                         <X size={18} />
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 {errorMessage && (
//                   <div className="upload-error"><AlertCircle size={14} /> {errorMessage}</div>
//                 )}
//                 {uploadState === "uploading" && (
//                   <div className="progress-container">
//                     <div className="progress-bar-wrapper">
//                       <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
//                     </div>
//                     <span className="progress-text">Uploading... {Math.round(uploadProgress)}%</span>
//                   </div>
//                 )}
//                 <button
//                   className="btn-primary submit-btn"
//                   disabled={!selectedFile || uploadState === "uploading" || uploadState === "success"}
//                   onClick={handleSubmit}
//                 >
//                   {uploadState === "uploading" ? "Submitting..."
//                     : uploadState === "success" ? "Submitted!"
//                     : assignment.is_past_deadline ? "Submit Late"
//                     : "Submit Assignment"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Root Export ──────────────────────────────────────────────────────────────
// export default function StudentAssignments() {
//   const { state } = useLocation();
//   const navigate  = useNavigate();
//   const selectedClass = state?.selectedClass ?? null;

//   const [assignments, setAssignments]           = useState([]);
//   const [loading, setLoading]                   = useState(true);
//   const [error, setError]                       = useState("");
//   // const [activeAssignment, setActiveAssignment] = useState(null);
//   // With this:
// const [activeAssignment, setActiveAssignment] = useState(() => {
//   try {
//     const saved = sessionStorage.getItem("activeAssignment");
//     return saved ? JSON.parse(saved) : null;
//   } catch { return null; }
// });


// const handleSelectAssignment = (assignment) => {
//   sessionStorage.setItem("activeAssignment", JSON.stringify(assignment));
//   setActiveAssignment(assignment);
// };

// const handleBackFromAssignment = () => {
//   sessionStorage.removeItem("activeAssignment");
//   setActiveAssignment(null);
// };

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         let list = [];
//         if (selectedClass?.code) {
//           const res = await classService.getClassAssignments(selectedClass.code);
//           list = Array.isArray(res) ? res : res?.data || [];
//         } else {
//           const classesRes = await classService.getEnrolledClasses();
//           const classes = Array.isArray(classesRes) ? classesRes : classesRes?.data || [];
//           const promises = classes.map((cls) =>
//             classService.getClassAssignments(cls.code).catch(() => [])
//           );
//           const allResponses = await Promise.all(promises);
//           const combined = allResponses.flatMap((res) =>
//             Array.isArray(res) ? res : res?.data || []
//           );
//           list = Array.from(new Map(combined.map((a) => [a.id, a])).values());
//           list.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
//         }
//         const submittedMap = getSubmittedMap();
//         const merged = list.map((a) =>
//           submittedMap[a.id] ? { ...a, status: "submitted" } : a
//         );
//         setAssignments(merged);
//       } catch {
//         setError("Failed to load assignments. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAssignments();
//   }, [selectedClass?.code]);

//   const handleSubmissionSuccess = (assignmentId) => {
//     setAssignments(prev =>
//       prev.map(a => a.id === assignmentId ? { ...a, status: "submitted" } : a)
//     );
//     setActiveAssignment(prev => prev ? { ...prev, status: "submitted" } : prev);
//   };

//   if (activeAssignment) {
//     return (
//       <AssignmentDetail
//         assignment={activeAssignment}
//         // onBack={() => setActiveAssignment(null)}
//         onSubmitSuccess={handleSubmissionSuccess}
//         onBack={handleBackFromAssignment}  // 👈
//       />
//     );
//   }

//   return (
//     <div className="page-wrapper">
//       <div className="page-inner" style={{ maxWidth: "860px" }}>
//         <header className="page-header fade-in">
//           {selectedClass && (
//             <button className="back-btn" onClick={() => navigate("/student/dashboard/my-classes")}>
//               <ArrowLeft size={16} /> Back to Classes
//             </button>
//           )}
//           <div style={{ marginTop: "16px" }}>
//             <h1 className="page-title">
//               {selectedClass ? selectedClass.name : "All Assignments"}
//             </h1>
//             {selectedClass && (
//               <p className="page-subtitle">
//                 {selectedClass.teacher?.first_name} {selectedClass.teacher?.last_name}
//                 {" · "}{selectedClass.code}
//               </p>
//             )}
//           </div>
//         </header>

//         {loading ? (
//           <div className="empty-state-card fade-in">
//             <div className="spinner" />
//             <p style={{ color: "#64748b", marginTop: "14px" }}>Loading assignments...</p>
//           </div>
//         ) : error ? (
//           <div className="empty-state-card fade-in">
//             <AlertCircle size={36} color="#ef4444" />
//             <p style={{ color: "#ef4444", marginTop: "12px" }}>{error}</p>
//           </div>
//         ) : assignments.length === 0 ? (
//           <div className="empty-state-card fade-in">
//             <ClipboardList size={48} className="empty-icon" />
//             <h3>No Assignments Yet</h3>
//             <p>
//               {selectedClass
//                 ? "Your teacher hasn't posted any assignments yet. Check back later!"
//                 : "You have no assignments across any of your classes yet."}
//             </p>
//           </div>
//         ) : (
//           <div className="assignments-list fade-in">
//             {assignments.map((a, i) => {
//               const status = getStatusInfo(a);
//               return (
//                 <div
//                   onClick={() => handleSelectAssignment(a)}
//                   key={a.id}
//                   className="assignment-card"
//                   style={{ animationDelay: `${i * 0.06}s` }}
//                   // onClick={() => setActiveAssignment(a)}
//                 >
//                   <div className="card-accent" style={{ background: status.color }} />
//                   <div className="card-icon"><FileText size={20} color="#64748b" /></div>
//                   <div className="card-body">
//                     <div className="card-top-row">
//                       <h3 className="card-title">{a.title}</h3>
//                       <span className="card-badge" style={{ color: status.color, background: status.bg }}>
//                         {status.icon} {status.label}
//                       </span>
//                     </div>
//                     {a.description && <p className="card-desc">{a.description}</p>}
//                     <div className="card-meta-row">
//                       <span className={`card-due${a.is_past_deadline ? " overdue" : ""}`}>
//                         <Clock size={12} />
//                         {a.is_past_deadline ? "Was due: " : "Due: "}{formatDate(a.deadline)}
//                       </span>
//                       {!a.allow_late_submissions && a.is_past_deadline && (
//                         <span className="card-meta-item card-no-late">
//                           <Ban size={11} /> No late submissions
//                         </span>
//                       )}
//                       {!a.is_active && (
//                         <span className="card-meta-item card-inactive">Inactive</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );

// }

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud, FileText, CheckCircle, Clock,
  AlertCircle, X, FileCheck, ArrowLeft, ClipboardList, Ban,
} from "lucide-react";
import "../../css/Student/StudentAssignments.css";
import { classService } from "../../services/classService";
import { useLocation, useNavigate } from "react-router-dom";

// ─── LocalStorage Helpers ─────────────────────────────────────────────────────
const STORAGE_KEY    = "submitted_assignments";
const PROC_START_KEY = "proc_start_";

function getSubmittedMap() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveSubmission(assignmentId, submissionId) {
  const map = getSubmittedMap();
  map[assignmentId] = submissionId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function getOrCreateProcStart(submissionId) {
  const key = PROC_START_KEY + submissionId;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return parseInt(stored, 10);
    const now = Date.now();
    localStorage.setItem(key, String(now));
    return now;
  } catch { return Date.now(); }
}

function clearProcStart(submissionId) {
  try {
    localStorage.removeItem(PROC_START_KEY + submissionId);
  } catch { /* ignore */ }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "No due date";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function getStatusInfo(a) {
  if (a.status === "submitted")
    return { label: "Submitted", color: "#10b981", bg: "#d1fae5", icon: <CheckCircle size={13} /> };
  if (a.is_past_deadline)
    return { label: "Overdue", color: "#ef4444", bg: "#fee2e2", icon: <AlertCircle size={13} /> };
  return { label: "Pending", color: "#f59e0b", bg: "#fef3c7", icon: <Clock size={13} /> };
}

// ─── Processing Messages ──────────────────────────────────────────────────────
const PROCESSING_MESSAGES = [
  "Extracting text from PDF...",
  "Running AI detection model...",
  "Checking grammar patterns...",
  "Analysing sentence structure...",
  "Calculating perplexity scores...",
  "Mapping BERT embeddings...",
  "Finalising results...",
];

function padTwo(n) { return String(Math.floor(n)).padStart(2, "0"); }

function formatElapsed(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${padTwo(h)} : ${padTwo(m)} : ${padTwo(s)}`;
}

// ─── Processing Loader ────────────────────────────────────────────────────────
function ProcessingLoader({ isComplete, percentage, submissionId, onTerminate }) {
  const startTimeRef = useRef(getOrCreateProcStart(submissionId));

  const [elapsed, setElapsed] = useState(() => Date.now() - startTimeRef.current);
  const [msgIdx, setMsgIdx] = useState(0);
  const [terminateLoading, setTerminateLoading] = useState(false);

  const elapsedSec = elapsed / 1000;
  const fakePct    = Math.min(90, Math.round(90 * (1 - Math.exp(-elapsedSec / 60))));
  const displayPct = isComplete ? 100 : (percentage > 0 ? percentage : fakePct);

  useEffect(() => {
    if (isComplete) {
      clearProcStart(submissionId);
      return;
    }

    const timerInterval = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 1000);

    const msgInterval = setInterval(() => {
      setMsgIdx(i => (i + 1) % PROCESSING_MESSAGES.length);
    }, 2500);

    return () => {
      clearInterval(timerInterval);
      clearInterval(msgInterval);
    };
  }, [isComplete, submissionId]);

  const handleTerminate = async () => {
    if (!window.confirm("Terminate processing? This will clear all results and let you resubmit.")) return;
    setTerminateLoading(true);
    try {
      await onTerminate();
    } catch { /* ignore */ }
    finally { setTerminateLoading(false); }
  };

  return (
    <div className="proc-loader-card">

      {/* ── Top row: message + timer ── */}
      <div className="proc-top-row">
        <div className="proc-left">
          <p className="proc-title">
            {isComplete ? "Analysis complete" : "Analysing your submission"}
          </p>
          <div className="proc-msg-box">
            {!isComplete && (
              <span className="proc-msg" key={msgIdx}>
                {PROCESSING_MESSAGES[msgIdx]}
              </span>
            )}
          </div>
        </div>

        <div className="proc-right">
          <span className="proc-timer">{formatElapsed(elapsed)}</span>
          <span className="proc-pct">{displayPct}%</span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="proc-track">
        <div className="proc-fill" style={{ width: `${displayPct}%` }} />
        {!isComplete && <div className="proc-sweep" />}
      </div>
      <div className="proc-track-labels">
        <span>Start</span><span>Complete</span>
      </div>

      {/* ── Terminate button ── */}
      {!isComplete && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
          <button
            onClick={handleTerminate}
            disabled={terminateLoading}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 16px", borderRadius: "8px", border: "none",
              background: "#ef4444", color: "#fff",
              fontWeight: 600, fontSize: "13px", cursor: "pointer",
              opacity: terminateLoading ? 0.7 : 1,
            }}
          >
            <X size={14} />
            {terminateLoading ? "Terminating..." : "Terminate"}
          </button>
        </div>
      )}

      {/* ── Done state ── */}
      {isComplete && (
        <div className="proc-done-row">
          <CheckCircle size={15} color="#10b981" />
          <span>Analysis complete — 100%</span>
        </div>
      )}
    </div>
  );
}

// ─── Assignment Detail ────────────────────────────────────────────────────────
function AssignmentDetail({ assignment, onBack, onSubmitSuccess }) {
  const [selectedFile, setSelectedFile]         = useState(null);
  const [isDragging, setIsDragging]             = useState(false);
  const [uploadState, setUploadState]           = useState("idle");
  const [uploadProgress, setUploadProgress]     = useState(0);
  const [errorMessage, setErrorMessage]         = useState("");
  const [submissionData, setSubmissionData]     = useState(
    assignment.status === "submitted" ? assignment.previousSubmission || true : null
  );
  const [processingStatus, setProcessingStatus] = useState(null);
  const fileInputRef = useRef(null);
  const pollingRef   = useRef(null);

  const submissionId = getSubmittedMap()[assignment.id] || null;

  // ── On mount: fetch status immediately so loader shows after reload ────────
  useEffect(() => {
    if (assignment.status === "submitted" && submissionId) {
      classService.getSubmissionStatus(submissionId)
        .then(res => {
          setProcessingStatus(res);
          if (!res.is_complete) {
            setTimeout(() => startPolling(submissionId), 3000);
          }
        })
        .catch(() => {
          setTimeout(() => startPolling(submissionId), 500);
        });
    }
    return () => clearInterval(pollingRef.current);
  }, []);

  const startPolling = (sid) => {
    clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const res = await classService.getSubmissionStatus(sid);
        setProcessingStatus(res);
        if (res.is_complete) clearInterval(pollingRef.current);
      } catch {
        clearInterval(pollingRef.current);
      }
    }, 3000);
  };

  const handleTerminate = async () => {
    await classService.terminateSubmission(submissionId);
    clearInterval(pollingRef.current);
    clearProcStart(submissionId);
    const map = getSubmittedMap();
    delete map[assignment.id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    setProcessingStatus(null);
    setSubmissionData(null);
    setUploadState("idle");
  };

  const isBlocked = assignment.is_past_deadline && !assignment.allow_late_submissions;
  const statusKey  = assignment.status === "submitted" ? "submitted"
    : assignment.is_past_deadline ? "late" : "pending";

  const handleFile = (file) => {
    setErrorMessage("");
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!["application/pdf"].includes(file.type) && ext !== ".pdf") {
      setErrorMessage("Invalid file type. Only PDF files are supported.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File too large. Maximum size is 10MB.");
      return;
    }
    setSelectedFile(file);
    setUploadState("idle");
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setUploadState("uploading");
    setUploadProgress(0);
    setErrorMessage("");

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => (prev < 85 ? prev + 10 : prev));
    }, 200);

    try {
      const res = await classService.submitAssignment(
        assignment.id, assignment.title, selectedFile
      );
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState("success");
      setSubmissionData({ name: selectedFile.name, date: new Date().toLocaleString() });
      setSelectedFile(null);
      saveSubmission(res.assignment, res.id);
      getOrCreateProcStart(res.id);
      onSubmitSuccess?.(res.assignment);
      setTimeout(() => startPolling(res.id), 2000);
    } catch (err) {
      clearInterval(progressInterval);
      if (err?.code === "ERR_CANCELED" || err?.message === "canceled") return;
      setUploadState("idle");
      setUploadProgress(0);
      setErrorMessage(
        err?.data?.detail || err?.data?.message || err?.message ||
        "Submission failed. Please try again."
      );
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1100px" }}>
        <button className="back-btn" onClick={onBack} style={{ marginBottom: "16px" }}>
          <ArrowLeft size={16} /> Back to Assignments
        </button>

        <div className="assignment-layout fade-in">
          {/* ── Left: Details ── */}
          <div className="assignment-details">
            <div className="detail-header">
              <h1 className="assignment-title">{assignment.title}</h1>
              <p className="assignment-meta">
                {assignment.created_by?.first_name} {assignment.created_by?.last_name}
              </p>
              <div className="status-row">
                <span className={`status-badge badge-${statusKey}`}>
                  {statusKey === "submitted" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {statusKey.toUpperCase()}
                </span>
                <span className="due-date">
                  <Clock size={14} /> Due: {formatDate(assignment.deadline)}
                </span>
              </div>
            </div>
            <div className="detail-body">
              <h3>Instructions</h3>
              <p>{assignment.description || "No instructions provided."}</p>
              <div className="meta-chips">
                <div className={`meta-chip ${assignment.allow_late_submissions ? "chip-success" : "chip-danger"}`}>
                  <span className="meta-chip-label">Late Submissions</span>
                  <span className="meta-chip-value">
                    {assignment.allow_late_submissions ? "Allowed" : "Not Allowed"}
                  </span>
                </div>
                {!assignment.is_active && (
                  <div className="meta-chip chip-muted">
                    <span className="meta-chip-value">Inactive</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Submission ── */}
          <div className="submission-panel">
            <h2 className="panel-title">Your Work</h2>
            {isBlocked && assignment.status !== "submitted" ? (
              <div className="submission-blocked">
                <Ban size={32} color="#ef4444" />
                <p className="blocked-title">Submissions Closed</p>
                <p className="blocked-desc">
                  The deadline has passed and late submissions are not allowed.
                </p>
              </div>
            ) : submissionData ? (
              <div className="submitted-state">
                <div className="file-preview success-preview">
                  <FileCheck size={32} color="var(--green)" style={{ marginRight: "12px" }} />
                  <div className="file-info">
                    <p className="file-name">
                      {typeof submissionData === "object" ? submissionData.name : "Submitted"}
                    </p>
                    <p className="file-size">
                      {typeof submissionData === "object"
                        ? `Submitted on ${submissionData.date}`
                        : "Already submitted"}
                    </p>
                  </div>
                </div>

                {processingStatus && submissionId && (
                  <ProcessingLoader
                    isComplete={processingStatus.is_complete}
                    percentage={processingStatus.processing_percentage || 0}
                    submissionId={submissionId}
                    onTerminate={handleTerminate}
                  />
                )}
              </div>
            ) : (
              <div className="upload-state">
                {!selectedFile ? (
                  <div
                    className={`drop-zone ${isDragging ? "dragging" : ""}`}
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={e => {
                      e.preventDefault(); setIsDragging(false);
                      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file" ref={fileInputRef} hidden accept=".pdf"
                      onChange={e => handleFile(e.target.files[0])}
                    />
                    <UploadCloud size={40} className="upload-icon" />
                    <h4>Click or drag file to upload</h4>
                    <p>PDF only · Max 10MB</p>
                  </div>
                ) : (
                  <div className="file-preview">
                    <FileText size={28} className="file-type-icon" />
                    <div className="file-info">
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {uploadState === "idle" && (
                      <button className="remove-file-btn" onClick={() => setSelectedFile(null)}>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                )}
                {errorMessage && (
                  <div className="upload-error"><AlertCircle size={14} /> {errorMessage}</div>
                )}
                {uploadState === "uploading" && (
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <span className="progress-text">Uploading... {Math.round(uploadProgress)}%</span>
                  </div>
                )}
                <button
                  className="btn-primary submit-btn"
                  disabled={!selectedFile || uploadState === "uploading" || uploadState === "success"}
                  onClick={handleSubmit}
                >
                  {uploadState === "uploading" ? "Submitting..."
                    : uploadState === "success" ? "Submitted!"
                    : assignment.is_past_deadline ? "Submit Late"
                    : "Submit Assignment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function StudentAssignments() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const selectedClass = state?.selectedClass ?? null;

  const [assignments, setAssignments]           = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState("");

  // ── Persist active assignment in sessionStorage so reload stays on detail ──
  const [activeAssignment, setActiveAssignment] = useState(() => {
    try {
      const saved = sessionStorage.getItem("activeAssignment");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const handleSelectAssignment = (assignment) => {
    sessionStorage.setItem("activeAssignment", JSON.stringify(assignment));
    setActiveAssignment(assignment);
  };

  const handleBackFromAssignment = () => {
    sessionStorage.removeItem("activeAssignment");
    setActiveAssignment(null);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError("");
        let list = [];
        if (selectedClass?.code) {
          const res = await classService.getClassAssignments(selectedClass.code);
          list = Array.isArray(res) ? res : res?.data || [];
        } else {
          const classesRes = await classService.getEnrolledClasses();
          const classes = Array.isArray(classesRes) ? classesRes : classesRes?.data || [];
          const promises = classes.map((cls) =>
            classService.getClassAssignments(cls.code).catch(() => [])
          );
          const allResponses = await Promise.all(promises);
          const combined = allResponses.flatMap((res) =>
            Array.isArray(res) ? res : res?.data || []
          );
          list = Array.from(new Map(combined.map((a) => [a.id, a])).values());
          list.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        }
        const submittedMap = getSubmittedMap();
        const merged = list.map((a) =>
          submittedMap[a.id] ? { ...a, status: "submitted" } : a
        );
        setAssignments(merged);
      } catch {
        setError("Failed to load assignments. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [selectedClass?.code]);

  const handleSubmissionSuccess = (assignmentId) => {
    const updatedAssignment = { ...activeAssignment, status: "submitted" };
    sessionStorage.setItem("activeAssignment", JSON.stringify(updatedAssignment));
    setAssignments(prev =>
      prev.map(a => a.id === assignmentId ? { ...a, status: "submitted" } : a)
    );
    setActiveAssignment(updatedAssignment);
  };

  if (activeAssignment) {
    return (
      <AssignmentDetail
        assignment={activeAssignment}
        onBack={handleBackFromAssignment}
        onSubmitSuccess={handleSubmissionSuccess}
      />
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "860px" }}>
        <header className="page-header fade-in">
          {selectedClass && (
            <button className="back-btn" onClick={() => navigate("/student/dashboard/my-classes")}>
              <ArrowLeft size={16} /> Back to Classes
            </button>
          )}
          <div style={{ marginTop: "16px" }}>
            <h1 className="page-title">
              {selectedClass ? selectedClass.name : "All Assignments"}
            </h1>
            {selectedClass && (
              <p className="page-subtitle">
                {selectedClass.teacher?.first_name} {selectedClass.teacher?.last_name}
                {" · "}{selectedClass.code}
              </p>
            )}
          </div>
        </header>

        {loading ? (
          <div className="empty-state-card fade-in">
            <div className="spinner" />
            <p style={{ color: "#64748b", marginTop: "14px" }}>Loading assignments...</p>
          </div>
        ) : error ? (
          <div className="empty-state-card fade-in">
            <AlertCircle size={36} color="#ef4444" />
            <p style={{ color: "#ef4444", marginTop: "12px" }}>{error}</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="empty-state-card fade-in">
            <ClipboardList size={48} className="empty-icon" />
            <h3>No Assignments Yet</h3>
            <p>
              {selectedClass
                ? "Your teacher hasn't posted any assignments yet. Check back later!"
                : "You have no assignments across any of your classes yet."}
            </p>
          </div>
        ) : (
          <div className="assignments-list fade-in">
            {assignments.map((a, i) => {
              const status = getStatusInfo(a);
              return (
                <div
                  key={a.id}
                  className="assignment-card"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => handleSelectAssignment(a)}
                >
                  <div className="card-accent" style={{ background: status.color }} />
                  <div className="card-icon"><FileText size={20} color="#64748b" /></div>
                  <div className="card-body">
                    <div className="card-top-row">
                      <h3 className="card-title">{a.title}</h3>
                      <span className="card-badge" style={{ color: status.color, background: status.bg }}>
                        {status.icon} {status.label}
                      </span>
                    </div>
                    {a.description && <p className="card-desc">{a.description}</p>}
                    <div className="card-meta-row">
                      <span className={`card-due${a.is_past_deadline ? " overdue" : ""}`}>
                        <Clock size={12} />
                        {a.is_past_deadline ? "Was due: " : "Due: "}{formatDate(a.deadline)}
                      </span>
                      {!a.allow_late_submissions && a.is_past_deadline && (
                        <span className="card-meta-item card-no-late">
                          <Ban size={11} /> No late submissions
                        </span>
                      )}
                      {!a.is_active && (
                        <span className="card-meta-item card-inactive">Inactive</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}