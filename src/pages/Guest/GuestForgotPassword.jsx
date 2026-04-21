import React, { useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../components/AuthHeader/AuthHeader"));

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ identifier });

  
    navigate("/guest/verify-otp");
  };

  return (
      <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">
               
            <div className="forgot-header">
              <h2>Forgot Password</h2>
              <p>
                Enter your  registered email for verification
              </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                placeholder="Registered Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
          
              />

              <button  className="btn-primary-auth btn-lg">
                Send Reset Request
              </button>
            </form>
       
        
      </div>
    </div>
    </div>
  );
}