import React, { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authService, saveAuthSession } from "../../../services";
import "../../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const validateLoginForm = ({ email, password }) => {
  const trimmedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!trimmedEmail) {
    return "Email address is required.";
  }

  if (!emailPattern.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  if (!password) {
    return "Password is required.";
  }

  return "";
};

const getLoginErrorMessage = (err) => {
  const emailError = err.data?.email;
  const passwordError = err.data?.password;
  const nonFieldError = err.data?.non_field_errors;
  const detailError = err.data?.detail;

  if (Array.isArray(emailError) && emailError.length > 0) {
    return "Invalid email address.";
  }

  if (typeof emailError === "string") {
    return "Invalid email address.";
  }

  if (Array.isArray(passwordError) && passwordError.length > 0) {
    return passwordError[0];
  }

  if (typeof passwordError === "string") {
    return passwordError;
  }

  if (Array.isArray(nonFieldError) && nonFieldError.length > 0) {
    return nonFieldError[0];
  }

  if (typeof detailError === "string") {
    return detailError;
  }

  if (err.message && err.message !== "An error occurred") {
    return err.message;
  }

  return "Unable to login. Please check your credentials.";
};

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateLoginForm({ email, password });

    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    setLoading(true);

    try {
      const response = await authService.teacherLogin({ email: trimmedEmail, password });
      saveAuthSession(response);
      navigate("/teacher/dashboard");
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
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
              onChange={handleEmailChange}
              autoComplete="email"
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-icon"
                onClick={() => setShowPassword((isVisible) => !isVisible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p style={{color:"#ef4444"}} className="error-text">{error}</p>}

            <span
              className="forgot"
              onClick={() => navigate("/forgot-password/teacher")}
            >
              Forgot Password?
            </span>

            <button type="submit" className="btn-primary-auth btn-lg" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
