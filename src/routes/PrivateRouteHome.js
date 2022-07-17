import React from 'react';
import { LANDINPAGE } from './path';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteHome = () => {
  const { isLogin } = useSelector((state) => state.authReducer);

  if (!isLogin) {
    return <Navigate to={LANDINPAGE} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
