
import { auth, facebookProvider } from './firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut,
  signInWithPhoneNumber
} from 'firebase/auth';

const createMockUser = (role) => ({
  user: {
    uid: 'mock-uid',
    displayName: role === 'admin' ? 'Mock Admin' : 'Mock User',
    email: role === 'admin' ? 'admin@mock.com' : 'user@mock.com',
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
    // Add a role property to the mock user
    role: role,
  },
});

const signInWithGoogle = async () => {
  try {
    // Mock the Google sign-in for a regular user
    return Promise.resolve(createMockUser('user'));
  } catch (error) {
  }
};

const signInWithGoogleAdmin = async () => {
  try {
    // Mock the Google sign-in for an admin user
    return Promise.resolve(createMockUser('admin'));
  } catch (error) {
  }
};

const signInWithFacebook = async () => {
  try {
    await signInWithPopup(auth, facebookProvider);
  } catch (error) {
  }
};

const signInWithPhone = async (phoneNumber) => {
  try {
    // This is a simplified example. In a real application, you would need to handle the reCAPTCHA verification.
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    // In a real app, you would prompt the user to enter the code sent to their phone.
    const code = window.prompt("Enter the code sent to your phone:");
    await confirmationResult.confirm(code);
  } catch (error) {
  }
};

const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
  }
};

const signUpWithEmail = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
  }
};

export {
  signInWithGoogle,
  signInWithGoogleAdmin,
  signInWithFacebook,
  signInWithPhone,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  signOutUser
};
