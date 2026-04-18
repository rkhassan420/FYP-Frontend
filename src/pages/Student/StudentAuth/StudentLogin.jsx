import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const Login = ({ role }) => {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Add login API here
    navigate("/student/dashboard");
  };

  return (
    <div>
      <AuthHeader />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>{role} Student Login</h2>
          <p>Welcome back! Please login to continue.</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

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

            <span
              className="forgot"
              onClick={() => navigate("/student/password-forgot")}
            >
              Forgot Password?
            </span>

            <button type="submit" className="btn-primary-auth btn-lg">
              Login
            </button>

            {/* ─── New Signup Link Added Here ─── */}
            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
              Don't have an account?{" "}
              <span
                className="forgot"
                style={{ cursor: "pointer", color: "#0056b3", fontWeight: "bold" }}
                onClick={() => navigate("/signup/student")}
              >
                Sign up here
              </span>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;