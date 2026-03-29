import React, { useState } from 'react';
import { signUpWithEmail, signInWithGoogle, signInWithGoogleAdmin } from './auth';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';

    if (!password) formErrors.password = 'Password is required';
    else if (password.length < 6) formErrors.password = 'Password must be at least 6 characters';

    if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUpWithEmail(email, password);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="google-btn-container">
        <button onClick={signInWithGoogle} className="google-btn">
          <div className="google-icon"></div>
          Sign Up with Google
        </button>
      </div>
      <div className="google-btn-container">
        <button onClick={signInWithGoogleAdmin} className="google-btn">
          <div className="google-icon"></div>
          Sign Up with Google (Admin)
        </button>
      </div>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
