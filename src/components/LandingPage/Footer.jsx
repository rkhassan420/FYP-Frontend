import React from "react";

function Footer({ onScroll }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">
          <div className="brand-icon brand-icon-sm">
            <img src="logo.svg" height="40px" alt="logo" />
          </div>
          <span
            className="brand-name brand-name-sm"
            onClick={() => onScroll("home")}
          >
            AI Content Evaluator
          </span>
        </div>

        <p className="footer-copy">© 2026 AI Content Evaluator</p>

        <div className="footer-links">
          <a onClick={() => onScroll("features")}>Features</a>
          <a onClick={() => onScroll("roles")}>Roles</a>
          <a onClick={() => onScroll("about")}>About</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;