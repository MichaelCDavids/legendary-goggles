import React from 'react';
import { trades } from './mockData';
import './Dashboard.css';

const Dashboard = () => {
  const openTrades = trades.filter(trade => trade.status === 'Open').length;
  const closedTrades = trades.filter(trade => trade.status === 'Closed').length;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Open Trades</h2>
          <p>{openTrades}</p>
        </div>
        <div className="summary-card">
          <h2>Closed Trades</h2>
          <p>{closedTrades}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
