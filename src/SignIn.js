import React, { useContext, useEffect, useState } from 'react';
import { signInWithGoogle, setUpRecaptcha, signInWithPhone } from './auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './AuthForm.css';

const SignIn = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handlePhoneSignIn = async () => {
    setError('');
    if (!phone) {
      setError('Please enter a phone number.');
      return;
    }
    try {
      const appVerifier = setUpRecaptcha('recaptcha-container');
      const result = await signInWithPhone(phone, appVerifier);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('Failed to send verification code. Please make sure the phone number is correct and try again.');
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }
    try {
      await confirmationResult.confirm(code);
      // The user is now signed in, the useEffect will handle the redirect.
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Google Sign-In */}
      <button onClick={signInWithGoogle} className="google-btn">
        <div className="google-icon"></div>
        Sign In with Google
      </button>

      <div className="divider">OR</div>

      {/* Phone Sign-In */}
      {!confirmationResult ? (
        <div className="phone-auth-section">
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter phone number" 
          />
          <button onClick={handlePhoneSignIn}>Send Code</button>
        </div>
      ) : (
        <div className="phone-auth-section">
          <input 
            type="text" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            placeholder="Enter verification code" 
          />
          <button onClick={handleVerifyCode}>Sign In</button>
        </div>
      )}

      <div id="recaptcha-container"></div>

      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
