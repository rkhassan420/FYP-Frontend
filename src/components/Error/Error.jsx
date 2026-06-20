import "./error.css";

function Error() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        {/* Icon */}
        <div className="notfound-icon">
          <svg viewBox="0 0 24 24" width="92" height="92" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
        </div>

        {/* 404 Title */}
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        
        <p className="notfound-text">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="notfound-actions">
          <button 
            className="notfound-btn secondary"
            onClick={() => window.history.back()}
          >
            ← Go Back
          </button>
          
          <button 
            className="notfound-btn primary"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;