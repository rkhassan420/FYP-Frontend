import React from "react";
// import "./Feature.css";

const AIContentEvaluationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
    <circle cx="12" cy="18" r="2"/>
  </svg>
);

const ClassManagementIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <path d="M9 22V12h6v10"/>
    <circle cx="7" cy="15" r="1.5"/>
    <circle cx="12" cy="15" r="1.5"/>
    <circle cx="17" cy="15" r="1.5"/>
  </svg>
);

const SubmissionSystemIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="m9 15 2 2 4-4"/>
  </svg>
);

const ReportsInsightsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/>
    <path d="M7 16h2v-6H7z"/>
    <path d="M11 16h2v-9h-2z"/>
    <path d="M15 16h2v-3h-2z"/>
    <circle cx="18" cy="7" r="1.5" fill="currentColor"/>
  </svg>
);

function Features() {
  const features = [
    {
      id: 1,
      icon: <AIContentEvaluationIcon />,
      title: "AI Content Evaluation",
      desc: "Advanced AI engine that analyzes submissions for authenticity, writing quality, structure, and academic integrity with nuanced, actionable feedback.",
      accent: "purple",
      tag: "Core AI",
    },
    {
      id: 2,
      icon: <ClassManagementIcon />,
      title: "Intelligent Class Management",
      desc: "Create, organize, and manage classes with AI-assisted scheduling, automated enrollment, and real-time student progress tracking.",
      accent: "amber",
      tag: "Workflow",
    },
    {
      id: 3,
      icon: <SubmissionSystemIcon />,
      title: "Seamless Submission System",
      desc: "Frictionless multi-format submission portal with version control, plagiarism screening, and instant AI pre-evaluation.",
      accent: "emerald",
      tag: "Automation",
    },
    {
      id: 4,
      icon: <ReportsInsightsIcon />,
      title: "Deep Reports & Insights",
      desc: "Rich, visual analytics and AI-powered insights that help educators understand class performance, identify learning gaps, and personalize instruction.",
      accent: "sky",
      tag: "Analytics",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <span className="sparkle">✦</span> AI POWERED FEATURES
          </div>
          <h2 className="section-title">
            Built for modern academic excellence
          </h2>
          <p className="section-description">
            Intelligent tools that save time, enhance learning outcomes, and elevate teaching to the next level.
          </p>
        </div>

        {/* 4-Column Grid */}
        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card glass-card accent-${feature.accent}`}
            >
              <div className="icon-wrapper">
                <div className="icon-bg" />
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>

              <div className="content">
                <span className="feature-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>

              <div className="glow-border" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;