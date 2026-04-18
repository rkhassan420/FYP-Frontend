import React, { useState, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
// Reusing the same CSS file for consistent branding
import "../../../css/Teacher/TeacherAuth/login.css";

const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const StudentResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Identifier (email/ID) passed from the VerifyOTP step
  const identifier = location.state?.identifier || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // --- API CALL LOGIC ---
    // console.log("Resetting password for Student:", identifier);
    
    setSuccess(true);

    // Redirect to the Student Login page after 2.5 seconds
    setTimeout(() => {
      navigate("/login/student");
    }, 2500);
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        <div className="login-card">
          {!success ? (
            <>
              <div className="forgot-header">
                <h2>Student Reset Password</h2>
                <p>Please enter a strong new password for your account.</p>
              </div>

              <form onSubmit={handleReset} className="login-form">
                {/* New Password */}
                <div className="password-field">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                  />
                  <span onClick={() => setShowPass(!showPass)} className="toggle-icon">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="password-field">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                   
                  />
                  <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-icon">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                {error && <p style={{ color: "#ef4444", textAlign:"left", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>}

                <button type="submit" className="btn-primary-auth btn-lg">
                  Update Password
                </button>
              </form>
            </>
          ) : (
            <div className="success-container">
              <CheckCircle size={60} className="success-icon" />
              <h2>Password Updated!</h2>
              <p>Your password has been changed successfully.</p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Redirecting to student login page...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResetPassword;