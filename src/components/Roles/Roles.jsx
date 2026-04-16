import React from "react";
import { useNavigate } from "react-router-dom";
import "./Roles.css"

const BookOpenIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const GradCapIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

function Roles() {

   const navigate = useNavigate();

  const roles = [
    {
      icon: <GradCapIcon />, title: "Teacher", route: "/login/teacher", color: "role-blue", btn: "btn-role-blue",
      desc: "Create assignments, set rubrics, review AI-generated evaluations, and track class performance with detailed analytics.",
      cta: "Continue as Teacher →",
    },
    {
      icon: <BookOpenIcon />, title: "Student", route: "/login/student", color: "role-green", btn: "btn-role-green",
      desc: "Submit work, receive instant AI feedback, view grades, check plagiarism scores, and improve with actionable suggestions.",
      cta: "Continue as Student →",
    },
    {
      icon: <SettingsIcon />, title: "Guest", route: "/teacher/dashboard", color: "role-purple", btn: "btn-role-purple",
      desc: "Manage users, configure system settings, monitor platform usage, and oversee the entire evaluation workflow.",
      cta: "Continue as Guest →",
    },
  ];
  return (
    <section id="roles" className="section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">Roles</span>
          <h2>Built for Everyone</h2>
          <p>Tailored experiences for every user in the academic ecosystem</p>
        </div>
        <div className="grid-3">
          {roles.map((r) => (
            <div className="role-card card-hover" key={r.title}>
              <div className={`role-avatar ${r.color}`}>{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <button className={`btn-role ${r.btn}`} onClick={() => navigate(r.route)} >{r.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} export default Roles;
