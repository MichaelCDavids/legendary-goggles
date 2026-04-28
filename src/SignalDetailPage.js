import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Spinner from './Spinner';
import MarketNews from './MarketNews';
import './SignalDetailPage.css';

const SignalDetailPage = () => {
  const { id } = useParams();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchTrade = async () => {
      const tradeDoc = await getDoc(doc(db, 'signals', id));
      if (tradeDoc.exists()) {
        setTrade(tradeDoc.data());
      }
      setLoading(false);
    };

    fetchTrade();
  }, [id]);

  const copyToClipboard = () => {
    const tradeDetails = `Asset: ${trade.asset}\nDirection: ${trade.direction}\nEntry Price: ${trade.entryPrice}\nStop Loss: ${trade.stopLoss}\nTake Profit: ${trade.takeProfit}`;
    navigator.clipboard.writeText(tradeDetails).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!trade) {
    return <p>Trade not found.</p>;
  }

  return (
    <div className="signal-detail-page">
      <div className="bento-box">
        <div className="signal-header">
          <h2>{trade.asset}</h2>
          <button onClick={copyToClipboard} className="copy-button">
            {copied ? 'Copied!' : 'Copy Trade'}
          </button>
        </div>
        <p><strong>Direction:</strong> {trade.direction}</p>
        <p><strong>Entry Price:</strong> {trade.entryPrice}</p>
        <p><strong>Stop Loss:</strong> {trade.stopLoss}</p>
        <p><strong>Take Profit:</strong> {trade.takeProfit}</p>
        <p><strong>Status:</strong> {trade.status}</p>
      </div>
      <div className="bento-box">
        <h3>Market News</h3>
        <MarketNews asset={trade.asset} />
      </div>
    </div>
  );
};

export default SignalDetailPage;
