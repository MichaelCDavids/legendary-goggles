
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import {
  signInWithGoogle,
  signInWithEmail,
  setUpRecaptcha,
  signInWithPhone,
  verifyPhoneCode,
} from './authFunctions';
import './App.css';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [authMethod, setAuthMethod] = useState(''); // '', 'email', or 'phone'
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const { user, isNewUser } = await signInWithGoogle();
      setUser(user);
      if (isNewUser) {
        navigate('/complete-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user, isNewUser } = await signInWithEmail(email, password);
      setUser(user);
      if (isNewUser) {
        navigate('/complete-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const recaptcha = await setUpRecaptcha('recaptcha-container');
      const result = await signInWithPhone(phone, recaptcha);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('Failed to send verification code. Please check your phone number and try again.');
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }
    try {
      const { user, isNewUser } = await verifyPhoneCode(confirmationResult, code);
      setUser(user);
      if (isNewUser) {
        navigate('/complete-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('Invalid verification code. Please try again.');
    }
  };

  const renderAuthMethod = () => {
    if (confirmationResult) {
      return (
        <div>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Verification Code" />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>
      );
    }

    switch (authMethod) {
      case 'email':
        return (
          <form onSubmit={handleEmailAuth}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
          </form>
        );
      case 'phone':
        return (
          <form onSubmit={handlePhoneAuth}>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
            <div id="recaptcha-container"></div>
            <button type="submit">Send Code</button>
          </form>
        );
      default:
        return (
          <div className="auth-methods">
            <button onClick={() => setAuthMethod('email')}>Use Email</button>
            <button onClick={() => setAuthMethod('phone')}>Use Phone</button>
            <button onClick={handleGoogleAuth}>Sign in with Google</button>
          </div>
        );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        {renderAuthMethod()}
        <p className="toggle-auth">
          Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
