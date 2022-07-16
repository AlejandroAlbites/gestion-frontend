import React, { useState } from 'react';
import '../../assets/styles/components/HomePage/TablesProjects.scss';
import { Modal } from '@mantine/core';
import { ModalNewProject } from './ModalNewProject';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PROJECT, TECHNICIANS } from '../../routes/path';

export const TablesProjects = () => {
  const [opened, setOpened] = useState(false);

  const { projects } = useSelector((state) => state.projectReducer);

  return (
    <div className="div-manage-projects-container">
      <div className="div-btn-container">
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Crea un Nuevo Proyecto">
          <ModalNewProject setOpened={setOpened} />
        </Modal>
        <button onClick={() => setOpened(true)}>+ Crear Nuevo Proyecto</button>
        <Link to={TECHNICIANS}>
          <button>Ir a administrar personal Técnico</button>
        </Link>
      </div>
      <table className="table-manage-projects-container">
        <thead>
          <tr className="table-manage-projects-header">
            <th>Nombre del Proyecto</th>
            <th>Estado</th>
            <th>Grupos</th>
            <th>Personal Asignado</th>
            <th>Opciones</th>
          </tr>
        </thead>

        {projects &&
          projects.map((project) => {
            return (
              <tbody key={project.id}>
                <tr className="table-manage-projects-body">
                  <td>{project.name}</td>
                  <td>{project.status}</td>
                  <td> {project.groupsId.length} </td>
                  <td>{project.techniciansId.length}</td>
                  <td>
                    <div className="table-btn-options">
                      <Link to={PROJECT}>
                        <button className="table-btn-view">Ver</button>
                      </Link>
                      <button className="table-btn-delete">Borrar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};
