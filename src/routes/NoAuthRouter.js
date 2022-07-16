import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { TechnicianPage } from '../pages/TechnicianPage';

export const NoAuthRouter = () => {
  return (
    <Routes>
      <Route exact path="home" element={<HomePage />} />
      <Route exact path="technicians" element={<TechnicianPage />} />
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};
