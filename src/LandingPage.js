import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Membership from './Membership';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Start Your Trading Journey.</h1>
        <p>Master the markets by learning the art of trading. We provide the tools, you determine the strategy.</p>
        <Link to="/auth" className="cta-button">Get Started</Link>
      </div>

      <div className="features-section">
        <div className="bento-box">
          <h3>Expert Insights</h3>
          <p>Gain valuable insights by following signals from experienced traders. Understand market analysis and identify high-probability trading opportunities.</p>
        </div>
        <div className="bento-box">
          <h3>Develop Your Skills</h3>
          <p>You can apply your knowledge in real-time, allowing you to develop your trading skills while having the potential to grow your portfolio.</p>
        </div>
        <div className="bento-box">
          <h3>Achieve Independence</h3>
          <p>Our primary objective is to empower you with the tools and knowledge required to build your own successful trading strategy and trade with confidence.</p>
        </div>
      </div>
      <Membership />
    </div>
  );
};

export default LandingPage;
