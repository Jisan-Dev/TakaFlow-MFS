import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import UserOverview from '../user/UserOverview';
import AgentOverview from '../agent/AgentOverview';
import { Navigate } from 'react-router-dom';

const Overview = () => {
  const { user } = useContext(AuthContext);
  // if (!user) return <Navigate to={'/login'} />;
  return (
    <>
      {user?.role === 'personal' && <UserOverview />}
      {user?.role === 'agent' && <AgentOverview />}
    </>
  );
};

export default Overview;
