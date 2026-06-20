import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Roles.css";

const GradCapIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const GuestUserIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>
    <line x1="18" y1="8" x2="18" y2="12"/>
    <line x1="16" y1="10" x2="20" y2="10"/>
  </svg>
);

function Roles() {
  const navigate = useNavigate();

  const roles = [
    {
      icon: <GradCapIcon />,
      title: "Teacher",
      route: "/login/teacher",
      accent: "blue",
      tag: "Educator",
      desc: "Create assignments, design rubrics, review AI-powered evaluations, and gain deep insights into class performance.",
      cta: "Enter Teacher Portal",
    },
    {
      icon: <BookOpenIcon />,
      title: "Student",
      route: "/login/student",
      accent: "emerald",
      tag: "Learner",
      desc: "Submit assignments effortlessly, receive instant intelligent feedback, track your progress, and improve with AI guidance.",
      cta: "Enter Student Dashboard",
    },
    {
      icon: <GuestUserIcon />,
      title: "Guest",
      route: "/guest/login",
      accent: "purple",
      tag: "Explorer",
      desc: "Experience the power of our AI evaluator. Test submissions and explore features without full account access.",
      cta: "Try as Guest",
    },
  ];

  return (
    <section id="roles" className="roles-section">
      <div className="roles-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <span className="sparkle">✦</span> CHOOSE YOUR EXPERIENCE
          </div>
          <h2 className="section-title">Built for Every Role</h2>
          <p className="section-description">
            Personalized workspaces tailored to how you engage with academic AI.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="roles-grid">
          {roles.map((role) => (
            <div
              key={role.title}
              className={`role-card glass-card accent-${role.accent}`}
            >
              <div className="role-icon-wrapper">
                <div className="icon-glow" />
                <div className="role-icon">
                  {role.icon}
                </div>
              </div>

              <div className="role-tag">{role.tag}</div>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>

              <button
                className={`role-cta-btn accent-${role.accent}`}
                onClick={() => navigate(role.route)}
              >
                {role.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Roles;