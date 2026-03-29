import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './SignalCard.css';

const tierLevels = {
  'Free': 0,
  'Basic': 1,
  'Gold': 2,
};

const SignalCard = ({ trade, membership }) => {
  const toDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return 'N/A';
  }

  const userTierLevel = tierLevels[membership] ?? 0;
  const signalTierLevel = tierLevels[trade.requiredTier] ?? 0;
  const hasAccess = userTierLevel >= signalTierLevel;

  if (!hasAccess) {
    return (
      <div className="trade-card locked">
        <div className="trade-info">
          <h3>{trade.asset}</h3>
          <p>Upgrade your membership to view this signal.</p>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/signals/${trade.id}`} className="trade-card-link">
      <div className="trade-card">
        <div className="trade-info">
          <h3>{trade.asset}</h3>
          <p>Posted At: {toDate(trade.createdAt)}</p>
          <p>Order Type: {trade.orderType}</p>
          <p>Entry Point: {trade.entryPoint}</p>
          <p>Stop Loss: {trade.stopLoss}</p>
          <p>Take Profit: {trade.takeProfit}</p>
          <p>Timeframe: {trade.timeframe}</p>
        </div>
        <div className="trade-qr">
          <QRCode value={JSON.stringify(trade)} size={128} />
        </div>
      </div>
    </Link>
  );
};

export default SignalCard;
