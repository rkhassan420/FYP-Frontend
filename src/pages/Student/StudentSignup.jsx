import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../css/Teacher/login.css"; 

const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const StudentSignup = () => {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI states
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    // Basic frontend validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // TODO: Add signup API call here (save user to database)
    
    // On success, redirect to dashboard. 
    // From there, they will use the "Join Class" page.
    navigate("/login/student");
  };

  return (
    <div>
      <AuthHeader />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>Create Student Account</h2>
          <p>Sign up to join your classes and submit assignments.</p>

          {error && <div className="error-message" style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</div>}

          <form onSubmit={handleSignup} className="login-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
           
            />

            <input
              type="text"
              placeholder="Student ID (e.g., FA20-BCS-001)"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            
            />

            
            <input
              type="text"
              placeholder="(e.g., +92 324 9856025)"
              value={phoneNumber}
              onChange={(e) => setStudentId(e.target.value)}
            
            />


            {/* Password Field */}
            <div className="password-field">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="password-field">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
           
              />
              <span
                className="toggle-icon"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" className="btn-primary btn-lg" style={{ marginTop: "10px" }}>
              Sign Up
            </button>

            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
              Already have an account?{" "}
              <span
                className="forgot"
                style={{ cursor: "pointer", color: "#0056b3", fontWeight: "bold" }}
                onClick={() => navigate("/login/student")}
              >
                Login here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;