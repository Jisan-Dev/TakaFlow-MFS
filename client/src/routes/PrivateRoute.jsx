import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';

const PrivateRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token || token === undefined) {
      return false;
    } else {
      return true;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TbFidgetSpinner className="animate-spin m-auto text-5xl text-slate-900" />
      </div>
    );
  }

  if (isLoggedIn()) {
    return children;
  } else {
    return <Navigate to={'/login'} state={location?.pathname} replace={true} />;
  }
};

export default PrivateRoute;
