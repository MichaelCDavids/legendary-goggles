import React from 'react';
import { Link } from 'react-router-dom';
import ParallaxImage from './ParallaxImage';
import './LandingPage.css';

const LandingPage = () => {
  return (
    (<div className="landing-page">
      <ParallaxImage src="https://picsum.photos/seed/candlesticks/1200/800">
        <header className="hero-section">
          <h1>Welcome to Trade Signals Market</h1>
          <p>Your one-stop platform for the best trade signals.</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </header>
      </ParallaxImage>
      
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon">📈</span>
            <h3>Expert Signals</h3>
            <p>Access high-quality signals from verified providers.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔔</span>
            <h3>Real-Time Alerts</h3>
            <p>Never miss a trade with our instant notifications.</p>
          </div>
          <div className="feature-card">
            <span className="icon">👥</span>
            <h3>Community-Driven</h3>
            <p>Join a thriving community of traders and analysts.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <span className="icon">✍️</span>
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in minutes.</p>
          </div>
          <div className="step">
            <span className="icon">🔍</span>
            <div className="step-number">2</div>
            <h3>Browse Signals</h3>
            <p>Explore signals for various assets and timeframes.</p>
          </div>
          <div className="step">
            <span className="icon">💸</span>
            <div className="step-number">3</div>
            <h3>Subscribe & Trade</h3>
            <p>Follow top providers and start receiving signals.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action-section">
        <h2>Ready to elevate your trading?</h2>
        <p>Join our platform today and gain a competitive edge.</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>)
  );
};

export default LandingPage;
