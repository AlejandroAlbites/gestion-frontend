import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Modal } from '@mantine/core';
// import { CardTechnician } from '../TechnicianPage/CardTechnician';
import { useSelector } from 'react-redux';

export const Technicals = ({ technical, index, group }) => {
  const [opened, setOpened] = useState(false);
  const { groups } = useSelector((state) => state.groupReducer);
  let initialGroup = '';
  if (groups) {
    initialGroup = groups[0]._id;
  }
  const handleDoubleClick = () => {
    setOpened(true);
  };

  return (
    <Draggable draggableId={technical.id} index={index}>
      {(provided) => (
        <div
          className="div-technical-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={handleDoubleClick}>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Ficha del Personal">
            {/* <CardTechnician technicianId={technical.id} />{' '} */}
          </Modal>
          {initialGroup !== group.id ? (
            <div>
              {index === 0 && <p className="p-leader-group">Lider</p>}
              {technical.name}
            </div>
          ) : (
            <div className="technicals-container-initial-group">
              {technical.name}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
