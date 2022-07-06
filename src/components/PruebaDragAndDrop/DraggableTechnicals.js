import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const DraggableTechnicals = ({ technical, index }) => {
  return (
    <Draggable draggableId={technical.id} index={index}>
      {(providedDraggable) => {
        return (
          <div
            ref={providedDraggable.innerRef}
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            className="div-card-technical"
          >
            {index === 0 && <p className="p-leader-group">Team Leader</p>}
            {technical.name}
          </div>
        );
      }}
    </Draggable>
  );
};
