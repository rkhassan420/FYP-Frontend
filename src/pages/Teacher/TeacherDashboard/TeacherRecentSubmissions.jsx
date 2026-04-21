import React from "react";
import "./TeacherRecentSubmissions.css";

// 1. Define your data here (or fetch it from an API)
const submissionsData = [
  {
    id: 1,
    name: "Alex Johnson",
    assignment: "Essay Analysis",
    status: "Submitted",
    score: null, // No score yet
  },
  {
    id: 2,
    name: "Alex Johnson",
    assignment: "Essay Analysis",
    status: "Submitted",
    score: null,
  },
  {
    id: 3,
    name: "Emma Davis",
    assignment: "Code Review",
    status: "Reviewed",
    score: "92/100",
  },
  {
    id: 4,
    name: "Alex Johnson",
    assignment: "Essay Analysis",
    status: "Submitted",
    score: null,
  },
  {
    id: 5,
    name: "Emma Davis",
    assignment: "Code Review",
    status: "Reviewed",
    score: "92/100",
  },

  

  {
    id: 5,
    name: "Emma Davis",
    assignment: "Code Review",
    status: "Reviewed",
    score: "92/100",
  },
    {
    id: 4,
    name: "Alex Johnson",
    assignment: "Essay Analysis",
    status: "Submitted",
    score: null,
  },
  {
    id: 5,
    name: "Emma Davis",
    assignment: "Code Review",
    status: "Reviewed",
    score: "92/100",
  },
    {
    id: 4,
    name: "Alex Johnson",
    assignment: "Essay Analysis",
    status: "Submitted",
    score: null,
  },
  {
    id: 5,
    name: "Emma Davis",
    assignment: "Code Review",
    status: "Reviewed",
    score: "92/100",
  }
  
];

// 2. Set the default prop to use the data array
export default function TeacherRecentSubmissions({ submissions = submissionsData }) {
  return (
    <div className="panel-card">
      <div className="panel-header">
        <h3 className="panel-title">Recent Submissions</h3>
      </div>

      <div className="table-wrapper">
        {/* Check if the array is empty */}
        {submissions.length === 0 ? (
          <div className="empty-state">
            <p>No record found</p>
          </div>
        ) : (
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Assignment</th>
                <th>Status</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through the data array */}
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  <td className="student-name">{sub.name}</td>
                  <td>{sub.assignment}</td>
                  <td>
                    {/* Dynamically assign the badge class based on status */}
                    <span className={`badge badge-${sub.status.toLowerCase()}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="score">{sub.score || "—"}</td>
                  <td>
                    {/* Dynamically assign the button text and class based on status */}
                    <button className={`action-btn ${sub.status === "Submitted" ? "review" : "view"}`}>
                      {sub.status === "Submitted" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}