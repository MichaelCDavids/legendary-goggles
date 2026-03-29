import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

const CompleteProfile = () => {
  const { user } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: displayName,
      });
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
