import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const Login = ({role}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Add login API here
    navigate("/guest/dashboard");
  };

  return (
    <div>
      <AuthHeader />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>{role} Guest Login</h2>
          <p>Sign in to access your AI Evaluator dashboard.</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"  
              placeholder="Email"            
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={() => navigate("/guest/forgot-pass")}
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
                onClick={() => navigate("/guest/signup")}
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