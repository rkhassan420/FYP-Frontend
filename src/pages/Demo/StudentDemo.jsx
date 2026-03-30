import React from "react";
import "../../css/Demo/demo.css";

export default function StudentDemo() {
  return (
    <div className="demo-page">

      <div className="demo-banner">
        🚀 Demo Mode – Limited Access (Login for full features)
      </div>

      <h1>Student Dashboard (Demo)</h1>

      {/* Upload Section */}
      <div className="card">
        <h2>Submit Assignment</h2>

        <input type="file" />

        <button
          className="btn"
          onClick={() => alert("🔒 Demo limit reached. Login to continue")}
        >
          Submit
        </button>
      </div>

      {/* Fake Result */}
      <div className="card">
        <h2>Last Submission</h2>
        <p>Score: 88%</p>
        <p>Feedback: Well written, minor grammar issues</p>
      </div>

    </div>
  );
}