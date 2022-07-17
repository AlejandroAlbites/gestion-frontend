import React, { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

import logo3 from '../../assets/images/logo3.png';
import '../../assets/styles/components/LandingPage/HeaderBar.scss';
import { Registerform } from './Registerform';
import { LoginForm } from './LoginForm';

export const HeaderBar = () => {
  const [openedRegister, setOpenedRegister] = useState(false);
  const [openedLogin, setOpenedLogin] = useState(false);
  return (
    <section className="section-header-bar-content">
      <div className="div-header-bar-content">
        <div className="div-header-bar-options">
          <img src={logo3} alt="logo1" loading="lazy" />
          <button onClick={() => setOpenedLogin(true)}>
            Acerca de nosotros
          </button>
          {/* <span>|</span> */}
          <button onClick={() => setOpenedRegister(true)}>Clientes</button>
        </div>

        <div className="div-header-bar-options">
          <Modal
            opened={openedLogin}
            onClose={() => setOpenedLogin(false)}
            title="Iniciar Sesión">
            <LoginForm />
          </Modal>
          <button onClick={() => setOpenedLogin(true)}>Iniciar</button>
          <span>|</span>
          <Modal
            opened={openedRegister}
            onClose={() => setOpenedRegister(false)}
            title="Registrarse">
            <Registerform />
          </Modal>
          <button onClick={() => setOpenedRegister(true)}>Registrate</button>
        </div>
      </div>
    </section>
  );
};
