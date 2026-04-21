import React, { useState, useEffect, useRef, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));
import SuccessModal from "../../components/SuccessModal/SuccessModal";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.identifier || "your email";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState("");

  // Timer logic for resending OTP
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    console.log("Verifying OTP:", finalOtp);
    // If backend returns 200 OK:
    navigate("/guest/reset-password", { state: { identifier: email, token: finalOtp } });
  };

  return (
     <div>
    <AuthHeader />

    <div className="login-wrapper">
      <div className="login-card">
        <div className="forgot-header">
          <div className="icon-circle">
            <ShieldCheck size={32} color="#4f46e5" />
          </div>
          <h2>Verify Identity</h2>
          <p>
            We've sent a 6-digit code to <strong>{email}</strong>. 
            Enter it below to reset your password.
          </p>
        </div>

        <form onSubmit={handleVerify} className="login-form">
          <div className="otp-input-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-field"                
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          {error && <p className="error-text" style={{color:'red'}} >{error}</p>}

          <button type="submit" className="btn-primary-auth btn-lg">
            Verify Code
          </button>
        </form>

        <div className="otp-footer">
          <p>
            Didn't receive the code?{" "}
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <button 
                onClick={() => setTimer(59)} 
                className="resend-btn"
                
              >
                Resend Now
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}