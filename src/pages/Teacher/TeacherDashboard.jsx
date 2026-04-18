import React, { useState } from "react";
import "../../css/Teacher/TeacherDashboard.css";
import Sidebar from "./TeacherSidebar";
import Header from "./TeacherHeader";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import Evaluator from "../../components/Evaluator/Evaluator"
import TeacherClasses from "../../pages/Teacher/TeacherClasses"
import AddStudents from "../../pages/Teacher/AddStudents";
import AssignAssignments from "../../pages/Teacher/AssignAssignment";
import Setting from "../../pages/Teacher/Setting";

export default function Dashboard() {
 
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activePage, setActivePage] = useState(() => {
  return localStorage.getItem("teacherActivePage") || "dashboard";
});

  return (
    <div className="app-layout">
      {/* Sidebar always visible */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main">
        {/* ─── Dashboard Page ─── */}
        {activePage === "dashboard" && (
          <>
            <Header />

            {/* Add dashboard class to keep padding for normal pages */}
            <div className={`content dashboard ${isFullscreen ? "hide-dashboard" : ""}`}>
              {/* Stats Cards */}
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

              {/* Lower grid */}
              <div className="lower-grid">
                <div className="panel-card">
                  <div className="panel-header">
                    <h3 className="panel-title">Recent Submissions</h3>
                  </div>

                  <div className="table-wrapper">
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
                        <tr>
                          <td className="student-name">Alex Johnson</td>
                          <td>Essay Analysis</td>
                          <td><span className="badge badge-submitted">Submitted</span></td>
                          <td className="score">—</td>
                          <td><button className="action-btn review">Review</button></td>
                        </tr>
                         <tr>
                          <td className="student-name">Alex Johnson</td>
                          <td>Essay Analysis</td>
                          <td><span className="badge badge-submitted">Submitted</span></td>
                          <td className="score">—</td>
                          <td><button className="action-btn review">Review</button></td>
                        </tr>
                         <tr>
                          <td className="student-name">Emma Davis</td>
                          <td>Code Review</td>
                          <td><span className="badge badge-reviewed">Reviewed</span></td>
                          <td className="score">92/100</td>
                          <td><button className="action-btn view">View</button></td>
                        </tr>
                         
                         <tr>
                          <td className="student-name">Alex Johnson</td>
                          <td>Essay Analysis</td>
                          <td><span className="badge badge-submitted">Submitted</span></td>
                          <td className="score">—</td>
                          <td><button className="action-btn review">Review</button></td>
                        </tr>
                         <tr>
                          <td className="student-name">Alex Johnson</td>
                          <td>Essay Analysis</td>
                          <td><span className="badge badge-submitted">Submitted</span></td>
                          <td className="score">—</td>
                          <td><button className="action-btn review">Review</button></td>
                        </tr>
                        <tr>
                          <td className="student-name">Emma Davis</td>
                          <td>Code Review</td>
                          <td><span className="badge badge-reviewed">Reviewed</span></td>
                          <td className="score">92/100</td>
                          <td><button className="action-btn view">View</button></td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>

                
                <Evaluator
                  fullscreen={isFullscreen}
                  setFullscreen={setIsFullscreen}
                />
              </div>
            </div>
          </>
        )}

        {/* ─── Fullscreen Evaluator Page ─── */}
        {activePage === "evaluator" && (
          <div className="content full">
            <Evaluator
              fullscreen={false}
              setFullscreen={() => {}}
            />
          </div>
        )}

        {activePage === "create-classes" && (
          <div className="content full">
            <TeacherClasses />
          </div>
        )}

         {activePage === "students" && (
          <div className="content full">
            <AddStudents />
          </div>
        )}

        
         {activePage === "assignments" && (
          <div className="content full">
            <AssignAssignments />
          </div>
        )}


          {activePage === "setting" && (
          <div className="content full">
            <Setting />
          </div>
        )}

        


      </main>
    </div>
  );
}