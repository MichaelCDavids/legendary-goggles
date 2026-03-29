import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import the new CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <svg className="error-symbol" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <h1 className="error-text">404 - Page Not Found</h1>
      <p className="error-subtext">The page you are looking for does not exist.</p>
      <Link to="/" className="dashboard-link">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;
