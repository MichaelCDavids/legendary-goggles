import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import the new CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="ghost-container">
        <div className="ghost-body"></div>
        <div className="ghost-eyes"></div>
        <div className="ghost-mouth"></div>
      </div>
      <h1 className="error-text">404 - Page Not Found</h1>
      <p className="error-subtext">The page you are looking for does not exist.</p>
      <Link to="/" className="dashboard-link">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;
