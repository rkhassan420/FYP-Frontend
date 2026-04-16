import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "../../css/Teacher/login.css"; // Reuse your existing login CSS

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
    navigate("/student/reset-password", { state: { identifier: email, token: finalOtp } });
  };

  return (
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
          <div className="otp-input-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-field"
                style={{
                  width: '45px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          {error && <p className="error-text" style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}

          <button type="submit" className="btn-primary">
            Verify Code
          </button>
        </form>

        <div className="otp-footer" style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem' }}>
          <p style={{ color: '#64748b' }}>
            Didn't receive the code?{" "}
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <button 
                onClick={() => setTimer(59)} 
                style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}
              >
                Resend Now
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}