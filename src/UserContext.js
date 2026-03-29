import React, { createContext, useState, useEffect, useCallback } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext({ user: null, refreshUser: () => {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async (authUser) => {
    if (authUser) {
      const userRef = doc(db, 'users', authUser.uid);
      const userDoc = await getDoc(userRef);
      setUser({ ...authUser, ...userDoc.data() });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, fetchUser);
    return unsubscribe;
  }, [fetchUser]);

  const refreshUser = useCallback(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchUser(currentUser);
    }
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
