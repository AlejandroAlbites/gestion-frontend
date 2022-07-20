import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Modal } from '@mantine/core';

export const Technicals = ({ technical, index }) => {
  const [opened, setOpened] = useState(false);

  const handleDoubleClick = () => {
    console.log('doble click', technical.id);
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
            title="Ficha del Personal"></Modal>
          {index === 0 && <p className="p-leader-group">Team Leader</p>}
          {technical.name}
        </div>
      )}
    </Draggable>
  );
};
