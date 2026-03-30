import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onScroll }) {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand" onClick={() => onScroll("home")}>
          <div className="brand-icon">
            <img src="logo.svg" height="40" alt="logo" />
          </div>
          <span className="brand-name">AI Content Evaluator</span>
        </div>
        <div className="nav-links">
          <a onClick={() => onScroll("features")}>Features</a>
          <a onClick={() => onScroll("how-it-works")}>How It Works</a>
          <a onClick={() => onScroll("roles")}>Roles</a>
          <a onClick={() => onScroll("about")}>About</a>
          <a onClick={() => onScroll("faq")}>FAQ</a>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle">🌙</button>
          <button className="btn-ghost" onClick={() => navigate("/role-selection", { state: { flow: "login" } })} >Login</button>
          <button className="btn-primary" onClick={() => navigate("/role-selection", { state: { flow: "login" } })} >Get Started Free</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;