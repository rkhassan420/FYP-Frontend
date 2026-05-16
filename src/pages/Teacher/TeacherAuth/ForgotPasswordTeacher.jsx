import React, { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services";
import "../../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const validateEmail = (email) => {
  const trimmedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!trimmedEmail) {
    return "Email address is required.";
  }

  if (!emailPattern.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  return "";
};

const getFirstError = (errorValue) => {
  if (Array.isArray(errorValue) && errorValue.length > 0) {
    return errorValue[0];
  }

  if (typeof errorValue === "string") {
    return errorValue;
  }

  return "";
};

const getForgotPasswordErrorMessage = (err) => {
  const emailError = getFirstError(err.data?.email);
  const nonFieldError = getFirstError(err.data?.non_field_errors);

  if (emailError) {
    return "Invalid email address.";
  }

  if (nonFieldError) {
    return nonFieldError;
  }

  if (typeof err.data?.detail === "string") {
    return err.data.detail;
  }

  if (err.message && err.message !== "An error occurred") {
    return err.message;
  }

  return "Unable to send OTP. Please check your email and try again.";
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateEmail(email);

    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    setLoading(true);

    try {
      await authService.requestPasswordOtpLogout({ email: trimmedEmail });
      navigate("/otp/teacher", { state: { email: trimmedEmail, flow: "forgot" } });
    } catch (err) {
      setError(getForgotPasswordErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
     <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Forgot Password</h2>
        
        <p>Enter your email to receive OTP</p>

        <form onSubmit={handleSendOTP} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            required
          />

          {error && <p style={{color:'#ef4444'}} className="error-text">{error}</p>}

          <button type="submit" className="btn-primary-auth btn-lg" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
     </div>
  );
};

export default ForgotPassword;
