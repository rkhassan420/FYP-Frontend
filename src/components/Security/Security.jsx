import React from "react";
import "./Security.css"


const DataEncryption = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const PrivacySafe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const Fairness = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <path d="M6 7h12"/>
    <path d="M6 7l-3 7h6l-3-7z"/>
    <path d="M18 7l-3 7h6l-3-7z"/>
  </svg>
);

const Audit = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 7"/>
    <polyline points="14 7 21 7 21 14"/>
  </svg>
);


function Security() {
  const items = [
    { icon: <DataEncryption />, title: "Data Encrypted", desc: "All user data is encrypted using industry-standard protocols, ensuring your information stays secure both in transit and at rest.", iconBg: "sec-blue", iconColor: "text-blue" },
    { icon: <PrivacySafe />, title: "Privacy Safe", desc: "We respect your privacy. Personal and academic data is never shared with third parties without consent.", iconBg: "sec-green", iconColor: "text-green" },
    { icon: <Fairness />, title: "AI Fairness", desc: "Our AI systems are designed to be unbiased and fair, ensuring consistent and objective evaluations for every submission.", iconBg: "sec-purple", iconColor: "text-purple" },
    { icon: <Audit />, title: "Regular Security Audits", desc: "We perform continuous security audits and updates to identify and fix vulnerabilities, keeping our platform safe and reliable.", iconBg: "sec-amber", iconColor: "text-amber" },  
  ];

  return (
    <section className="security-section">
      <div className="security-inner">
        <div className="section-header">
          <span className="section-label">Security</span>
           <h2>We respect your Data & Security</h2>          
        </div>
        <div className="security-grid">
          {items.map((item) => (
            <div className="security-item" key={item.title}>
              <div className={`security-icon ${item.iconBg}`}>
                <span className={item.iconColor}>{item.icon}</span>
              </div>
              <div className="security-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default Security;