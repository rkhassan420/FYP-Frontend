import React from "react";
import { Icon, ICONS } from "./TeacherIcons";
import "../../css/Teacher/TeacherHeader.css";

export default function Header() {
  return (
    <header className="header">
      <div>
        {/* <h2 className="header-title">Dashboard</h2> */}
        <p className="header-subtitle">
          Welcome back, <strong>Dr. Salman Khan</strong>
        </p>
      </div>

      <div className="header-actions">
        <button className="notif-btn">
          {/* <Icon d={ICONS.bell} size={20} /> */}
          <span>🌙</span>
          <span className="notif-dot" />
        </button>

        <div className="avatar">SK</div>
      </div>
    </header>
  );
}