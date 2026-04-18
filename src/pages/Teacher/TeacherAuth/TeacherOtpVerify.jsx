import React, { useState,lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));
import SuccessModal from "../../../components/SuccessModal/SuccessModal";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

const email = location.state?.email;
const flow = location.state?.flow;  

const handleVerify = (e) => {
  e.preventDefault();

  // TODO: verify OTP API here

  if (flow === "signup") {
    setSuccess(true); // show modal first

    setTimeout(() => {
      navigate("/login/teacher");
    }, 2000);

  } else if (flow === "forgot") {
    navigate("/set-password/teacher", { state: { email } });
  }
};

  return (
    <div>
    <AuthHeader />
    <div className="login-wrapper">

    {!success ? (
    <>

      <div className="login-card">      
  
        <h2>  {flow === "signup" ? "Verify Your Email" : "Reset Password OTP"} </h2>
        <p>Enter the OTP sent to <b>{email}</b></p>

        <form onSubmit={handleVerify} className="login-form">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            
          />

          <button type="submit" className="btn-primary-auth btn-lg">
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
      </>
     ) : (
    <SuccessModal
      title="Account Created!"
      message="Redirecting to login..."
    />
  )}
    </div>
    </div>
  );
};

export default VerifyOTP;