import React from 'react';
import ParallaxImage from './ParallaxImage';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <ParallaxImage src="/images/candlesticks.jpg">
        <div className="about-header">
          <h2>About Trade Signals Market</h2>
        </div>
      </ParallaxImage>
      <div className="about-content">
        <p>Trade Signals Market is a platform dedicated to providing high-quality trading signals for a variety of assets. Our mission is to empower traders by offering them the insights they need to make informed decisions.</p>
        
        <h3>Our Vision</h3>
        <p>We believe that everyone should have access to the tools and information necessary to succeed in the financial markets. That's why we're committed to creating a platform that is both powerful and easy to use, with a focus on transparency and community.</p>

        <h3>Features</h3>
        <ul>
          <li>Real-time trading signals for a wide range of assets.</li>
          <li>Detailed signal analysis and performance tracking.</li>
          <li>A community of traders to share insights and strategies.</li>
          <li>Customizable alerts and notifications.</li>
        </ul>

        <h3>Our Team</h3>
        <p>We are a team of experienced traders, developers, and data scientists who are passionate about building the best trading signals platform on the market. We are committed to providing our users with the tools and support they need to succeed.</p>

        <h3>Data Privacy and Security</h3>
        <p>We take your privacy and security very seriously. We are committed to complying with all applicable data protection regulations, including the POPIA act. For more information, please see our <a href="/popia">POPIA</a> page.</p>

        <h3>Disclaimer</h3>
        <p><strong>Please note:</strong> This application is currently under active development. As such, some features may not be fully functional, and you may encounter bugs or other issues. We appreciate your patience and feedback as we work to improve the platform.</p>
      </div>
    </div>
  );
};

export default About;
