import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../assets/styles/components/ProjectPage/ModalGroupDetails.scss';
import { GraphGroup } from './GraphGroup';
import { GraphGroupSkills } from './GraphGroupSkills';

export const ModalGroupDetails = ({ groupId }) => {
  const { groups } = useSelector((state) => state.groupReducer);
  const group = groups.find((item) => item._id === groupId);

  const { projects } = useSelector((state) => state.projectReducer);
  const { id } = useParams();
  const project = projects.find((item) => item._id === id);
  const { techniciansId } = group;

  const { technicians } = useSelector((state) => state.technicianReducer);
  const technicianInGroup = technicians.filter((tecnician) =>
    techniciansId.find((techId) => tecnician._id === techId)
  );
  const techLeader = technicians.find(
    (item) => item._id === group.techniciansId[0]
  );

  return (
    <main className="main-group-details-container">
      <div className="div-group-details-container">
        <div className="div-data-container">
          <div className="div-info-group">
            <h1>{group.name}</h1>
            <div>
              <h2>
                <i className="fa-solid fa-check"></i> Descripción:
              </h2>
              <p> {group.description}</p>
            </div>
            <div>
              <h2>
                <i className="fa-solid fa-check"></i> Proyecto:
              </h2>
              <p> {project.name}</p>
            </div>
            <div>
              <h2>
                <i className="fa-solid fa-check"></i> Trabajos Realizados:
              </h2>
              <p> {group.tasks.length}</p>
            </div>
            <div>
              <h2>
                <i className="fa-solid fa-check"></i> Personal Asignado:
              </h2>
              <p> {technicianInGroup.length}</p>
            </div>
            <div>
              <h2>
                <i className="fa-solid fa-check"></i> Lider:
              </h2>
              {technicianInGroup.length === 0 ? (
                <p>No tienes personal en este grupo</p>
              ) : (
                <p> {techLeader.name}</p>
              )}
            </div>
          </div>
          <div className="div-graph-bar-container">
            <GraphGroupSkills group={group} />
          </div>
        </div>
        <div className="div-graph-container">
          <GraphGroup group={group} />
        </div>
      </div>
    </main>
  );
};
