import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/components/DragAndDrop.scss";

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

export const groupsFromBackend = [
  {
    id: "123",
    name: "Los gosus",
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

const onDragEnd = (result, groups, setgroups) => {
  if (!result.destination) {
    return;
  }
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceGroup = groups[source.droppableId];
    const sourceTechnicals = [...sourceGroup.technicals];

    const destinationGroup = groups[destination.droppableId];
    const destinationTechnicals = [...destinationGroup.technicals];

    const [technicalRemoved] = sourceTechnicals.splice(source.index, 1);
    destinationTechnicals.splice(destination.index, 0, technicalRemoved);

    setgroups({
      ...groups,
      [source.droppableId]: {
        ...sourceGroup,
        technicals: sourceTechnicals,
      },
      [destination.droppableId]: {
        ...destinationGroup,
        technicals: destinationTechnicals,
      },
    });
  } else {
    const selectedGroup = groups[source.droppableId];
    // console.log(selectedGroup);
    const currentTechnicals = [...selectedGroup.technicals];
    const [technicalRemoved] = currentTechnicals.splice(source.index, 1);
    currentTechnicals.splice(destination.index, 0, technicalRemoved);
    setgroups({
      ...groups,
      [source.droppableId]: {
        ...selectedGroup,
        technicals: currentTechnicals,
      },
    });
  }
};

export const DragAndDrop = () => {
  const [groups, setgroups] = useState(groupsFromBackend);
  return (
    <div className="div-groups-container">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, groups, setgroups)}
      >
        {Object.entries(groups).map(([id, group]) => {
          return (
            <div key={id} className="div-group-container">
              <h2>{group.name}</h2>
              <Droppable droppableId={id}>
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="div-group-list"
                    >
                      {group.technicals.map((technical, index) => {
                        return (
                          <Draggable
                            key={technical.id}
                            draggableId={technical.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
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
