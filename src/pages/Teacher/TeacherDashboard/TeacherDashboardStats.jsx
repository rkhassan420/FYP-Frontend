import React, { useEffect, useState } from "react";
import { Icon, ICONS } from "../TeacherIcons";
import apiClient from "../../../services/apiClient";
import "./TeacherDashboardStats.css";

export default function TeacherDashboardStats() {
  const [stats, setStats] = useState({
    total_classes: 0,
    total_students: 0,
    total_assignments: 0,
    total_submissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.get("/dashboard/teacher_overview/");
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
          <p className="stat-label">Total Classes</p>
          <h3 className="stat-value">{stats.total_classes}</h3>
        </div>
        <div className="stat-icon icon-blue">
          <Icon d={ICONS.bookOpen} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Total Students</p>
          <h3 className="stat-value">{stats.total_students}</h3>
        </div>
        <div className="stat-icon icon-green">
          <Icon d={ICONS.users} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Assignments Created</p>
          <h3 className="stat-value">{stats.total_assignments}</h3>
        </div>
        <div className="stat-icon icon-purple">
          <Icon d={ICONS.fileText} size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <p className="stat-label">Submissions Received</p>
          <h3 className="stat-value">{stats.total_submissions}</h3>
        </div>
        <div className="stat-icon icon-orange">
          <Icon d={ICONS.inbox} size={24} />
        </div>
      </div>
    </div>
  );
}