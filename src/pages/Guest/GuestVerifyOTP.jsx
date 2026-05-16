import React, { useState, useEffect, lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { authService, saveAuthSession } from "../../services";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));
import SuccessModal from "../../components/SuccessModal/SuccessModal";

export default function GuestVerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.identifier || "your email";
  const flow = location.state?.flow || "forgot";

  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const finalOtp = otp.join("");

    if (finalOtp.length < 4) {
      setError("Please enter the full OTP code.");
      return;
    }

    if (flow === "forgot") {
      navigate("/guest/reset-password", { state: { identifier: email, token: finalOtp } });
      return;
    }

    setLoading(true);

    try {
      const response = await authService.verifyOtp({ email, otp: Number(finalOtp) });
      saveAuthSession(response);
      navigate("/guest/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);

    try {
      if (flow === "forgot") {
        await authService.requestPasswordOtpLogout({ email });
      } else {
        await authService.resendOtp({ email });
      }
      setTimer(59);
    } catch (err) {
      setError(err.message);
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
            <div className="icon-circle">
              <ShieldCheck size={32} color="#4f46e5" />
            </div>
            <h2>Verify Identity</h2>
            <p>
              We've sent an OTP code to <strong>{email}</strong>.
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

            {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="btn-primary-auth btn-lg" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>

          <div className="otp-footer">
            <p>
              Didn't receive the code?{" "}
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="resend-btn"
                  disabled={loading}
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