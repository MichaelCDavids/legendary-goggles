import React from 'react';
import { signInWithGoogle } from './auth';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const SignIn = () => {

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
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
