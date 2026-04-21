import React, { useState, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));



const StudentResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Identifier (email/ID) passed from the VerifyOTP step
  const identifier = location.state?.identifier || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);  
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
    
   

    // Redirect to the Student Login page after 2.5 seconds
    setTimeout(() => {
      navigate("/guest/login");
    }, 2500);
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        <div className="login-card">
       
            <>
              <div className="forgot-header">
                <h2>Reset Password</h2>
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
                  </div>
      </div>
    </div>
  );
};

export default StudentResetPassword;