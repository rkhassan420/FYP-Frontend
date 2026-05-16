// // import React, { useState } from "react";
// // import "./StudentDashboard.css";
// // import StudentSidebar from "./StudentSidebar";
// // import StudentHeader from "./StudentHeader";
// // import StudentDashboardStats from "./StudentDashboardStats"; // ← NEW IMPORT
// // import StudentJoinClass from "./StudentJoinClass";
// // import StudentClasses from "../../pages/Student/StudentCLasses";
// // import StudentAssignments from "../../pages/Student/StudentAssignments";
// // import StudentReports from "../../pages/Student/StudentReports";
// // import StudentSetting from "../../pages/Student/StudentSetting";

// // export default function StudentDashboard() {

// //   const [activePage, setActivePage] = useState(() => {
// //     return localStorage.getItem("studentActivePage") || "dashboard";
// //   });

// //   return (
// //     <div className="app-layout">
// //       {/* Sidebar always visible */}
// //       <StudentSidebar activePage={activePage} setActivePage={setActivePage} />

// //       <main className="main">
// //         {/* ─── Dashboard Page ─── */}
// //         {activePage === "dashboard" && (
// //           <>
// //             <StudentHeader />

// //             <div className="content dashboard">
// //               {/* ── Stats Cards (extracted component) ── */}
// //               <StudentDashboardStats
// //                 joinedClasses={5}
// //                 pendingAssignments={3}
// //                 submitted={8}
// //                 reportsReady={2}
// //               />

// //               {/* ── Lower grid ── */}
// //               <div className="lower-grid">
// //                 {/* Upcoming Deadlines */}
// //                 <div className="panel-card">
// //                   <div className="panel-header">
// //                     <h3 className="panel-title">Upcoming Deadlines</h3>
// //                   </div>
// //                   <div className="table-wrapper">
// //                     <table className="submissions-table">
// //                       <thead>
// //                         <tr>
// //                           <th>Subject</th>
// //                           <th>Assignment</th>
// //                           <th>Due Date</th>
// //                           <th>Status</th>
// //                           <th>Action</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         <tr>
// //                           <td className="student-name">Web Engineering</td>
// //                           <td>React Frontend</td>
// //                           <td>Tomorrow, 11:59 PM</td>
// //                           <td>
// //                             <span className="badge badge-pending" style={{ backgroundColor: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: "4px" }}>
// //                               Pending
// //                             </span>
// //                           </td>
// //                           <td>
// //                             <button className="action-btn review" onClick={() => setActivePage("assignments")}>
// //                               Open
// //                             </button>
// //                           </td>
// //                         </tr>
// //                         <tr>
// //                           <td className="student-name">Database Systems</td>
// //                           <td>SQL Normalization</td>
// //                           <td>Oct 25, 2024</td>
// //                           <td>
// //                             <span className="badge badge-pending" style={{ backgroundColor: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: "4px" }}>
// //                               Pending
// //                             </span>
// //                           </td>
// //                           <td>
// //                             <button className="action-btn review" onClick={() => setActivePage("assignments")}>
// //                               Open
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </div>

// //                 {/* Recent AI Reports */}
// //                 <div className="panel-card">
// //                   <div className="panel-header">
// //                     <h3 className="panel-title">Recent AI Reports</h3>
// //                   </div>
// //                   <div className="table-wrapper">
// //                     <table className="submissions-table">
// //                       <thead>
// //                         <tr>
// //                           <th>Assignment</th>
// //                           <th>AI Score</th>
// //                           <th>Overall</th>
// //                           <th>Action</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         <tr>
// //                           <td className="student-name">Software Requirement Spec</td>
// //                           <td><span style={{ color: "green" }}>12%</span></td>
// //                           <td className="score">88/100</td>
// //                           <td>
// //                             <button className="action-btn view" onClick={() => setActivePage("reports")}>
// //                               View Report
// //                             </button>
// //                           </td>
// //                         </tr>
// //                         <tr>
// //                           <td className="student-name">Ethics Essay</td>
// //                           <td><span style={{ color: "red" }}>84%</span></td>
// //                           <td className="score">45/100</td>
// //                           <td>
// //                             <button className="action-btn view" onClick={() => setActivePage("reports")}>
// //                               View Report
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}

// //         {/* ─── Student Portal Pages ─── */}

// //         {activePage === "join-class" && (
// //           <div className="content full">
// //             <StudentJoinClass />
// //           </div>
// //         )}

// //         {activePage === "my-classes" && (
// //           <div className="content full">
// //             <StudentClasses setActivePage={setActivePage} />
// //           </div>
// //         )}

// //         {activePage === "assignments" && (
// //           <div className="content full">
// //             <StudentAssignments />
// //           </div>
// //         )}

// //         {activePage === "reports" && (
// //           <div className="content full">
// //             <StudentReports />
// //           </div>
// //         )}

// //         {activePage === "setting" && (
// //           <div className="content full">
// //             <StudentSetting />
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import "./StudentDashboard.css";
// import StudentSidebar from "./StudentSidebar";
// import StudentHeader from "./StudentHeader";
// import StudentDashboardStats from "./StudentDashboardStats";
// import StudentJoinClass from "./StudentJoinClass";
// import StudentClasses from "../../pages/Student/StudentCLasses";
// import StudentAssignments from "../../pages/Student/StudentAssignments";
// import StudentReports from "../../pages/Student/StudentReports";
// import StudentSetting from "../../pages/Student/StudentSetting";

// export default function StudentDashboard() {

//   const [activePage, setActivePage] = useState(() => {
//     return localStorage.getItem("studentActivePage") || "dashboard";
//   });

//   // Holds the class object clicked in StudentClasses
//   const [selectedClass, setSelectedClass] = useState(null);

//   return (
//     <div className="app-layout">
//       <StudentSidebar activePage={activePage} setActivePage={setActivePage} />

//       <main className="main">

//         {/* ─── Dashboard ─── */}
//         {activePage === "dashboard" && (
//           <>
//             <StudentHeader />
//             <div className="content dashboard">
//               <StudentDashboardStats
//                 joinedClasses={5}
//                 pendingAssignments={3}
//                 submitted={8}
//                 reportsReady={2}
//               />
//               <div className="lower-grid">
//                 {/* <div className="panel-card">
//                   <div className="panel-header">
//                     <h3 className="panel-title">Upcoming Deadlines</h3>
//                   </div>
//                   <div className="table-wrapper">
//                     <table className="submissions-table">
//                       <thead>
//                         <tr>
//                           <th>Subject</th>
//                           <th>Assignment</th>
//                           <th>Due Date</th>
//                           <th>Status</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td className="student-name">Web Engineering</td>
//                           <td>React Frontend</td>
//                           <td>Tomorrow, 11:59 PM</td>
//                           <td>
//                             <span className="badge badge-pending" style={{ backgroundColor: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: "4px" }}>
//                               Pending
//                             </span>
//                           </td>
//                           <td>
//                             <button className="action-btn review" onClick={() => setActivePage("assignments")}>
//                               Open
//                             </button>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="student-name">Database Systems</td>
//                           <td>SQL Normalization</td>
//                           <td>Oct 25, 2024</td>
//                           <td>
//                             <span className="badge badge-pending" style={{ backgroundColor: "#fff3cd", color: "#856404", padding: "4px 8px", borderRadius: "4px" }}>
//                               Pending
//                             </span>
//                           </td>
//                           <td>
//                             <button className="action-btn review" onClick={() => setActivePage("assignments")}>
//                               Open
//                             </button>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div> */}

//                 <div className="panel-card">
//                   <div className="panel-header">
//                     <h3 className="panel-title">Recent AI Reports</h3>
//                   </div>
//                   <div className="table-wrapper">
//                     <table className="submissions-table">
//                       <thead>
//                         <tr>
//                           <th>Assignment</th>
//                           <th>AI Score</th>
//                           <th>Overall</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td className="student-name">Software Requirement Spec</td>
//                           <td><span style={{ color: "green" }}>12%</span></td>
//                           <td className="score">88/100</td>
//                           <td>
//                             <button className="action-btn view" onClick={() => setActivePage("reports")}>
//                               View Report
//                             </button>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="student-name">Ethics Essay</td>
//                           <td><span style={{ color: "red" }}>84%</span></td>
//                           <td className="score">45/100</td>
//                           <td>
//                             <button className="action-btn view" onClick={() => setActivePage("reports")}>
//                               View Report
//                             </button>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* ─── Join Class ─── */}
//         {activePage === "join-class" && (
//           <div className="content full">
//             <StudentJoinClass />
//           </div>
//         )}

//         {/* ─── My Classes ─── */}
//         {activePage === "my-classes" && (
//           <div className="content full">
//             <StudentClasses
//               setActivePage={setActivePage}
//               setSelectedClass={setSelectedClass}
//             />
//           </div>
//         )}

//         {/* ─── Assignments — list + detail all in one component ─── */}
//         {activePage === "assignments" && (
//           <div className="content full">
//             <StudentAssignments
//               selectedClass={selectedClass}
//               setActivePage={setActivePage}
//             />
//           </div>
//         )}

//         {/* ─── Reports ─── */}
//         {activePage === "reports" && (
//           <div className="content full">
//             <StudentReports />
//           </div>
//         )}

//         {/* ─── Settings ─── */}
//         {activePage === "setting" && (
//           <div className="content full">
//             <StudentSetting />
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";
import StudentDashboardStats from "./StudentDashboardStats";
import StudentJoinClass from "./StudentJoinClass";
import StudentClasses from "../../pages/Student/StudentCLasses";
import StudentAssignments from "../../pages/Student/StudentAssignments";
import StudentReports from "../../pages/Student/StudentReports";
import StudentSetting from "../../pages/Student/StudentSetting";
import { FileText, ExternalLink } from "lucide-react";
import apiClient from "../../services/apiClient";

// ── Helpers ───────────────────────────────────────────────────────────────────
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
    <span style={{
      display: "inline-block",
      background: c.bg,
      color: c.text,
      borderRadius: 4,
      padding: "2px 6px",
      fontSize: 11,
      fontWeight: 600,
      marginRight: 4,
      whiteSpace: "nowrap",
    }}>
      {label}: {Number(value).toFixed(0)}%
    </span>
  );
}

// ── Recent AI Reports Table ───────────────────────────────────────────────────
function RecentAIReports({ onViewReports }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const recent = [...submissionList]
          .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
          .slice(0, 5)
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
              score:           sub.score ?? "—",
            };
          });

        setRows(recent);
      } catch (err) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="panel-card" style={{ gridColumn: "1 / -1" }}>
      <div className="panel-header">
        <h3 className="panel-title">Recent AI Reports</h3>
      </div>

      <div className="table-wrapper">
        {loading && (
          <p style={{ padding: "20px", color: "#64748b", textAlign: "center" }}>
            Loading reports...
          </p>
        )}

        {!loading && error && (
          <p style={{ padding: "20px", color: "#ef4444", textAlign: "center" }}>
            {error}
          </p>
        )}

        {!loading && !error && rows.length === 0 && (
          <p style={{ padding: "20px", color: "#64748b", textAlign: "center" }}>
            No submissions yet.
          </p>
        )}

        {!loading && !error && rows.length > 0 && (
          <table className="submissions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment</th>              
                <th>Status</th>
                <th>Submitted At</th>
                <th>AI Detection</th>
                <th>AI Report</th>
            
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id || i}>

                  <td>{i + 1}</td>

                  <td className="student-name">{row.assignment}</td>

                  

                  <td>
                    <span
                      className={`badge badge-${row.status.toLowerCase().replace(" ", "-")}`}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        background:
                          row.status === "submitted" ? "#d1fae5" :
                          row.status === "Processing" ? "#dbeafe" : "#fef3c7",
                        color:
                          row.status === "submitted" ? "#065f46" :
                          row.status === "Processing" ? "#1e40af" : "#92400e",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td style={{ fontSize: 12 }}>{formatDate(row.submittedAt)}</td>

                  {/* AI Detection */}
                  <td style={{ minWidth: 200 }}>
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
                          <span style={{ fontSize: 11, color: "#64748b", marginLeft: 2 }}>
                            ({row.aiParagraphs}/{row.totalParagraphs} para)
                          </span>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}>
                        {row.status === "Processing" ? "Processing..." : "Pending analysis"}
                      </span>
                    )}
                  </td>

                  {/* ✅ FIX 1: Added missing opening <a tag */}
<td>
  {row.reportUrl ? (
    <a
      href={row.reportUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="action-btn view"
      title="Open AI Report PDF"
    >
      View Report
    </a>
  ) : (
    <span style={{ color: "#94a3b8", fontSize: 12 }}>—</span>
  )}
</td>

                 

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function StudentDashboard() {

  // ✅ FIX 2: Replaced localStorage with plain useState default
  const [activePage, setActivePage] = useState("dashboard");

  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="app-layout">
      <StudentSidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main">

        {/* ─── Dashboard ─── */}
        {activePage === "dashboard" && (
          <>
            <StudentHeader />
            <div className="content dashboard">
              <StudentDashboardStats />
              <div className="lower-grid">
                <RecentAIReports onViewReports={() => setActivePage("reports")} />
              </div>
            </div>
          </>
        )}

        {/* ─── Join Class ─── */}
        {activePage === "join-class" && (
          <div className="content full">
            <StudentJoinClass />
          </div>
        )}

        {/* ─── My Classes ─── */}
        {activePage === "my-classes" && (
          <div className="content full">
            <StudentClasses
              setActivePage={setActivePage}
              setSelectedClass={setSelectedClass}
            />
          </div>
        )}

        {/* ─── Assignments ─── */}
        {activePage === "assignments" && (
          <div className="content full">
            <StudentAssignments
              selectedClass={selectedClass}
              setActivePage={setActivePage}
            />
          </div>
        )}

        {/* ─── Reports ─── */}
        {activePage === "reports" && (
          <div className="content full">
            <StudentReports />
          </div>
        )}

        {/* ─── Settings ─── */}
        {activePage === "setting" && (
          <div className="content full">
            <StudentSetting />
          </div>
        )}

      </main>
    </div>
  );
}