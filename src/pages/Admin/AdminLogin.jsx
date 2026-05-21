import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "../../css/Teacher/TeacherAuth/login.css";

const AuthHeader = lazy(() =>
  import("../../components/AuthHeader/AuthHeader")
);

const Login = ({ role }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/admin_login/",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      // Save login state if needed
    
      // Save token and login state
localStorage.setItem("adminLoggedIn", "true");
localStorage.setItem("token", response.data.tokens.access);
// optionally save refresh token too
localStorage.setItem("refreshToken", response.data.tokens.refresh);
localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthHeader />

      <div className="login-wrapper">
        <div className="login-card">
          <h2>{role} Admin Login</h2>
          <p>Welcome back! Please login to continue.</p>

          <form onSubmit={handleLogin} className="login-form">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <div className="password-field">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="toggle-icon"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "-5px",
                }}
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;