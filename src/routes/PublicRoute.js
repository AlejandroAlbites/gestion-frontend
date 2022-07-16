import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.authReducer);

  return isLogin ? <Navigate to="/home" /> : children;
};
