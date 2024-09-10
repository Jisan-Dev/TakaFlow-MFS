import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const createUser = async (userInfo) => {
    setLoading(true);
    console.log(userInfo);
    const data = await axiosPublic.post('/users', userInfo);
    console.log(data);
    if (data.status === 200 && data.data?.status === 'verified') {
      localStorage.setItem('user', JSON.stringify(data.data));
      setUser(userInfo);
    }
    return data;
  };

  const signIn = async (userInfo) => {
    setLoading(true);
    const { data } = await axiosPublic.get('/users', { params: userInfo });
    if (data.success && data.status === 'verified') {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('user from sigin func ', user);
    }
    return data;
  };

  // useEffect(() => {
  //   setLoading(true);
  //   const getUser = async () => {
  //     const { data } = await axios.get('http://localhost:3000/users/curr', { withCredentials: true });
  //     setUser(data);
  //     console.log('curreUser=>', data);
  //     setLoading(false);
  //   };
  //   getUser();
  //   setLoading(false);
  // }, [update]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('user from useeffect ', user);
      axiosPublic.post('/users/jwt', JSON.parse(storedUser), { withCredentials: true }).then((res) => console.log(res.data));
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [update]);

  // useEffect(() => {
  //   console.log('useruser, ', user);
  // }, [user]);

  const authInfo = { user, loading, setUpdate, setLoading, signIn, setUser, createUser };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
