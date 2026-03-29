import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import SignalCard from './SignalCard';
import './Trades.css';

const assetGroups = {
  Metals: ["XAUUSD", "XAGUSD"],
  Indices: ["US30", "NAS100", "SPX500"],
  "Major Pairs": ["GBPUSD", "EURUSD", "USDJPY", "USDCAD", "AUDUSD", "NZDUSD", "USDCHF"],
  Cryptos: ["BTCUSD", "ETHUSD", "LTCUSD"],
};

const Trades = ({ membership }) => {
  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const q = query(collection(db, 'signals'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const signals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrades(signals);
    });

    return () => unsubscribe();
  }, []);

  const filteredTrades = trades.filter((trade) =>
    filter === '' || trade.asset === filter
  );

  const paginatedTrades = filteredTrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="trades-container">
      <div className="trades-header">
        <h2>Trade Signals</h2>
        <div className="filter-container">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Assets</option>
            {Object.entries(assetGroups).map(([group, assets]) => (
              <optgroup label={group} key={group}>
                {assets.map(asset => <option key={asset} value={asset}>{asset}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
      <div className="trades-list">
        {paginatedTrades.map((trade) => (
          <SignalCard key={trade.id} trade={trade} membership={membership} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTrades.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredTrades.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Trades;
