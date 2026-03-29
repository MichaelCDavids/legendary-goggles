import { auth, db } from './firebase';
import { 
  signInWithRedirect, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getRedirectResult
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

const createUserProfile = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const { displayName, email, photoURL } = user;
    await setDoc(userRef, {
      displayName,
      email,
      photoURL,
      role: 'member',
      tier: 'Free'
    });
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      await createUserProfile(result.user);
    }
  } catch (error) {
    console.error("Error handling redirect result: ", error);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user);
  } catch (error) {
    console.error("Error signing in with email: ", error);
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user);
  } catch (error) {
    console.error("Error signing up with email: ", error);
  }
};

export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const setUpRecaptcha = (recaptchaContainer) => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
    'size': 'invisible',
    'callback': (response) => {
      console.log("reCAPTCHA solved");
    }
  });
  return recaptchaVerifier;
};

export const signInWithPhone = (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};