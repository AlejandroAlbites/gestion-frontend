import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import { CardTechnician } from './CardTechnician';
import '../../assets/styles/components/TechnicianPage/TechnicianTable.scss';
import { ModalEditTechnician } from './ModalEditTechnician';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { destroyTechnicianAction } from '../../store/actions/actionsTechnician';

export const TechnicianOptions = ({ technician }) => {
  const [openedCardtechnician, setOpenedCardTechnician] = useState(false);
  const [openedEditTechnician, setOpenedEditTechnician] = useState(false);
  const [openedDeleteTechnician, setOpenedDeleteTechnician] = useState(false);

  const dispatch = useDispatch();

  const handleClickDeleteTechnician = () => {
    if (technician.projectId === null && technician.groupId === null) {
      dispatch(destroyTechnicianAction(technician._id));
    } else {
      toast.error(
        'El personal no debe estar asignado a un projecto para ser eliminado',
        {
          position: 'top-center',
          theme: 'colored',
        }
      );
    }
    setOpenedDeleteTechnician(false);
  };
  return (
    <div>
      <Modal
        withCloseButton={false}
        opened={openedCardtechnician}
        onClose={() => setOpenedCardTechnician(false)}>
        <CardTechnician technicianId={technician._id} />
      </Modal>
      <Modal
        opened={openedEditTechnician}
        onClose={() => setOpenedEditTechnician(false)}
        title="Editar datos">
        <ModalEditTechnician
          technician={technician}
          setOpenedEditTechnician={setOpenedEditTechnician}
        />
      </Modal>
      <Modal
        opened={openedDeleteTechnician}
        onClose={() => setOpenedDeleteTechnician(false)}
        withCloseButton={false}>
        <div className="div-modal-delete-technician-container">
          <h1>¿Estás seguro que quieres eliminar a este personal?</h1>
          <h2>No podrás recuperar la información de este Personal</h2>
          <div>
            <button
              className="table-btn-delete"
              onClick={() => setOpenedDeleteTechnician(false)}>
              Cancelar
            </button>
            <button
              className="table-btn-yes"
              onClick={handleClickDeleteTechnician}>
              Si
            </button>
          </div>
        </div>
      </Modal>
      <button
        className="table-btn-view"
        onClick={() => setOpenedCardTechnician(true)}>
        Tarjeta
      </button>
      <button
        className="table-btn-edit"
        onClick={() => setOpenedEditTechnician(true)}>
        Editar
      </button>
      <button
        className="table-btn-delete"
        onClick={() => setOpenedDeleteTechnician(true)}>
        Eliminar
      </button>
      <ToastContainer />
    </div>
  );
};
