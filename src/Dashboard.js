import React, { useContext } from 'react';
import Trades from './Trades';
import Tooltip from './Tooltip';
import { UserContext } from './UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const userMembership = user ? user.tier : 'Free'; // Default to free for logged-out users

  return (
    <div className="dashboard">
      <Tooltip text="Upgrade to a premium membership to view all trade details.">
        <Trades membership={userMembership} />
      </Tooltip>
    </div>
  );
};

export default Dashboard;
