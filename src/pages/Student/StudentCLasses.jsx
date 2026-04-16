import React, { useState } from "react";
import { BookOpen, User, ArrowRight, AlertCircle, BookX } from "lucide-react";
import "../../css/Student/StudentClasses.css"; // Ensure file name matches exactly (case-sensitive)

// --- Mock Data for Joined Classes ---
const MOCK_CLASSES = [
  {
    id: "cls_01",
    name: "Web Engineering",
    code: "WE-301",
    teacher: "Dr. Salman Khan",
    totalAssignments: 10,
    pendingAssignments: 2,
    colorTheme: "blue" // used for UI accents
  },
  {
    id: "cls_02",
    name: "Database Systems",
    code: "DB-204",
    teacher: "Prof. Ahmed Ali",
    totalAssignments: 8,
    pendingAssignments: 0,
    colorTheme: "purple"
  },
  {
    id: "cls_03",
    name: "Software Quality Assurance",
    code: "SQA-405",
    teacher: "Engr. Fatima Tariq",
    totalAssignments: 5,
    pendingAssignments: 4,
    colorTheme: "amber"
  }
];

// NOTE: Make sure to pass `setActivePage` as a prop from your StudentDashboard
export default function StudentClasses({ setActivePage }) {
  const [classes] = useState(MOCK_CLASSES);

  const handleOpenClass = (classId) => {
    // Navigate to the assignments page when a class is clicked
    if (setActivePage) {
      setActivePage("assignments");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "1200px" }}>
        
        {/* Header */}
        <header className="page-header fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 className="page-title">My Classes</h1>
              <p className="page-subtitle">Access your enrolled courses and view assignments.</p>
            </div>
            
            {/* Quick action button to Join Class Component */}
            <button 
              className="btn-secondary" 
              onClick={() => setActivePage && setActivePage("join-class")}
            >
              + Join Another Class
            </button>
          </div>
        </header>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          // Empty State
          <div className="empty-state-card fade-in">
            <BookX size={48} className="empty-icon" />
            <h3>No Classes Yet</h3>
            <p>You haven't enrolled in any classes. Use a class code from your teacher to get started.</p>
            <button 
              className="btn-primary" 
              style={{ marginTop: "16px", maxWidth: "200px", margin: "16px auto 0" }}
              onClick={() => setActivePage && setActivePage("join-class")}
            >
              Join a Class
            </button>
          </div>
        ) : (
          <div className="classes-grid fade-in">
            {classes.map((cls, index) => {
              
              return (
                <div 
                  key={cls.id} 
                  className={`class-card theme-${cls.colorTheme}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Header */}
                  <div className="class-card-header">
                    <div className="class-icon-wrapper">
                      <BookOpen size={24} />
                    </div>
                    <div className="class-title-wrapper">
                      <h3 className="class-name">{cls.name}</h3>
                      <span className="class-code">{cls.code}</span>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="teacher-info" style={{ marginBottom: "auto" }}>
                    <User size={16} />
                    <span>{cls.teacher}</span>
                  </div>

                  {/* Spacer to push footer to the bottom since progress bar was removed */}
                  <div style={{ marginTop: "32px" }}></div>

                  {/* Footer & Actions */}
                  <div className="class-card-footer">
                    {cls.pendingAssignments > 0 ? (
                      <div className="pending-badge">
                        <AlertCircle size={14} />
                        <span>{cls.pendingAssignments} Pending</span>
                      </div>
                    ) : (
                      <div className="all-caught-up-badge">
                        <span>All caught up! 🎉</span>
                      </div>
                    )}

                    <button 
                      className="open-class-btn"
                      onClick={() => handleOpenClass(cls.id)}
                    >
                      Open <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}