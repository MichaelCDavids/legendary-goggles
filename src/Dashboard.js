/*
  NOTE FOR DEVELOPERS:

  The trade signals displayed in this dashboard are intended to be sourced from MetaTrader 5.
  In a production environment, an API call should be made to a backend service that is connected to MetaTrader 5 
  to fetch the latest trade signals. The fetched signals should then be displayed in the `Trades` component.

  The current implementation uses mock data for demonstration purposes.
*/

import React from 'react';
import Trades from './Trades';
import Tooltip from './Tooltip';

const Dashboard = ({ user }) => {
  const userMembership = user ? user.membership : 'free'; // Default to free for logged-out users

  return (
    <div className="dashboard">
      <Tooltip text="Upgrade to a premium membership to view all trade details.">
        <Trades membership={userMembership} />
      </Tooltip>
    </div>
  );
};

export default Dashboard;
