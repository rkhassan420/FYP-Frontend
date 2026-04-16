import React from "react";
import "./Advantage.css"

const ZapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ScaleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function Advantages() {
  const items = [
    { icon: <ZapIcon />, title: "Instant Results", desc: "Get grades and feedback within seconds, not days.", iconBg: "adv-blue", iconColor: "text-blue" },
    { icon: <ScaleIcon />, title: "Unbiased Evaluation", desc: "Consistent grading standards across all submissions.", iconBg: "adv-green", iconColor: "text-green" },
    { icon: <LockIcon />, title: "Secure & Private", desc: "Student data is encrypted and never shared externally.", iconBg: "adv-purple", iconColor: "text-purple" },
    { icon: <TrendingUpIcon />, title: "Track Progress", desc: "Monitor improvement with detailed analytics over time.", iconBg: "adv-amber", iconColor: "text-amber" },
    { icon: <UsersIcon />, title: "Multi-Role Access", desc: "Designed for teachers, students, and administrators.", iconBg: "adv-blue", iconColor: "text-blue" },
    { icon: <GlobeIcon />, title: "Cloud Based", desc: "Access from anywhere, on any device, anytime.", iconBg: "adv-pink", iconColor: "text-pink" },
  ];
  return (
    <section className="section section-white">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">Advantages</span>
          <h2>Why Choose Us</h2>
        </div>
        <div className="grid-3 advantages-grid">
          {items.map((a) => (
            <div className="adv-item" key={a.title}>
              <div className={`adv-icon ${a.iconBg}`}>
                <span className={a.iconColor}>{a.icon}</span>
              </div>
              <div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default Advantages