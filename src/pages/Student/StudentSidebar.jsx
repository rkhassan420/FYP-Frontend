import React, { useState } from "react";
import { Icon, ICONS } from "../Teacher/TeacherIcons"; 
import { useNavigate } from "react-router-dom";
import "../Teacher/TeacherSidebar/TeacherSidebar.css"; 

export default function StudentSidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem("studentActivePage", page);
  };

  const handleLogout = () => {
    navigate("/login/student");
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
              className="teacher-expand-btn"
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
                Student Portal
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
          className={`teacher-nav-item ${activePage === "join-class" ? "active" : ""}`}
          onClick={() => handlePageChange("join-class")}
        >
          <Icon d={ICONS.zap} size={18} />
          {!collapsed && <span>Join Class</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "my-classes" ? "active" : ""}`}
          onClick={() => handlePageChange("my-classes")}
        >
          <Icon d={ICONS.bookOpen} size={18} />
          {!collapsed && <span>My Classes</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "assignments" ? "active" : ""}`}
          onClick={() => handlePageChange("assignments")}
        >
          <Icon d={ICONS.fileText} size={18} />
          {!collapsed && <span>Assignments</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "reports" ? "active" : ""}`}
          onClick={() => handlePageChange("reports")}
        >
          <Icon d={ICONS.inbox} size={18} />
          {!collapsed && <span>Reports</span>}
        </div>

        <div
          className={`teacher-nav-item ${activePage === "setting" ? "active" : ""}`}
          onClick={() => handlePageChange("setting")}
        >
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Profile & Settings</span>}
        </div>
      </nav>

      <div className="teacher-sidebar-footer">
        <div className="teacher-nav-item logout" onClick={handleLogout}>
          <Icon d={ICONS.logOut} size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}