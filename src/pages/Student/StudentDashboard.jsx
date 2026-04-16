import React, { useState } from "react";
import "../../css/Teacher/TeacherDashboard.css"; 

import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";
import { Icon, ICONS } from "../Teacher/TeacherIcons"; 

import StudentJoinClass from './StudentJoinClass'
import StudentClasses from "../../pages/Student/StudentCLasses";
import StudentAssignments from "../../pages/Student/StudentAssignments";
import StudentReports from "../../pages/Student/StudentReports";
import StudentSetting from "../../pages/Student/StudentSetting";

export default function StudentDashboard() {
  
  // Removed isFullscreen since the Evaluator tool is only for teachers

  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("studentActivePage") || "dashboard";
  });

  return (
    <div className="app-layout">
      {/* Sidebar always visible */}
      <StudentSidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main">
        {/* ─── Dashboard Page ─── */}
        {activePage === "dashboard" && (
          <>
            <StudentHeader />

            <div className="content dashboard">
              {/* Stats Cards based on your FYP roadmap */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div>
                    <p className="stat-label">Joined Classes</p>
                    <h3 className="stat-value">5</h3>
                  </div>
                  <div className="stat-icon icon-blue">
                    <Icon d={ICONS.bookOpen} size={24} />
                  </div>
                </div>

                <div className="stat-card">
                  <div>
                    <p className="stat-label">Pending Assignments</p>
                    <h3 className="stat-value">3</h3>
                  </div>
                  <div className="stat-icon icon-orange">
                    {/* Assuming you have a clock or alert icon, using inbox as fallback */}
                    <Icon d={ICONS.inbox} size={24} /> 
                  </div>
                </div>

                <div className="stat-card">
                  <div>
                    <p className="stat-label">Submitted</p>
                    <h3 className="stat-value">8</h3>
                  </div>
                  <div className="stat-icon icon-green">
                    <Icon d={ICONS.fileText} size={24} />
                  </div>
                </div>

                <div className="stat-card">
                  <div>
                    <p className="stat-label">Reports Ready</p>
                    <h3 className="stat-value">2</h3>
                  </div>
                  <div className="stat-icon icon-purple">
                    {/* Reusing users icon as placeholder for reports/awards */}
                    <Icon d={ICONS.users} size={24} />
                  </div>
                </div>
              </div>

              {/* Lower grid - Showing Pending Work & Recent Reports instead of submissions */}
              <div className="lower-grid">
                <div className="panel-card">
                  <div className="panel-header">
                    <h3 className="panel-title">Upcoming Deadlines</h3>
                  </div>

                  <div className="table-wrapper">
                    <table className="submissions-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Assignment</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="student-name">Web Engineering</td>
                          <td>React Frontend</td>
                          <td>Tomorrow, 11:59 PM</td>
                          <td><span className="badge badge-pending" style={{backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px'}}>Pending</span></td>
                          <td><button className="action-btn review" onClick={() => setActivePage("assignments")}>Open</button></td>
                        </tr>
                        <tr>
                          <td className="student-name">Database Systems</td>
                          <td>SQL Normalization</td>
                          <td>Oct 25, 2024</td>
                          <td><span className="badge badge-pending" style={{backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px'}}>Pending</span></td>
                          <td><button className="action-btn review" onClick={() => setActivePage("assignments")}>Open</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Secondary Panel: Recent Reports */}
                <div className="panel-card">
                  <div className="panel-header">
                    <h3 className="panel-title">Recent AI Reports</h3>
                  </div>
                  <div className="table-wrapper">
                    <table className="submissions-table">
                      <thead>
                        <tr>
                          <th>Assignment</th>
                          <th>AI Score</th>
                          <th>Overall</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="student-name">Software Requirement Spec</td>
                          <td><span style={{color: 'green'}}>12%</span></td>
                          <td className="score">88/100</td>
                          <td><button className="action-btn view" onClick={() => setActivePage("reports")}>View Report</button></td>
                        </tr>
                         <tr>
                          <td className="student-name">Ethics Essay</td>
                          <td><span style={{color: 'red'}}>84%</span></td>
                          <td className="score">45/100</td>
                          <td><button className="action-btn view" onClick={() => setActivePage("reports")}>View Report</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* ─── Student Portal Pages ─── */}
        
        {activePage === "join-class" && (
          <div className="content full">
            <StudentJoinClass />
          </div>
        )}

          {activePage === "my-classes" && (
          <div className="content full">
            <StudentClasses setActivePage={setActivePage}  />
          </div>
        )}

         {activePage === "assignments" && (
          <div className="content full">
            <StudentAssignments />
          </div>
        )}

          {activePage === "reports" && (
          <div className="content full">
            <StudentReports />
          </div>
        )}

          {activePage === "setting" && (
          <div className="content full">
            <StudentSetting />
          </div>
        )}

        

      </main>
    </div>
  );
}