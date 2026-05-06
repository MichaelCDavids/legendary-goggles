import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import About from './About';
import Terms from './Terms';
import LandingPage from './LandingPage';
import FAQ from './FAQ';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import TradesPage from './TradesPage';
import SignalDetailPage from './SignalDetailPage';
import Admin from './Admin';
import Profile from './Profile';
import CompleteProfile from './CompleteProfile';
import SignalForm from './SignalForm';
import SignalPostConfirmation from './SignalPostConfirmation';
import NotAuthorized from './NotAuthorized';
import POPIA from './POPIA';
import Membership from './Membership';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/trades', element: <TradesPage /> },
      { path: '/signal/:id', element: <SignalDetailPage /> },
      { path: '/about', element: <About /> },
      { path: '/terms', element: <Terms /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/admin', element: <Admin /> },
      { path: '/profile', element: <Profile /> },
      { path: '/complete-profile', element: <CompleteProfile /> },
      { path: '/signal-form', element: <SignalForm /> },
      { path: '/signal-post-confirmation', element: <SignalPostConfirmation /> },
      { path: '/not-authorized', element: <NotAuthorized /> },
      { path: '/popia', element: <POPIA /> },
      { path: '/membership', element: <Membership /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
