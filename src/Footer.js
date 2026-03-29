
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>About Trade Signals Markets</h3>
        <p>Your go-to platform for reliable trading signals and market insights.</p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/terms">Terms & Conditions</Link></li>
          <li><Link to="/popia">POPIA</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
