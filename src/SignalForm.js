
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './SignalForm.css';

const timeframes = [
  '1-minute', '5-minute', '15-minute', '30-minute',
  '1-hour', '4-hour', '1-day', '1-week', '1-month'
];

const assetGroups = [
  {
    label: 'Forex',
    options: ['EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCAD']
  },
  {
    label: 'Crypto',
    options: ['BTCUSD', 'ETHUSD', 'XRPUSD', 'LTCUSD', 'BCHUSD']
  },
  {
    label: 'Stocks',
    options: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']
  },
  {
      label: 'Indices',
      options: ['SPX500', 'DJI30', 'NASDAQ100', 'FTSE100']
  },
    {
        label: 'Metals',
        options: ['XAUUSD', 'XAGUSD']
    }
];

const SignalForm = () => {
  const [asset, setAsset] = useState(assetGroups[0].options[0]);
  const [orderType, setOrderType] = useState('Buy');
  const [volume, setVolume] = useState('');
  const [entryPoint, setEntryPoint] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [requiredTier, setRequiredTier] = useState('Free');
  const [marketAnalysis, setMarketAnalysis] = useState('');
  const [riskRewardRatio, setRiskRewardRatio] = useState('');
  const [signalProvider, setSignalProvider] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('');
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'signals'), {
        asset,
        orderType,
        volume: parseFloat(volume),
        entryPoint: parseFloat(entryPoint),
        takeProfit: parseFloat(takeProfit),
        stopLoss: parseFloat(stopLoss),
        timeframe,
        requiredTier,
        marketAnalysis,
        riskRewardRatio,
        signalProvider,
        confidenceLevel,
        createdAt: new Date(),
      });
      setStatus('success');
      navigate('/dashboard');
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="signal-form-container">
      <h2>Post a New Trade Signal</h2>
      <form onSubmit={handleSubmit} className="signal-form">
        <div className="form-group">
          <label htmlFor="asset">Asset</label>
          <select id="asset" value={asset} onChange={(e) => setAsset(e.target.value)} required>
            {assetGroups.map(group => (
              <optgroup label={group.label} key={group.label}>
                {group.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="orderType">Order Type</label>
          <select id="orderType" value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Buy Limit">Buy Limit</option>
            <option value="Sell Limit">Sell Limit</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="volume">Volume</label>
          <input id="volume" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="entryPoint">Entry Point</label>
          <input id="entryPoint" type="number" value={entryPoint} onChange={(e) => setEntryPoint(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="takeProfit">Take Profit</label>
          <input id="takeProfit" type="number" value={takeProfit} onChange={(e) => setTakeProfit(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="stopLoss">Stop Loss</label>
          <input id="stopLoss" type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="timeframe">Timeframe</label>
          <select id="timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            {timeframes.map(tf => <option key={tf} value={tf}>{tf}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="requiredTier">Required Tier</label>
          <select id="requiredTier" value={requiredTier} onChange={(e) => setRequiredTier(e.target.value)}>
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Gold">Gold</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="riskRewardRatio">Risk/Reward Ratio (e.g., 1:2)</label>
          <input id="riskRewardRatio" type="text" value={riskRewardRatio} onChange={(e) => setRiskRewardRatio(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="signalProvider">Signal Provider</label>
          <input id="signalProvider" type="text" value={signalProvider} onChange={(e) => setSignalProvider(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="confidenceLevel">Confidence Level (e.g., 85%)</label>
          <input id="confidenceLevel" type="text" value={confidenceLevel} onChange={(e) => setConfidenceLevel(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="marketAnalysis">Market Analysis</label>
          <textarea id="marketAnalysis" value={marketAnalysis} onChange={(e) => setMarketAnalysis(e.target.value)} />
        </div>
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Posting...' : 'Post Signal'}
        </button>
        {status === 'error' && <p className="error-message">Failed to post signal. Please try again.</p>}
      </form>
    </div>
  );
};

export default SignalForm;
