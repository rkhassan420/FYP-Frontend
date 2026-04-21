import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, CheckCircle, Loader2 } from "lucide-react";
import "../Teacher/TeacherAddStudent/AddStudents.css";

export default function JoinClass() {
  const navigate = useNavigate(); 
  
  const [classCode, setClassCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (!classCode.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a valid class code.");
      return;
    }
    if (classCode.length < 5) {
      setStatus("error");
      setErrorMessage("Class code must be at least 5 characters.");
      return;
    }

    // 2. Start Loading State
    setStatus("loading");
    setErrorMessage("");

    // 3. Simulate API Call to verify code
    setTimeout(() => {
      // Simulate an error for a specific dummy code
      if (classCode === "ERROR") {
        setStatus("error");
        setErrorMessage("Invalid class code or class has been closed.");
        return;
      }

      // Success State
      setStatus("success");
      setClassCode(""); // Clear input on success
      
      // Optional: Auto-redirect to "My Classes" after 2 seconds
      // setTimeout(() => {
      //   // If you are passing setActivePage as a prop, you'd call it here:
      //   // setActivePage("my-classes");
      // }, 2000);

    }, 1500); // 1.5 second artificial delay
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner" style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Header */}
        <header className="page-header fade-in">
          <h1 className="page-title" style={{fontSize:'35px', textAlign:'center'}} >Join a Class</h1>
          <p className="page-subtitle" style={{fontSize:'15px', textAlign:'center'}} >Enter the unique code provided by your teacher to enroll.</p>
        </header>

        {/* Join Class Form Card */}
        <div className="card fade-in" style={{ padding: "40px 30px", textAlign: "center", marginBottom: "40px" }}>
          
          <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--primary-light, #e0e7ff)", color: "var(--primary, #4f46e5)", marginBottom: "20px" }}>
            <Zap size={32} />
          </div>
          
          <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", color: "var(--text-main)" }}>Enroll in a New Subject</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>Ask your teacher for the class code, then enter it here.</p>

          <form onSubmit={handleJoin} style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              
              <input
                type="text"
                className={`input-field ${status === "error" ? "input-error" : ""}`}
                placeholder="e.g., CSD-982"
                value={classCode}
                onChange={(e) => {
                  setClassCode(e.target.value.toUpperCase()); // Auto-capitalize codes
                  if (status === "error") setStatus("idle"); // Clear error on type
                }}
                disabled={status === "loading" || status === "success"}
                style={{ textAlign: "center", fontSize: "1.1rem", letterSpacing: "2px", padding: "14px" }}
              />
              
              {status === "error" && (
                <p style={{ color: "var(--error, #ef4444)", fontSize: "0.875rem", margin: "0", textAlign: "left" }}>
                  {errorMessage}
                </p>
              )}

              {status === "success" && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "var(--success, #10b981)", fontSize: "0.9rem", backgroundColor: "#d1fae5", padding: "10px 15px", borderRadius: "8px" }}>
                  <CheckCircle size={20} /> Successfully enrolled in class!
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={status === "loading" || status === "success" || !classCode}
                style={{ padding: "14px", fontSize: "1rem", display: "flex", justifyContent: "center", gap: "8px" }}
              >
                {status === "loading" ? (
                  <><Loader2 className="spinner-icon" size={20} /> Verifying...</>
                ) : status === "success" ? (
                  <><CheckCircle size={20} /> Joined</>
                ) : (
                  "Join Class"
                )}
              </button>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}