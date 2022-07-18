import React, { useEffect } from 'react';
import { Aside } from '../components/HomePage/Aside';
import { TechnicianTable } from '../components/TechnicianPage/TechnicianTable';
import '../assets/styles/pages/TechnicianPage.scss';
import { getTechniciansAction } from '../store/actions/actionsTechnician';
import { useDispatch } from 'react-redux';
export const TechnicianPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTechniciansAction());
  }, [dispatch]);
  return (
    <main className="main-container">
      <Aside />
      <div className='container'>
        <div className="main-item-container">
          <TechnicianTable />
        </div>
      </div>
    </main>
  );
};
