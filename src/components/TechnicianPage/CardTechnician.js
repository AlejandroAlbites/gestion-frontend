import React from 'react';
import { useSelector } from 'react-redux';
import '../../assets/styles/components/TechnicianPage/CardTechnician.scss';
import { RadarTechnicianGraph } from './RadarTechnicianGraph';

export const CardTechnician = ({ technicianId }) => {
  const { technicians } = useSelector((state) => state.technicianReducer);
  const technician = technicians.find((item) => item._id === technicianId);
  return (
    <main className="main-card-technician-container">
      <div className="div-card-technician-container">
        <img src={technician.image} />
        <div className="div-info-technician">
          <div>
            <h2>
              <i className="fa-solid fa-check"></i> Nombres:
            </h2>
            <p> {technician.name}</p>
          </div>
          <div>
            <h2>
              <i className="fa-solid fa-check"></i> Apellidos:
            </h2>
            <p> {technician.lastName}</p>
          </div>
          <div>
            <h2>
              <i className="fa-solid fa-check"></i> Documento de Identidad:
            </h2>
            <p> {technician.dni}</p>
          </div>
          <div>
            <h2>
              <i className="fa-solid fa-check"></i> Cargo:
            </h2>
            <p> {technician.role}</p>
          </div>
        </div>
      </div>
      <div className="div-radar-graph">
        <RadarTechnicianGraph technician={technician} />
      </div>
    </main>
  );
};
