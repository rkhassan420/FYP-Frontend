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

const ACTIVE_SESSION_KEY = "teacher_ev_active_session";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFullscreen, setIsFullscreen] = useState(() => {
    return JSON.parse(localStorage.getItem("evaluatorFullscreen")) || false;
  });

  // ── Evaluator session state ───────────────────────────────────────────────
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
    return saved ? (isNaN(Number(saved)) ? saved : Number(saved)) : null;
  });

  const handleSessionChange = (id) => {
    setActiveSessionId(id);
    if (id != null) {
      localStorage.setItem(ACTIVE_SESSION_KEY, String(id));
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    }
  };

  useEffect(() => {
    localStorage.setItem("evaluatorFullscreen", JSON.stringify(isFullscreen));
  }, [isFullscreen]);

  const [assignmentClass, setAssignmentClass] = useState(null);

  return (
    <div className="app-layout">

      <Sidebar />

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
                  <Evaluator
                    fullscreen={isFullscreen}
                    setFullscreen={setIsFullscreen}
                    activeSessionId={activeSessionId}
                    onSessionChange={handleSessionChange}
                    storagePrefix="teacher"  // 👈 add this
                  />
                </div>
              </div>
            </>
          } />

          {/* ── Dedicated evaluator page ── */}
          <Route path="evaluator" element={
           
                <Evaluator
                  fullscreen={false}
                  setFullscreen={() => {}}
                  activeSessionId={activeSessionId}
                  onSessionChange={handleSessionChange}
                />
            
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