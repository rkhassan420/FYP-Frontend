import React, { useState } from "react";
import { Icon, ICONS } from "../Teacher/TeacherIcons"; 
import { useNavigate } from "react-router-dom";
import "../../css/Teacher/TeacherSidebar.css"; 

export default function StudentSidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
    // Updated to use student-specific local storage
    localStorage.setItem("studentActivePage", page);
  };

  const handleLogout = () => {
    // Updated route to student login
    navigate("/login/student");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {collapsed ? (
          <div className="collapsed-logo-wrapper">
            <div className="sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>

            <button
              className="collapse-btn collapsed-expand-btn"
              onClick={() => setCollapsed(false)}
              title="Expand"
            >
              <img src="/collapse.png" alt="expand" />
            </button>
          </div>
        ) : (
          <>
            <div className="sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>

            <div className="sidebar-title-container">
              <div className="sidebar-title">AI Content Evaluator</div>
              {/* Updated Subtitle */}
              <div className="sidebar-subtitle">Student Portal</div>
            </div>

            <button
              className="collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse"
            >
              <img src="/collapse.png" alt="collapse" />
            </button>
          </>
        )}
      </div>

      <nav className="sidebar-nav">
        <div
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => handlePageChange("dashboard")}
        >
          <Icon d={ICONS.dashboard} size={18} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        {/* ─── New Student Specific Links ─── */}
        
        <div
          className={`nav-item ${activePage === "join-class" ? "active" : ""}`}
          onClick={() => handlePageChange("join-class")}
        >
          {/* Using zap or a plus icon if you have one in ICONS */}
          <Icon d={ICONS.zap} size={18} />
          {!collapsed && <span>Join Class</span>}
        </div>

        <div
          className={`nav-item ${activePage === "my-classes" ? "active" : ""}`}
          onClick={() => handlePageChange("my-classes")}
        >
          <Icon d={ICONS.bookOpen} size={18} />
          {!collapsed && <span>My Classes</span>}
        </div>

        <div
          className={`nav-item ${activePage === "assignments" ? "active" : ""}`}
          onClick={() => handlePageChange("assignments")}
        >
          <Icon d={ICONS.fileText} size={18} />
          {!collapsed && <span>Assignments</span>}
        </div>

        <div
          className={`nav-item ${activePage === "reports" ? "active" : ""}`}
          onClick={() => handlePageChange("reports")}
        >
          {/* Using the inbox/reports icon */}
          <Icon d={ICONS.inbox} size={18} />
          {!collapsed && <span>Reports</span>}
        </div>

        <div
          className={`nav-item ${activePage === "setting" ? "active" : ""}`}
          onClick={() => handlePageChange("setting")}
        >
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Profile & Settings</span>}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item logout" onClick={handleLogout}>
          <Icon d={ICONS.logOut} size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}