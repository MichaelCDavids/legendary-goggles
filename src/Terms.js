import React from 'react';
import './App.css';
const Terms = () => {
  return (
    <div className="terms-page">
      <div className="bento-box">
        <h2>Terms of Service</h2>
        <p>Welcome to GX Trades. By accessing or using our service, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not use our service.</p>
      </div>
      <div className="bento-box">
        <h3>1. No Guarantees of Profit</h3>
        <p>Trading involves substantial risk and is not suitable for every investor. We provide high-quality data and analysis, but we do not guarantee any specific outcomes. All trading decisions are your own, and you are solely responsible for the results.</p>
      </div>
      <div className="bento-box">
        <h3>2. Informational Purposes Only</h3>
        <p>The information provided through GX Trades is for informational purposes only and does not constitute financial advice. You should not trade with money that you cannot afford to lose. Your trading decisions are your own responsibility.</p>
      </div>
      <div className="bento-box">
        <h3>3. User Conduct</h3>
        <p>You agree not to misuse our service or help anyone else to do so. You are expected to interact with other users in a respectful and professional manner. We reserve the right to suspend or terminate your access to our services if you violate these terms.</p>
      </div>
    </div>
  );
};

export default Terms;
