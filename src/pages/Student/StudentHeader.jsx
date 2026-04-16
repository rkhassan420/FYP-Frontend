import React from "react";
import "../../css/Teacher/TeacherHeader.css";
// Reusing your existing icons
import { Icon, ICONS } from "../Teacher/TeacherIcons"; 

export default function StudentHeader() {
  return (
    <header className="header">
      <div>
        {/* <h2 className="header-title">Dashboard</h2> */}
        <p className="header-subtitle">
          Welcome back, <strong>Alex Johnson</strong>
        </p>
      </div>

      <div className="header-actions">
        <button className="notif-btn">
          {/* <Icon d={ICONS.bell} size={20} /> */}
          <span>🌙</span>
          <span className="notif-dot" />
        </button>

        <div className="avatar">AJ</div>
      </div>
    </header>
  );
}