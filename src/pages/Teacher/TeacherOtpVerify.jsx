import React, { useState,lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/Teacher/login.css"
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

const email = location.state?.email;
const flow = location.state?.flow;  

  const handleVerify = (e) => {
  e.preventDefault();

  // TODO: verify OTP API

  if (flow === "signup") {
    navigate("/login/teacher");   // after signup → login
  } else if (flow === "forgot") {
    navigate("/set-password/teacher", { state: { email } }); // → reset password
  }
};

  return (
     <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">
        {/* <h2>Email Verification</h2> */}
        <h2>
  {flow === "signup" ? "Verify Your Email" : "Reset Password OTP"}
</h2>
        <p>Enter the OTP sent to <b>{email}</b></p>

        <form onSubmit={handleVerify} className="login-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            
          />

          <button type="submit" className="btn-primary btn-lg">
            Verify OTP
          </button>
        </form>

        <p className="signup-link">
          Didn't receive code?{" "}
          <span >
            Resend
          </span>
        </p>
      </div>
    </div>
      </div>
  );
};

export default VerifyOTP;