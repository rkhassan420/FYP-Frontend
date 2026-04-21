import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const StudentSignup = () => {
  const navigate = useNavigate();
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
 
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState("");

const handleSignup = (e) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  // TODO: API call here

  setSuccess(true); // only after success

  setTimeout(() => {
    navigate("/guest/login");
  }, 2000);
};

return (
  <div>
    <AuthHeader />

    <div className="login-wrapper">
      <div className="login-card">

        {!success ? (
          <>
            <h2>Create Account</h2>
            <p>Sign up and start evaluating assignments with AI.</p>

            {error && (
              <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
                {error}
              </div>
            )}

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

              
             

              {/* Password */}
              <div className="password-field">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
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
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="toggle-icon">
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button type="submit" className="btn-primary-auth btn-lg" style={{ marginTop: "10px" }}>
                Sign Up
              </button>

              <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
                Already have an account?{" "}
                <span
                  className="forgot"
                  style={{ cursor: "pointer", color: "#0056b3", fontWeight: "bold" }}
                  onClick={() => navigate("/guest/login")}
                >
                  Login here
                </span>
              </div>

            </form>
          </>
        ) : (
          <SuccessModal
            title="Account Created!"
            message="Redirecting to login..."
          />
        )}

      </div>
    </div>
  </div>
);
}

export default StudentSignup;