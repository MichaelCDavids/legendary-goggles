import React from 'react';
import './Admin.css';
import SignalForm from './SignalForm';

const Admin = () => {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard. Here you can manage users and signals.</p>
      <SignalForm />
    </div>
  );
};

export default Admin;
