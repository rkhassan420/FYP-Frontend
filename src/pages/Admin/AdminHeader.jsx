import React from "react";
import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons"; 
import "../../css/Admin/adminHeader.css";

const AdminHeader = () => {
  return (
    <header className="top-header">
      {/* Search Bar Removed */}
      <div className="header-left">
        {/* You can leave this empty or add a title/breadcrumb later if needed */}
      </div>

      {/* Right Side Actions & Profile */}
      <div className="header-actions">
        
        {/* Moon Emoji Icon */}
        <div className="icon-btn theme-toggle-btn" aria-label="Theme">
          <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>🌙</span>
        </div>

        
      </div>
    </header>
  );
};

export default AdminHeader;