import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onScroll }) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const navItems = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "roles", label: "Roles" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

 
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Lock body scroll and allow 'Escape' key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };

    if (sidebarOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleNavClick = (section) => {
    onScroll(section);
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="brand" onClick={() => onScroll("home")} role="button" tabIndex={0}>
            <div className="brand-icon">
              <img src="/logo.svg" height="40" alt="AI Content Evaluator Logo" />
            </div>
            <span className="brand-name">AI Content Evaluator</span>
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.id} onClick={() => onScroll(item.id)} tabIndex={0}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
            >
              <img 
                src={isDarkMode ? "/sun.png" : "/moon.png"} 
                alt="Theme Icon" 
                width="20" 
                height="20" 
              />
            </button>
            <button className="btn-ghost" onClick={() => navigate("/role-selection")}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate("/role-selection")}>
              Get Started Free
            </button>
          </div>

          {/* Burger button - only visible on mobile/tablet */}
          <button
            className="burger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
          >
            <img src="/burger.png" alt="Menu" width="24" height="24" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`} aria-hidden={!sidebarOpen}>
        <div className="sidebar-header">
          <div className="brand" onClick={() => handleNavClick("home")}>
            <div className="brand-icon">
              <img src="/logo.svg" height="32" alt="logo" />
            </div>
            <span className="brand-name">AI Content Evaluator</span>
          </div>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-links">
          {navItems.map((item) => (
            <a key={item.id} onClick={() => handleNavClick(item.id)}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="sidebar-actions">
          <button
            className="theme-toggle sidebar-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <img 
              src={isDarkMode ? "/sun.png" : "/moon.png"} 
              alt="Theme Icon" 
              width="20" 
              height="20" 
            />
            <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button 
            className="btn-ghost sidebar-btn" 
            onClick={() => { navigate("/role-selection"); setSidebarOpen(false); }}
          >
            Login
          </button>
          <button 
            className="btn-primary sidebar-btn" 
            onClick={() => { navigate("/role-selection"); setSidebarOpen(false); }}
          >
            Get Started Free
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;