import React, { useState,lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../../css/Teacher/TeacherAuth/login.css";
const AuthHeader = lazy(() => import("../../../components/AuthHeader/AuthHeader"));
import SuccessModal from "../../../components/SuccessModal/SuccessModal";


const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // TODO: API call here

    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/login/teacher");
    }, 2000);
  };

  return (
     <div>
    <AuthHeader />
    <div className="login-wrapper">
      <div className="login-card">

        
          <>
            <h2>Reset Password</h2>
            <p>Enter your new password</p>

            <form onSubmit={handleReset} className="login-form">

             
              <div className="password-field">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />
                <span onClick={() => setShowPass(!showPass)} className="toggle-icon">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

             
              <div className="password-field">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                 
                />
                <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-icon">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button className="btn-primary-auth btn-lg">
                Update Password
              </button>
            </form>
          </>

          {success && (
            <SuccessModal
              title="Password Updated!"
              message="Redirecting to login..."
            />
         )}     
         
        

      </div>
    </div>
      </div>
  );
};

export default ResetPassword;