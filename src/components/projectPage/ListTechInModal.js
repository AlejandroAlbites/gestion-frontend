import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../assets/styles/components/ProjectPage/ModalAddOrRemoveTech.scss';
import { addOrRemoveTechInProject } from '../../store/actions/actionsTechnician';
export const ListTechInModal = ({ technician }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { groups } = useSelector((state) => state.groupReducer);
  const handleAddOrRemoveTech = () => {
    dispatch(addOrRemoveTechInProject(technician._id, groups[0]._id));
  };
  return (
    <div className="div-list-technician">
      <div>
        <h1>{technician.name}</h1>
        <p>{technician.role}</p>
      </div>
      {technician.projectId !== id && technician.projectId !== null ? (
        <p className="p-technician-other-project">
          Personal asignado a otro proyecto
        </p>
      ) : (
        <button onClick={handleAddOrRemoveTech}>
          {technician.groupId !== null
            ? 'Remover del Proyecto'
            : 'Agregar al Proyecto'}
        </button>
      )}
    </div>
  );
};
