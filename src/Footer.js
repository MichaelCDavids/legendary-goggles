
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>Using Notes Headings</h3>
        <p>This section can contain important notes on how to use the signals, trading strategies, or platform features. For example, explanations of different order types or risk management principles.</p>
      </div>
      <div className="footer-section">
        <h3>Important Reads</h3>
        <ul>
          <li><a href="#risk-management">Risk Management Guide</a></li>
          <li><a href="#trading-psychology">Trading Psychology 101</a></li>
          <li><a href="#market-analysis">Understanding Market Analysis</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
