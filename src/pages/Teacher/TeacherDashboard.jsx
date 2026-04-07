import React, { useState } from "react";
import "../../css/Teacher/TeacherDashboard.css";
import Sidebar from "./TeacherSidebar";
import Header from "./TeacherHeader";
import { Icon, ICONS } from "../Teacher/TeacherIcons";
import Evaluator from "./Evaluator";


export default function Dashboard() {

  const [content, setContent] = useState("");

  return (
    <div className="app-layout">
      
      <Sidebar />
      
      <main className="main">
        
        <Header />
        
        <div className="content">
          
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

                        <td>
                          <span className="badge badge-submitted">Submitted</span>
                        </td>

                        <td className="score">—</td>

                        <td>
                          <button className="action-btn review">Review</button>
                        </td>
                      </tr>


                      <tr>
                        <td className="student-name">Emma Davis</td>
                        <td>Code Review</td>

                        <td>
                          <span className="badge badge-reviewed">Reviewed</span>
                        </td>

                        <td className="score">92/100</td>

                        <td>
                          <button className="action-btn view">View</button>
                        </td>
                      </tr>

                      <tr>
                        <td className="student-name">James Wilson</td>
                        <td>Literature Review</td>

                        <td>
                          <span className="badge badge-pending">Pending</span>
                        </td>

                        <td className="score">—</td>

                        <td>
                          <button className="action-btn review">Review</button>
                        </td>
                      </tr>

                     
                      
                       <tr>
                        <td className="student-name">Maria Garcia</td>
                        <td>Research Paper</td>

                        <td>
                          <span className="badge badge-reviewed">Reviewed</span>
                        </td>

                        <td className="score">88/100</td>

                        <td>
                          <button className="action-btn view">View</button>
                        </td>
                      </tr>
                     
                       <tr>
                        <td className="student-name">Maria Garcia</td>
                        <td>Research Paper</td>

                        <td>
                          <span className="badge badge-reviewed">Reviewed</span>
                        </td>

                        <td className="score">88/100</td>

                        <td>
                          <button className="action-btn view">View</button>
                        </td>
                      </tr>
                                       
                      
                      
                    </tbody>
                </table>
              </div>
            </div>


            <Evaluator
              content={content}
              setContent={setContent}
            />


          </div>
        </div>
      </main>  

    </div>
  );
}