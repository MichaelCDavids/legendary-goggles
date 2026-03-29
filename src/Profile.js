import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { auth, db } from './firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './AuthForm.css';

const Profile = () => {
  const { user, refreshUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { displayName, photoURL }, { merge: true });
      refreshUser();
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Edit Profile</h2>
      {user && <p>Email: {user.email}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
          />
        </div>
        <div>
          <input 
            type="text" 
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Photo URL"
          />
        </div>
        <button type="submit">Update Profile</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Profile;
