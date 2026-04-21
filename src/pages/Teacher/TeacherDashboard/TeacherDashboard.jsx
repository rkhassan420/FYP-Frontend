import React, { useState } from "react";
import "./TeacherDashboard.css";
import { Icon, ICONS } from "../TeacherIcons";
import Sidebar from "../TeacherSidebar/TeacherSidebar";
import Header from "../Teacherheader/TeacherHeader";
import TeacherDashboardStats from "./TeacherDashboardStats";
import TeacherRecentSubmissions from "./TeacherRecentSubmissions";
import Evaluator from "../../../components/Evaluator/Evaluator"
import TeacherClasses from "../TeacherManageClasses/TeacherClasses"
import AddStudents from "../TeacherAddStudent/AddStudents";
import AssignAssignments from "../TeacherManageAssignment/AssignAssignment";
import Setting from "../TeacherSetting/Setting";

export default function Dashboard() {
 
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [activePage, setActivePage] = useState(() => {
  return localStorage.getItem("teacherActivePage") || "dashboard";
});


  return (
    <div className="app-layout">
      
      <Sidebar activePage={activePage} setActivePage={setActivePage} />     

      <main className="main">
      
        {activePage === "dashboard" && (
          <>
              <Header />
            
            <div className={`content dashboard ${isFullscreen ? "hide-dashboard" : ""}`}>

              <TeacherDashboardStats />

              <div className="lower-grid">

                <TeacherRecentSubmissions />
                
                <Evaluator
                  fullscreen={isFullscreen}
                  setFullscreen={setIsFullscreen}
                />
              </div>
            </div>
          </>
        )}

        
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