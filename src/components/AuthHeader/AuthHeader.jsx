import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react"; 
import "./AuthHeader.css"

function AuthHeader({ showBack = true }) {
  const navigate = useNavigate();

  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-inner">

        <div className="auth-left">

          {showBack && (
            <button
              className="auth-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go Back"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          )}

          <div
            className="auth-brand"
            onClick={() => navigate("/")}
          >
            <img src="/logo.svg" height="32" alt="logo" />
            <span>AI Content Evaluator</span>
          </div>

        </div>

      </div>
    </nav>
  );
}

export default AuthHeader;