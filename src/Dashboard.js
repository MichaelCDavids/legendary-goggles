import React, { useContext } from 'react';
import Trades from './Trades';
import Tooltip from './Tooltip';
import { UserContext } from './UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const userMembership = user ? user.tier : 'Free'; 

  return (
    <div className="dashboard">
      <h2>Welcome, {user ? user.displayName : 'Guest'}!</h2>
      <p>Your current membership tier is: <strong>{userMembership}</strong></p>
      <Tooltip text="Upgrade to a premium membership to view all trade details.">
        <Trades membership={userMembership} />
      </Tooltip>
    </div>
  );
};

export default Dashboard;
