import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <h1 className="text-3xl font-bold uppercase">
        HOMEPAGE for <span className="text-indigo-700">{user?.name}</span> whose role here is the <span className="text-indigo-700">{user?.role}</span>
      </h1>
    </div>
  );
};

export default Home;
