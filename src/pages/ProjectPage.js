import React, { useEffect, useState } from 'react';
import { Groups } from '../components/projectPage/Groups';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../assets/styles/pages/ProjectPage.scss';
import { Modal } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import {
  clearCurrentProject,
  getProjectIdAction,
  getProjectsAction,
} from '../store/actions/actionsProject';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ModaWelcomeProject } from '../components/projectPage/ModaWelcomeProject';
import { ModalCreateGroup } from '../components/projectPage/ModalCreateGroup';
import { ModalAddOrRemovetech } from '../components/projectPage/ModalAddOrRemovetech';
import {
  dragGroupInStatus,
  getAllGroupsAction,
  getGroupssAction,
  updateOrderGroupsInStatus,
} from '../store/actions/actionsGroup';
import { Aside } from '../components/HomePage/Aside';
import { HOME } from '../routes/path';
import {
  dragTechnicianInGroups,
  getTechniciansAction,
  updateOrderTechnicianInGroup,
} from '../store/actions/actionsTechnician';
import { ModalFinishTask } from '../components/projectPage/ModalFinishTask';
import { getUsersIdAction } from '../store/actions/actionsAuth';
import { Loader } from '@mantine/core';

export const ProjectPage = () => {
  const dispatch = useDispatch();
  const { currentProject, projects, isLoadingProject } = useSelector(
    (state) => state.projectReducer
  );

  const [state, setState] = useState(null);
  const [openedWelcomeProject, setOpenedWelcomeProject] = useState(false);
  const [openedCreateGroup, setOpenedCreateGroup] = useState(false);
  const [openedAddOrRemoveTech, setOpenedAddOrRemoveTech] = useState(false);
  const [openedFinishTask, setOpenedFinishTask] = useState(false);
  const [dragGroupId, setDragGroupId] = useState('');
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProjectsAction());
    dispatch(getUsersIdAction());
    dispatch(getAllGroupsAction());
    dispatch(getProjectIdAction(id));
    dispatch(getGroupssAction(id));
    dispatch(getTechniciansAction());
    return () => {
      dispatch(clearCurrentProject());
    };
  }, []);
  useEffect(() => {
    if (currentProject) {
      setState(currentProject);
      const countGroup = Object.keys(currentProject.groups).length;
      if (countGroup === 0) {
        setOpenedWelcomeProject(true);
      }
    }
  }, [currentProject]);
  const project = projects.find((item) => item._id === id);
  const { groups, isLoadingGroup } = useSelector((state) => state.groupReducer);
  const { isLoadingTech } = useSelector((state) => state.technicianReducer);
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

    if (type === 'group') {
      const groupPositionStart = state.status[source.droppableId];
      const groupPositionFinish = state.status[destination.droppableId];

      const technicianLengthInGroup = groups.find(
        (item) => item._id === draggableId
      ).techniciansId;

      if (
        groupPositionStart !== groupPositionFinish &&
        technicianLengthInGroup.length !== 0
      ) {
        dispatch(
          dragGroupInStatus(
            source.droppableId,
            destination.droppableId,
            draggableId
          )
        );
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
        // CAPTURAR TERMINO DE TRABAJO DE UN GRUPO

        if (destination.droppableId === state.statusOrder[0]) {
          setOpenedFinishTask(true);
          setDragGroupId(draggableId);
        }
        return;
      }

      // DND DE GRUPOS EN EL MISMO ESTADO
      dispatch(
        updateOrderGroupsInStatus(
          source.droppableId,
          draggableId,
          source.index,
          destination.index
        )
      );
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

    const groupStartDB = groups.find((item) => item._id === groupStart.id);
    const groupFinishDB = groups.find((item) => item._id === groupFinish.id);

    if (
      groupStartDB.status === 'En espera' &&
      groupFinishDB.status === 'En espera'
    ) {
      if (groupStart === groupFinish) {
        dispatch(
          updateOrderTechnicianInGroup(
            source.droppableId,
            draggableId,
            source.index,
            destination.index
          )
        );
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
      // if(source.droppableId !== destination.droppableId){

      // }
      dispatch(
        dragTechnicianInGroups(
          source.droppableId,
          destination.droppableId,
          draggableId
        )
      );

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
    } else {
      toast.error(
        'No se puede mover al personal cuando el grupo esta en ejecución',
        {
          position: 'top-center',
          theme: 'colored',
        }
      );
    }
  };

  return (
    <main className="main-container">
      <Aside />
      <div className="container">
        <div className="main-item-container-dnd">
          <Modal
            withCloseButton={false}
            opened={openedWelcomeProject}
            onClose={() => setOpenedWelcomeProject(false)}
            title="Bienvenido">
            <ModaWelcomeProject
              setOpenedWelcomeProject={setOpenedWelcomeProject}
            />
          </Modal>
          <Modal
            opened={openedCreateGroup}
            onClose={() => setOpenedCreateGroup(false)}
            title="Crear un Grupo de Trabajo">
            <ModalCreateGroup setOpenedCreateGroup={setOpenedCreateGroup} />
          </Modal>

          <Modal
            opened={openedAddOrRemoveTech}
            onClose={() => setOpenedAddOrRemoveTech(false)}
            title="Busca el personal que desees agregar o remover">
            <ModalAddOrRemovetech
              setOpenedAddOrRemoveTech={setOpenedAddOrRemoveTech}
            />
          </Modal>
          <Modal
            opened={openedFinishTask}
            onClose={() => setOpenedFinishTask(false)}
            withCloseButton={false}>
            <ModalFinishTask
              dragGroupId={dragGroupId}
              setOpenedFinishTask={setOpenedFinishTask}
            />
          </Modal>
          <h1 className="h1-title-project">{project && project.name}</h1>
          <div className="div-btn-project-container">
            <div>
              <button onClick={() => setOpenedCreateGroup(true)}>
                + Crear Nuevo Grupo
              </button>
              <button onClick={() => setOpenedAddOrRemoveTech(true)}>
                + Agregar o Remover Personal
              </button>
            </div>
            {isLoadingTech && <Loader color="cyan" size="sm" variant="dots" />}
            {isLoadingGroup && <Loader color="cyan" size="sm" variant="dots" />}
            {isLoadingProject && (
              <Loader color="cyan" size="sm" variant="dots" />
            )}

            <Link to={HOME}>
              <button>Volver al administrador de proyectos</button>
            </Link>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="status-container">
              {state &&
                state.statusOrder.map((statusId) => {
                  const status = state.status[statusId];
                  return (
                    <Droppable
                      key={status.id}
                      droppableId={status.id}
                      direction="horizontal"
                      type="group">
                      {(provided) => {
                        return (
                          <div className="div-status-groups-container">
                            <h2>{status.title}</h2>
                            <div
                              className="div-groups-droppable-container"
                              {...provided.droppableProps}
                              ref={provided.innerRef}>
                              {status.groupsIds.map((groupId, index) => {
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
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
