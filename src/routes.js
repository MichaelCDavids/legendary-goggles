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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/profile', element: <Profile /> },
      { path: '/signals/:signalId', element: <SignalDetailPage /> },
      { path: '/post-success/:signalId', element: <SignalPostConfirmation /> },
      { path: '/post-signal', element: <SignalForm /> },
      { path: '/about', element: <About /> },
      { path: '/terms', element: <Terms /> },
      { path: '/popia', element: <POPIA /> },
    ],
  },
]);

export default router;
