import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loading } from '../components/Loading/Loading';

export const PublicRoute = ({ children }) => {
  const { isLogin, checking } = useSelector((state) => state.authReducer);

  // if (checking) {
  //   return <Loading />;
  // }

  return isLogin ? <Navigate to={`/home`} /> : children;
};
