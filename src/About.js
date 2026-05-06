import React from 'react';
import './App.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="bento-box">
        <h2>Our Philosophy</h2>
        <p>In the complex world of finance, we believe that knowledge is the key to success. Our platform is designed to provide you with high-quality data and analysis, not to offer unrealistic promises of guaranteed returns.</p>
        <p>Our mission is to empower you to make informed, strategic decisions that lead to long-term success. We provide the same level of data and analysis used by professionals to level the playing field.</p>
      </div>
      <div className="bento-box">
        <h2>The GX Trades Edge</h2>
        <p>We combine advanced technology with deep market expertise to deliver reliable trading signals. These signals are the result of extensive research, backtesting, and refinement, allowing you to focus on executing your strategy with precision and confidence.</p>
      </div>
    </div>
  );
};

export default About;
