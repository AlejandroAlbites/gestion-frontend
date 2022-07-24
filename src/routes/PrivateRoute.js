import React from 'react';
import { LANDINPAGE } from './path';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const { isLogin } = useSelector((state) => state.authReducer);
  return isLogin ? children : <Navigate to={LANDINPAGE} />;
};
