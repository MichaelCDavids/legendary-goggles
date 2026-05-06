import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
const Membership = () => {
  return (
    <div className="membership-section">
      <h2>Choose Your Path to Trading Mastery</h2>
      <p>Whether you're just starting or a seasoned trader, we have a plan that fits your journey. Our goal is to empower you with knowledge and insights to become a more profitable trader.</p>
      <div className="tiers-container">
        <div className="tier-card">
          <h3>Free</h3>
          <p className="price">R0/month</p>
          <ul>
            <li>Access to Free Signals</li>
            <li>Basic Market Updates</li>
            <li>Learn the Fundamentals</li>
          </ul>
          <Link to="/auth" className="cta-button">Get Started</Link>
        </div>
        <div className="tier-card">
          <h3>Basic</h3>
          <p className="price">R349/month</p>
          <ul>
            <li>Access to Free & Basic Signals</li>
            <li>Detailed Signal Analysis</li>
            <li>Develop Your Strategy</li>
          </ul>
          <Link to="/auth" className="cta-button">Go Basic</Link>
        </div>
        <div className="tier-card">
          <h3>Gold</h3>
          <p className="price">R599/month</p>
          <ul>
            <li>Access to All Signals (Free, Basic, Gold)</li>
            <li>Exclusive Premium Content</li>
            <li>Master the Market</li>
          </ul>
          <Link to="/auth" className="cta-button">Go for Gold</Link>
        </div>
      </div>
    </div>
  );
};

export default Membership;
