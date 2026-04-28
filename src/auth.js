
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
