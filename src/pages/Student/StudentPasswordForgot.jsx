import React, { useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "../../css/Teacher/login.css";

const AuthHeader = lazy(() => import("../../components/AuthHeader"));

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ identifier });

    setSubmitted(true);
  };

  return (
      <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">
        {!submitted ? (
          <>
            <div className="forgot-header">
              <h2>Forgot Password</h2>
              <p>
                Enter your Student ID or registered email. Your request will be
                reviewed by the admin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                placeholder="Student ID or Registered Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
          
              />

              <button type="submit" className="btn-primary">
                Send Reset Request
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <CheckCircle size={60} className="success-icon" />

            <h2>Request Sent!</h2>

            <p>
              Your password reset request has been sent successfully. After the
              admin approves it, a new temporary password will be sent to your
              registered email.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/login/student")}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}