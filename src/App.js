import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import Footer from './Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GX Trades</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </header>
      <div className={`App-drawer ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={closeMenu}>×</button>
        <nav>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
          <Link to="/trades" onClick={closeMenu}>Trades</Link>
          <Link to="/signal/1" onClick={closeMenu}>Signal 1</Link>          
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/terms" onClick={closeMenu}>Terms</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/admin" onClick={closeMenu}>Admin</Link>
          <Link to="/profile" onClick={closeMenu}>Profile</Link>
        </nav>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
