
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Auth.css';


// Sign in with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const isNewUser = !userDoc.exists();
  if (isNewUser) {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });
  }
  return { user, isNewUser };
};

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const isNewUser = !(await getDoc(doc(db, 'users', user.uid))).exists();
  if (isNewUser) {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date(),
    });
  }
  return { user, isNewUser };
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const isNewUser = !(await getDoc(doc(db, 'users', user.uid))).exists();
  return { user, isNewUser };
};

// Set up reCAPTCHA for phone authentication
export const setUpRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log('reCAPTCHA solved');
    },
  });
};


// Sign in with phone number
export const signInWithPhone = async (phone, recaptcha) => {
  const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptcha);
  return confirmationResult;
};


// Verify phone verification code
export const verifyPhoneCode = async (confirmationResult, code) => {
  const result = await confirmationResult.confirm(code);
  const user = result.user;
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  const isNewUser = !userDoc.exists();
  if (isNewUser) {
    await setDoc(doc(db, 'users', user.uid), {
      phoneNumber: user.phoneNumber,
      createdAt: new Date(),
    });
  }
  return { user, isNewUser };
};


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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
      const authFunc = isSignUp ? signUpWithEmail : signInWithEmail;
      const { user, isNewUser } = await authFunc(email, password);
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
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
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
        <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        {error && <p className="error-message">{error}</p>}
        {renderAuthMethod()}
        <p className="toggle-auth">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Sign In' : 'Sign Up'}</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
