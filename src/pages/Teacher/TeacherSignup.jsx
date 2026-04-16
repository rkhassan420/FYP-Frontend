import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Import Lucide icons
import "../../css/Teacher/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

const TeacherSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    subject: "",
  });

  const [showPassword, setShowPassword] = useState(false); // For password field
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password field

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Teacher Signup Data:", form);
    // Navigate to OTP page
    navigate("/otp/teacher", { state: { email: form.email, flow: "signup" } });
  };

  return (
    <div>
      <AuthHeader />
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Teacher Sign Up</h2>
          <p>Create your account to start evaluating with AI</p>

          <form onSubmit={handleSignup} className="login-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
             
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            
            />

            <input
              type="text"
              name="institution"
              placeholder="Institution / School Name"
              onChange={handleChange}
             
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject / Department"
              onChange={handleChange}
           
            />

            {/* Password Field */}
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
            
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
               
              />
              <span
                className="toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" className="btn-primary btn-lg">
              Create Account
            </button>
          </form>

          <p className="signup-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login/teacher")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;