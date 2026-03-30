import React from "react";
import "../../css/Demo/demo.css";

export default function TeacherDemo() {
  const demoClasses = [
    { name: "BSCS - Section A", students: 35 },
    { name: "BSIT - Section B", students: 28 },
  ];

  return (
    <div className="demo-page">

      {/* Demo Banner */}
      <div className="demo-banner">
        🚀 Demo Mode – Limited Access (Login for full features)
      </div>

      <h1>Teacher Dashboard (Demo)</h1>

      {/* Classes */}
      <div className="card">
        <h2>Your Classes</h2>
        {demoClasses.map((cls, i) => (
          <div key={i} className="list-item">
            {cls.name} - {cls.students} students
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="card">
        <h2>Actions</h2>

        <button
          className="btn"
          onClick={() => alert("🔒 Login to create real classes")}
        >
          + Create Class
        </button>

        <button
          className="btn"
          onClick={() => alert("🔒 Login to upload assignments")}
        >
          Upload Assignment
        </button>
      </div>

      {/* Fake Results */}
      <div className="card">
        <h2>Recent Results</h2>
        <p>Ali – 85% (Good work)</p>
        <p>Sara – 92% (Excellent)</p>
      </div>

    </div>
  );
}