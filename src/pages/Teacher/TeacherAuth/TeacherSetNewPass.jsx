import React, { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SuccessModal from "../../../components/SuccessModal/SuccessModal";
import { authService } from "../../../services";
import "../../../css/Teacher/TeacherAuth/login.css";

const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const validateResetPasswordForm = ({ email, otpCode, password, confirm }) => {
  const passwordRules = [
    { valid: Boolean(email), message: "Email address is missing. Please request a new OTP." },
    { valid: Boolean(otpCode), message: "OTP code is missing. Please request a new OTP." },
    { valid: password.length >= 8, message: "Password must be at least 8 characters long." },
    { valid: /[A-Z]/.test(password), message: "Password must include an uppercase letter." },
    { valid: /[a-z]/.test(password), message: "Password must include a lowercase letter." },
    { valid: /\d/.test(password), message: "Password must include a number." },
    { valid: /[^A-Za-z0-9]/.test(password), message: "Password must include a special character." },
    { valid: !/\s/.test(password), message: "Password cannot contain spaces." },
    { valid: password === confirm, message: "Passwords do not match." },
  ];

  const failedRule = passwordRules.find((rule) => !rule.valid);

  return failedRule?.message || "";
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

const getResetPasswordErrorMessage = (err) => {
  const fieldErrors = [
    ["email", "Invalid email address."],
    ["otp_code", "Invalid or expired OTP code."],
    ["otp", "Invalid or expired OTP code."],
    ["new_password", ""],
    ["password", ""],
    ["confirm_password", ""],
  ];

  for (const [field, fallback] of fieldErrors) {
    const message = getFirstError(err.data?.[field]);

    if (message) {
      return fallback || message;
    }
  }

  const nonFieldError = getFirstError(err.data?.non_field_errors);

  if (nonFieldError) {
    return nonFieldError;
  }

  if (typeof err.data?.detail === "string") {
    return err.data.detail;
  }

  if (err.message && err.message !== "An error occurred") {
    return err.message;
  }

  return "Unable to update password. Please try again.";
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const otpCode = location.state?.token || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !otpCode) {
      setError("Reset session is missing. Please request a new OTP.");
    }
  }, [email, otpCode]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);

    if (error) {
      setError("");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateResetPasswordForm({ email, otpCode, password, confirm });

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.confirmPasswordOtp({
        email,
        new_password: password,
        confirm_password: confirm,
        otp_code: Number(otpCode),
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login/teacher");
      }, 2000);
    } catch (err) {
      setError(getResetPasswordErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        <div className="login-card">
          {!success ? (
            <>
              <h2>Reset Password</h2>
              <p>Enter a strong new password for your account.</p>

              <form onSubmit={handleReset} className="login-form">
                <div className="password-field">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((isVisible) => !isVisible)}
                    className="toggle-icon"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="password-field">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={handleConfirmChange}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((isVisible) => !isVisible)}
                    className="toggle-icon"
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && <p style={{color:"#ef4444"}} className="error-text">{error}</p>}

                <button
                  type="submit"
                  className="btn-primary-auth btn-lg"
                  disabled={loading || !email || !otpCode}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </>
          ) : (
            <SuccessModal title="Password Updated!" message="Redirecting to login..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
