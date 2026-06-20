import React from "react";
// import "./Advantage.css";

const ZapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 3v18"/>
  </svg>
);

const LockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function Advantages() {
  const advantages = [
    {
      icon: <ZapIcon />,
      title: "Instant Results",
      desc: "Generate intelligent evaluations, detailed feedback, and performance insights in seconds with powerful AI analysis.",
      accent: "blue",
      tag: "Speed"
    },
    {
      icon: <ScaleIcon />,
      title: "Unbiased Evaluation",
      desc: "Consistent, fair, and objective grading powered by advanced AI that eliminates human bias across all submissions.",
      accent: "emerald",
      tag: "Accuracy"
    },
    {
      icon: <LockIcon />,
      title: "Secure & Private",
      desc: "Enterprise-grade encryption and privacy-first architecture. Your academic data is always protected and never shared.",
      accent: "purple",
      tag: "Security"
    },
    {
      icon: <TrendingUpIcon />,
      title: "Track Progress",
      desc: "Rich visual analytics and AI-powered insights help educators and students monitor improvement over time.",
      accent: "amber",
      tag: "Analytics"
    },
    {
      icon: <UsersIcon />,
      title: "Multi-Role Access",
      desc: "Tailored experiences for teachers, students, and administrators — all within one intelligent platform.",
      accent: "blue",
      tag: "Collaboration"
    },
    {
      icon: <GlobeIcon />,
      title: "Cloud Based",
      desc: "Access your workspace from anywhere, on any device. Fully synchronized, secure, and always up to date.",
      accent: "pink",
      tag: "Accessibility"
    },
  ];

  return (
    <section id="advantages" className="advantages-section">
      <div className="advantages-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <span className="sparkle">✦</span> PLATFORM ADVANTAGES
          </div>
          <h2 className="section-title">Why Educators Trust Our AI</h2>
          <p className="section-description">
            Built with intelligence, security, and speed at the core — delivering a superior academic evaluation experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="advantages-bento">
          {advantages.map((adv, index) => (
            <div
              key={adv.title}
              className={`adv-card glass-card accent-${adv.accent} ${index === 2 ? 'span-2' : ''}`}
            >
              <div className="adv-icon-wrapper">
                <div className="icon-glow" />
                <div className="adv-icon">
                  {adv.icon}
                </div>
              </div>

              <div className="adv-tag">{adv.tag}</div>
              <h3>{adv.title}</h3>
              <p>{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Advantages;