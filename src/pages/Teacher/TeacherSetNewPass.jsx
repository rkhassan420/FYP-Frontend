import React, { useState,lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import "../../css/Teacher/login.css"
const AuthHeader = lazy(() => import("../../components/AuthHeader"));

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // TODO: API call here

    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/login/teacher");
    }, 2000);
  };

  return (
     <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">

        {!success ? (
          <>
            <h2>Reset Password</h2>
            <p>Enter your new password</p>

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
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                 
                />
                <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-icon">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button className="btn-primary btn-lg">
                Update Password
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <CheckCircle size={60} className="success-icon" />
            <h2>Password Updated!</h2>
            <p>Redirecting to login...</p>
          </div>
        )}

      </div>
    </div>
      </div>
  );
};

export default ResetPassword;