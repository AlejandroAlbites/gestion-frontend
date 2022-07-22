import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import { CardTechnician } from './CardTechnician';
import '../../assets/styles/components/TechnicianPage/TechnicianTable.scss';
import { ModalEditTechnician } from './ModalEditTechnician';

export const TechnicianOptions = ({ technician }) => {
  const [openedCardtechnician, setOpenedCardTechnician] = useState(false);
  const [openedEditTechnician, setOpenedEditTechnician] = useState(false);
  return (
    <div>
      <Modal
        opened={openedCardtechnician}
        onClose={() => setOpenedCardTechnician(false)}
        title="Ficha del Personal">
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
      <button className="table-btn-delete">Borrar</button>
    </div>
  );
};
