import React, { useState } from "react";
import initialData from "../components/projectPage/initial-data";
import { Groups } from "../components/projectPage/Groups";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../assets/styles/pages/ProjectPage.scss";

export const ProyectPage = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Drag and Drop DE GRUPOS ENTRE ESTADOS
    if (type === "group") {
      const groupPositionStart = state.status[source.droppableId];
      const groupPositionFinish = state.status[destination.droppableId];

      if (groupPositionStart !== groupPositionFinish) {
        const newOrderGroupStart = Array.from(groupPositionStart.groupsIds);
        newOrderGroupStart.splice(source.index, 1);

        const newStatusStart = {
          ...groupPositionStart,
          groupsIds: newOrderGroupStart,
        };

        const newOrderGroupFinish = Array.from(groupPositionFinish.groupsIds);
        newOrderGroupFinish.splice(destination.index, 0, draggableId);

        const newStatusFinish = {
          ...groupPositionFinish,
          groupsIds: newOrderGroupFinish,
        };

        setState({
          ...state,
          status: {
            ...state.status,
            [source.droppableId]: newStatusStart,
            [destination.droppableId]: newStatusFinish,
          },
        });

        return;
      }

      // DND DE GRUPOS EN EL MISMO ESTADO
      const groupInState = state.status[source.droppableId];
      const newOrderColumnStart = Array.from(groupInState.groupsIds);
      newOrderColumnStart.splice(source.index, 1);
      newOrderColumnStart.splice(destination.index, 0, draggableId);

      const newOrderGroups = {
        ...groupInState,
        groupsIds: newOrderColumnStart,
      };

      setState({
        ...state,
        status: {
          ...state.status,
          [newOrderGroups.id]: newOrderGroups,
        },
      });
      return;
    }

    // DND DE TECNICOS
    const groupStart = state.groups[source.droppableId];
    const groupFinish = state.groups[destination.droppableId];

    // DND DE TECNICOS EN EL MISMO GRUPO
    if (groupStart === groupFinish) {
      const newTechOrderIds = Array.from(groupStart.techIds);
      newTechOrderIds.splice(source.index, 1);
      newTechOrderIds.splice(destination.index, 0, draggableId);
      const newGroup = {
        ...groupStart,
        techIds: newTechOrderIds,
      };

      setState({
        ...state,
        groups: {
          ...state.groups,
          [newGroup.id]: newGroup,
        },
      });
      return;
    }
    // DND DE TECNICOS ENTRE GRUPOS
    const newTechOrderStart = Array.from(groupStart.techIds);
    newTechOrderStart.splice(source.index, 1);
    const newStart = {
      ...groupStart,
      techIds: newTechOrderStart,
    };

    const newTechOrderFinish = Array.from(groupFinish.techIds);
    newTechOrderFinish.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...groupFinish,
      techIds: newTechOrderFinish,
    };

    setState({
      ...state,
      groups: {
        ...state.groups,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="status-container">
        {state.statusOrder.map((statusId) => {
          const statusOrder = state.status[statusId];
          return (
            <Droppable
              key={statusOrder.id}
              droppableId={statusOrder.id}
              direction="horizontal"
              type="group"
            >
              {(provided) => {
                return (
                  <div className="div-status-groups-container">
                    <h2>{statusOrder.title}</h2>
                    <div
                      className="div-groups-droppable-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {statusOrder.groupsIds.map((groupId, index) => {
                        const group = state.groups[groupId];
                        const technicals = group.techIds.map(
                          (techId) => state.technicals[techId]
                        );
                        return (
                          <Groups
                            key={group.id}
                            group={group}
                            technicals={technicals}
                            index={index}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};
