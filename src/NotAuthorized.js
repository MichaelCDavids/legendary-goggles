import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Not Authorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default NotAuthorized;
