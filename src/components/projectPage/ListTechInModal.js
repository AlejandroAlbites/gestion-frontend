import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/styles/components/ProjectPage/ModalAddOrRemoveTech.scss';
import { addOrRemoveTechInProject } from '../../store/actions/actionsTechnician';
export const ListTechInModal = ({ technician, setOpenedAddOrRemoveTech }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { groups } = useSelector((state) => state.groupReducer);
  let initialGroup = {};
  if (groups) {
    initialGroup = groups[0];
  }
  const isTechnicianInProject = groups
    .map((group) => group.techniciansId)
    .toString()
    .split(',')
    .includes(technician._id);

  const handleAddOrRemoveTech = () => {
    if (initialGroup.techniciansId.includes(technician._id)) {
      dispatch(addOrRemoveTechInProject(technician._id, groups[0]._id));
      setOpenedAddOrRemoveTech(false);
    } else if (!isTechnicianInProject) {
      dispatch(addOrRemoveTechInProject(technician._id, groups[0]._id));
      setOpenedAddOrRemoveTech(false);
    } else {
      toast.error(
        'El personal debe estar en el grupo inicial para ser removido',
        {
          position: 'top-center',
          theme: 'colored',
        }
      );
    }
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
        <button
          onClick={handleAddOrRemoveTech}
          className={
            technician.groupId !== null
              ? 'btn-remove-project'
              : 'btn-add-project'
          }>
          {technician.groupId !== null
            ? 'Remover del Proyecto'
            : 'Agregar al Proyecto'}
        </button>
      )}
    </div>
  );
};
