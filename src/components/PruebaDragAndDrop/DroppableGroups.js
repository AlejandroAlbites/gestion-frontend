import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DraggableTechnicals } from "./DraggableTechnicals";
export const DroppableGroups = ({ group, id, index }) => {
  return (
    <Draggable draggableId={group.id} index={index}>
      {(providedGroups) => {
        return (
          <div
            className="div-group-container"
            {...providedGroups.draggableProps}
            {...providedGroups.dragHandleProps}
            ref={providedGroups.innerRef}
          >
            <h2>{group.name}</h2>
            <Droppable droppableId={id} type="technical">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="div-group-list"
                  >
                    {group.technicals.map((technical, index) => {
                      return (
                        <DraggableTechnicals
                          key={technical.id}
                          technical={technical}
                          index={index}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};
