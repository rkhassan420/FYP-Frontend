import React, { useState } from "react";
import { Icon, ICONS } from "../TeacherIcons";
import { useNavigate } from "react-router-dom";
import "./TeacherSidebar.css";

export default function TeacherSidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem("teacherActivePage", page);
  };

  const handleLogout = () => {
    navigate("/login/teacher");
  };

  return (
    <aside className={`teacher-sidebar ${collapsed ? "collapsed" : ""}`}>
      
     
      <div className="teacher-sidebar-header">
        {collapsed ? (
          <div className="teacher-collapsed-logo-wrapper">
            <div className="teacher-sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>

            <button
              className="teacher-collapse-btn teacher-expand-btn"
              onClick={() => setCollapsed(false)}
              title="Expand"
            >
              <img src="/collapse.png" alt="expand" />
            </button>
          </div>
        ) : (
          <>
            <div className="teacher-sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>

            <div className="teacher-sidebar-title-container">
              <div className="teacher-sidebar-title">
                AI Content Evaluator
              </div>
              <div className="teacher-sidebar-subtitle">
                Teacher Portal
              </div>
            </div>

            <button
              className="teacher-collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse"
            >
              <img src="/collapse.png" alt="collapse" />
            </button>
          </>
        )}
      </div>

     
      <nav className="teacher-sidebar-nav">
        <div
          className={`teacher-nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => handlePageChange("dashboard")}
        >
          <Icon d={ICONS.dashboard} size={18} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "evaluator" ? "active" : ""}`}
          onClick={() => handlePageChange("evaluator")}
        >
          <Icon d={ICONS.zap} size={18} />
          {!collapsed && <span>AI Evaluator</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "create-classes" ? "active" : ""}`}
          onClick={() => handlePageChange("create-classes")}
        >
          <Icon d={ICONS.bookOpen} size={18} />
          {!collapsed && <span>Classes</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "students" ? "active" : ""}`}
          onClick={() => handlePageChange("students")}
        >
          <Icon d={ICONS.users} size={18} />
          {!collapsed && <span>Students</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "assignments" ? "active" : ""}`}
          onClick={() => handlePageChange("assignments")}
        >
          <Icon d={ICONS.fileText} size={18} />
          {!collapsed && <span>Assignments</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "setting" ? "active" : ""}`}
          onClick={() => handlePageChange("setting")}
        >
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Settings</span>}
        </div>
      </nav>

      {/* FOOTER */}
      <div className="teacher-sidebar-footer">
        <div className="teacher-nav-item logout" onClick={handleLogout}>
          <Icon d={ICONS.logOut} size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}