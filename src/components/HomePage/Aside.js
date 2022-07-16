import React from 'react';
import '../../assets/styles/components/HomePage/Aside.scss';
import logo1 from '../../assets/images/logo1.png';
import { logoutUser } from '../../store/actions/actionsAuth';
import { useDispatch } from 'react-redux';
export const Aside = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <section className="section-aside-container">
      <div className="div-aside-container">
        <span>
          <i className="fa-solid fa-circle-arrow-left"></i>
        </span>
        <div className="div-logo-aside-container">
          <img src={logo1} alt="logo1" loading="lazy" />
        </div>
        <h1>EASE GROUP</h1>
        <h2>Nombre: Juan </h2>
        <h2>Correo : correo@correo.com</h2>
        <h2>Proyectos: 0</h2>
        <h2>Grupos de trabajo: 10</h2>
        <h2>Personal Técnico: 32</h2>
        <hr />
        <h2 className="btn-user-options">Editar Perfil</h2>
        <h2 className="btn-user-options">Cambiar Contraseña</h2>
        <h2 className="btn-user-options">Ver Ayuda</h2>
        <h2
          className="btn-user-options"
          type="button"
          onClick={handleClickLogout}>
          Salir
        </h2>
      </div>
    </section>
  );
};
