import React from 'react';
import '../../assets/styles/components/HomePage/Aside.scss';
import logo1 from '../../assets/images/logo1.png';
import { logoutUser } from '../../store/actions/actionsAuth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
export const Aside = () => {
  const dispatch = useDispatch();

  const [showAsideMenu, setShowAsideMenu] = useState(false);

  const handleClickLogout = () => {
    dispatch(logoutUser());
  };

  const handleMenu = () => {
    setShowAsideMenu(!showAsideMenu);
  };

  return (
    <>
      <i
        className={`fa-solid fa-bars menu ${!showAsideMenu && 'active'}`}
        onClick={() => handleMenu()}></i>
      <section
        className={`section-aside-container  ${showAsideMenu && 'active'}`}>
        <div className="div-aside-container">
          <span>
            <i
              className="fa-solid fa-circle-arrow-left hide_menu"
              onClick={() => handleMenu()}></i>
          </span>
          <div className="div-logo-aside-container">
            <img src={logo1} alt="logo1" loading="lazy" />
          </div>
          <div className="info-summary">
            <h1>EASE GROUP</h1>
            <h2>Información</h2>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i> Nombre: Juan{' '}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Correo : correo@correo.com{' '}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Proyectos: 0
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Grupos de trabajo: 10{' '}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Personal Técnico: 32{' '}
              </li>
            </ul>
          </div>
          <div className="configuration">
            <h2 className="btn-user-options-title">Configuración</h2>
            <h2 className="btn-user-options">
              <i className="fa-solid fa-user-pen"></i>Editar Perfil
            </h2>
            <h2 className="btn-user-options">
              <i className="fa-solid fa-key"></i>Cambiar Contraseña
            </h2>
            <h2 className="btn-user-options">
              <i className="fa-solid fa-question"></i>Ver Ayuda
            </h2>
            <h2
              className="btn-user-options"
              type="button"
              onClick={handleClickLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>Salir
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};
