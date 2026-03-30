import "../css/error.css"

function Error() {
  return (
    <div className="notfound-container">
      
      {/* Animated Icon */}
      <div className="notfound-icon">
        <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
      </div>

      {/* Text */}
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Oops! Page Not Found</h2>
      <p className="notfound-text">
        The page you're looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <button 
        className="notfound-btn"
        onClick={() => window.location.href = "/"}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Error;