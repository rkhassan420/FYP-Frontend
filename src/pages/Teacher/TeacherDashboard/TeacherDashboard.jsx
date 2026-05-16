// import React, { useState, useEffect } from "react";
// import "./TeacherDashboard.css";
// import { Icon, ICONS } from "../TeacherIcons";
// import Sidebar from "../TeacherSidebar/TeacherSidebar";
// import Header from "../Teacherheader/TeacherHeader";
// import TeacherDashboardStats from "./TeacherDashboardStats";
// import TeacherRecentSubmissions from "./TeacherRecentSubmissions";
// import Evaluator from "../../../components/Evaluator/Evaluator"
// import TeacherClasses from "../TeacherManageClasses/TeacherClasses"
// import AddStudents from "../TeacherAddStudent/AddStudents";
// import AssignAssignments from "../TeacherManageAssignment/AssignAssignment";
// import Setting from "../TeacherSetting/Setting";

// export default function Dashboard() {

//   const [isFullscreen, setIsFullscreen] = useState(() => {
//     return JSON.parse(localStorage.getItem("evaluatorFullscreen")) || false;
//   });

//   useEffect(() => {
//     localStorage.setItem("evaluatorFullscreen", JSON.stringify(isFullscreen));
//   }, [isFullscreen]);

//   const [activePage, setActivePage] = useState(() => {
//     return localStorage.getItem("teacherActivePage") || "dashboard";
//   });

//   // Holds { classCode, className } when navigating from modal → assignments
//   const [assignmentClass, setAssignmentClass] = useState(null);

//   return (
//     <div className="app-layout">

//       <Sidebar activePage={activePage} setActivePage={setActivePage} />

//       <main className="main">

//         {activePage === "dashboard" && (
//           <>
//             <Header />
//             <div className={`content dashboard ${isFullscreen ? "hide-dashboard" : ""}`}>
//               <TeacherDashboardStats />
//               <div className="lower-grid">
//                 <TeacherRecentSubmissions />
//                 {/* <Evaluator
//                   fullscreen={isFullscreen}
//                   setFullscreen={setIsFullscreen}
//                 /> */}
//               </div>
//             </div>
//           </>
//         )}

//         {activePage === "evaluator" && (
//           <div className="content full">
//             <Evaluator
//               fullscreen={false}
//               setFullscreen={() => {}}
//             />
//           </div>
//         )}

//         {activePage === "create-classes" && (
//           <div className="content full">
//             <TeacherClasses
//               onCreateAssignment={(data) => { setAssignmentClass(data); setActivePage("assignments"); }}
//               onEditAssignment={() => setActivePage("assignments")}
//             />
//           </div>
//         )}

       

//         {activePage === "students" && (
//           <div className="content full">
//             <AddStudents />
//           </div>
//         )}

//         {activePage === "assignments" && (
//           <div className="content full">
//             <AssignAssignments preSelectedClass={assignmentClass} />
//           </div>
//         )}

//         {activePage === "setting" && (
//           <div className="content full">
//             <Setting />
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./TeacherDashboard.css";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../TeacherSidebar/TeacherSidebar";
import Header from "../Teacherheader/TeacherHeader";
import TeacherDashboardStats from "./TeacherDashboardStats";
import TeacherRecentSubmissions from "./TeacherRecentSubmissions";
import Evaluator from "../../../components/Evaluator/Evaluator";
import TeacherClasses from "../TeacherManageClasses/TeacherClasses";
import AddStudents from "../TeacherAddStudent/AddStudents";
import AssignAssignments from "../TeacherManageAssignment/AssignAssignment";
import Setting from "../TeacherSetting/Setting";

export default function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isFullscreen, setIsFullscreen] = useState(() => {
    return JSON.parse(localStorage.getItem("evaluatorFullscreen")) || false;
  });

  useEffect(() => {
    localStorage.setItem("evaluatorFullscreen", JSON.stringify(isFullscreen));
  }, [isFullscreen]);

  // Holds { classCode, className } when navigating from modal → assignments
  const [assignmentClass, setAssignmentClass] = useState(null);

  return (
    <div className="app-layout">

      <Sidebar />  {/* removed activePage & setActivePage props */}

      <main className="main">
        <Routes>

          {/* Default redirect */}
          <Route index element={<Navigate to="home" replace />} />

          <Route path="home" element={
            <>
              <Header />
              <div className={`content dashboard ${isFullscreen ? "hide-dashboard" : ""}`}>
                <TeacherDashboardStats />
                <div className="lower-grid">
                  <TeacherRecentSubmissions />
                  { <Evaluator
                   fullscreen={isFullscreen}
                   setFullscreen={setIsFullscreen}
              /> }
                </div>
              </div>
            </>
          } />



          <Route path="evaluator" element={
            <div className="content full">
              <Evaluator fullscreen={false} setFullscreen={() => {}} />
            </div>
          } />

          <Route path="create-classes" element={
            <div className="content full">
              <TeacherClasses
                onCreateAssignment={(data) => {
                  setAssignmentClass(data);
                  navigate("assignments");
                }}
                onEditAssignment={() => navigate("assignments")}
              />
            </div>
          } />

          <Route path="students" element={
            <div className="content full">
              <AddStudents />
            </div>
          } />

          <Route path="assignments" element={
            <div className="content full">
              <AssignAssignments preSelectedClass={assignmentClass} />
            </div>
          } />

          <Route path="setting" element={
            <div className="content full">
              <Setting />
            </div>
          } />

        </Routes>
      </main>
    </div>
  );
}