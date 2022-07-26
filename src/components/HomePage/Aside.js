import React from 'react';
import { Modal } from '@mantine/core';
import '../../assets/styles/components/HomePage/Aside.scss';
import { logoutUser } from '../../store/actions/actionsAuth';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ModalEditUser } from './ModalEditUser';
import { ModalChangePassword } from './ModalChangePassword';
import { ModalHelp } from './ModalHelp';
export const Aside = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAsideMenu, setShowAsideMenu] = useState(false);
  const [opened, setOpened] = useState(false);
  const [openedHelp, setOpenedHelp] = useState(false);
  const [openedChangePassword, setOpenedChangePassword] = useState(false);

  const { user } = useSelector((state) => state.authReducer);
  const { technicians } = useSelector((state) => state.technicianReducer);
  const { allGroups } = useSelector((state) => state.groupReducer);
  const { projects } = useSelector((state) => state.projectReducer);

  const handleClickLogout = () => {
    dispatch(logoutUser());
    navigate('/');
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
            <img src={user && user.image} alt="logo1" loading="lazy" />
          </div>
          <div className="info-summary">
            <h1> {user && user.company} </h1>
            <h2>Información</h2>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i> {user && user.name}{' '}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> {user && user.email}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Proyectos:
                {projects.length}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Grupos: {allGroups.length}
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Personal:{' '}
                {technicians.length}
              </li>
            </ul>
          </div>
          <div className="configuration">
            <h2 className="btn-user-options-title">Configuración</h2>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Edita tu Perfil">
              <ModalEditUser setOpened={setOpened} />
            </Modal>
            <Modal
              opened={openedChangePassword}
              onClose={() => setOpenedChangePassword(false)}
              title="Cambia tu contraseña">
              <ModalChangePassword
                setOpenedChangePassword={setOpenedChangePassword}
              />
            </Modal>
            <Modal
              opened={openedHelp}
              onClose={() => setOpenedHelp(false)}
              overflow="inside">
              <ModalHelp setOpenedHelp={setOpenedHelp} />
            </Modal>
            <h2 className="btn-user-options" onClick={() => setOpened(true)}>
              <i className="fa-solid fa-user-pen"></i>Editar Perfil
            </h2>
            <h2
              className="btn-user-options"
              onClick={() => setOpenedChangePassword(true)}>
              <i className="fa-solid fa-key"></i> Mod. Contraseña
            </h2>
            <h2
              className="btn-user-options"
              onClick={() => setOpenedHelp(true)}>
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
