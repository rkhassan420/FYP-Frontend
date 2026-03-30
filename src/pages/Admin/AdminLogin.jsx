import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../css/Teacher/login.css";

const AuthHeader = lazy(() => import("../../components/AuthHeader"));

const Login = ({ role }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    
  };

  return (
    <div>
      <AuthHeader />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>{role} Admin Login</h2>
          <p>Welcome back! Please login to continue.</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
             
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

            <button type="submit" className="btn-primary btn-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;