import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const validateIdentifier = (identifier) => {
  const trimmedId = identifier.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!trimmedId) {
    return "Email address is required.";
  }

  if (trimmedId.includes('@') && !emailPattern.test(trimmedId)) {
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

  return "Unable to send request. Please try again.";
};

export default function GuestForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateIdentifier(identifier);

    if (validationError) {
      setError(validationError);
      return;
    }

    const trimmedIdentifier = identifier.trim().toLowerCase();

    setLoading(true);

    try {
      await authService.requestPasswordOtpLogout({ email: trimmedIdentifier });
      navigate("/guest/verify-otp", { state: { identifier: trimmedIdentifier, flow: "forgot" } });
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

          <div className="forgot-header">
            <h2>Forgot Password</h2>
            <p>Enter your registered email for verification</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Registered Email"
              value={identifier}
              onChange={handleIdentifierChange}
              required
            />

            {error && <p style={{ color: "#ef4444", fontSize: "14px", textAlign: "left" }}>{error}</p>}

            <button type="submit" className="btn-primary-auth btn-lg" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Request"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}