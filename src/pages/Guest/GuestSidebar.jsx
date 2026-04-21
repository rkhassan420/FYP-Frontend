import React from 'react';
import { useNavigate } from 'react-router-dom'; // 
import { Icon, ICONS } from "../Teacher/TeacherIcons";

export default function GuestSidebar() {
  const navigate = useNavigate(); // 

  const handleLogout = () => {
   
    navigate('/guest/login'); // 3. Navigate to the login path
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
         
              <img src="/logo.svg" height="34" alt="logo" />           
         
        </div>
        <button
              className="teacher-collapse-btn teacher-expand-btn"              
              title="Expand"
            >
              <img src="/collapse.png" alt="expand" />
            </button>
      
         
      </div>

      <button className="new-chat-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New evaluation
      </button>

      <span className="sidebar-label">Recent</span>
      <div className="nav-item active">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Session #1
      </div>

      <div className="sidebar-bottom">
        <div className="user-info">
          <div className="user-avatar">SK</div>
          <span className="user-name">Salman Khan</span>
        </div>
        {/* 4. Update the onClick to use the new handler */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}