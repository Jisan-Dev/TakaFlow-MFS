import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';

const PrivateRoute = ({ children }) => {
  const { loading, user, currentUser, isLoading, refetch } = useContext(AuthContext);
  const location = useLocation();

  // const isLoggedIn = () => {
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  //   if (!token) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-indigo-900 flex items-center justify-center">
        <TbFidgetSpinner className="animate-spin m-auto text-5xl text-slate-100" />
      </div>
    );
  }

  if (user || currentUser) {
    return children;
  } else {
    return <Navigate to={'/login'} state={location?.pathname} replace={true} />;
  }
};

export default PrivateRoute;
