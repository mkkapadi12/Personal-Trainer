import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('workDo');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
