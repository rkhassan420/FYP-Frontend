import React, { useState, useContext, useEffect } from "react";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/Theme/ThemeContext";
import { authService, clearAuthSession, getRefreshToken } from "../../services";
import "../Teacher/TeacherSidebar/TeacherSidebar.css";

export default function StudentSidebar({ activePage, setActivePage }) {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("studentSidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

 
  useEffect(() => {
    const savedPage = localStorage.getItem("studentActivePage");
    if (savedPage) setActivePage(savedPage);
  }, [setActivePage]);

 
  useEffect(() => {
    localStorage.setItem("studentSidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handlePageChange = (page) => {
    setActivePage(page);
    localStorage.setItem("studentActivePage", page);
  };

  const handleLogout = async () => {
  const refresh = getRefreshToken();

  if (refresh) {
    try {
      await authService.logout({ refresh });
    } catch {
      // Local cleanup should still happen if the token is already expired.
    }
  }
 
  clearAuthSession();
  localStorage.removeItem("studentActivePage"); 
  localStorage.removeItem("studentSidebarCollapsed");
  navigate("/login/student");
};

 
  const collapseIcon =
    theme === "dark-theme" ? "/collapse-white.png" : "/collapse.png";


  return (
    <aside className={`teacher-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* HEADER */}
      <div className="teacher-sidebar-header">
        {collapsed ? (
          <div className="teacher-collapsed-logo-wrapper">
            
            <div className="teacher-sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>

            {/* EXPAND */}
            <button
              className="teacher-expand-btn"
              onClick={() => setCollapsed(false)}
              title="Expand"
              style={{cursor:'pointer'}}
            >
              <img src={collapseIcon} alt="expand" />
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

            {/* COLLAPSE */}
            <button
              className="teacher-collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse"
            >
              <img src={collapseIcon} alt="collapse" />
            </button>
          </>
        )}
      </div>

      {/* NAVIGATION */}
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
