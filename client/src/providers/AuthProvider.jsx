import useAxiosSecure from '@/hooks/useAxiosSecure';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await axios.get('http://localhost:5000/currUser', { withCredentials: true });
      setUser(data);
      console.log('curreUser=>', data);
      setLoading(false);
    };
    getUser();
    setLoading(false);
  }, [update]);

  const authInfo = { user, loading, setUpdate, setLoading };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
