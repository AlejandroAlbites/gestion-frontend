import React, { useState } from 'react';
import { Modal, Loader } from '@mantine/core';
import { Technicals } from './Technicals';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { ModalGroupDetails } from './ModalGroupDetails';
import { useParams } from 'react-router-dom';
import { getGroupssAction } from '../../store/actions/actionsGroup';

export const Groups = ({ group, technicals, index }) => {
  const { groups } = useSelector((state) => state.groupReducer);
  const [detailsGroup, setDetailsGroup] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  let initialGroup = '';
  if (groups) {
    initialGroup = groups[0]._id;
  }

  const handleClickDetailsgroup = () => {
    dispatch(getGroupssAction(id));
    setDetailsGroup(true);
  };

  const isDragDisabled = group.id === initialGroup;

  const groupDB = groups?.find((item) => item._id === group.id);
  if (!groupDB) return <></>;
  return (
    <Draggable
      draggableId={group.id}
      index={index}
      isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          className={
            initialGroup === group.id
              ? 'div-group-technicals-list'
              : groupDB.status === 'En ejecución'
              ? 'div-container-group-action'
              : 'div-container-group'
          }
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <h2 {...provided.dragHandleProps}>{group.title}</h2>
          <Droppable droppableId={group.id} type="technical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {technicals &&
                  technicals.map((technical, index) => (
                    <Technicals
                      key={technical.id}
                      technical={technical}
                      index={index}
                      group={group}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {groupDB.status === 'En ejecución' ? (
            <div className="span-loader-action">
              <span>
                <Loader color="cyan" size="xs" />
              </span>
            </div>
          ) : (
            <div>
              {groups[0]._id !== group.id && (
                <p
                  className="p-group-details-options"
                  onClick={handleClickDetailsgroup}>
                  Ver detalles
                </p>
              )}
            </div>
          )}
          <Modal
            opened={detailsGroup}
            withCloseButton={false}
            onClose={() => setDetailsGroup(false)}
            size="xl">
            <ModalGroupDetails groupId={group.id} />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};
