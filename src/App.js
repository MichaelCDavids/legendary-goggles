
import React, { useState } from 'react';
import './App.css';
import SignalForm from './SignalForm';
import Dashboard from './Dashboard';

function App() {
  const [userTier, setUserTier] = useState('Free'); // Default to Free tier

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trading Signals App</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {/* Simple tier selector for demonstration */}
        <div>
          <h2>Select Your Tier:</h2>
          <select value={userTier} onChange={(e) => setUserTier(e.target.value)}>
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Gold">Gold</option>
          </select>
        </div>

        <hr />

        {/* Trader's view to post signals */}
        <SignalForm />

        <hr />

        {/* Client's view of the dashboard */}
        <Dashboard userTier={userTier} />
      </div>
    </div>
  );
}

export default App;
