import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { DroppableGroups } from "./DroppableGroups";

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
];

const onDragEnd = (result, groups, setgroups) => {
  if (!result.destination) {
    return;
  }
  const { source, destination, type } = result;
  console.log(result);

  if (type === "group") {
    console.log(groups);
    const [groupRemoved] = groups.splice(source.index, 1);
    console.log(groupRemoved);
    groups.splice(destination.index, 0, groupRemoved);

    setgroups({
      ...groups,
    });
  }
  if (type === "technical" && source.droppableId !== destination.droppableId) {
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

export const DragAndDropGroups = () => {
  const [groups, setgroups] = useState(groupsFromBackend);
  return (
    <div className="div-groups-container">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, groups, setgroups)}
      >
        <Droppable droppableId="all-groups" type="group">
          {(providedDroppable) => {
            return (
              <div
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                {Object.entries(groups).map(([id, group], index) => {
                  return (
                    <DroppableGroups
                      key={id}
                      group={group}
                      id={id}
                      index={index}
                    />
                  );
                })}
                {providedDroppable.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
