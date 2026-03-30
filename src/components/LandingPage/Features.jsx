import React from "react";


const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const BarChartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="M7 16h4"/><path d="M7 11h8"/><path d="M7 6h12"/>
  </svg>
);


function Features() {
  const items = [
    { icon: <img src="logo.svg" height={'40px'} ></img>, label: "AI Content Evaluation", desc: "Analyze student submissions using AI to detect AI-generated content, check grammar accuracy, and evaluate overall writing quality with intelligent feedback.", cls: "icon-blue", bg: "bg-blue" },
    { icon: <ShieldCheckIcon />, label: "Class Management", desc: "Easily create and manage classes, generate unique class codes, assign tasks, and monitor student activities in an organized way.", cls: "icon-amber", bg: "bg-amber" },
     { icon: <BarChartIcon />, label: "Submission System", desc: "Allow students to upload assignments in multiple formats such as PDF, Word, or images, and securely manage all submissions in one place.", cls: "icon-green", bg: "bg-green" },
    { icon: <BarChartIcon />, label: "Reports & Insights", desc: "Generate detailed reports with AI scores, grammar analysis, and highlighted feedback to help teachers evaluate performance quickly and effectively.", cls: "icon-green", bg: "bg-green" },
  
  ];
  return (
    <section id="features" className="section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2>Everything You Need</h2>
          <p>Comprehensive tools for modern academic evaluation</p>
        </div>
        <div className="grid-4">
          {items.map((f) => (
            <div className="feature-card card-hover" key={f.label}>
              <div className={`feature-icon ${f.bg}`}>
                <span className={f.cls}>{f.icon}</span>
              </div>
              <h3>{f.label}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default Features;