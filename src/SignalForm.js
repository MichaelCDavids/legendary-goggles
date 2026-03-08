
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const SignalForm = () => {
  const [signal, setSignal] = useState('');
  const [requiredTier, setRequiredTier] = useState('Free');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'signals'), {
        signal,
        requiredTier,
        createdAt: new Date(),
      });
      setSignal('');
      setRequiredTier('Free');
      alert('Signal posted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error posting signal.');
    }
  };

  return (
    <div>
      <h2>Post a New Signal</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={signal}
          onChange={(e) => setSignal(e.target.value)}
          placeholder="Enter your signal"
          rows="4"
          cols="50"
        />
        <br />
        <label>Required Tier:</label>
        <select value={requiredTier} onChange={(e) => setRequiredTier(e.target.value)}>
          <option value="Free">Free</option>
          <option value="Basic">Basic</option>
          <option value="Gold">Gold</option>
        </select>
        <br />
        <button type="submit">Post Signal</button>
      </form>
    </div>
  );
};

export default SignalForm;
