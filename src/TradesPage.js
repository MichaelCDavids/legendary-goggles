
import React from 'react';
import { trades } from './mockData';
import './TradesPage.css';

const TradesPage = () => {
  const openTrades = trades.filter(trade => trade.status === 'Open');
  const closedTrades = trades.filter(trade => trade.status === 'Closed');

  return (
    <div className="trades-page">
      <h1>Trades Dashboard</h1>

      <div className="trades-section">
        <h2>Open Trades</h2>
        {openTrades.length > 0 ? (
          <div className="trades-container">
            {openTrades.map(trade => (
              <div key={trade.id} className="trade-card open">
                <h2>{trade.symbol}</h2>
                <p><strong>Type:</strong> {trade.type}</p>
                <p><strong>Entry Price:</strong> {trade.entryPrice}</p>
                <p><strong>Status:</strong> <span className="status open">{trade.status}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No open trades at the moment.</p>
        )}
      </div>

      <div className="trades-section">
        <h2>Closed Trades</h2>
        {closedTrades.length > 0 ? (
          <div className="trades-container">
            {closedTrades.map(trade => (
              <div key={trade.id} className="trade-card closed">
                <h2>{trade.symbol}</h2>
                <p><strong>Type:</strong> {trade.type}</p>
                <p><strong>Entry Price:</strong> {trade.entryPrice}</p>
                <p><strong>Exit Price:</strong> {trade.exitPrice}</p>
                <p><strong>Status:</strong> <span className="status closed">{trade.status}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No closed trades yet.</p>
        )}
      </div>
    </div>
  );
};

export default TradesPage;
