
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const Dashboard = ({ userTier }) => {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    if (userTier) {
      const signalsRef = collection(db, 'signals');
      let q;
      if (userTier === 'Gold') {
        q = query(signalsRef);
      } else if (userTier === 'Basic') {
        q = query(signalsRef, where('requiredTier', 'in', ['Free', 'Basic']));
      } else {
        q = query(signalsRef, where('requiredTier', '==', 'Free'));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const signalsData = [];
        querySnapshot.forEach((doc) => {
          signalsData.push({ id: doc.id, ...doc.data() });
        });
        setSignals(signalsData);
      });

      return () => unsubscribe();
    }
  }, [userTier]);

  return (
    <div>
      <h2>Signals Dashboard</h2>
      {signals.map((signal) => (
        <div key={signal.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p>{signal.signal}</p>
          <p>Required Tier: {signal.requiredTier}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
