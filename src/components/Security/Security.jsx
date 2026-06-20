import React from "react";
// import "./Security.css";

const DataEncryption = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const PrivacySafe = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Fairness = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <path d="M6 7h12"/>
    <path d="M6 7l-3 7h6l-3-7z"/>
    <path d="M18 7l-3 7h6l-3-7z"/>
  </svg>
);

const Audit = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7"/>
    <polyline points="14 7 21 7 21 14"/>
  </svg>
);

function Security() {
  const securityItems = [
    {
      icon: <DataEncryption />,
      title: "Data Encrypted",
      desc: "Your academic data is protected with advanced end-to-end encryption and secure processing across every interaction.",
      accent: "blue",
      tag: "Infrastructure"
    },
    {
      icon: <PrivacySafe />,
      title: "Privacy First",
      desc: "Personal and academic information remains strictly confidential. We never share your data with third parties.",
      accent: "emerald",
      tag: "Compliance"
    },
    {
      icon: <Fairness />,
      title: "Responsible AI",
      desc: "Built with fairness and transparency at the core — delivering consistent, unbiased, and explainable evaluations.",
      accent: "purple",
      tag: "Ethics"
    },
    {
      icon: <Audit />,
      title: "Continuous Audits",
      desc: "Regular independent security audits and real-time monitoring ensure the platform remains resilient and trustworthy.",
      accent: "amber",
      tag: "Monitoring"
    },
  ];

  return (
    <section id="security" className="security-section">
      <div className="security-container">
        {/* Header */}
        <div className="section-header">
          <div className="badge">
            <span className="sparkle">🛡️</span> ENTERPRISE SECURITY
          </div>
          <h2 className="section-title">Your Data.<br />Protected by Design.</h2>
          <p className="section-description">
            We combine military-grade security with responsible AI practices to keep your academic environment safe and trustworthy.
          </p>
        </div>

        {/* Security Grid (2x2 Bento) */}
        <div className="security-grid">
          {securityItems.map((item, index) => (
            <div
              key={index}
              className={`security-card glass-card accent-${item.accent}`}
            >
              <div className="security-icon-wrapper">
                <div className="icon-glow" />
                <div className="security-icon">
                  {item.icon}
                </div>
              </div>

              <div className="security-tag">{item.tag}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Security;