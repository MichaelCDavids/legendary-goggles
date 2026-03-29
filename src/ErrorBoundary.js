import React, { Component } from 'react';
import './NotFound.css'; // Reuse the same CSS for styling

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="not-found-container">
          <svg className="error-symbol" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h1 className="error-text">Something went wrong.</h1>
          <p className="error-subtext">We're sorry, but an unexpected error occurred.</p>
          <a href="/" className="dashboard-link">Go to Dashboard</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
