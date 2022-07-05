import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/components/DragAndDropStatus.scss";
import { DragAndDrop } from "./DragAndDrop";

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
];

const statusFromBackend = [
  {
    id: "12345",
    name: "Lista de personal",
    groups: groupsFromBackend,
  },
  {
    id: "12445",
    name: "En Espera",
    groups: [],
  },
  {
    id: "12545",
    name: "En ejecucion",
    groups: [],
  },
];

const onDragEnd = (result, statusGroup, setStatusGroup) => {
  console.log(result);
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

const onDragEndTec = (result, statusGroup, setStatusGroup) => {
  console.log(result);
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  const statusGroupArray = Object.entries(statusGroup).map((item) => item[1])[
    source.droppableId[0]
  ].groups;
  console.log(statusGroupArray);
  const group = statusGroupArray.filter(
    (item) => item.id === source.droppableId[1]
  )[0];

  const copiedItems = [...group.technicals];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
  console.log(copiedItems);

  const status = statusGroup[source.droppableId[0]];

  //TO DO : setear datos de nuevo orden de tecnicos ()
  // setStatusGroup({
  //   ...statusGroup,
  //   [source.droppableId[0]]: {
  //     ...status,
  //     groups: {
  //       ...statusGroupArray,
  //       group: { ...group, technicals: copiedItems },
  //     },
  //   },
  // });
};

export const DragAndDropStatus = () => {
  const [statusGroup, setStatusGroup] = useState(statusFromBackend);

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
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="div-groups-container"
                    >
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
                                >
                                  <DragDropContext
                                    onDragEnd={(result) =>
                                      onDragEndTec(
                                        result,
                                        statusGroup,
                                        setStatusGroup
                                      )
                                    }
                                  >
                                    <h2 {...provided.dragHandleProps}>
                                      {group.name}
                                    </h2>
                                    <Droppable droppableId={[id, group.id]}>
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
