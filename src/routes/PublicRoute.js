import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { HOME } from './path';

export const PublicRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.authReducer);

  return isLogin ? <Navigate to={`/home`} /> : children;
};
