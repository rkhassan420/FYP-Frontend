import React from "react";
// import "./Footer.css";

function Footer({ onScroll }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo-glow" onClick={() => onScroll("home")}>
              <img src="logo.svg" alt="AI Content Evaluator" />
            </div>
            <div className="brand-info">
              <span className="brand-name" onClick={() => onScroll("home")}>
                AI Content Evaluator
              </span>
              <p className="brand-tagline">
                Intelligent academic evaluation powered by AI
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-nav">
            <div className="nav-column">
              <h4>Product</h4>
              <a onClick={() => onScroll("features")}>Features</a>
              <a onClick={() => onScroll("how-it-works")}>How It Works</a>
              <a onClick={() => onScroll("advantages")}>Advantages</a>
            </div>
            <div className="nav-column">
              <h4>Company</h4>
              <a onClick={() => onScroll("roles")}>Roles</a>
              <a onClick={() => onScroll("security")}>Security</a>
              <a onClick={() => onScroll("about")}>About</a>
            </div>
          </div>

          {/* Trust & Info */}
          <div className="footer-trust">
            <div className="trust-badges">
              <div className="trust-badge">🔒 Enterprise Secure</div>
              <div className="trust-badge">✦ AI Powered</div>
              <div className="trust-badge">✓ Privacy First</div>
            </div>
            <p className="trust-text">
              Your academic data is protected with industry-leading security and responsible AI practices.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © 2026 AI Content Evaluator. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a onClick={() => onScroll("security")}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;