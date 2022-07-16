import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { HOME } from './path';

export const PublicRouteLanding = () => {
  const { isLogin } = useSelector((state) => state.authReducer);

  if (isLogin) {
    return <Navigate to={HOME} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
