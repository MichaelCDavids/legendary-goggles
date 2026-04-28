import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import About from './About';
import Terms from './Terms';
import LandingPage from './LandingPage';
import FAQ from './FAQ';
import Auth from './Auth';
import TradesPage from './TradesPage';
import SignalDetailPage from './SignalDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/auth', element: <Auth /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/trades', element: <TradesPage /> },
      { path: '/signal/:id', element: <SignalDetailPage /> },
      { path: '/about', element: <About /> },
      { path: '/terms', element: <Terms /> },
      { path: '/faq', element: <FAQ /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
