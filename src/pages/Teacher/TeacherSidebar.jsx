import React, { useState } from "react";
import { Icon, ICONS } from "./TeacherIcons";
import { useNavigate } from "react-router-dom";
import "../../css/Teacher/TeacherSidebar.css";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login/teacher");
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
        <div className="sidebar-subtitle">Teacher Portal</div>
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

      {/* <div className="sidebar-header">
          {collapsed ? (
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(false)}
              title="Expand"
            >
              <img src="/collapse.png" alt="expand" />
            </button>
          ) : (
            <>
              <div className="sidebar-logo">
                <img src="/logo.svg" height="34" alt="logo" />
              </div>

              <div className="sidebar-title-container">
                <div className="sidebar-title">AI Content Evaluator</div>
                <div className="sidebar-subtitle">Teacher Portal</div>
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
        </div> */}
              
    

      <nav className="sidebar-nav">
        <div className="nav-item active">
          <Icon d={ICONS.dashboard} size={18} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.zap} size={18} />
          {!collapsed && <span>AI Evaluator</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.bookOpen} size={18} />
          {!collapsed && <span>Classes</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.users} size={18} />
          {!collapsed && <span>Students</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.fileText} size={18} />
          {!collapsed && <span>Assignments</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.messageCircle} size={18} />
          {!collapsed && <span>Chat</span>}
        </div>

        <div className="nav-item">
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Settings</span>}
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