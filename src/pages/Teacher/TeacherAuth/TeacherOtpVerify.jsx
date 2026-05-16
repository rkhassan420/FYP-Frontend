import React, { lazy, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../../../components/SuccessModal/SuccessModal";
import { authService } from "../../../services";
import "../../../css/Teacher/TeacherAuth/login.css";

const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));
const OTP_LENGTH = 4;
const RESEND_SECONDS = 59;

const getFirstError = (errorValue) => {
  if (Array.isArray(errorValue) && errorValue.length > 0) {
    return errorValue[0];
  }

  if (typeof errorValue === "string") {
    return errorValue;
  }

  return "";
};

const getOtpErrorMessage = (err) => {
  const otpError = getFirstError(err.data?.otp);
  const emailError = getFirstError(err.data?.email);
  const nonFieldError = getFirstError(err.data?.non_field_errors);

  if (otpError) {
    return "Invalid or expired OTP code.";
  }

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

  return "Unable to verify OTP. Please try again.";
};

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const email = location.state?.email;
  const flow = location.state?.flow || "signup";

  const [otp, setOtp] = useState(() => new Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  useEffect(() => {
    if (!email) {
      setError("Email address is missing. Please start the process again.");
    }
  }, [email]);

  useEffect(() => {
    if (timer <= 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setTimer((currentTimer) => currentTimer - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [timer]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const updateOtp = (nextOtp) => {
    setOtp(nextOtp);

    if (error) {
      setError("");
    }

    if (resendMessage) {
      setResendMessage("");
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;

    updateOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pastedDigits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (pastedDigits.length === 0) {
      return;
    }

    const nextOtp = new Array(OTP_LENGTH).fill("");

    pastedDigits.forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    updateOtp(nextOtp);
    focusInput(Math.min(pastedDigits.length, OTP_LENGTH) - 1);
  };

  const validateOtp = (otpCode) => {
    if (!email) {
      return "Email address is missing. Please start the process again.";
    }

    if (otpCode.length !== OTP_LENGTH) {
      return `Please enter the ${OTP_LENGTH}-digit OTP code.`;
    }

    if (!/^\d+$/.test(otpCode)) {
      return "OTP code can contain numbers only.";
    }

    return "";
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    const otpCode = otp.join("");
    const validationError = validateOtp(otpCode);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (flow === "forgot") {
      navigate("/set-password/teacher", { state: { email, token: otpCode } });
      return;
    }

    setLoading(true);

    try {
      await authService.verifyOtp({ email, otp: Number(otpCode) });
      setSuccess(true);

      setTimeout(() => {
        navigate("/login/teacher");
      }, 1200);
    } catch (err) {
      setError(getOtpErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResendMessage("");

    if (!email) {
      setError("Email address is missing. Please start the process again.");
      return;
    }

    if (timer > 0) {
      return;
    }

    setLoading(true);

    try {
      if (flow === "forgot") {
        await authService.requestPasswordOtpLogout({ email });
      } else {
        await authService.resendOtp({ email });
      }

      setOtp(new Array(OTP_LENGTH).fill(""));
      setTimer(RESEND_SECONDS);
      setResendMessage("A new OTP has been sent.");
      focusInput(0);
    } catch (err) {
      setError(getOtpErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        {!success ? (
          <div className="login-card">
            <h2>{flow === "signup" ? "Verify Your Email" : "Reset Password OTP"}</h2>
            <p>
              Enter the OTP sent to <b>{email || "your email"}</b>
            </p>

            <form onSubmit={handleVerify} className="login-form">
              <div className="otp-input-container" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength="1"
                    className="otp-field"
                    aria-label={`OTP digit ${index + 1}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    disabled={loading || !email}
                  />
                ))}
              </div>

              {error && <p style={{color:"#ef4444"}} className="error-text">{error}</p>}
              {resendMessage && <p style={{color:'green'}} className="success-text">{resendMessage}</p>}

              <button type="submit" className="btn-primary-auth btn-lg" disabled={loading || !email}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="otp-footer">
              <p>
                Didn't receive code?{" "}
                {timer > 0 ? (
                  <span>Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleResend}
                    disabled={loading || !email}
                  >
                    Resend
                  </button>
                )}
              </p>
            </div>
          </div>
        ) : (
          <SuccessModal title="Account Verified!" message="Redirecting to login..." />
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
