import React, { useState } from 'react';
import '../../assets/styles/components/TechnicianPage/TechnicianTable.scss';
import { Modal } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HOME, PROJECT } from '../../routes/path';
import { ModalNewTechnician } from './ModalNewTechnician';

export const TechnicianTable = () => {
  const [opened, setOpened] = useState(false);

  const { technicians } = useSelector((state) => state.technicianReducer);

  return (
    <div className="div-manage-technician-container">
      <div className="div-btn-container">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Crea un nuevo Técnico">
          <ModalNewTechnician setOpened={setOpened} />
        </Modal>
        <button onClick={() => setOpened(true)}>+ Crear Nuevo Técnico</button>
        <Link to={HOME}>
          <button>Volver al administrador de proyectos</button>
        </Link>
      </div>
      <div className='table-container'>
        <table className="table-manage-projects-container">
          <thead>
            <tr className="table-manage-projects-header">
              {/* <th><img TODO FALTA IMAGEN/></th> */}
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>DNI o Cedula</th>
              <th>Puesto</th>
              <th>Conocimiento</th>
              <th>Velocidad</th>
              <th>Liderazgo</th>
              <th>Sociabilidad</th>
              <th>Responsabilidad</th>
              <th>Opciones</th>
            </tr>
          </thead>

          {technicians &&
            technicians.map((technician) => {
              return (
                <tbody key={technician.id}>
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
                        <button className="table-btn-view">Ver Tarjeta</button>
                        <button className="table-btn-edit">Editar</button>
                        <button className="table-btn-delete">Borrar</button>
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
