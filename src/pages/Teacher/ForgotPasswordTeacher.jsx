import React, { useState,lazy } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../../css/Teacher/login.css"
const AuthHeader = lazy(() => import("../../components/AuthHeader"));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  

  const handleSendOTP = (e) => {
    e.preventDefault();    

    // navigate("/otp/teacher", { state: { email } });
    navigate("/otp/teacher", { state: { email, flow: "forgot" }});
  };

  return (
     <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Forgot Password</h2>
        
        <p>Enter your email to receive OTP</p>

        <form onSubmit={handleSendOTP} className="login-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          
          />

          <button className="btn-primary btn-lg" > 
            Send OTP
          </button>
        </form>
      </div>
    </div>
     </div>
  );
};

export default ForgotPassword;