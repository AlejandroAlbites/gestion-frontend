import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/components/DragAndDropStatus.scss";
// import { DragAndDrop, groupsFromBackend } from "./DragAndDrop";

const technicalsFromBackend = [
  {
    id: "1",
    name: "juan",
  },
  {
    id: "2",
    name: "Ale",
  },
  {
    id: "3",
    name: "pepe",
  },
  {
    id: "4",
    name: "lucas",
  },
  {
    id: "5",
    name: "jorge",
  },
  {
    id: "6",
    name: "jesus",
  },
  {
    id: "7",
    name: "victor",
  },
  {
    id: "8",
    name: "carlos",
  },
];

const groupsFromBackend = [
  {
    id: "123",
    name: "group1",
    technicals: technicalsFromBackend,
  },
  {
    id: "124",
    name: "group2",
    technicals: [],
  },
  {
    id: "125",
    name: "group3",
    technicals: [],
  },
  {
    id: "126",
    name: "group4",
    technicals: [],
  },
];

const statusFromBackend = [
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

const onDragEndTec = (result, groups, setgroups) => {
  if (!result.destination) {
    return;
  }
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourcegroup = groups[source.droppableId];
    const destinationgroup = groups[destination.droppableId];
    const sourcetechnicals = [...sourcegroup.technicals];
    const desttechnicals = [...destinationgroup.technicals];
    const [removed] = sourcetechnicals.splice(source.index, 1);
    desttechnicals.splice(destination.index, 0, removed);
    setgroups({
      ...groups,
      [source.droppableId]: {
        ...sourcegroup,
        technicals: sourcetechnicals,
      },
      [destination.droppableId]: {
        ...destinationgroup,
        technicals: desttechnicals,
      },
    });
  } else {
    const group = groups[source.droppableId];
    const copiedItems = [...group.technicals];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setgroups({
      ...groups,
      [source.droppableId]: {
        ...group,
        technicals: copiedItems,
      },
    });
  }
};

export const DragAndDropStatus = () => {
  const [statusGroup, setStatusGroup] = useState(statusFromBackend);
  const [groups, setgroups] = useState(groupsFromBackend);
  return (
    <div className="div-status-general-container">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, statusGroup, setStatusGroup)}
      >
        {Object.entries(statusGroup).map(([id, state]) => {
          return (
            <div key={id} className="div-status-container">
              <h2>{state.name}</h2>

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
                            {(provided) => {
                              return (
                                <div
                                  className="div-group-container"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <DragDropContext
                                    onDragEnd={
                                      (result) =>
                                        onDragEndTec(result, groups, setgroups)
                                      //   console.log(result)
                                    }
                                  >
                                    {group.name}
                                    <Droppable droppableId={group.id}>
                                      {(provided) => {
                                        return (
                                          <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="div-group-list"
                                          >
                                            {group.technicals.map(
                                              (technical, index) => {
                                                return (
                                                  <Draggable
                                                    key={technical.id}
                                                    draggableId={technical.id}
                                                    index={index}
                                                  >
                                                    {(provided) => {
                                                      return (
                                                        <div
                                                          ref={
                                                            provided.innerRef
                                                          }
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}
                                                          className="div-card-technical"
                                                        >
                                                          {index === 0 && (
                                                            <p className="p-leader-group">
                                                              Team Leader
                                                            </p>
                                                          )}
                                                          {technical.name}
                                                        </div>
                                                      );
                                                    }}
                                                  </Draggable>
                                                );
                                              }
                                            )}
                                            {provided.placeholder}
                                          </div>
                                        );
                                      }}
                                    </Droppable>
                                  </DragDropContext>
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
