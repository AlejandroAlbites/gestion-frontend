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
import { PublicRouteLanding } from './routes/PublicRouteLanding';
import { PrivateRouteHome } from './routes/PrivateRouteHome';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRouteLanding />}>
          <Route path={LANDINPAGE} element={<LandingPage />} />
        </Route>
        <Route path={HOME} element={<PrivateRouteHome />}>
          <Route path={HOME} element={<HomePage />} />
          <Route path={TECHNICIANS} element={<TechnicianPage />} />
          <Route path={PROJECT} element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
