import React from "react";
import "./StudentDashboard.css";
import StudentSidebar from "./StudentSidebar";
import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div className="app-layout">
      <StudentSidebar />
      <main className="main">
        <div className="content full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}