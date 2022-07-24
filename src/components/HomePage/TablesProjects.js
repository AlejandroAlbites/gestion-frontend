import React, { useState } from 'react';
import '../../assets/styles/components/HomePage/TablesProjects.scss';
import { Modal } from '@mantine/core';
import { ModalNewProject } from './ModalNewProject';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TECHNICIANS } from '../../routes/path';
import { StatusProject } from './StatusProject';
import logo1 from '../../assets/images/logo1.png';
import { DeleteProject } from './DeleteProject';
import { Loader } from '@mantine/core';

export const TablesProjects = () => {
  const [opened, setOpened] = useState(false);

  const { projects, isLoadingProject } = useSelector(
    (state) => state.projectReducer
  );
  const { isLoginEdit } = useSelector((state) => state.authReducer);

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
        {isLoadingProject && <Loader color="cyan" size="sm" variant="dots" />}
        {isLoginEdit && <Loader color="cyan" size="sm" variant="dots" />}
        <Link to={TECHNICIANS}>
          <button>Ir a Administrar Personal</button>
        </Link>
      </div>
      <div className="table-container">
        {projects.length === 0 ? (
          <div className="div-welcome-message">
            <img src={logo1} alt="logo1" loading="lazy" />
            <h1>
              Bienvenido a easyGroup, en este espacio podrás crear y administrar
              tus proyectos, también podrás ver su estado y un resumen de los
              grupos y personal asignado. Antes de empezar por favor crea tu
              primer proyecto en el botón superior.
            </h1>
          </div>
        ) : (
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
                  <tbody key={project._id}>
                    <tr className="table-manage-projects-body">
                      <td>{project.name}</td>
                      <td>
                        <StatusProject projectId={project._id} />
                      </td>
                      <td>
                        {' '}
                        {project.groupsId.length === 0
                          ? project.groupsId.length
                          : project.groupsId.length - 1}{' '}
                      </td>
                      <td>{project.techniciansId.length}</td>
                      <td>
                        <div className="table-btn-options">
                          <Link to={`/home/project/${project._id}`}>
                            <button className="table-btn-view">Ver</button>
                          </Link>
                          <DeleteProject projectId={project._id} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        )}
      </div>
    </div>
  );
};
