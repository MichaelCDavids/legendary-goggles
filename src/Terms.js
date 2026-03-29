import React from 'react';
import './AuthForm.css';

const Terms = () => {
  return (
    <div className="auth-form">
      <h2>Terms and Conditions</h2>
      <p>By using the Trade Signals Market platform, you agree to the following terms and conditions:</p>
      
      <h3>1. Use of the Platform</h3>
      <ul>
        <li>You must be at least 18 years old to use the platform.</li>
        <li>You are responsible for maintaining the security of your account and password.</li>
        <li>You agree to use the platform in compliance with all applicable laws and regulations.</li>
      </ul>

      <h3>2. Disclaimer of Liability</h3>
      <ul>
        <li>The information provided on the platform is for informational purposes only and should not be construed as financial advice.</li>
        <li>We do not guarantee the accuracy, completeness, or timeliness of the information provided on the platform.</li>
        <li>You will not hold the platform or its creators liable for any financial losses you may incur.</li>
      </ul>

      <h3>3. Intellectual Property</h3>
      <ul>
        <li>All content on the platform, including but not limited to text, graphics, logos, and software, is the property of Trade Signals Market or its licensors.</li>
        <li>You may not reproduce, distribute, or create derivative works from the content on the platform without our prior written consent.</li>
      </ul>

      <h3>4. Data Privacy</h3>
      <ul>
        <li>We are committed to protecting your privacy and complying with all applicable data protection regulations, including the POPIA act.</li>
        <li>For more information about how we collect, use, and share your personal information, please see our <a href="/popia">POPIA</a> page.</li>
      </ul>

      <h3>5. Termination</h3>
      <ul>
        <li>We reserve the right to terminate your access to the platform at any time, for any reason.</li>
        <li>You may terminate your account at any time by contacting us.</li>
      </ul>

      <h3>6. Changes to the Terms and Conditions</h3>
      <ul>
        <li>We reserve the right to update these terms and conditions at any time.</li>
        <li>We will notify you of any changes by posting the new terms and conditions on the platform.</li>
      </ul>

      <h3>Disclaimer</h3>
      <p><strong>Please note:</strong> This application is currently under active development. As such, some features may not be fully functional, and you may encounter bugs or other issues. We appreciate your patience and feedback as we work to improve the platform.</p>
    </div>
  );
};

export default Terms;
