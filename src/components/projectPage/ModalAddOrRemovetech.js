import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  addOrRemoveTechInProject,
  getTechniciansAction,
} from '../../store/actions/actionsTechnician';
import '../../assets/styles/components/ProjectPage/ModalAddOrRemoveTech.scss';
import { useParams } from 'react-router-dom';
import { ListTechInModal } from './ListTechInModal';

export const ModalAddOrRemovetech = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    dispatch(getTechniciansAction());
  }, [dispatch]);

  const { technicians } = useSelector((state) => state.technicianReducer);

  // Filtro por nombre de tecnicos
  let search = [];
  if (technicians) {
    search = technicians.filter((technican) =>
      technican.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  }

  return (
    <section>
      <div className="div-search-technician-header">
        <h2>Filtra el nombre del personal</h2>
      </div>

      <div className="div-search-container">
        <input
          type="text"
          className="div-search-technician-input"
          placeholder="Ingresa el nombre del técnico"
          value={newFilter}
          onChange={(e) => setNewFilter(e.target.value)}
        />
      </div>
      <div className="div-list-technician-container">
        {search.map((technician) => (
          <ListTechInModal key={technician._id} technician={technician} />
        ))}
      </div>
    </section>
  );
};
