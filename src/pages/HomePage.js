import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Aside } from '../components/HomePage/Aside';
import { TablesProjects } from '../components/HomePage/TablesProjects';
import { getUsersIdAction } from '../store/actions/actionsAuth';
import '../assets/styles/pages/HomePage.scss';
import { getProjectsAction } from '../store/actions/actionsProject';
import { getTechniciansAction } from '../store/actions/actionsTechnician';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersIdAction());
    dispatch(getProjectsAction());
    dispatch(getTechniciansAction());
  }, [dispatch]);
  return (
    <main className="main-home-page-container">
      <Aside />
      <div className="div-table-container">
        <TablesProjects />
      </div>
    </main>
  );
};
