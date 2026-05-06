import React from 'react';
import { useParams } from 'react-router-dom';
import { trades } from './mockData';
import MarketNews from './MarketNews';
import './App.css';
const SignalDetailPage = () => {
  const { id } = useParams();
  const trade = trades.find(t => t.id === parseInt(id));

  if (!trade) {
    return <p>Trade not found.</p>;
  }

  return (
    <div className="signal-detail-page">
      <div className="bento-box">
        <div className="signal-header">
          <h2>{trade.symbol}</h2>
        </div>
        <p><strong>Type:</strong> {trade.type}</p>
        <p><strong>Entry Price:</strong> {trade.entryPrice}</p>
        {trade.exitPrice && <p><strong>Exit Price:</strong> {trade.exitPrice}</p>}
        <p><strong>Status:</strong> {trade.status}</p>
      </div>
      <div className="bento-box">
        <h3>Market News</h3>
        <MarketNews asset={trade.symbol} />
      </div>
    </div>
  );
};

export default SignalDetailPage;
