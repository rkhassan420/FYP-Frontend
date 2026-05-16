import React from 'react';
import './RoleSelection.css'; 
import { useNavigate,useLocation } from 'react-router-dom'; 


// --- Icons ---
const BookIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="36" height="36" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const GraduationCapIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="36" height="36" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const BackIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5"></path>
    <path d="M12 19l-7-7 7-7"></path>
  </svg>
);
// ------------------------------




const DemoRole = () => {

  const navigate = useNavigate();

  return (
 <div>
    
    <div className="demo-selection-wrapper">
      

      <div className="demo-selection-card">
        
        {/* Header */}
        <div className="demo-header-container">
          <h2 className="demo-header-title">SELECT USER TYPE</h2>
          <div className="demo-header-underline"></div>
        </div>

        {/* Roles */}
        <div className="demo-roles-container">
          
          {/* Teacher */}
          <button
            className="demo-role-card"
            type="button"          
            onClick={() => navigate("/login/teacher")}
          >
            <BookIcon className="demo-role-icon-teacher" />
            <span className="demo-role-label">Teacher</span>
          </button>

          {/* Student */}
          <button
            className="demo-role-card"
            type="button"           
            onClick={() => navigate("/login/student")}
          >
            <GraduationCapIcon className="demo-role-icon-student" />
            <span className="demo-role-label">Student</span>
          </button>

        </div>

        {/* Footer */}
        <div className="demo-footer-nav">
          <button 
            className="demo-btn-back" 
            type="button" 
            onClick={() => navigate(-1)}
          >
            <BackIcon className="demo-back-icon" />
            Back
          </button>
        </div>

      </div>
    </div>
    </div>
  );
};

export default DemoRole;