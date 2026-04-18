import React from "react";
import { useNavigate } from "react-router-dom";
import "./Roles.css"

const BookOpenIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const GradCapIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const GuestUserIcon = () => (
  <svg width="36"  height="36"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    <line x1="18" y1="8" x2="18" y2="12" />
    <line x1="16" y1="10" x2="20" y2="10" />
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
      icon: <GuestUserIcon/>, title: "Guest", route: "/teacher/dashboard", color: "role-purple", btn: "btn-role-purple",
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
