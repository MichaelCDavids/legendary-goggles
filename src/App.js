import React, { useState, useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';
import Footer from './Footer';
import { UserContext, UserProvider } from './UserContext';
import { handleRedirectResult } from './auth';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirectResult();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trade Signals Market</h1>
        <nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span role="img" aria-label="menu">☰</span>
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/dashboard"><span role="img" aria-label="dashboard">🏠</span> Dashboard</Link>
            {user && user.tier === 'admin' && <Link to="/post-signal"><span role="img" aria-label="post signal">📝</span> Post Signal</Link>}
            <Link to="/about"><span role="img" aria-label="about">ℹ️</span> About</Link>
            <Link to="/terms"><span role="img" aria-label="terms and conditions">📜</span> Terms</Link>
            {user ? (
              <>
                <Link to="/profile"><span role="img" aria-label="profile">👤</span> Profile</Link>
                <button onClick={() => auth.signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin"><span role="img" aria-label="sign in">🚪</span> Sign In</Link>
                <Link to="/signup"><span role="img" aria-label="sign up">👤</span> Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWrapper;
