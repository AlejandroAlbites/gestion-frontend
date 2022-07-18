import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ProjectPage } from '../pages/ProjectPage';
import { TechnicianPage } from '../pages/TechnicianPage';
import { HOME, PROJECT, TECHNICIANS } from './path';
import { PrivateRoute } from './PrivateRoute';

export const AuthRoutes = () => {
  const { checking } = useSelector((state) => state.authReducer);

  if (checking) {
    return <div></div>;
  }
  return (
    <Routes>
      <Route
        path={TECHNICIANS}
        element={
          <PrivateRoute>
            <TechnicianPage />
          </PrivateRoute>
        }
      />
      <Route
        path={HOME}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path={PROJECT}
        element={
          <PrivateRoute>
            <ProjectPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
