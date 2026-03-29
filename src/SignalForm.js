
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './SignalForm.css';

const popularAssets = [
  "XAUUSD", "US30", "NASDAQ", "GBPUSD", "EURUSD", "USDJPY", "USDCAD", "AUDUSD",
  "NZDUSD", "USDCHF", "BTCUSD", "ETHUSD", "LTCUSD"
];

const SignalForm = () => {
  const [asset, setAsset] = useState(popularAssets[0]);
  const [tradeType, setTradeType] = useState('Buy');
  const [entryPoint, setEntryPoint] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [requiredTier, setRequiredTier] = useState('Free');
  const [timeframe, setTimeframe] = useState('1-hour');
  const [riskRewardRatio, setRiskRewardRatio] = useState('');
  const [signalProvider, setSignalProvider] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('');
  const [marketAnalysis, setMarketAnalysis] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'signals'), {
        asset,
        tradeType,
        entryPoint,
        takeProfit,
        stopLoss,
        requiredTier,
        timeframe,
        riskRewardRatio,
        signalProvider,
        confidenceLevel,
        marketAnalysis,
        createdAt: serverTimestamp(),
      });
      // Reset form or provide feedback
      setEntryPoint('');
      setTakeProfit('');
      setStopLoss('');
      setRiskRewardRatio('');
      setSignalProvider('');
      setConfidenceLevel('');
      setMarketAnalysis('');
      alert('Signal posted successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error posting signal.');
    }
  };

  return (
    <div className="signal-form-container">
      <h2>Post a New Signal</h2>
      <form onSubmit={handleSubmit} className="signal-form">
        <div>
          <label>Asset:</label>
          <select value={asset} onChange={(e) => setAsset(e.target.value)} required>
            {popularAssets.map(asset => <option key={asset} value={asset}>{asset}</option>)}
          </select>
        </div>
        <div>
          <label>Trade Type:</label>
          <select value={tradeType} onChange={(e) => setTradeType(e.target.value)} required>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <div>
          <label>Entry Point:</label>
          <input
            type="text"
            value={entryPoint}
            onChange={(e) => setEntryPoint(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Take Profit:</label>
          <input
            type="text"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stop Loss:</label>
          <input
            type="text"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Timeframe:</label>
          <input
            type="text"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Risk/Reward Ratio:</label>
          <input
            type="text"
            value={riskRewardRatio}
            onChange={(e) => setRiskRewardRatio(e.target.value)}
          />
        </div>
        <div>
          <label>Signal Provider:</label>
          <input
            type="text"
            value={signalProvider}
            onChange={(e) => setSignalProvider(e.target.value)}
          />
        </div>
        <div>
          <label>Confidence Level:</label>
          <input
            type="text"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(e.target.value)}
          />
        </div>
        <div>
          <label>Market Analysis:</label>
          <textarea
            value={marketAnalysis}
            onChange={(e) => setMarketAnalysis(e.target.value)}
          />
        </div>
        <div>
          <label>Required Tier:</label>
          <select value={requiredTier} onChange={(e) => setRequiredTier(e.target.value)} required>
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Gold">Gold</option>
          </select>
        </div>
        <button type="submit">Post Signal</button>
      </form>
    </div>
  );
};

export default SignalForm;
