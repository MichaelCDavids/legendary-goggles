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
const adminEmails = ['admin@example.com', 'your-email@example.com', 'michaelcdavids@gmail.com'];

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
  }
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
      await createUserProfile(result.user);
      return result.user;
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
