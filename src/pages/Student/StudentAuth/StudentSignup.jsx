import React, { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SuccessModal from "../../../components/SuccessModal/SuccessModal";
import { authService } from "../../../services";
import "../../../css/Teacher/TeacherAuth/login.css";

const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateSignupForm = ({ firstName, lastName, email, password, confirmPassword }) => {
  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRules = [
    { valid: password.length >= 8, message: "Password must be at least 8 characters long." },
    { valid: /[A-Z]/.test(password), message: "Password must include an uppercase letter." },
    { valid: /[a-z]/.test(password), message: "Password must include a lowercase letter." },
    { valid: /\d/.test(password), message: "Password must include a number." },
    { valid: /[^A-Za-z0-9]/.test(password), message: "Password must include a special character." },
    { valid: !/\s/.test(password), message: "Password cannot contain spaces." },
  ];

  if (!trimmedFirstName) {
    return "First name is required.";
  }

  if (trimmedFirstName.length < 2) {
    return "First name must be at least 2 characters.";
  }

  if (!trimmedLastName) {
    return "Last name is required.";
  }

  if (trimmedLastName.length < 2) {
    return "Last name must be at least 2 characters.";
  }

  if (!emailPattern.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  const failedRule = passwordRules.find((rule) => !rule.valid);

  if (failedRule) {
    return failedRule.message;
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
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

const getSignupErrorMessage = (err) => {
  const fieldErrors = [
    ["first_name", "First name"],
    ["last_name", "Last name"],
    ["email", "Email"],
    ["password", "Password"],
    ["confirm_password", "Confirm password"],
    ["username", "Username"],
  ];

  for (const [field, label] of fieldErrors) {
    const message = getFirstError(err.data?.[field]);

    if (message) {
      return field === "email" ? "Invalid email address." : `${label}: ${message}`;
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

  return "Unable to create account. Please check your details.";
};

const StudentSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({ ...currentForm, [name]: value }));

    if (error) {
      setError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignupForm(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    const email = form.email.trim().toLowerCase();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    setLoading(true);

    try {
      await authService.register({
        email,
        username: email.split("@")[0],
        password: form.password,
        confirm_password: form.confirmPassword,
        first_name: firstName,
        last_name: lastName,
        role: "student",
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/student/verify-otp", { state: { identifier: email, flow: "signup" } });
      }, 1200);
    } catch (err) {
      setError(getSignupErrorMessage(err));
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
              <h2>Create Student Account</h2>
              <p>Sign up to join your classes and submit assignments.</p>

              <form onSubmit={handleSignup} className="login-form">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-icon"
                    onClick={() => setShowPassword((isVisible) => !isVisible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-icon"
                    onClick={() => setShowConfirmPassword((isVisible) => !isVisible)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && <p style={{color:"#ef4444"}} className="error-text">{error}</p>}

                <button type="submit" className="btn-primary-auth btn-lg" disabled={loading}>
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>

              <p className="signup-link">
                Already have an account?{" "}
                <span onClick={() => navigate("/login/student")}>Login</span>
              </p>
            </>
          ) : (
            <SuccessModal title="Account Created!" message="Redirecting to OTP verification..." />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;
