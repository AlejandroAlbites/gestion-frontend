import React, { useState } from 'react';
import '../../assets/styles/components/TechnicianPage/TechnicianTable.scss';
import { Modal } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HOME } from '../../routes/path';
import { ModalNewTechnician } from './ModalNewTechnician';
import { TechnicianOptions } from './TechnicianOptions';
import { Loader } from '@mantine/core';

export const TechnicianTable = () => {
  const [opened, setOpened] = useState(false);

  const { technicians, isLoadingTech } = useSelector(
    (state) => state.technicianReducer
  );

  return (
    <div className="div-manage-technician-container">
      <div className="div-btn-container">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Crea un nuevo Personal">
          <ModalNewTechnician setOpened={setOpened} />
        </Modal>

        <button onClick={() => setOpened(true)}>+ Crear Nuevo Personal</button>
        {isLoadingTech && <Loader color="cyan" size="sm" variant="dots" />}
        <Link to={HOME}>
          <button>Volver al administrador de proyectos</button>
        </Link>
      </div>
      <div className="table-container">
        <table className="table-manage-projects-container">
          <thead>
            <tr className="table-manage-projects-header">
              <th>Nombres</th>
              <th>Apellidos</th>
              <th># Documento</th>
              <th>Puesto</th>
              <th>Con</th>
              <th>Vel</th>
              <th>Lid</th>
              <th>Soc</th>
              <th>Resp</th>
              <th>Opciones</th>
            </tr>
          </thead>
          {technicians &&
            technicians.map((technician) => {
              return (
                <tbody key={technician._id}>
                  <tr className="table-manage-projects-body">
                    <td> {technician.name}</td>
                    <td> {technician.lastName}</td>
                    <td> {technician.dni}</td>
                    <td> {technician.role}</td>
                    <td> {technician.statistics[0]}</td>
                    <td> {technician.statistics[1]}</td>
                    <td> {technician.statistics[2]}</td>
                    <td> {technician.statistics[3]}</td>
                    <td> {technician.statistics[4]}</td>
                    <td>
                      <div className="table-btn-options">
                        <TechnicianOptions technician={technician} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  );
};
