import React, { useState } from "react";
import { Download, Eye, FileText, Award, AlertTriangle, ShieldCheck } from "lucide-react";
import "../../css/Student/StudentReports.css";

// --- Custom Circular Progress Component ---
const CircularProgress = ({ percentage, label, color, type }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-wrapper">
      <svg width="90" height="90" className="circular-chart">
        <circle className="circular-bg" cx="45" cy="45" r={radius} strokeWidth="8" />
        <circle
          className="circular-fill"
          cx="45"
          cy="45"
          r={radius}
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="circular-content">
        <span className="circular-value" style={{ color: color }}>
          {percentage}%
        </span>
      </div>
      <span className="circular-label">
        {type === 'ai' && percentage > 40 && <AlertTriangle size={12} color={color} />}
        {label}
      </span>
    </div>
  );
};

// --- Mock Report Data ---
const MOCK_REPORTS = [
  {
    id: "rep_01",
    assignmentName: "Software Requirement Spec",
    course: "Software Engineering",
    dateEvaluated: "Oct 26, 2024",
    scores: {
      aiDetection: 12, // 12% AI (Good, mostly human)
      grammar: 94,
      contentQuality: 88,
      overall: 91
    },
    status: "Excellent"
  },
  {
    id: "rep_02",
    assignmentName: "Ethics in Computing Essay",
    course: "Professional Practices",
    dateEvaluated: "Oct 15, 2024",
    scores: {
      aiDetection: 78, // 78% AI (Flagged)
      grammar: 98,
      contentQuality: 65,
      overall: 55 // Penalized for high AI
    },
    status: "Needs Review"
  }
];

export default function StudentReports() {
  const [reports] = useState(MOCK_REPORTS);

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1200px" }}>
        
        {/* Header */}
        <header className="page-header fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 className="page-title">AI Evaluation Reports</h1>
              <p className="page-subtitle">Detailed breakdown of your assignment submissions.</p>
            </div>
            
            {/* Overall Stats summary */}
            <div className="header-stats-pill">
              <ShieldCheck size={20} color="var(--success, #10b981)" />
              <span><strong>{reports.length}</strong> Reports Available</span>
            </div>
          </div>
        </header>

        {/* Reports List */}
        <div className="reports-container fade-in">
          {reports.map((report, index) => {
            // Determine colors based on scores
            const aiColor = report.scores.aiDetection > 40 ? "#ef4444" : "#10b981"; // Red if high AI, Green if low
            const grammarColor = report.scores.grammar > 80 ? "#3b82f6" : "#f59e0b";
            const contentColor = report.scores.contentQuality > 80 ? "#8b5cf6" : "#f59e0b";
            
            return (
              <div key={report.id} className="report-card" style={{ animationDelay: `${index * 0.1}s` }}>
                
                {/* Report Header */}
                <div className="report-header">
                  <div className="report-title-area">
                    <div className="report-icon">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="report-title">{report.assignmentName}</h3>
                      <p className="report-meta">{report.course} • Evaluated on {report.dateEvaluated}</p>
                    </div>
                  </div>
                  
                  <div className="overall-score-area">
                    <span className="score-label">Overall Score</span>
                    <div className="score-value-badge">
                      <Award size={18} /> {report.scores.overall}/100
                    </div>
                  </div>
                </div>

                {/* Report Body: Circular Charts */}
                <div className="report-charts-grid">
                  <CircularProgress 
                    percentage={report.scores.aiDetection} 
                    label="AI Generated" 
                    color={aiColor}
                    type="ai"
                  />
                  <CircularProgress 
                    percentage={report.scores.grammar} 
                    label="Grammar Score" 
                    color={grammarColor}
                  />
                  <CircularProgress 
                    percentage={report.scores.contentQuality} 
                    label="Content Quality" 
                    color={contentColor}
                  />
                </div>

                {/* Report Footer: Actions */}
                <div className="report-footer">
                  <div className={`status-text ${report.status === 'Excellent' ? 'text-success' : 'text-warning'}`}>
                    {report.status === 'Excellent' ? '🌟 Excellent Work!' : '⚠️ High AI Usage Detected'}
                  </div>
                  
                  <div className="report-actions">
                    <button className="btn-secondary-outline">
                      <Eye size={16} /> View Detailed Report
                    </button>
                    <button className="btn-primary">
                      <Download size={16} /> Download PDF
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}