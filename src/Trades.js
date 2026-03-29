import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import './Trades.css';

const Trades = () => {
  const [trades, setTrades] = useState([
    {
      id: 1,
      name: 'Trade 1',
      description: 'This is the first trade',
      date: '2024-05-23',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Trade 2',
      description: 'This is the second trade',
      date: '2024-05-22',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Trade 3',
      description: 'This is the third trade',
      date: '2024-05-21',
      status: 'Completed',
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const [filter, setFilter] = useState('');

  const sortedTrades = React.useMemo(() => {
    let sortableTrades = [...trades];
    if (sortConfig !== null) {
      sortableTrades.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTrades;
  }, [trades, sortConfig]);

  const filteredTrades = sortedTrades.filter((trade) =>
    trade.name.toLowerCase().includes(filter.toLowerCase())
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="trades-container">
      <div className="trades-header">
        <h2>Gold Member Trades</h2>
        <div className="controls">
          <input 
            type="text" 
            placeholder="Filter by name..." 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
          />
          <div className="sort-buttons">
            <button onClick={() => requestSort('date')}>Sort by Date</button>
            <button onClick={() => requestSort('status')}>Sort by Status</button>
          </div>
        </div>
      </div>
      <div className="trades-list">
        {filteredTrades.map((trade) => (
          <div key={trade.id} className="trade-card">
            <div className="trade-info">
              <h3>{trade.name}</h3>
              <p>{trade.description}</p>
              <p>Date: {trade.date}</p>
              <p>Status: {trade.status}</p>
            </div>
            <div className="trade-qr">
              <QRCode value={JSON.stringify(trade)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trades;
