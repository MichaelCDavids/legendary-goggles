
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import Spinner from './Spinner';

const Dashboard = lazy(() => import('./Dashboard'));
const SignalForm = lazy(() => import('./SignalForm'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const SignalDetailPage = lazy(() => import('./SignalDetailPage'));
const NotFound = lazy(() => import('./NotFound'));

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Thurlo Trades</h1>
          <nav>
            <Link to="/"><span role="img" aria-label="dashboard">🏠</span></Link>
            <Link to="/post-signal"><span role="img" aria-label="post signal">📝</span></Link>
            <Link to="/signin"><span role="img" aria-label="sign in">🚪</span></Link>
            <Link to="/signup"><span role="img" aria-label="sign up">👤</span></Link>
          </nav>
        </header>
        <div style={{ padding: '20px' }}>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signals/:signalId" element={<SignalDetailPage />} />
                <Route path="/post-signal" element={<SignalForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
