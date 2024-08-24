import useAuth from '@/hooks/useAuth';
import React from 'react';

const UserOverview = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>userOverview</h1>
    </div>
  );
};

export default UserOverview;
