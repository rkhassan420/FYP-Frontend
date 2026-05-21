// import React, { useState } from "react";
// import "../Student/StudentDashboard.css"; 
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";
// import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons"; // Assuming you have an icons file
// import AdminAddStudents from '../../pages/Admin/AdminAddStudents';
// import AdminTeacherManagement from '../../pages/Admin/AdminTeacherManagement';


// export default function AdminDashboard() {
  
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   // Persist the active page in local storage
//   const [activePage, setActivePage] = useState(() => {
//     return localStorage.getItem("adminActivePage") || "dashboard";
//   });

//   return (
//     <div className="app-layout">
//       {/* Sidebar always visible */}
//       <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

//       <main className="main">
//         {/* ─── Dashboard Page ─── */}
//         {activePage === "dashboard" && (
//           <>
//             <AdminHeader />

//             {/* Add dashboard class to keep padding for normal pages */}
//             <div className={`content dashboard ${isFullscreen ? "hide-dashboard" : ""}`}>
//               {/* Stats Cards */}
//               <div className="stats-grid">
//                 <div className="stat-card">
//                   <div>
//                     <p className="stat-label">Total Students</p>
//                     <h3 className="stat-value">1,245</h3>
//                   </div>
//                   <div className="stat-icon icon-blue">
//                     <Icon d={ICONS.users} size={24} />
//                   </div>
//                 </div>

//                 <div className="stat-card">
//                   <div>
//                     <p className="stat-label">Total Teachers</p>
//                     <h3 className="stat-value">84</h3>
//                   </div>
//                   <div className="stat-icon icon-green">
//                     <Icon d={ICONS.users} size={24} />
//                   </div>
//                 </div>

//                 <div className="stat-card">
//                   <div>
//                     <p className="stat-label">Total Submissions</p>
//                     <h3 className="stat-value">8,932</h3>
//                   </div>
//                   <div className="stat-icon icon-purple">
//                     <Icon d={ICONS.inbox} size={24} />
//                   </div>
//                 </div>

//                 <div className="stat-card">
//                   <div>
//                     <p className="stat-label">Notifications</p>
//                     <h3 className="stat-value">3</h3>
//                   </div>
//                   <div className="stat-icon icon-orange">
//                     <Icon d={ICONS.bell} size={24} />
//                   </div>
//                 </div>
//               </div>

//               {/* Lower grid */}
//               <div className="lower-grid">
//                 <div className="panel-card" style={{ gridColumn: "1 / -1" }}> {/* Span full width for Admin table */}
//                   <div className="panel-header">
//                     <h3 className="panel-title">Recent User Registrations</h3>
//                   </div>

//                   <div className="table-wrapper">
//                     <table className="submissions-table">
//                       <thead>
//                         <tr>
//                           <th>User ID</th>
//                           <th>Full Name</th>
//                           <th>Email Address</th>
//                           <th>Role</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>#10452</td>
//                           <td className="student-name">Michael Smith</td>
//                           <td>m.smith@university.edu</td>
//                           <td><span className="badge badge-teacher">Teacher</span></td>
//                           <td><span className="badge badge-reviewed">Active</span></td>
//                           <td><button className="action-btn view">Manage</button></td>
//                         </tr>
//                         <tr>
//                           <td>#10453</td>
//                           <td className="student-name">Sarah Jenkins</td>
//                           <td>s.jenkins@student.edu</td>
//                           <td><span className="badge badge-student">Student</span></td>
//                           <td><span className="badge badge-reviewed">Active</span></td>
//                           <td><button className="action-btn view">Manage</button></td>
//                         </tr>
//                         <tr>
//                           <td>#10454</td>
//                           <td className="student-name">David Warner</td>
//                           <td>d.warner@student.edu</td>
//                           <td><span className="badge badge-student">Student</span></td>
//                           <td><span className="badge badge-submitted">Pending Verification</span></td>
//                           <td><button className="action-btn review">Review</button></td>
//                         </tr>
//                         <tr>
//                           <td>#10455</td>
//                           <td className="student-name">Dr. Emily Chen</td>
//                           <td>e.chen@university.edu</td>
//                           <td><span className="badge badge-teacher">Teacher</span></td>
//                           <td><span className="badge badge-reviewed">Active</span></td>
//                           <td><button className="action-btn view">Manage</button></td>
//                         </tr>
//                         {/* Add more rows as needed */}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

    
//         {activePage === "add-students" && (
//           <div className="content full">
//             <AdminAddStudents />
//           </div>
//         )}

      
//        {activePage === "teacher-manage" && (
//           <div className="content full">
//             <AdminTeacherManagement />
//           </div>
//         )}

    
//     {/*    {activePage === "configure-rules" && (
//           <div className="content full">
//             <ConfigureRules />
//           </div>
//         )}

      
//         {activePage === "setting" && (
//           <div className="content full">
//             <AdminSetting />
//           </div>
//         )} */}

//       </main>
//     </div>
//   );

// }


import React, { useEffect, useState } from "react";
import "../Student/StudentDashboard.css";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { Icon, ICONS } from "../../pages/Teacher/TeacherIcons";
import AdminAddStudents from "../../pages/Admin/AdminAddStudents";
import AdminTeacherManagement from "../../pages/Admin/AdminTeacherManagement";
import GuestManagement from "./GuestManage";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("adminActivePage") || "dashboard";
  });

  const [stats, setStats] = useState({});
  const [recentUsers, setRecentUsers] = useState([]);

  // ─── FETCH STATS ───
 // ─── FETCH STATS ───
const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://127.0.0.1:8000/api/auth/admin/stats/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStats(res.data);
  } catch (err) {
    console.log(err);
  }
};

// ─── FETCH USERS ───
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://127.0.0.1:8000/api/auth/admin/users/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const sorted = res.data.sort(
      (a, b) => new Date(b.date_joined) - new Date(a.date_joined)
    );
    setRecentUsers(sorted.slice(0, 5));
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  return (
    <div className="app-layout">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        {activePage === "dashboard" && (
          <>
            <AdminHeader />

            <div className="content dashboard">
              {/* ─── STATS CARDS ─── */}
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="stat-label">Total Students</p>
                  <h3 className="stat-value">
                    {stats.total_students || 0}
                  </h3>
                  <div className="stat-icon icon-blue">
                    <Icon d={ICONS.users} size={24} />
                  </div>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Total Teachers</p>
                  <h3 className="stat-value">
                    {stats.total_teachers || 0}
                  </h3>
                  <div className="stat-icon icon-green">
                    <Icon d={ICONS.users} size={24} />
                  </div>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Total Guests</p>
                  <h3 className="stat-value">
                    {stats.total_guests || 0}
                  </h3>
                  <div className="stat-icon icon-orange">
                    <Icon d={ICONS.users} size={24} />
                  </div>
                </div>

                <div className="stat-card">
                  <p className="stat-label">Total Users</p>
                  <h3 className="stat-value">
                    {stats.total_users || 0}
                  </h3>
                  <div className="stat-icon icon-purple">
                    <Icon d={ICONS.inbox} size={24} />
                  </div>
                </div>
              </div>

              {/* ─── RECENT USERS TABLE ─── */}
              <div className="lower-grid">
                <div
                  className="panel-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <div className="panel-header">
                    <h3 className="panel-title">
                      Recent Users (Latest Join)
                    </h3>
                  </div>

                  <div className="table-wrapper">
                    <table className="submissions-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Date Joined</th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentUsers.map((user, index) => (
                          <tr key={index}>
                            <td>#{user.id}</td>
                            <td className="student-name">
                              {user.full_name}
                            </td>
                            <td>{user.email}</td>
                            <td>
                              <span
                                className={
                                  user.role === "teacher"
                                    ? "badge badge-teacher"
                                    : user.role === "student"
                                    ? "badge badge-student"
                                    : "badge badge-review"
                                }
                              >
                                {user.role}
                              </span>
                            </td>
                            <td>
                              {new Date(
                                user.date_joined
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activePage === "add-students" && (
          <div className="content full">
            <AdminAddStudents />
          </div>
        )}

        {activePage === "teacher-manage" && (
          <div className="content full">
            <AdminTeacherManagement />
          </div>
        )}

         {activePage === "guest-manage" && (
          <div className="content full">
            <GuestManagement />
          </div>
        )}


      </main>
    </div>
  );
}