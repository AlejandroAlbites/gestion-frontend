import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import { destroyProjectAction } from '../../store/actions/actionsProject';
import { useDispatch } from 'react-redux';

export const DeleteProject = ({ projectId }) => {
  const [openedDeleteProject, setOpenedDeleteProject] = useState(false);
  const dispatch = useDispatch();
  const handleClickDeleteProject = () => {
    dispatch(destroyProjectAction(projectId));
    setOpenedDeleteProject(false);
  };
  return (
    <>
      <Modal
        opened={openedDeleteProject}
        onClose={() => setOpenedDeleteProject(false)}
        withCloseButton={false}>
        <div className="div-modal-delete-technician-container">
          <h1>¿Estás seguro que quieres eliminar el proyecto?</h1>
          <h2>
            Todos los datos del proyecto se perderán, esta opción es
            irreversible
          </h2>
          <div>
            <button
              className="table-btn-delete"
              onClick={() => setOpenedDeleteProject(false)}>
              Cancelar
            </button>
            <button
              className="table-btn-yes"
              onClick={handleClickDeleteProject}>
              Si
            </button>
          </div>
        </div>
      </Modal>
      <button
        className="table-btn-delete"
        onClick={() => setOpenedDeleteProject(true)}>
        Eliminar
      </button>
    </>
  );
};
