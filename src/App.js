
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from './store/actions/actionsAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LANDINPAGE } from './routes/path';
import { LandingPage } from './pages/LandingPage';
import { PublicRoute } from './routes/PublicRoute';
import { AuthRoutes } from './routes/AuthRoutes';


function App() {
  const dispatch = useDispatch();

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
