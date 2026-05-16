// import React from "react";
// import { Icon, ICONS } from "../Teacher/TeacherIcons";

// /**
//  * StudentDashboardStats
//  *
//  * Displays the four summary stat cards on the student dashboard.
//  *
//  * Props:
//  *  - joinedClasses       {number}  Count of joined classes
//  *  - pendingAssignments  {number}  Count of pending assignments
//  *  - submitted           {number}  Count of submitted assignments
//  *  - reportsReady        {number}  Count of ready reports
//  */
// export default function StudentDashboardStats({
//   joinedClasses      = 0,
//   pendingAssignments = 0,
//   submitted          = 0,
//   reportsReady       = 0,
// }) {
//   return (
//     <div className="stats-grid">
//       <div className="stat-card">
//         <div>
//           <p className="stat-label">Joined Classes</p>
//           <h3 className="stat-value">{joinedClasses}</h3>
//         </div>
//         <div className="stat-icon icon-blue">
//           <Icon d={ICONS.bookOpen} size={24} />
//         </div>
//       </div>

//       <div className="stat-card">
//         <div>
//           <p className="stat-label">Pending Assignments</p>
//           <h3 className="stat-value">{pendingAssignments}</h3>
//         </div>
//         <div className="stat-icon icon-orange">
//           <Icon d={ICONS.inbox} size={24} />
//         </div>
//       </div>

//       <div className="stat-card">
//         <div>
//           <p className="stat-label">Submitted</p>
//           <h3 className="stat-value">{submitted}</h3>
//         </div>
//         <div className="stat-icon icon-green">
//           <Icon d={ICONS.fileText} size={24} />
//         </div>
//       </div>

//       <div className="stat-card">
//         <div>
//           <p className="stat-label">Reports Ready</p>
//           <h3 className="stat-value">{reportsReady}</h3>
//         </div>
//         <div className="stat-icon icon-purple">
//           <Icon d={ICONS.users} size={24} />
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import apiClient from "../../services/apiClient";

export default function StudentDashboardStats() {
  const [stats, setStats] = useState({
    total_classes:      0,
    total_assignments:  0,
    total_submissions:  0,
    completed_reports:  0,
    pending_assignments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.get("/dashboard/student_overview/");
        setStats(data);
      } catch (err) {
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="stat-label">Loading stats...</p>;
  if (error) return <p style={{ color: "#ef4444" }}>{error}</p>;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div>
          <p className="stat-label">Joined Classes</p>
          <h3 className="stat-value">{stats.total_classes}</h3>
        </div>
        <div className="stat-icon icon-blue">
          <Icon d={ICONS.bookOpen} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Pending Assignments</p>
          <h3 className="stat-value">{stats.pending_assignments}</h3>
        </div>
        <div className="stat-icon icon-orange">
          <Icon d={ICONS.inbox} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Submitted</p>
          <h3 className="stat-value">{stats.total_submissions}</h3>
        </div>
        <div className="stat-icon icon-green">
          <Icon d={ICONS.fileText} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Reports Ready</p>
          <h3 className="stat-value">{stats.completed_reports}</h3>
        </div>
        <div className="stat-icon icon-purple">
          <Icon d={ICONS.users} size={24} />
        </div>
      </div>
    </div>
  );
}