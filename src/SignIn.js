import React, { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from './auth';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = 'Email is invalid';

    if (!password) formErrors.password = 'Password is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signInWithEmail(email, password);
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <button onClick={signInWithGoogle} className="google-btn">
        <div className="google-icon"></div>
        Sign In with Google
      </button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
