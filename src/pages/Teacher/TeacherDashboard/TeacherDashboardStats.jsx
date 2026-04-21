import React from "react";
import { Icon, ICONS } from "../TeacherIcons"; 
import "./TeacherDashboardStats.css"

export default function TeacherDashboardStats() {
  

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div>
          <p className="stat-label">Total Classes</p>
          <h3 className="stat-value">12</h3>
        </div>
        <div className="stat-icon icon-blue">
          <Icon d={ICONS.bookOpen} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Total Students</p>
          <h3 className="stat-value">324</h3>
        </div>
        <div className="stat-icon icon-green">
          <Icon d={ICONS.users} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Assignments Created</p>
          <h3 className="stat-value">28</h3>
        </div>
        <div className="stat-icon icon-purple">
          <Icon d={ICONS.fileText} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Submissions Received</p>
          <h3 className="stat-value">312</h3>
        </div>
        <div className="stat-icon icon-orange">
          <Icon d={ICONS.inbox} size={24} />
        </div>
      </div>
    </div>
  );
}