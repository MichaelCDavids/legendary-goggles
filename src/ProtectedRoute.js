import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, role: userRole, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
