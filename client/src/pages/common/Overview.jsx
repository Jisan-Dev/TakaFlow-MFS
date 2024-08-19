import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import UserOverview from '../user/UserOverview';
import AgentOverview from '../agent/AgentOverview';

const Overview = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.role === 'user' && <UserOverview />}
      {user?.role === 'agent' && <AgentOverview />}
    </>
  );
};

export default Overview;
