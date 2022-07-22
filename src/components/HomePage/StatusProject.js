import React from 'react';
import { useSelector } from 'react-redux';

export const StatusProject = ({ projectId }) => {
  const { allGroups, groups } = useSelector((state) => state.groupReducer);
  const groupsIntoProject = allGroups.filter(
    (group) => group.projectId === projectId
  );
  const isAction = groupsIntoProject
    .map((group) => group.status)
    .includes('En ejecución');
  console.log(groupsIntoProject);
  return (
    <div>
      {isAction ? (
        <p className="status-project-active">En Ejecución</p>
      ) : (
        <p className="status-project-disable">En Espera</p>
      )}
    </div>
  );
};
