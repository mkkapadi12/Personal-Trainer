import { Loader2 } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('workDo');
  const { user, loading, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  // ⏳ Wait until auth check completes
  if (!isAuthChecked || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  // ❌ Redirect only AFTER check
  if (!token || !user) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  // ✅ Allow access
  return <Outlet />;
};

export default PrivateRoute;
