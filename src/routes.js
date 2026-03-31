import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import SignalForm from './SignalForm';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignalDetailPage from './SignalDetailPage';
import SignalPostConfirmation from './SignalPostConfirmation';
import NotFound from './NotFound';
import About from './About';
import Terms from './Terms';
import POPIA from './POPIA';
import LandingPage from './LandingPage';
import Profile from './Profile';
import Admin from './Admin';
import CompleteProfile from './CompleteProfile';
import ProtectedRoute from './ProtectedRoute';
import NotAuthorized from './NotAuthorized';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/complete-profile', element: <ProtectedRoute><CompleteProfile /></ProtectedRoute> },
      { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '/signals/:signalId', element: <SignalDetailPage /> },
      { path: '/post-success/:signalId', element: <SignalPostConfirmation /> },
      { path: '/post-signal', element: <ProtectedRoute role="admin"><SignalForm /></ProtectedRoute> },
      { path: '/about', element: <About /> },
      { path: '/terms', element: <Terms /> },
      { path: '/popia', element: <POPIA /> },
      { path: '/admin', element: <ProtectedRoute role="admin"><Admin /></ProtectedRoute> },
      { path: '/not-authorized', element: <NotAuthorized /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
