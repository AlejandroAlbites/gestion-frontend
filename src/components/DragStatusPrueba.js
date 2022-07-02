import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "../assets/components/DragAndDrop.scss";
import { DragAndDrop, groupsFromBackend } from "./DragAndDrop";

export const statusFromBackend = [
  {
    id: "12345",
    name: "Lista de personal",
    groups: [],
  },
  {
    id: "12445",
    name: "En Espera",
    groups: groupsFromBackend,
  },
  {
    id: "12545",
    name: "En ejecucion",
    groups: [],
  },
];

const onDragEnd = (result, statusGroup, setStatusGroup) => {
  if (!result.destination) {
    return;
  }
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceStatus = statusGroup[source.droppableId];
    const destinationStatus = statusGroup[destination.droppableId];
    const sourcegroups = [...sourceStatus.groups];
    const destgroups = [...destinationStatus.groups];
    const [removed] = sourcegroups.splice(source.index, 1);
    destgroups.splice(destination.index, 0, removed);
    setStatusGroup({
      ...statusGroup,
      [source.droppableId]: {
        ...sourceStatus,
        groups: sourcegroups,
      },
      [destination.droppableId]: {
        ...destinationStatus,
        groups: destgroups,
      },
    });
  } else {
    const status = statusGroup[source.droppableId];
    const copiedItems = [...status.groups];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setStatusGroup({
      ...statusGroup,
      [source.droppableId]: {
        ...status,
        groups: copiedItems,
      },
    });
  }
};

export const DragStatusPrueba = () => {
  const [statusGroup, setStatusGroup] = useState(statusFromBackend);
  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, statusGroup, setStatusGroup)}
      >
        {Object.entries(statusGroup).map(([id, state]) => {
          return (
            <div key={id}>
              <h2>{state.name}</h2>
              {/* <DragAndDrop /> */}
              <Droppable droppableId={id}>
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {state.groups.map((group, index) => {
                        return (
                          <Draggable
                            key={group.id}
                            draggableId={group.id}
                            index={index}
                          >
                            {/* <DragAndDrop /> */}
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {group.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
