import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Aside } from '../components/HomePage/Aside';
import { TablesProjects } from '../components/HomePage/TablesProjects';
import { getUsersIdAction } from '../store/actions/actionsAuth';
import '../assets/styles/pages/HomePage.scss';
import { getProjectsAction } from '../store/actions/actionsProject';
import { getTechniciansAction } from '../store/actions/actionsTechnician';
import { getAllGroupsAction } from '../store/actions/actionsGroup';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersIdAction());
    dispatch(getProjectsAction());
    dispatch(getTechniciansAction());
    dispatch(getAllGroupsAction());
  }, [dispatch]);
  return (
    <main className="main-container">
      <Aside />
      <div className="container">
        <div className="main-item-container">
          <TablesProjects />
        </div>
      </div>
    </main>
  );
};
