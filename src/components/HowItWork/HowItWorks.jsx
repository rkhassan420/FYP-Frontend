import React from "react";
import "./HowItWork.css"

const UserCheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <polyline points="16 11 18 13 22 9"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const SparklesIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

function HowItWorks() {
  const steps = [
    { icon: <UserCheckIcon />, num: "STEP 1", color: "step-blue", title: "Teacher Creates", desc: "Define assignments with rubrics and criteria" },
    { icon: <FileTextIcon />, num: "STEP 2", color: "step-purple", title: "Assignment Set", desc: "Publish assignments with deadlines and guidelines" },
    { icon: <UploadIcon />, num: "STEP 3", color: "step-amber", title: "Student Submits", desc: "Upload work in any format for evaluation" },
    { icon: <SparklesIcon size={28} />, num: "STEP 4", color: "step-green", title: "AI Analyzes", desc: "Instant grading, feedback, and plagiarism reports" },
  ];
  return (
    <section id="how-it-works" className="section section-white">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">Process</span>
          <h2>How It Works</h2>
          <p>A seamless four-step workflow from creation to insight</p>
        </div>
        <div className="grid-4 steps-grid">
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className={`step-icon ${s.color}`}>{s.icon}</div>
              <span className={`step-num ${s.color}-text`}>{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default HowItWorks