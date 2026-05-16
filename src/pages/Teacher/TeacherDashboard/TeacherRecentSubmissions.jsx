import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle, FileText, ExternalLink } from "lucide-react";
import apiClient from "../../../services/apiClient";
import "./TeacherRecentSubmissions.css";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric",
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

export default function TeacherRecentSubmissions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        // Fetch submissions and AI results in parallel
        const [submissionsData, resultsData] = await Promise.all([
          apiClient.get("/submissions/"),
          apiClient.get("/results/"),
        ]);

        const submissionList = submissionsData?.results ?? submissionsData ?? [];
        const resultList     = resultsData?.results     ?? resultsData     ?? [];

        // Index AI results by submission UUID
        const resultBySubmissionId = {};
        resultList.forEach((r) => {
          if (r.submission) resultBySubmissionId[r.submission] = r;
        });

        // Sort by submitted_at descending, take 5
        const recent = [...submissionList]
          .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
          .slice(0, 5)
          .map((sub) => {
            const result = resultBySubmissionId[sub.id] ?? null;
            return {
              id:              sub.id,
              name:            `${sub.user?.first_name || ""} ${sub.user?.last_name || ""}`.trim() || sub.user?.username || "—",
              assignment:      sub.assignment_title || sub.assignment_name || "—",
              status:          sub.status === "queued" ? "Processing" : (sub.status || "—"),
              submittedAt:     sub.submitted_at ?? null,
              aiPercentage:    result?.ai_percentage    ?? null,
              humanPercentage: result?.human_percentage ?? null,
              totalParagraphs: result?.total_paragraphs ?? null,
              aiParagraphs:    result?.ai_paragraphs    ?? null,
              reportUrl:       result?.report_url       ?? null,
            };
          });

        setRows(recent);
      } catch (err) {
        setError("Failed to load recent submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="trs-panel-card">
      <div className="trs-panel-header">
        <h3 className="trs-panel-title">Recent Submissions</h3>
      </div>

      <div className="trs-table-wrapper">

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "24px", color: "var(--muted)" }}>
            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
            <span>Loading...</span>
          </div>
        )}

        {!loading && error && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "20px", color: "#ef4444" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="trs-empty-state">
            <p>No submissions yet.</p>
          </div>
        )}

        {!loading && !error && rows.length > 0 && (
          <table className="trs-submissions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
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

                  <td className="trs-score">{i + 1}</td>

                  <td className="trs-student-name">{row.name}</td>

                  <td>{row.assignment}</td>

                  <td>
                    <span className={`trs-badge trs-badge-${row.status.toLowerCase().replace(" ", "-")}`}>
                      {row.status}
                    </span>
                  </td>

                  <td className="trs-score">{formatDate(row.submittedAt)}</td>

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
                          <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 2 }}>
                            ({row.aiParagraphs}/{row.totalParagraphs} para)
                          </span>
                        )}
                      </div>
                    ) : row.status === "Not Submitted" ? (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    ) : (
                      <span style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic" }}>
                        Pending analysis
                      </span>
                    )}
                  </td>

                  {/* AI Report */}
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
    <span style={{ color: "var(--muted)" }}>—</span>
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