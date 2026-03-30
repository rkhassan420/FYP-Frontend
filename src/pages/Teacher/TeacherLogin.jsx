import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons
import "../../css/Teacher/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader"));

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        <div className="login-card">
          <h2>{role} Teacher Login</h2>
          <p>Welcome back! Please login to continue.</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <span
              className="forgot"
              onClick={() => navigate("/forgot-password/teacher")}
            >
              Forgot Password?
            </span>

            <button type="submit" className="btn-primary btn-lg">
              Login
            </button>
          </form>

          <p className="signup-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup/teacher")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;