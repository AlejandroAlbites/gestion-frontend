import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LandingPage } from '../pages/LandingPage';

export const AuthRouter = () => {
  //   const { checking } = useSelector((state) => state.authReducer);

  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
