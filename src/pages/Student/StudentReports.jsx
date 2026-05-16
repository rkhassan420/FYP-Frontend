// import React, { useState } from "react";
// import { Download, Eye, FileText, Award, AlertTriangle, ShieldCheck } from "lucide-react";
// import "../../css/Student/StudentReports.css";

// // --- Custom Circular Progress Component ---
// const CircularProgress = ({ percentage, label, color, type }) => {
//   const radius = 36;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="circular-progress-wrapper">
//       <svg width="90" height="90" className="circular-chart">
//         <circle className="circular-bg" cx="45" cy="45" r={radius} strokeWidth="8" />
//         <circle
//           className="circular-fill"
//           cx="45"
//           cy="45"
//           r={radius}
//           stroke={color}
//           strokeWidth="8"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//         />
//       </svg>
//       <div className="circular-content">
//         <span className="circular-value" style={{ color: color }}>
//           {percentage}%
//         </span>
//       </div>
//       <span className="circular-label">
//         {type === 'ai' && percentage > 40 && <AlertTriangle size={12} color={color} />}
//         {label}
//       </span>
//     </div>
//   );
// };

// // --- Mock Report Data ---
// const MOCK_REPORTS = [
//   {
//     id: "rep_01",
//     assignmentName: "Software Requirement Spec",
//     course: "Software Engineering",
//     dateEvaluated: "Oct 26, 2024",
//     scores: {
//       aiDetection: 12, // 12% AI (Good, mostly human)
//       grammar: 94,
//       contentQuality: 88,
//       overall: 91
//     },
//     status: "Excellent"
//   },
//   {
//     id: "rep_02",
//     assignmentName: "Ethics in Computing Essay",
//     course: "Professional Practices",
//     dateEvaluated: "Oct 15, 2024",
//     scores: {
//       aiDetection: 78, // 78% AI (Flagged)
//       grammar: 98,
//       contentQuality: 65,
//       overall: 55 // Penalized for high AI
//     },
//     status: "Needs Review"
//   }
// ];

// export default function StudentReports() {
//   const [reports] = useState(MOCK_REPORTS);

//   return (
//     <div className="page-wrapper">
//       <div className="page-inner" style={{ maxWidth: "1200px" }}>
        
//         {/* Header */}
//         <header className="page-header fade-in">
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
//             <div>
//               <h1 className="page-title">AI Evaluation Reports</h1>
//               <p className="page-subtitle">Detailed breakdown of your assignment submissions.</p>
//             </div>
            
//             {/* Overall Stats summary */}
//             <div className="header-stats-pill">
//               <ShieldCheck size={20} color="var(--success, #10b981)" />
//               <span><strong>{reports.length}</strong> Reports Available</span>
//             </div>
//           </div>
//         </header>

//         {/* Reports List */}
//         <div className="reports-container fade-in">
//           {reports.map((report, index) => {
//             // Determine colors based on scores
//             const aiColor = report.scores.aiDetection > 40 ? "#ef4444" : "#10b981"; // Red if high AI, Green if low
//             const grammarColor = report.scores.grammar > 80 ? "#3b82f6" : "#f59e0b";
//             const contentColor = report.scores.contentQuality > 80 ? "#8b5cf6" : "#f59e0b";
            
//             return (
//               <div key={report.id} className="report-card" style={{ animationDelay: `${index * 0.1}s` }}>
                
//                 {/* Report Header */}
//                 <div className="report-header">
//                   <div className="report-title-area">
//                     <div className="report-icon">
//                       <FileText size={24} />
//                     </div>
//                     <div>
//                       <h3 className="report-title">{report.assignmentName}</h3>
//                       <p className="report-meta">{report.course} • Evaluated on {report.dateEvaluated}</p>
//                     </div>
//                   </div>
                  
//                   <div className="overall-score-area">
//                     <span className="score-label">Overall Score</span>
//                     <div className="score-value-badge">
//                       <Award size={18} /> {report.scores.overall}/100
//                     </div>
//                   </div>
//                 </div>

//                 {/* Report Body: Circular Charts */}
//                 <div className="report-charts-grid">
//                   <CircularProgress 
//                     percentage={report.scores.aiDetection} 
//                     label="AI Generated" 
//                     color={aiColor}
//                     type="ai"
//                   />
//                   <CircularProgress 
//                     percentage={report.scores.grammar} 
//                     label="Grammar Score" 
//                     color={grammarColor}
//                   />
//                   <CircularProgress 
//                     percentage={report.scores.contentQuality} 
//                     label="Content Quality" 
//                     color={contentColor}
//                   />
//                 </div>

//                 {/* Report Footer: Actions */}
//                 <div className="report-footer">
//                   <div className={`status-text ${report.status === 'Excellent' ? 'text-success' : 'text-warning'}`}>
//                     {report.status === 'Excellent' ? '🌟 Excellent Work!' : '⚠️ High AI Usage Detected'}
//                   </div>
                  
//                   <div className="report-actions">
//                     <button className="btn-secondary-outline">
//                       <Eye size={16} /> View Detailed Report
//                     </button>
//                     <button className="btn-primary">
//                       <Download size={16} /> Download PDF
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Download, Eye, FileText, Award, AlertTriangle, ShieldCheck, ExternalLink } from "lucide-react";
import apiClient from "../../services/apiClient";
import "../../css/Student/StudentReports.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ── Circular Progress ─────────────────────────────────────────────────────────
const CircularProgress = ({ percentage, label, color, type }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const pct = Number(percentage) || 0;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="circular-progress-wrapper">
      <svg width="90" height="90" className="circular-chart">
        <circle className="circular-bg" cx="45" cy="45" r={radius} strokeWidth="8" />
        <circle
          className="circular-fill"
          cx="45" cy="45" r={radius}
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="circular-content">
        <span className="circular-value" style={{ color }}>
          {pct}%
        </span>
      </div>
      <span className="circular-label">
        {type === "ai" && pct > 40 && <AlertTriangle size={12} color={color} />}
        {" "}{label}
      </span>
    </div>
  );
};

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    submitted:  { bg: "#d1fae5", text: "#065f46" },
    Processing: { bg: "#dbeafe", text: "#1e40af" },
    queued:     { bg: "#dbeafe", text: "#1e40af" },
  };
  const s = map[status] || { bg: "#fef3c7", text: "#92400e" };
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 4,
      fontSize: 12, fontWeight: 600,
      background: s.bg, color: s.text,
    }}>
      {status === "queued" ? "Processing" : status}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function StudentReports() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [submissionsData, resultsData] = await Promise.all([
          apiClient.get("/submissions/"),
          apiClient.get("/results/"),
        ]);

        const submissionList = submissionsData?.results ?? submissionsData ?? [];
        const resultList     = resultsData?.results     ?? resultsData     ?? [];

        const resultBySubmissionId = {};
        resultList.forEach((r) => {
          if (r.submission) resultBySubmissionId[r.submission] = r;
        });

        const merged = [...submissionList]
          .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
          .map((sub) => {
            const result = resultBySubmissionId[sub.id] ?? null;
            return {
              id:              sub.id,
              assignment:      sub.assignment_title || sub.assignment_name || "—",
              className:       sub.class_name || "—",
              submittedAt:     sub.submitted_at ?? null,
              status:          sub.status === "queued" ? "Processing" : (sub.status || "—"),
              aiPercentage:    result?.ai_percentage    ?? null,
              humanPercentage: result?.human_percentage ?? null,
              grammarScore:    result?.grammar_score    ?? null,
              totalParagraphs: result?.total_paragraphs ?? null,
              aiParagraphs:    result?.ai_paragraphs    ?? null,
              reportUrl:       result?.report_url       ?? null,
              score:           sub.score ?? null,
            };
          });

        setRows(merged);
      } catch (err) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Summary counts
  const total      = rows.length;
  const flagged    = rows.filter(r => r.aiPercentage !== null && Number(r.aiPercentage) >= 50).length;
  const withReport = rows.filter(r => r.reportUrl).length;

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1200px" }}>

        {/* ── Header ── */}
        <header className="page-header fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 className="page-title">AI Evaluation Reports</h1>
              <p className="page-subtitle">Detailed breakdown of your assignment submissions.</p>
            </div>

            {!loading && !error && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div className="header-stats-pill">
                  <ShieldCheck size={20} color="#10b981" />
                  <span><strong>{total}</strong> Reports Available</span>
                </div>
                <div className="header-stats-pill">
                  <FileText size={18} color="#2563eb" />
                  <span><strong>{withReport}</strong> PDFs Ready</span>
                </div>
                {flagged > 0 && (
                  <div className="header-stats-pill" style={{ background: "#fee2e2" }}>
                    <AlertTriangle size={18} color="#dc2626" />
                    <span style={{ color: "#dc2626" }}><strong>{flagged}</strong> Flagged</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ── States ── */}
        {loading && (
          <p style={{ padding: 40, textAlign: "center", color: "#64748b" }}>
            Loading reports...
          </p>
        )}
        {!loading && error && (
          <p style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>{error}</p>
        )}
        {!loading && !error && rows.length === 0 && (
          <p style={{ padding: 40, textAlign: "center", color: "#64748b" }}>
            No submissions yet.
          </p>
        )}

        {/* ── Cards ── */}
        {!loading && !error && rows.length > 0 && (
          <div className="reports-container fade-in">
            {rows.map((row, index) => {
              const aiNum     = Number(row.aiPercentage) || 0;
              const humanNum  = Number(row.humanPercentage) || 0;
              const grammarNum = Number(row.grammarScore) || 0;
              const isFlagged = row.aiPercentage !== null && aiNum >= 50;
              const hasResult = row.aiPercentage !== null;

              const aiColor      = aiNum > 40    ? "#ef4444" : "#10b981";
              const humanColor   = humanNum >= 60 ? "#10b981" : "#f59e0b";
              const grammarColor = grammarNum > 80 ? "#3b82f6" : "#f59e0b";

              // Derive a label like the old UI
              const statusLabel = !hasResult
                ? null
                : isFlagged
                ? "Needs Review"
                : "Excellent";

              return (
                <div
                  key={row.id || index}
                  className="report-card"
                  style={{
                    animationDelay: `${index * 0.07}s`,
                    borderLeft: isFlagged ? "4px solid #ef4444" : "4px solid #10b981",
                  }}
                >
                  {/* ── Card Header ── */}
                  <div className="report-header">
                    <div className="report-title-area">
                      <div className="report-icon">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="report-title">{row.assignment}</h3>
                        <p className="report-meta">
                          Submitted {formatDate(row.submittedAt)}
                        </p>
                      </div>
                    </div>

                   
                  </div>

                  {/* ── Circular Charts (only if result exists) ── */}
                  {hasResult ? (
                    <div className="report-charts-grid">
                      <CircularProgress
                        percentage={aiNum}
                        label="AI Generated"
                        color={aiColor}
                        type="ai"
                      />
                      <CircularProgress
                        percentage={humanNum}
                        label="Human Written"
                        color={humanColor}
                      />
                     
                    </div>
                  ) : (
                    <div style={{
                      padding: "24px 0",
                      textAlign: "center",
                      color: "#94a3b8",
                      fontSize: 13,
                      fontStyle: "italic",
                    }}>
                      {row.status === "Processing"
                        ? "⏳ Analysis in progress, check back soon..."
                        : "Pending AI analysis"}
                    </div>
                  )}

                  {/* ── Paragraph info ── */}
                  

                  {/* ── Card Footer ── */}
                  <div className="report-footer">
                    <div className={`status-text ${statusLabel === "Excellent" ? "text-success" : statusLabel === "Needs Review" ? "text-warning" : ""}`}>
                      {statusLabel === "Excellent" && "🌟 Excellent Work!"}
                      {statusLabel === "Needs Review" && "⚠️ High AI Usage Detected"}
                    </div>

                  <div className="report-actions">
  {row.reportUrl && (
    <a
      href={row.reportUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary-outline"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        textDecoration: "none",
      }}
    >
      <Eye size={15} /> View Report
      <ExternalLink size={12} />
    </a>
  )}

 

  {!row.reportUrl && (
    <span style={{ fontSize: 12, color: "#94a3b8" }}>
      No report available yet
    </span>
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