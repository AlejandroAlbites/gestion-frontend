import React from 'react';
import { Technicals } from './Technicals';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

export const Groups = ({ group, technicals, index }) => {
  const { groups } = useSelector((state) => state.groupReducer);

  const isDragDisabled = group.id === groups[0]._id;
  return (
    <Draggable
      draggableId={group.id}
      index={index}
      isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          className={
            index === 0 ? 'div-group-technicals-list' : 'div-container-group'
          }
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <h2 {...provided.dragHandleProps}>{group.title}</h2>
          <Droppable droppableId={group.id} type="technical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {technicals.map((technical, index) => (
                  <Technicals
                    key={technical.id}
                    technical={technical}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
