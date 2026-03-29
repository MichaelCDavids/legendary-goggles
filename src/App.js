import React, { useState, useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';
import Footer from './Footer';
import { UserContext, UserProvider } from './UserContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

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
            {role === 'admin' && <Link to="/post-signal"><span role="img" aria-label="post signal">📝</span> Post Signal</Link>}
            {role === 'admin' && <Link to="/admin"><span role="img" aria-label="admin dashboard">👑</span> Admin</Link>}
            <Link to="/about"><span role="img" aria-label="about">ℹ️</span> About</Link>
            <Link to="/terms"><span role="img" aria-label="terms and conditions">📜</span> Terms</Link>
            {user ? (
              <>
                <Link to="/profile"><span role="img" aria-label="profile">👤</span> Profile</Link>
                <button onClick={handleSignOut}>Sign Out</button>
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
