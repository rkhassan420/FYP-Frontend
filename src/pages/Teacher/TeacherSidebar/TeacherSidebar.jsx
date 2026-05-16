// import React, { useState, useContext, useEffect } from "react";
// import { Icon, ICONS } from "../TeacherIcons";
// import { useNavigate } from "react-router-dom";
// import { ThemeContext } from "../../../components/Theme/ThemeContext";
// import { authService, clearAuthSession, getRefreshToken } from "../../../services";
// import "./TeacherSidebar.css";

// export default function TeacherSidebar({ activePage, setActivePage }) {
//   const { theme } = useContext(ThemeContext);
  
//   const [collapsed, setCollapsed] = useState(() => {
//     const saved = localStorage.getItem("teacherSidebarCollapsed");
//     return saved ? JSON.parse(saved) : false;
//   });

//   const navigate = useNavigate();

//   const collapseIcon =   theme === "dark-theme" ? "/collapse-white.png" : "/collapse.png";

 
//   useEffect(() => {
//     localStorage.setItem("teacherSidebarCollapsed", JSON.stringify(collapsed));
//   }, [collapsed]);

//   const handlePageChange = (page) => {
//     setActivePage(page);
//     localStorage.setItem("teacherActivePage", page);
//   };

//  const handleLogout = async () => {
//   const refresh = getRefreshToken();

//   if (refresh) {
//     try {
//       await authService.logout({ refresh });
//     } catch {
//       // Local cleanup should still happen if the token is already expired.
//     }
//   }
  
//   clearAuthSession();
//   localStorage.removeItem("teacherActivePage");  
//   localStorage.removeItem("teacherSidebarCollapsed");
//   navigate("/login/teacher");
// };

//   return (
//     <aside className={`teacher-sidebar ${collapsed ? "collapsed" : ""}`}>
      
//       {/* HEADER */}
//       <div className="teacher-sidebar-header">
//         {collapsed ? (
//           <div className="teacher-collapsed-logo-wrapper">
//             <div className="teacher-sidebar-logo">
//               <img src="/logo.svg" height="34" alt="logo" />
//             </div>

//             <button
//               className="teacher-collapse-btn teacher-expand-btn"
//               onClick={() => setCollapsed(false)}
//               title="Expand"
//             >
//               <img src={collapseIcon} alt="expand" />
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="teacher-sidebar-logo">
//               <img src="/logo.svg" height="34" alt="logo" />
//             </div>

//             <div className="teacher-sidebar-title-container">
//               <div className="teacher-sidebar-title">
//                 AI Content Evaluator
//               </div>
//               <div className="teacher-sidebar-subtitle">
//                 Teacher Portal
//               </div>
//             </div>

//             <button
//               className="teacher-collapse-btn"
//               onClick={() => setCollapsed(true)}
//               title="Collapse"
//             >
//               <img src={collapseIcon} alt="collapse" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* NAVIGATION */}
//       <nav className="teacher-sidebar-nav">
//         <div
//           className={`teacher-nav-item ${activePage === "dashboard" ? "active" : ""}`}
//           onClick={() => handlePageChange("dashboard")}
//         >
//           <Icon d={ICONS.dashboard} size={18} />
//           {!collapsed && <span>Dashboard</span>}
//         </div>

//         {/* <div
//           className={`teacher-nav-item ${activePage === "evaluator" ? "active" : ""}`}
//           onClick={() => handlePageChange("evaluator")}
//         >
//           <Icon d={ICONS.zap} size={18} />
//           {!collapsed && <span>AI Evaluator</span>}
//         </div> */}

//         <div
//           className={`teacher-nav-item ${activePage === "create-classes" ? "active" : ""}`}
//           onClick={() => handlePageChange("create-classes")}
//         >
//           <Icon d={ICONS.bookOpen} size={18} />
//           {!collapsed && <span>Classes</span>}
//         </div>

//         {/* <div
//           className={`teacher-nav-item ${activePage === "students" ? "active" : ""}`}
//           onClick={() => handlePageChange("students")}
//         >
//           <Icon d={ICONS.users} size={18} />
//           {!collapsed && <span>Students</span>}
//         </div> */}

//         <div
//           className={`teacher-nav-item ${activePage === "assignments" ? "active" : ""}`}
//           onClick={() => handlePageChange("assignments")}
//         >
//           <Icon d={ICONS.fileText} size={18} />
//           {!collapsed && <span>Assignments</span>}
//         </div>

//         <div
//           className={`teacher-nav-item ${activePage === "setting" ? "active" : ""}`}
//           onClick={() => handlePageChange("setting")}
//         >
//           <Icon d={ICONS.settings} size={18} />
//           {!collapsed && <span>Settings</span>}
//         </div>
//       </nav>

//       {/* FOOTER */}
//       <div className="teacher-sidebar-footer">
//         <div className="teacher-nav-item logout" onClick={handleLogout}>
//           <Icon d={ICONS.logOut} size={18} />
//           {!collapsed && <span>Logout</span>}
//         </div>
//       </div>
//     </aside>
//   );
// }

import React, { useState, useContext, useEffect } from "react";
import { Icon, ICONS } from "../TeacherIcons";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../../components/Theme/ThemeContext";
import { authService, clearAuthSession, getRefreshToken } from "../../../services";
import "./TeacherSidebar.css";

export default function TeacherSidebar() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("teacherSidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const collapseIcon = theme === "dark-theme" ? "/collapse-white.png" : "/collapse.png";

  useEffect(() => {
    localStorage.setItem("teacherSidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // Check active page from URL instead of prop
  const isActive = (page) => location.pathname.includes(`/teacher/dashboard/${page}`);

  const handleLogout = async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        await authService.logout({ refresh });
      } catch {
        // Local cleanup should still happen if token is already expired
      }
    }
    clearAuthSession();
    localStorage.removeItem("teacherSidebarCollapsed");
    // navigate("/login/teacher");
    navigate("/login/teacher", { replace: true });
  };

  return (
    <aside className={`teacher-sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="teacher-sidebar-header">
        {collapsed ? (
          <div className="teacher-collapsed-logo-wrapper">
            <div className="teacher-sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>
            <button
              className="teacher-collapse-btn teacher-expand-btn"
              onClick={() => setCollapsed(false)}
              title="Expand"
            >
              <img src={collapseIcon} alt="expand" />
            </button>
          </div>
        ) : (
          <>
            <div className="teacher-sidebar-logo">
              <img src="/logo.svg" height="34" alt="logo" />
            </div>
            <div className="teacher-sidebar-title-container">
              <div className="teacher-sidebar-title">AI Content Evaluator</div>
              <div className="teacher-sidebar-subtitle">Teacher Portal</div>
            </div>
            <button
              className="teacher-collapse-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse"
            >
              <img src={collapseIcon} alt="collapse" />
            </button>
          </>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="teacher-sidebar-nav">

        <div
          className={`teacher-nav-item ${isActive("home") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/home")}
        >
          <Icon d={ICONS.dashboard} size={18} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        <div
          className={`teacher-nav-item ${isActive("evaluator") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/evaluator")}
        >
          <Icon d={ICONS.zap} size={18} />
          {!collapsed && <span>AI Evaluator</span>}
        </div>

        <div
          className={`teacher-nav-item ${isActive("create-classes") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/create-classes")}
        >
          <Icon d={ICONS.bookOpen} size={18} />
          {!collapsed && <span>Classes</span>}
        </div>

        {/* <div
          className={`teacher-nav-item ${isActive("students") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/students")}
        >
          <Icon d={ICONS.users} size={18} />
          {!collapsed && <span>Students</span>}
        </div> */}

        <div
          className={`teacher-nav-item ${isActive("assignments") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/assignments")}
        >
          <Icon d={ICONS.fileText} size={18} />
          {!collapsed && <span>Assignments</span>}
        </div>

        <div
          className={`teacher-nav-item ${isActive("setting") ? "active" : ""}`}
          onClick={() => navigate("/teacher/dashboard/setting")}
        >
          <Icon d={ICONS.settings} size={18} />
          {!collapsed && <span>Settings</span>}
        </div>

      </nav>

      {/* FOOTER */}
      <div className="teacher-sidebar-footer">
        <div className="teacher-nav-item logout" onClick={handleLogout}>
          <Icon d={ICONS.logOut} size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>

    </aside>
  );
}
