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

// Add your admin emails here
const adminEmails = ['wwwthurlofrancis9@gmail.com', 'michaelcdavids@gmail.com'];

const createUserProfile = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const { displayName, email, photoURL } = user;
    const role = adminEmails.includes(email) ? 'admin' : 'member';
    await setDoc(userRef, {
      displayName,
      email,
      photoURL,
      role,
      tier: 'Free'
    });
    return true; // New user
  }
  return false; // Existing user
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const isNewUser = await createUserProfile(result.user);
      return { user: result.user, isNewUser };
    }
    return null;
  } catch (error) {
    console.error("Error handling redirect result: ", error);
    return null;
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const isNewUser = await createUserProfile(result.user);
    return { user: result.user, isNewUser };
  } catch (error) {
    console.error("Error signing in with email: ", error);
    throw error;
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const isNewUser = await createUserProfile(result.user);
    return { user: result.user, isNewUser };
  } catch (error) {
    console.error("Error signing up with email: ", error);
    throw error;
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

export const signInWithPhone = async (phoneNumber, appVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    console.error("Error signing in with phone number: ", error);
    throw error;
  }
};

export const verifyPhoneCode = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code);
    const isNewUser = await createUserProfile(result.user);
    return { user: result.user, isNewUser };
  } catch (error) {
    console.error("Error verifying phone code: ", error);
    throw error;
  }
};