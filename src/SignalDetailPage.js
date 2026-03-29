import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Spinner from './Spinner';
import './SignalDetailPage.css';

const SignalDetailPage = () => {
  const { signalId } = useParams();
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const docRef = doc(db, 'signals', signalId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSignal({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignal();
  }, [signalId]);

  const toDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return 'N/A';
  };

  if (loading) return <Spinner />;
  if (!signal) return <p>Signal not found.</p>;

  return (
    <div className="signal-detail-container">
      <h2>Signal Details</h2>
      <div className="signal-info-grid">
        <p><strong>Asset:</strong> {signal.asset}</p>
        <p><strong>Order Type:</strong> {signal.orderType}</p>
        <p><strong>Volume:</strong> {signal.volume}</p>
        <p><strong>Entry Point:</strong> {signal.entryPoint}</p>
        <p><strong>Take Profit:</strong> {signal.takeProfit}</p>
        <p><strong>Stop Loss:</strong> {signal.stopLoss}</p>
        <p><strong>Timeframe:</strong> {signal.timeframe}</p>
        <p><strong>Required Tier:</strong> {signal.requiredTier}</p>
        <p><strong>Posted At:</strong> {toDate(signal.createdAt)}</p>
        <p><strong>Risk/Reward Ratio:</strong> {signal.riskRewardRatio}</p>
        <p><strong>Signal Provider:</strong> {signal.signalProvider}</p>
        <p><strong>Confidence Level:</strong> {signal.confidenceLevel}</p>
      </div>
      <div className="market-analysis">
        <h3>Market Analysis</h3>
        <p>{signal.marketAnalysis || 'No analysis provided.'}</p>
      </div>
    </div>
  );
};

export default SignalDetailPage;
