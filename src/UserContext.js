import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { memberships } from './memberships';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [role, setRole] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.role ? parsedUser.role : null;
    }
    return null;
  });
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userWithRoleAndTier = { ...userAuth, role: userData.role, tier: userData.tier };
          setRole(userData.role);
          setMembership(memberships[userData.tier.toLowerCase()] || memberships.free);
          setUser(userWithRoleAndTier);
          localStorage.setItem('user', JSON.stringify(userWithRoleAndTier));
        } else {
          const defaultUser = { ...userAuth, role: 'member', tier: 'Free' };
          setRole('member');
          setMembership(memberships.free);
          setUser(defaultUser);
          localStorage.setItem('user', JSON.stringify(defaultUser));
        }
      } else {
        setUser(null);
        setRole(null);
        setMembership(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, role, membership, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
