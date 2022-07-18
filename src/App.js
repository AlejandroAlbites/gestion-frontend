import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { startChecking } from './store/actions/actionsAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TechnicianPage } from './pages/TechnicianPage';
import { HOME, LANDINPAGE, PROJECT, TECHNICIANS } from './routes/path';
import { LandingPage } from './pages/LandingPage';
import { ProjectPage } from './pages/ProjectPage';
import { PublicRoute } from './routes/PublicRoute';
import { PrivateRoute } from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import { AuthRoutes } from './routes/AuthRoutes';

function App() {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={LANDINPAGE}
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route path="/home/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
