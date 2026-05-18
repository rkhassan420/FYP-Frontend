// import React, { useEffect, useRef, useState, useCallback } from "react";
// import {
//   UploadCloud, FileText, X, AlertCircle,
//   Loader2, Maximize2, Minimize2,
//   Eye, ExternalLink, CheckCircle,
// } from "lucide-react";
// import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons";
// import { classService } from "../../services/classService";
// import "./Evaluator.css";

// // ── History helpers — accept storagePrefix so teacher/guest don't conflict ────
// export function loadHistory(prefix = "guest") {
//   try { return JSON.parse(localStorage.getItem(`${prefix}_ev_history`)) || []; }
//   catch { return []; }
// }

// export function clearHistory(prefix = "guest") {
//   localStorage.removeItem(`${prefix}_ev_history`);
//   localStorage.removeItem(`${prefix}_ev_pending`);
//   window.dispatchEvent(new CustomEvent("ev_history_updated"));
// }

// function saveToHistory(submissionData, result, isProcessing = false, prefix = "guest") {
//   const history = loadHistory(prefix);
//   const entry = {
//     id:               submissionData.id,
//     title:            submissionData.title,
//     name:             submissionData.name,
//     date:             submissionData.date,
//     startTime:        submissionData.startTime ?? null,
//     isProcessing,
//     ai_percentage:    result?.ai_percentage    ?? null,
//     human_percentage: result?.human_percentage ?? null,
//     grammar_score:    result?.grammar_score    ?? null,
//     ai_paragraphs:    result?.ai_paragraphs    ?? null,
//     total_paragraphs: result?.total_paragraphs ?? null,
//     report_url:       result?.report_url       ?? null,
//     savedAt:          Date.now(),
//   };
//   const updated = [entry, ...history.filter((h) => h.id !== submissionData.id)].slice(0, 50);
//   localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(updated));
//   window.dispatchEvent(new CustomEvent("ev_history_updated"));
// }

// function markHistoryComplete(submissionId, result, prefix = "guest") {
//   const history = loadHistory(prefix);
//   const updated = history.map((h) =>
//     h.id === submissionId
//       ? {
//           ...h,
//           isProcessing:     false,
//           ai_percentage:    result?.ai_percentage    ?? h.ai_percentage,
//           human_percentage: result?.human_percentage ?? h.human_percentage,
//           grammar_score:    result?.grammar_score    ?? h.grammar_score,
//           ai_paragraphs:    result?.ai_paragraphs    ?? h.ai_paragraphs,
//           total_paragraphs: result?.total_paragraphs ?? h.total_paragraphs,
//           report_url:       result?.report_url       ?? h.report_url,
//         }
//       : h
//   );
//   localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(updated));
//   window.dispatchEvent(new CustomEvent("ev_history_updated"));
// }

// function removeFromLocalHistory(id, prefix = "guest") {
//   try {
//     const history = loadHistory(prefix);
//     localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(history.filter((h) => h.id !== id)));
//     window.dispatchEvent(new CustomEvent("ev_history_updated"));
//   } catch {}
// }

// // ── Processing Loader ─────────────────────────────────────────────────────────
// const PROCESSING_MESSAGES = [
//   "Extracting text from PDF...",
//   "Running AI detection model...",
//   "Checking grammar patterns...",
//   "Analysing sentence structure...",
//   "Calculating perplexity scores...",
//   "Mapping BERT embeddings...",
//   "Scoring paragraph confidence...",
//   "Finalising results...",
// ];

// function padTwo(n) { return String(Math.floor(n)).padStart(2, "0"); }

// function formatElapsed(ms) {
//   const s = Math.floor(ms / 1000);
//   return `${padTwo(s / 3600)} : ${padTwo((s % 3600) / 60)} : ${padTwo(s % 60)}`;
// }

// function ProcessingLoader({ isComplete, percentage, startTime }) {
//   const [now, setNow]       = useState(Date.now);
//   const [msgIdx, setMsgIdx] = useState(0);

//   useEffect(() => {
//     if (isComplete) return;
//     const t = setInterval(() => setNow(Date.now()), 1000);
//     const m = setInterval(() => setMsgIdx((i) => (i + 1) % PROCESSING_MESSAGES.length), 2500);
//     return () => { clearInterval(t); clearInterval(m); };
//   }, [isComplete]);

//   const elapsed    = now - startTime;
//   const elapsedSec = elapsed / 1000;
//   const fakePct    = Math.min(90, Math.round(90 * (1 - Math.exp(-elapsedSec / 60))));
//   const displayPct = isComplete ? 100 : (percentage > 0 ? percentage : fakePct);

//   return (
//     <div className="proc-loader-card">
//       <div className="proc-top-row">
//         <div className="proc-left">
//           <p className="proc-title">{isComplete ? "Analysis complete" : "Analysing your submission"}</p>
//           <div className="proc-msg-box">
//             {!isComplete && <span className="proc-msg" key={msgIdx}>{PROCESSING_MESSAGES[msgIdx]}</span>}
//           </div>
//         </div>
//         <div className="proc-right">
//           <span className="proc-timer">{formatElapsed(elapsed)}</span>
//           <span className="proc-pct">{displayPct}%</span>
//         </div>
//       </div>
//       <div className="proc-track">
//         <div className="proc-fill" style={{ width: `${displayPct}%` }} />
//         {!isComplete && <div className="proc-sweep" />}
//       </div>
//       <div className="proc-track-labels"><span>Start</span><span>Complete</span></div>
//       {isComplete && (
//         <div className="proc-done-row">
//           <CheckCircle size={15} color="#10b981" />
//           <span>Analysis complete — 100%</span>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Result Card ───────────────────────────────────────────────────────────────
// const ResultCard = ({ result, submissionData, onReset }) => {
//   const aiNum      = Number(result?.ai_percentage)    || 0;
//   const humanNum   = Number(result?.human_percentage) || 0;
//   const grammarNum = Number(result?.grammar_score)    || 0;
//   const isFlagged  = aiNum >= 50;
//   const aiColor      = aiNum > 40     ? "#ef4444" : "#10b981";
//   const humanColor   = humanNum >= 60  ? "#10b981" : "#f59e0b";
//   const grammarColor = grammarNum > 80 ? "#3b82f6" : "#f59e0b";
//   const C = 2 * Math.PI * 32;

//   const Ring = ({ pct, color }) => (
//     <svg width="80" height="80" viewBox="0 0 80 80">
//       <circle cx="40" cy="40" r="32" fill="none" stroke="var(--ev-ring-bg)" strokeWidth="7" />
//       <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="7"
//         strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
//         strokeLinecap="round" transform="rotate(-90 40 40)"
//         style={{ transition: "stroke-dashoffset 1s ease" }} />
//     </svg>
//   );

//   return (
//     <div className="ev-result-root">
//       <div className={`ev-banner ${isFlagged ? "ev-banner--warn" : "ev-banner--ok"}`}>
//         <span className="ev-banner-icon">{isFlagged ? "⚠️" : "✅"}</span>
//         <div>
//           <p className="ev-banner-title">{isFlagged ? "High AI Content Detected" : "Looks Authentic"}</p>
//           <p className="ev-banner-sub">
//             {isFlagged
//               ? "This submission contains significant AI-generated content."
//               : "This submission appears to be primarily human-written."}
//           </p>
//         </div>
//       </div>

//       <div className="ev-file-row">
//         <div className="ev-file-icon"><FileText size={18} /></div>
//         <div className="ev-file-info">
//           <p className="ev-file-title">{submissionData.title}</p>
//           <p className="ev-file-name">{submissionData.name}</p>
//         </div>
//         {result.total_paragraphs != null && (
//           <div className="ev-para-badge">
//             <span className="ev-para-ai">{result.ai_paragraphs} AI</span>
//             <span className="ev-para-sep">/</span>
//             <span>{result.total_paragraphs} para</span>
//           </div>
//         )}
//       </div>

//       <div className="ev-score-grid">
//         <div className="ev-score-card" style={{ "--accent": aiColor }}>
//           <div className="ev-score-ring">
//             <Ring pct={aiNum} color={aiColor} />
//             <span className="ev-score-pct" style={{ color: aiColor }}>{aiNum}%</span>
//           </div>
//           <p className="ev-score-label">AI Generated</p>
//           {aiNum > 40 && <span className="ev-score-flag">High Risk</span>}
//         </div>

//         <div className="ev-score-card" style={{ "--accent": humanColor }}>
//           <div className="ev-score-ring">
//             <Ring pct={humanNum} color={humanColor} />
//             <span className="ev-score-pct" style={{ color: humanColor }}>{humanNum}%</span>
//           </div>
//           <p className="ev-score-label">Human Written</p>
//           {humanNum >= 60 && <span className="ev-score-flag ev-score-flag--ok">Authentic</span>}
//         </div>

//         {result.grammar_score != null && (
//           <div className="ev-score-card" style={{ "--accent": grammarColor }}>
//             <div className="ev-score-ring">
//               <Ring pct={grammarNum} color={grammarColor} />
//               <span className="ev-score-pct" style={{ color: grammarColor }}>{grammarNum}%</span>
//             </div>
//             <p className="ev-score-label">Grammar Score</p>
//           </div>
//         )}
//       </div>

//       <div className="ev-result-actions">
//         {result.report_url ? (
//           <a href={result.report_url} target="_blank" rel="noopener noreferrer" className="ev-btn-report">
//             <Eye size={15} /> View Full Report <ExternalLink size={12} />
//           </a>
//         ) : (
//           <span className="ev-no-report">No report file available</span>
//         )}
//         <button className="ev-btn-reset" onClick={onReset}>
//           <UploadCloud size={15} /> Evaluate Another File
//         </button>
//       </div>
//     </div>
//   );
// };

// // ── Main Evaluator ────────────────────────────────────────────────────────────
// // storagePrefix: "guest" for guest portal, "teacher" for teacher dashboard
// export default function Evaluator({
//   fullscreen,
//   setFullscreen,
//   activeSessionId,
//   onSessionChange,
//   storagePrefix = "guest",
// }) {
//   const PENDING_KEY = `${storagePrefix}_ev_pending`;

//   const [selectedFile, setSelectedFile]         = useState(null);
//   const [assignmentTitle, setAssignmentTitle]   = useState("");
//   const [isDragging, setIsDragging]             = useState(false);
//   const [uploadState, setUploadState]           = useState("idle");
//   const [uploadProgress, setUploadProgress]     = useState(0);
//   const [errorMessage, setErrorMessage]         = useState("");
//   const [fieldErrors, setFieldErrors]           = useState({});
//   const [submissionData, setSubmissionData]     = useState(null);
//   const [processingStatus, setProcessingStatus] = useState(null);
//   const [result, setResult]                     = useState(null);
//   const [isProcessing, setIsProcessing]         = useState(false);
//   const [terminateLoading, setTerminateLoading] = useState(false);

//   const processingStartRef = useRef(null);
//   const activeJobIdRef     = useRef(null);
//   const fileInputRef       = useRef(null);
//   const pollingRef         = useRef(null);

//   const [, forceRender] = useState(0);
//   const setProcessingStart = useCallback((t) => {
//     processingStartRef.current = t;
//     forceRender((n) => n + 1);
//   }, []);

//   // ── ESC to exit fullscreen ────────────────────────────────────────────────
//   useEffect(() => {
//     const handleEsc = (e) => { if (e.key === "Escape" && fullscreen) setFullscreen(false); };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [fullscreen]);

//   // ── Cleanup polling on unmount ────────────────────────────────────────────
//   useEffect(() => () => clearInterval(pollingRef.current), []);

//   // ── Listen for cancel from sidebar ───────────────────────────────────────
//   useEffect(() => {
//     const handler = (e) => {
//       const cancelledId = e.detail?.id;
//       if (cancelledId && cancelledId === activeJobIdRef.current) {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//         activeJobIdRef.current = null;
//         localStorage.removeItem(PENDING_KEY);
//         processingStartRef.current = null;
//         setIsProcessing(false);
//         setProcessingStatus(null);
//         setSubmissionData(null);
//         setResult(null);
//         setUploadState("idle");
//         if (onSessionChange) onSessionChange(null);
//       }
//     };
//     window.addEventListener("ev_cancel_submission", handler);
//     return () => window.removeEventListener("ev_cancel_submission", handler);
//   }, [onSessionChange, PENDING_KEY]);

//   // ── Restore in-progress submission from localStorage on reload ────────────
//   useEffect(() => {
//     const saved = localStorage.getItem(PENDING_KEY);
//     if (!saved) return;
//     try {
//       const { submissionData: sd, startTime } = JSON.parse(saved);
//       if (!sd?.id) return;
//       activeJobIdRef.current = sd.id;
//       setSubmissionData(sd);
//       setProcessingStart(startTime);
//       setIsProcessing(true);
//       startPolling(sd.id);
//     } catch {
//       localStorage.removeItem(PENDING_KEY);
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // ── Handle activeSessionId changes ───────────────────────────────────────
//   useEffect(() => {
//     if (activeSessionId === null || activeSessionId === undefined) {
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//       activeJobIdRef.current = null;
//       localStorage.removeItem(PENDING_KEY);
//       processingStartRef.current = null;
//       setIsProcessing(false);
//       setProcessingStatus(null);
//       setSubmissionData(null);
//       setResult(null);
//       setSelectedFile(null);
//       setAssignmentTitle("");
//       setUploadState("idle");
//       setUploadProgress(0);
//       setErrorMessage("");
//       setFieldErrors({});
//       return;
//     }

//     const history = loadHistory(storagePrefix);
//     const entry = history.find((h) => h.id === activeSessionId);
//     if (!entry) return;

//     if (entry.isProcessing && activeJobIdRef.current === activeSessionId) {
//       if (!pollingRef.current) startPolling(entry.id);
//       return;
//     }

//     clearInterval(pollingRef.current);
//     pollingRef.current = null;

//     if (entry.isProcessing) {
//       const pending = (() => {
//         try { return JSON.parse(localStorage.getItem(PENDING_KEY)); } catch { return null; }
//       })();
//       const startTime = entry.startTime ?? pending?.startTime ?? Date.now();

//       activeJobIdRef.current = entry.id;
//       setSubmissionData({ id: entry.id, title: entry.title, name: entry.name, date: entry.date });
//       setProcessingStart(startTime);
//       setIsProcessing(true);
//       setResult(null);
//       setProcessingStatus(null);
//       setSelectedFile(null);
//       setAssignmentTitle("");
//       setUploadState("idle");
//       setErrorMessage("");
//       setFieldErrors({});
//       startPolling(entry.id);
//       return;
//     }

//     activeJobIdRef.current = null;
//     localStorage.removeItem(PENDING_KEY);
//     processingStartRef.current = null;
//     setIsProcessing(false);
//     setProcessingStatus(null);
//     setSelectedFile(null);
//     setAssignmentTitle("");
//     setUploadState("idle");
//     setErrorMessage("");
//     setFieldErrors({});
//     setSubmissionData({ id: entry.id, title: entry.title, name: entry.name, date: entry.date });
//     setResult({
//       ai_percentage:    entry.ai_percentage,
//       human_percentage: entry.human_percentage,
//       grammar_score:    entry.grammar_score,
//       ai_paragraphs:    entry.ai_paragraphs,
//       total_paragraphs: entry.total_paragraphs,
//       report_url:       entry.report_url,
//     });
//   }, [activeSessionId]); // eslint-disable-line react-hooks/exhaustive-deps

//   // ── Fetch result ──────────────────────────────────────────────────────────
//   const fetchResult = async (submissionId) => {
//     try {
//       const data = await classService.getResults({ submission: submissionId });
//       const list = data?.results ?? data ?? [];
//       return Array.isArray(list)
//         ? list.find((r) => r.submission === submissionId) ?? list[0] ?? null
//         : null;
//     } catch { return null; }
//   };

//   // ── Polling ───────────────────────────────────────────────────────────────
//   const startPolling = useCallback((submissionId) => {
//     clearInterval(pollingRef.current);
//     pollingRef.current = setInterval(async () => {
//       try {
//         const res = await classService.getSubmissionStatus(submissionId);
//         setProcessingStatus(res);
//         if (res.is_complete) {
//           clearInterval(pollingRef.current);
//           pollingRef.current = null;
//           activeJobIdRef.current = null;
//           setIsProcessing(false);
//           localStorage.removeItem(PENDING_KEY);
//           const found = await fetchResult(submissionId);
//           setResult(found);
//           markHistoryComplete(submissionId, found, storagePrefix);
//         }
//       } catch {
//         clearInterval(pollingRef.current);
//         pollingRef.current = null;
//         setIsProcessing(false);
//         localStorage.removeItem(PENDING_KEY);
//       }
//     }, 3000);
//   }, [PENDING_KEY, storagePrefix]);

//   // ── Terminate ─────────────────────────────────────────────────────────────
//   const handleTerminate = async () => {
//     if (!window.confirm("Terminate processing? This will reset and let you resubmit.")) return;
//     setTerminateLoading(true);
//     try {
//       await classService.terminateSubmission(submissionData.id);
//       clearInterval(pollingRef.current);
//       pollingRef.current = null;
//       activeJobIdRef.current = null;
//       localStorage.removeItem(PENDING_KEY);
//       removeFromLocalHistory(submissionData.id, storagePrefix);
//       processingStartRef.current = null;
//       setIsProcessing(false);
//       setProcessingStatus(null);
//       setSubmissionData(null);
//       setResult(null);
//       setUploadState("idle");
//       if (onSessionChange) onSessionChange(null);
//     } catch (err) {
//       console.warn("Terminate failed:", err);
//     } finally {
//       setTerminateLoading(false);
//     }
//   };

//   // ── File validation ───────────────────────────────────────────────────────
//   const handleFile = (file) => {
//     setErrorMessage("");
//     setFieldErrors((p) => ({ ...p, file: "" }));
//     if (!file) return;
//     const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
//     if (!isPdf) { setErrorMessage("Invalid file type. Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setErrorMessage("File too large. Maximum size is 10MB."); return; }
//     setSelectedFile(file);
//     setUploadState("idle");
//   };

//   const validate = () => {
//     const errors = {};
//     if (!assignmentTitle.trim()) errors.title = "File name is required.";
//     if (!selectedFile)           errors.file  = "Please select a PDF file.";
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // ── Submit ────────────────────────────────────────────────────────────────
//   const handleSubmit = async () => {
//     if (!validate()) return;
//     setUploadState("uploading");
//     setUploadProgress(0);
//     setErrorMessage("");

//     const progressInterval = setInterval(() => {
//       setUploadProgress((p) => (p < 85 ? p + 10 : p));
//     }, 200);

//     try {
//       const res       = await classService.guestSubmitAssignment(null, assignmentTitle.trim(), selectedFile);
//       const startTime = Date.now();
//       clearInterval(progressInterval);
//       setUploadProgress(100);
//       setUploadState("success");

//       const sd = {
//         name:      selectedFile.name,
//         title:     assignmentTitle.trim(),
//         date:      new Date().toLocaleString(),
//         id:        res.id,
//         startTime,
//       };

//       activeJobIdRef.current = sd.id;
//       setSubmissionData(sd);
//       setProcessingStart(startTime);
//       setIsProcessing(true);
//       setSelectedFile(null);
//       setAssignmentTitle("");

//       saveToHistory(sd, null, true, storagePrefix);
//       localStorage.setItem(PENDING_KEY, JSON.stringify({ submissionData: sd, startTime }));
//       if (onSessionChange) onSessionChange(sd.id);
//       setTimeout(() => startPolling(res.id), 2000);

//     } catch (err) {
//       clearInterval(progressInterval);
//       if (err?.code === "ERR_CANCELED" || err?.message === "canceled") return;
//       setUploadState("error");
//       setUploadProgress(0);
//       setErrorMessage(
//         err?.data?.detail || err?.data?.message || err?.message || "Submission failed. Please try again."
//       );
//     }
//   };

//   // ── Reset ─────────────────────────────────────────────────────────────────
//   const handleReset = () => {
//     if (onSessionChange) onSessionChange(null);
//   };

//   const processingPct = processingStatus?.processing_percentage ?? 0;

//   return (
//     <div className={`panel-card evaluator-card ${fullscreen ? "fullscreen" : ""}`}>

//       {/* ── Top Bar ── */}
//       <div className="evaluator-topbar">
//         <div className="evaluator-badge">
//           <div className="evaluator-icon"><Icon d={ICONS.zap} size={16} /></div>
//           <div>
//             <h3 className="evaluator-title">AI Evaluator</h3>
//             <p className="evaluator-subtitle">Upload your file for analysis</p>
//           </div>
//         </div>
//         <div className="maximize-btn"
//           title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//           onClick={() => setFullscreen(!fullscreen)}>
//           {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="evaluator-body">

//         {result && submissionData && !isProcessing ? (
//           <ResultCard result={result} submissionData={submissionData} onReset={handleReset} />

//         ) : submissionData ? (
//           <div className="submitted-state">
//             <div className="file-preview success-preview">
//               <FileText size={28} className="file-type-icon" style={{ color: "#10b981", marginRight: "12px" }} />
//               <div className="file-info">
//                 <p className="file-name">{submissionData.name}</p>
//                 <p className="file-size">Submitted on {submissionData.date}</p>
//               </div>
//             </div>

//             {processingStartRef.current && (
//               <ProcessingLoader
//                 isComplete={processingStatus?.is_complete ?? false}
//                 percentage={processingPct}
//                 startTime={processingStartRef.current}
//               />
//             )}

//             {!(processingStatus?.is_complete) && (
//               <button
//                 onClick={handleTerminate}
//                 disabled={terminateLoading}
//                 style={{
//                   display: "flex", alignItems: "center", gap: "6px",
//                   marginTop: "12px", padding: "7px 16px",
//                   borderRadius: "8px", border: "none",
//                   background: "#ef4444", color: "#fff",
//                   fontWeight: 600, fontSize: "13px", cursor: "pointer",
//                   opacity: terminateLoading ? 0.7 : 1,
//                 }}
//               >
//                 <X size={14} />
//                 {terminateLoading ? "Terminating..." : "Terminate & Re-evaluate"}
//               </button>
//             )}
//           </div>

//         ) : (
//           <div className="upload-state">
//             <div className="evaluator-input-group">
//               <label className="evaluator-input-label">
//                 Assignment / File Name <span className="ev-required">*</span>
//               </label>
//               <input
//                 type="text"
//                 className={`evaluator-title-input ${fieldErrors.title ? "ev-input-error" : ""}`}
//                 placeholder="e.g. Software Engineering Report"
//                 value={assignmentTitle}
//                 onChange={(e) => {
//                   setAssignmentTitle(e.target.value);
//                   if (fieldErrors.title) setFieldErrors((p) => ({ ...p, title: "" }));
//                 }}
//               />
//               {fieldErrors.title && (
//                 <span className="ev-field-error"><AlertCircle size={12} /> {fieldErrors.title}</span>
//               )}
//             </div>

//             {!selectedFile ? (
//               <div
//                 className={`drop-zone ${isDragging ? "dragging" : ""} ${fieldErrors.file ? "ev-dropzone-error" : ""}`}
//                 onClick={() => fileInputRef.current.click()}
//                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//                 onDragLeave={() => setIsDragging(false)}
//                 onDrop={(e) => {
//                   e.preventDefault(); setIsDragging(false);
//                   if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
//                 }}
//               >
//                 <input type="file" ref={fileInputRef} hidden accept=".pdf"
//                   onChange={(e) => handleFile(e.target.files[0])} />
//                 <UploadCloud size={40} className="upload-icon" />
//                 <h4>Click or drag file to upload</h4>
//                 <p>PDF only · Max 10MB</p>
//               </div>
//             ) : (
//               <div className="file-preview">
//                 <FileText size={28} className="file-type-icon" />
//                 <div className="file-info">
//                   <p className="file-name">{selectedFile.name}</p>
//                   <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
//                 </div>
//                 {uploadState === "idle" && (
//                   <button className="remove-file-btn" onClick={() => {
//                     setSelectedFile(null);
//                     setFieldErrors((p) => ({ ...p, file: "" }));
//                   }}>
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>
//             )}

//             {fieldErrors.file && (
//               <span className="ev-field-error"><AlertCircle size={12} /> {fieldErrors.file}</span>
//             )}
//             {errorMessage && (
//               <div className="upload-error"><AlertCircle size={14} /> {errorMessage}</div>
//             )}
//             {uploadState === "uploading" && (
//               <div className="progress-container">
//                 <div className="progress-bar-wrapper">
//                   <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
//                 </div>
//                 <span className="progress-text">Uploading... {Math.round(uploadProgress)}%</span>
//               </div>
//             )}

//             <button className="btn-primary submit-btn"
//               disabled={uploadState === "uploading"} onClick={handleSubmit}>
//               {uploadState === "uploading"
//                 ? <><Loader2 size={15} className="processing-spinner" /> Submitting...</>
//                 : <><UploadCloud size={15} /> Start Analysis</>}
//             </button>

//             {!selectedFile && !assignmentTitle && (
//               <p className="evaluator-hint">Enter a name and upload a PDF to get started</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  UploadCloud, FileText, X, AlertCircle,
  Loader2, Maximize2, Minimize2,
  Eye, ExternalLink, CheckCircle, Type,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons";
import { classService } from "../../services/classService";
import "./Evaluator.css";

// ── History helpers — accept storagePrefix so teacher/guest don't conflict ────
export function loadHistory(prefix = "guest") {
  try { return JSON.parse(localStorage.getItem(`${prefix}_ev_history`)) || []; }
  catch { return []; }
}

export function clearHistory(prefix = "guest") {
  localStorage.removeItem(`${prefix}_ev_history`);
  localStorage.removeItem(`${prefix}_ev_pending`);
  window.dispatchEvent(new CustomEvent("ev_history_updated"));
}

function saveToHistory(submissionData, result, isProcessing = false, prefix = "guest") {
  const history = loadHistory(prefix);
  const entry = {
    id:               submissionData.id,
    title:            submissionData.title,
    name:             submissionData.name,
    date:             submissionData.date,
    startTime:        submissionData.startTime ?? null,
    isProcessing,
    ai_percentage:    result?.ai_percentage    ?? null,
    human_percentage: result?.human_percentage ?? null,
    grammar_score:    result?.grammar_score    ?? null,
    ai_paragraphs:    result?.ai_paragraphs    ?? null,
    total_paragraphs: result?.total_paragraphs ?? null,
    report_url:       result?.report_url       ?? null,
    savedAt:          Date.now(),
  };
  const updated = [entry, ...history.filter((h) => h.id !== submissionData.id)].slice(0, 50);
  localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("ev_history_updated"));
}

function markHistoryComplete(submissionId, result, prefix = "guest") {
  const history = loadHistory(prefix);
  const updated = history.map((h) =>
    h.id === submissionId
      ? {
          ...h,
          isProcessing:     false,
          ai_percentage:    result?.ai_percentage    ?? h.ai_percentage,
          human_percentage: result?.human_percentage ?? h.human_percentage,
          grammar_score:    result?.grammar_score    ?? h.grammar_score,
          ai_paragraphs:    result?.ai_paragraphs    ?? h.ai_paragraphs,
          total_paragraphs: result?.total_paragraphs ?? h.total_paragraphs,
          report_url:       result?.report_url       ?? h.report_url,
        }
      : h
  );
  localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("ev_history_updated"));
}

function removeFromLocalHistory(id, prefix = "guest") {
  try {
    const history = loadHistory(prefix);
    localStorage.setItem(`${prefix}_ev_history`, JSON.stringify(history.filter((h) => h.id !== id)));
    window.dispatchEvent(new CustomEvent("ev_history_updated"));
  } catch {}
}

// ── Text → PDF converter ──────────────────────────────────────────────────────
function textToPdfFile(text, filename = "submission.pdf") {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth  = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin     = 50;
  const maxWidth   = pageWidth - margin * 2;
  const lineHeight = 16;
  const fontSize   = 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);

  const paragraphs = text.split(/\n+/);
  let y = margin;

  for (const para of paragraphs) {
    if (!para.trim()) { y += lineHeight; continue; }
    const lines = doc.splitTextToSize(para.trim(), maxWidth);
    for (const line of lines) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += lineHeight * 0.5; // paragraph gap
  }

  const blob = doc.output("blob");
  return new File([blob], filename, { type: "application/pdf" });
}

// ── Processing Loader ─────────────────────────────────────────────────────────
const PROCESSING_MESSAGES = [
  "Extracting text from PDF...",
  "Running AI detection model...",
  "Checking grammar patterns...",
  "Analysing sentence structure...",
  "Calculating perplexity scores...",
  "Mapping BERT embeddings...",
  "Scoring paragraph confidence...",
  "Finalising results...",
];

function padTwo(n) { return String(Math.floor(n)).padStart(2, "0"); }

function formatElapsed(ms) {
  const s = Math.floor(ms / 1000);
  return `${padTwo(s / 3600)} : ${padTwo((s % 3600) / 60)} : ${padTwo(s % 60)}`;
}

function ProcessingLoader({ isComplete, percentage, startTime }) {
  const [now, setNow]       = useState(Date.now);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    if (isComplete) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    const m = setInterval(() => setMsgIdx((i) => (i + 1) % PROCESSING_MESSAGES.length), 2500);
    return () => { clearInterval(t); clearInterval(m); };
  }, [isComplete]);

  const elapsed    = now - startTime;
  const elapsedSec = elapsed / 1000;
  const fakePct    = Math.min(90, Math.round(90 * (1 - Math.exp(-elapsedSec / 60))));
  const displayPct = isComplete ? 100 : (percentage > 0 ? percentage : fakePct);

  return (
    <div className="proc-loader-card">
      <div className="proc-top-row">
        <div className="proc-left">
          <p className="proc-title">{isComplete ? "Analysis complete" : "Analysing your submission"}</p>
          <div className="proc-msg-box">
            {!isComplete && <span className="proc-msg" key={msgIdx}>{PROCESSING_MESSAGES[msgIdx]}</span>}
          </div>
        </div>
        <div className="proc-right">
          <span className="proc-timer">{formatElapsed(elapsed)}</span>
          <span className="proc-pct">{displayPct}%</span>
        </div>
      </div>
      <div className="proc-track">
        <div className="proc-fill" style={{ width: `${displayPct}%` }} />
        {!isComplete && <div className="proc-sweep" />}
      </div>
      <div className="proc-track-labels"><span>Start</span><span>Complete</span></div>
      {isComplete && (
        <div className="proc-done-row">
          <CheckCircle size={15} color="#10b981" />
          <span>Analysis complete — 100%</span>
        </div>
      )}
    </div>
  );
}

// ── Result Card ───────────────────────────────────────────────────────────────
const ResultCard = ({ result, submissionData, onReset }) => {
  const aiNum      = Number(result?.ai_percentage)    || 0;
  const humanNum   = Number(result?.human_percentage) || 0;
  const grammarNum = Number(result?.grammar_score)    || 0;
  const isFlagged  = aiNum >= 50;
  const aiColor      = aiNum > 40     ? "#ef4444" : "#10b981";
  const humanColor   = humanNum >= 60  ? "#10b981" : "#f59e0b";
  const grammarColor = grammarNum > 80 ? "#3b82f6" : "#f59e0b";
  const C = 2 * Math.PI * 32;

  const Ring = ({ pct, color }) => (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--ev-ring-bg)" strokeWidth="7" />
      <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
        strokeLinecap="round" transform="rotate(-90 40 40)"
        style={{ transition: "stroke-dashoffset 1s ease" }} />
    </svg>
  );

  return (
    <div className="ev-result-root">
      <div className={`ev-banner ${isFlagged ? "ev-banner--warn" : "ev-banner--ok"}`}>
        <span className="ev-banner-icon">{isFlagged ? "⚠️" : "✅"}</span>
        <div>
          <p className="ev-banner-title">{isFlagged ? "High AI Content Detected" : "Looks Authentic"}</p>
          <p className="ev-banner-sub">
            {isFlagged
              ? "This submission contains significant AI-generated content."
              : "This submission appears to be primarily human-written."}
          </p>
        </div>
      </div>

      <div className="ev-file-row">
        <div className="ev-file-icon"><FileText size={18} /></div>
        <div className="ev-file-info">
          <p className="ev-file-title">{submissionData.title}</p>
          <p className="ev-file-name">{submissionData.name}</p>
        </div>
        {result.total_paragraphs != null && (
          <div className="ev-para-badge">
            <span className="ev-para-ai">{result.ai_paragraphs} AI</span>
            <span className="ev-para-sep">/</span>
            <span>{result.total_paragraphs} para</span>
          </div>
        )}
      </div>

      <div className="ev-score-grid">
        <div className="ev-score-card" style={{ "--accent": aiColor }}>
          <div className="ev-score-ring">
            <Ring pct={aiNum} color={aiColor} />
            <span className="ev-score-pct" style={{ color: aiColor }}>{aiNum}%</span>
          </div>
          <p className="ev-score-label">AI Generated</p>
          {aiNum > 40 && <span className="ev-score-flag">High Risk</span>}
        </div>

        <div className="ev-score-card" style={{ "--accent": humanColor }}>
          <div className="ev-score-ring">
            <Ring pct={humanNum} color={humanColor} />
            <span className="ev-score-pct" style={{ color: humanColor }}>{humanNum}%</span>
          </div>
          <p className="ev-score-label">Human Written</p>
          {humanNum >= 60 && <span className="ev-score-flag ev-score-flag--ok">Authentic</span>}
        </div>

        {result.grammar_score != null && (
          <div className="ev-score-card" style={{ "--accent": grammarColor }}>
            <div className="ev-score-ring">
              <Ring pct={grammarNum} color={grammarColor} />
              <span className="ev-score-pct" style={{ color: grammarColor }}>{grammarNum}%</span>
            </div>
            <p className="ev-score-label">Grammar Score</p>
          </div>
        )}
      </div>

      <div className="ev-result-actions">
        {result.report_url ? (
          <a href={result.report_url} target="_blank" rel="noopener noreferrer" className="ev-btn-report">
            <Eye size={15} /> View Full Report <ExternalLink size={12} />
          </a>
        ) : (
          <span className="ev-no-report">No report file available</span>
        )}
        <button className="ev-btn-reset" onClick={onReset}>
          <UploadCloud size={15} /> Evaluate Another
        </button>
      </div>
    </div>
  );
};

// ── Word / char counter helper ────────────────────────────────────────────────
function TextStats({ text }) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tooShort = words < 50;
  return (
    <div className="ev-text-stats">
      <span className={tooShort && chars > 0 ? "ev-text-stats--warn" : ""}>
        {words} word{words !== 1 ? "s" : ""}
      </span>
      <span>{chars} chars</span>
      {tooShort && chars > 0 && (
        <span className="ev-text-stats--warn">⚠ Minimum ~50 words recommended</span>
      )}
    </div>
  );
}

// ── Main Evaluator ────────────────────────────────────────────────────────────
export default function Evaluator({
  fullscreen,
  setFullscreen,
  activeSessionId,
  onSessionChange,
  storagePrefix = "guest",
}) {
  const PENDING_KEY = `${storagePrefix}_ev_pending`;

  // input mode: "file" | "text"
  const [inputMode, setInputMode]               = useState("file");
  const [textInput, setTextInput]               = useState("");

  const [selectedFile, setSelectedFile]         = useState(null);
  const [assignmentTitle, setAssignmentTitle]   = useState("");
  const [isDragging, setIsDragging]             = useState(false);
  const [uploadState, setUploadState]           = useState("idle");
  const [uploadProgress, setUploadProgress]     = useState(0);
  const [errorMessage, setErrorMessage]         = useState("");
  const [fieldErrors, setFieldErrors]           = useState({});
  const [submissionData, setSubmissionData]     = useState(null);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [result, setResult]                     = useState(null);
  const [isProcessing, setIsProcessing]         = useState(false);
  const [terminateLoading, setTerminateLoading] = useState(false);

  const processingStartRef = useRef(null);
  const activeJobIdRef     = useRef(null);
  const fileInputRef       = useRef(null);
  const pollingRef         = useRef(null);

  const [, forceRender] = useState(0);
  const setProcessingStart = useCallback((t) => {
    processingStartRef.current = t;
    forceRender((n) => n + 1);
  }, []);

  // ── ESC to exit fullscreen ────────────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && fullscreen) setFullscreen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [fullscreen]);

  // ── Cleanup polling on unmount ────────────────────────────────────────────
  useEffect(() => () => clearInterval(pollingRef.current), []);

  // ── Listen for cancel from sidebar ───────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      const cancelledId = e.detail?.id;
      if (cancelledId && cancelledId === activeJobIdRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
        activeJobIdRef.current = null;
        localStorage.removeItem(PENDING_KEY);
        processingStartRef.current = null;
        setIsProcessing(false);
        setProcessingStatus(null);
        setSubmissionData(null);
        setResult(null);
        setUploadState("idle");
        if (onSessionChange) onSessionChange(null);
      }
    };
    window.addEventListener("ev_cancel_submission", handler);
    return () => window.removeEventListener("ev_cancel_submission", handler);
  }, [onSessionChange, PENDING_KEY]);

  // ── Restore in-progress submission from localStorage on reload ────────────
  useEffect(() => {
    const saved = localStorage.getItem(PENDING_KEY);
    if (!saved) return;
    try {
      const { submissionData: sd, startTime } = JSON.parse(saved);
      if (!sd?.id) return;
      activeJobIdRef.current = sd.id;
      setSubmissionData(sd);
      setProcessingStart(startTime);
      setIsProcessing(true);
      startPolling(sd.id);
    } catch {
      localStorage.removeItem(PENDING_KEY);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handle activeSessionId changes ───────────────────────────────────────
  useEffect(() => {
    if (activeSessionId === null || activeSessionId === undefined) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
      activeJobIdRef.current = null;
      localStorage.removeItem(PENDING_KEY);
      processingStartRef.current = null;
      setIsProcessing(false);
      setProcessingStatus(null);
      setSubmissionData(null);
      setResult(null);
      setSelectedFile(null);
      setAssignmentTitle("");
      setTextInput("");
      setUploadState("idle");
      setUploadProgress(0);
      setErrorMessage("");
      setFieldErrors({});
      return;
    }

    const history = loadHistory(storagePrefix);
    const entry = history.find((h) => h.id === activeSessionId);
    if (!entry) return;

    if (entry.isProcessing && activeJobIdRef.current === activeSessionId) {
      if (!pollingRef.current) startPolling(entry.id);
      return;
    }

    clearInterval(pollingRef.current);
    pollingRef.current = null;

    if (entry.isProcessing) {
      const pending = (() => {
        try { return JSON.parse(localStorage.getItem(PENDING_KEY)); } catch { return null; }
      })();
      const startTime = entry.startTime ?? pending?.startTime ?? Date.now();

      activeJobIdRef.current = entry.id;
      setSubmissionData({ id: entry.id, title: entry.title, name: entry.name, date: entry.date });
      setProcessingStart(startTime);
      setIsProcessing(true);
      setResult(null);
      setProcessingStatus(null);
      setSelectedFile(null);
      setTextInput("");
      setAssignmentTitle("");
      setUploadState("idle");
      setErrorMessage("");
      setFieldErrors({});
      startPolling(entry.id);
      return;
    }

    activeJobIdRef.current = null;
    localStorage.removeItem(PENDING_KEY);
    processingStartRef.current = null;
    setIsProcessing(false);
    setProcessingStatus(null);
    setSelectedFile(null);
    setTextInput("");
    setAssignmentTitle("");
    setUploadState("idle");
    setErrorMessage("");
    setFieldErrors({});
    setSubmissionData({ id: entry.id, title: entry.title, name: entry.name, date: entry.date });
    setResult({
      ai_percentage:    entry.ai_percentage,
      human_percentage: entry.human_percentage,
      grammar_score:    entry.grammar_score,
      ai_paragraphs:    entry.ai_paragraphs,
      total_paragraphs: entry.total_paragraphs,
      report_url:       entry.report_url,
    });
  }, [activeSessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fetch result ──────────────────────────────────────────────────────────
  const fetchResult = async (submissionId) => {
    try {
      const data = await classService.getResults({ submission: submissionId });
      const list = data?.results ?? data ?? [];
      return Array.isArray(list)
        ? list.find((r) => r.submission === submissionId) ?? list[0] ?? null
        : null;
    } catch { return null; }
  };

  // ── Polling ───────────────────────────────────────────────────────────────
  const startPolling = useCallback((submissionId) => {
    clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const res = await classService.getSubmissionStatus(submissionId);
        setProcessingStatus(res);
        if (res.is_complete) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
          activeJobIdRef.current = null;
          setIsProcessing(false);
          localStorage.removeItem(PENDING_KEY);
          const found = await fetchResult(submissionId);
          setResult(found);
          markHistoryComplete(submissionId, found, storagePrefix);
        }
      } catch {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
        setIsProcessing(false);
        localStorage.removeItem(PENDING_KEY);
      }
    }, 3000);
  }, [PENDING_KEY, storagePrefix]);

  // ── Terminate ─────────────────────────────────────────────────────────────
  const handleTerminate = async () => {
    if (!window.confirm("Terminate processing? This will reset and let you resubmit.")) return;
    setTerminateLoading(true);
    try {
      await classService.terminateSubmission(submissionData.id);
      clearInterval(pollingRef.current);
      pollingRef.current = null;
      activeJobIdRef.current = null;
      localStorage.removeItem(PENDING_KEY);
      removeFromLocalHistory(submissionData.id, storagePrefix);
      processingStartRef.current = null;
      setIsProcessing(false);
      setProcessingStatus(null);
      setSubmissionData(null);
      setResult(null);
      setUploadState("idle");
      if (onSessionChange) onSessionChange(null);
    } catch (err) {
      console.warn("Terminate failed:", err);
    } finally {
      setTerminateLoading(false);
    }
  };

  // ── File validation ───────────────────────────────────────────────────────
  const handleFile = (file) => {
    setErrorMessage("");
    setFieldErrors((p) => ({ ...p, file: "" }));
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) { setErrorMessage("Invalid file type. Only PDF files are supported."); return; }
    if (file.size > 10 * 1024 * 1024) { setErrorMessage("File too large. Maximum size is 10MB."); return; }
    setSelectedFile(file);
    setUploadState("idle");
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!assignmentTitle.trim()) {
      errors.title = "File name is required.";
    }
    if (inputMode === "file") {
      if (!selectedFile) errors.file = "Please select a PDF file.";
    } else {
      if (!textInput.trim()) errors.file = "Please enter some text to evaluate.";
      else if (textInput.trim().split(/\s+/).length < 10)
        errors.file = "Please enter at least 10 words for meaningful analysis.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    setUploadState("uploading");
    setUploadProgress(0);
    setErrorMessage("");

    const progressInterval = setInterval(() => {
      setUploadProgress((p) => (p < 85 ? p + 10 : p));
    }, 200);

    try {
      // Convert text to PDF if in text mode
      let fileToSubmit = selectedFile;
      let displayName  = selectedFile?.name ?? "";

      if (inputMode === "text") {
        const safeName  = assignmentTitle.trim().replace(/[^a-z0-9_\- ]/gi, "_");
        fileToSubmit    = textToPdfFile(textInput, `${safeName}.pdf`);
        displayName     = `${safeName}.pdf`;
      }

      const res       = await classService.guestSubmitAssignment(null, assignmentTitle.trim(), fileToSubmit);
      const startTime = Date.now();
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState("success");

      const sd = {
        name:      displayName,
        title:     assignmentTitle.trim(),
        date:      new Date().toLocaleString(),
        id:        res.id,
        startTime,
      };

      activeJobIdRef.current = sd.id;
      setSubmissionData(sd);
      setProcessingStart(startTime);
      setIsProcessing(true);
      setSelectedFile(null);
      setTextInput("");
      setAssignmentTitle("");

      saveToHistory(sd, null, true, storagePrefix);
      localStorage.setItem(PENDING_KEY, JSON.stringify({ submissionData: sd, startTime }));
      if (onSessionChange) onSessionChange(sd.id);
      setTimeout(() => startPolling(res.id), 2000);

    } catch (err) {
      clearInterval(progressInterval);
      if (err?.code === "ERR_CANCELED" || err?.message === "canceled") return;
      setUploadState("error");
      setUploadProgress(0);
      setErrorMessage(
        err?.data?.detail || err?.data?.message || err?.message || "Submission failed. Please try again."
      );
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    if (onSessionChange) onSessionChange(null);
  };

  // ── Mode switch (clear errors) ────────────────────────────────────────────
  const handleModeSwitch = (mode) => {
    setInputMode(mode);
    setFieldErrors({});
    setErrorMessage("");
  };

  const processingPct = processingStatus?.processing_percentage ?? 0;

  return (
    <div className={`panel-card evaluator-card ${fullscreen ? "fullscreen" : ""}`}>

      {/* ── Top Bar ── */}
      <div className="evaluator-topbar">
        <div className="evaluator-badge">
          <div className="evaluator-icon"><Icon d={ICONS.zap} size={16} /></div>
          <div>
            <h3 className="evaluator-title">AI Evaluator</h3>
            <p className="evaluator-subtitle">Upload your file for analysis</p>
          </div>
        </div>
        <div className="maximize-btn"
          title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
          onClick={() => setFullscreen(!fullscreen)}>
          {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="evaluator-body">

        {result && submissionData && !isProcessing ? (
          <ResultCard result={result} submissionData={submissionData} onReset={handleReset} />

        ) : submissionData ? (
          <div className="submitted-state">
            <div className="file-preview success-preview">
              <FileText size={28} className="file-type-icon" style={{ color: "#10b981", marginRight: "12px" }} />
              <div className="file-info">
                <p className="file-name">{submissionData.name}</p>
                <p className="file-size">Submitted on {submissionData.date}</p>
              </div>
            </div>

            {processingStartRef.current && (
              <ProcessingLoader
                isComplete={processingStatus?.is_complete ?? false}
                percentage={processingPct}
                startTime={processingStartRef.current}
              />
            )}

            {!(processingStatus?.is_complete) && (
              <button
                onClick={handleTerminate}
                disabled={terminateLoading}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  marginTop: "12px", padding: "7px 16px",
                  borderRadius: "8px", border: "none",
                  background: "#ef4444", color: "#fff",
                  fontWeight: 600, fontSize: "13px", cursor: "pointer",
                  opacity: terminateLoading ? 0.7 : 1,
                }}
              >
                <X size={14} />
                {terminateLoading ? "Terminating..." : "Terminate & Re-evaluate"}
              </button>
            )}
          </div>

        ) : (
          <div className="upload-state">

            {/* ── Assignment Title ── */}
            <div className="evaluator-input-group">
              <label className="evaluator-input-label">
                Assignment / File Name <span className="ev-required">*</span>
              </label>
              <input
                type="text"
                className={`evaluator-title-input ${fieldErrors.title ? "ev-input-error" : ""}`}
                placeholder="e.g. Software Engineering Report"
                value={assignmentTitle}
                onChange={(e) => {
                  setAssignmentTitle(e.target.value);
                  if (fieldErrors.title) setFieldErrors((p) => ({ ...p, title: "" }));
                }}
              />
              {fieldErrors.title && (
                <span className="ev-field-error"><AlertCircle size={12} /> {fieldErrors.title}</span>
              )}
            </div>

            {/* ── Input Mode Tabs ── */}
            <div className="ev-mode-tabs">
              <button
                type="button"
                className={`ev-mode-tab ${inputMode === "file" ? "ev-mode-tab--active" : ""}`}
                onClick={() => handleModeSwitch("file")}
              >
                <FileText size={14} />
                PDF Upload
              </button>
              <button
                type="button"
                className={`ev-mode-tab ${inputMode === "text" ? "ev-mode-tab--active" : ""}`}
                onClick={() => handleModeSwitch("text")}
              >
                <Type size={14} />
                Paste Text
              </button>
            </div>

            {/* ── File Mode ── */}
            {inputMode === "file" && (
              <>
                {!selectedFile ? (
                  <div
                    className={`drop-zone ${isDragging ? "dragging" : ""} ${fieldErrors.file ? "ev-dropzone-error" : ""}`}
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault(); setIsDragging(false);
                      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
                    }}
                  >
                    <input type="file" ref={fileInputRef} hidden accept=".pdf"
                      onChange={(e) => handleFile(e.target.files[0])} />
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
                      <button className="remove-file-btn" onClick={() => {
                        setSelectedFile(null);
                        setFieldErrors((p) => ({ ...p, file: "" }));
                      }}>
                        <X size={18} />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* ── Text Mode ── */}
            {inputMode === "text" && (
              <div className="ev-text-mode">
                <textarea
                  className={`ev-text-input ${fieldErrors.file ? "ev-input-error" : ""}`}
                  placeholder="Paste or type your essay, report, or assignment text here…"
                  value={textInput}
                  rows={10}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    if (fieldErrors.file) setFieldErrors((p) => ({ ...p, file: "" }));
                  }}
                />
                <TextStats text={textInput} />
                <p className="ev-text-hint">
                  Your text will be converted to a PDF automatically before analysis.
                </p>
              </div>
            )}

            {/* ── Errors ── */}
            {fieldErrors.file && (
              <span className="ev-field-error"><AlertCircle size={12} /> {fieldErrors.file}</span>
            )}
            {errorMessage && (
              <div className="upload-error"><AlertCircle size={14} /> {errorMessage}</div>
            )}

            {/* ── Upload progress ── */}
            {uploadState === "uploading" && (
              <div className="progress-container">
                <div className="progress-bar-wrapper">
                  <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="progress-text">
                  {inputMode === "text" ? "Converting & uploading..." : "Uploading..."}{" "}
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            )}

            {/* ── Submit ── */}
            <button className="btn-primary submit-btn"
              disabled={uploadState === "uploading"} onClick={handleSubmit}>
              {uploadState === "uploading"
                ? <><Loader2 size={15} className="processing-spinner" /> Submitting...</>
                : <><UploadCloud size={15} /> Start Analysis</>}
            </button>

            {/* ── Empty hint ── */}
            {inputMode === "file" && !selectedFile && !assignmentTitle && (
              <p className="evaluator-hint">Enter a name and upload a PDF to get started</p>
            )}
            {inputMode === "text" && !textInput && !assignmentTitle && (
              <p className="evaluator-hint">Enter a name and paste your text to get started</p>
            )}

          </div>
        )}
      </div>
    </div>
  );
}