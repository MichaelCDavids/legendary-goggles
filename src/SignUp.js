import React from 'react';
import { signInWithGoogle } from './auth';
import { Link } from 'react-router-dom';
import './AuthForm.css';

const SignUp = () => {

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <div className="google-btn-container">
        <button onClick={signInWithGoogle} className="google-btn">
          <div className="google-icon"></div>
          Sign Up with Google
        </button>
      </div>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
