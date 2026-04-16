import React, { useState } from "react";
import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons"; 
import { useNavigate } from "react-router-dom";
import "../../css/Teacher/TeacherSidebar.css"; 

export default function AdminSidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Update state and localStorage simultaneously
  const handleNavigation = (page) => {
    setActivePage(page);
    localStorage.setItem("adminActivePage", page);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminActivePage");
    navigate("/login/admin"); // Adjust this route to match your admin login page
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
              <div className="sidebar-subtitle">Admin Portal</div>
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
          onClick={() => handleNavigation("dashboard")}
        >
          <Icon d={ICONS.dashboard || ICONS.home} size={18} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        <div 
          className={`nav-item ${activePage === "add-students" ? "active" : ""}`}
          onClick={() => handleNavigation("add-students")}
        >
          <Icon d={ICONS.users} size={18} />
          {!collapsed && <span>Manage Students</span>}
        </div>

        <div 
          className={`nav-item ${activePage === "teacher-manage" ? "active" : ""}`}
          onClick={() => handleNavigation("teacher-manage")}
        >
          <Icon d={ICONS.users} size={18} />
          {!collapsed && <span>Manage Teacher</span>}
        </div>

        {/* <div 
          className={`nav-item ${activePage === "configure-rules" ? "active" : ""}`}
          onClick={() => handleNavigation("configure-rules")}
        >
          
          <Icon d={ICONS.sliders || ICONS.settings} size={18} /> 
          {!collapsed && <span>Configure Rules</span>}
        </div> */}

        {/* <div 
          className={`nav-item ${activePage === "setting" ? "active" : ""}`}
          onClick={() => handleNavigation("setting")}
        >
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Settings</span>}
        </div> */}
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item logout" onClick={handleLogout}>
          <Icon d={ICONS.logOut || ICONS.logout} size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
      
    </aside>
  );
}