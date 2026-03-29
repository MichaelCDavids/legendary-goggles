import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';
import Footer from './Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ ...user, ...docSnap.data() });
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
            <Link to="/post-signal"><span role="img" aria-label="post signal">📝</span> Post Signal</Link>
            <Link to="/about"><span role="img" aria-label="about">ℹ️</span> About</Link>
            <Link to="/terms"><span role="img" aria-label="terms and conditions">📜</span> Terms</Link>
            {user ? (
              <button onClick={() => auth.signOut()}>Sign Out</button>
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

export default App;
