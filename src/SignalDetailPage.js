
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const SignalDetailPage = ({ userTier }) => {
  const { signalId } = useParams();
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const docRef = doc(db, 'signals', signalId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const signalData = { id: docSnap.id, ...docSnap.data() };
          
          // Authorization check
          if (userTier === 'Gold' || 
              (userTier === 'Basic' && (signalData.requiredTier === 'Basic' || signalData.requiredTier === 'Free')) || 
              (userTier === 'Free' && signalData.requiredTier === 'Free')) {
            setSignal(signalData);
          } else {
            setError('You do not have the required tier to view this signal.');
          }
        } else {
          setError('Signal not found.');
        }
      } catch (err) {
        setError('Error fetching signal.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSignal();
  }, [signalId, userTier]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {signal ? (
        <div className="signal-detail">
          <h2>{signal.asset} - {signal.tradeType}</h2>
          <p><strong>Entry Price:</strong> {signal.entryPoint}</p>
          <p><strong>Stop Loss:</strong> {signal.stopLoss}</p>
          <p><strong>Take Profit:</strong> {signal.takeProfit}</p>
          <p><strong>Timeframe:</strong> {signal.timeframe}</p>
          <p><strong>Risk/Reward Ratio:</strong> {signal.riskRewardRatio}</p>
          <p><strong>Signal Provider:</strong> {signal.signalProvider}</p>
          <p><strong>Confidence Level:</strong> {signal.confidenceLevel}</p>
          <p><strong>Market Analysis:</strong> {signal.marketAnalysis}</p>
          <p><strong>Required Tier:</strong> {signal.requiredTier}</p>
          {signal.createdAt && (
            <p><small>Posted at: {new Date(signal.createdAt.seconds * 1000).toLocaleString()}</small></p>
          )}
        </div>
      ) : (
        <p>Signal details not available.</p>
      )}
    </div>
  );
};

export default SignalDetailPage;
