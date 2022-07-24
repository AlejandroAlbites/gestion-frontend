import React, { useState } from 'react';
import { Modal } from '@mantine/core';
import logo3 from '../../assets/images/logo1.png';
import '../../assets/styles/components/LandingPage/HeaderBar.scss';
import { Registerform } from './Registerform';
import { LoginForm } from './LoginForm';

export const HeaderBar = () => {
  const [openedRegister, setOpenedRegister] = useState(false);
  const [openedLogin, setOpenedLogin] = useState(false);
  const [openedAbout, setOpenedAbout] = useState(false);
  const [openedClients, setOpenedClients] = useState(false);
  return (
    <section className="section-header-bar-content">
      <div className="div-header-bar-content">
        <div className="div-header-bar-options">
          <div className="logo-easy-group">
            <img src={logo3} alt="logo1" loading="lazy" />
            <span>|</span>
            <h1>easyGroup</h1>
          </div>
          <Modal
            opened={openedAbout}
            onClose={() => setOpenedAbout(false)}
            withCloseButton={false}>
            <div className="div-about-as">
              <h1>Acerca de Nosotros</h1>
              <h2>Creador: Juan Albites</h2>
              <h2>
                Desarrollador Full Stack, siempre motivado a aprender nuevas
                tecnologías y crecer profesionalmente
              </h2>
              <h3>
                Easy Group es una web creada a partir de una necesidad, ya que
                al manejar gran cantidad de grupos de trabajo se vuelve un poco
                difícil seguir el progreso de trabajo de cada grupo, si al grupo
                le esta yendo bien o no, entonces te haces la pregunta, ¿cúando
                es necesario replantear un grupo?
              </h3>
              <h3>
                Easy group te brinda esa herramienta, ya que al termino de cada
                trabajo puedes guardar un registro de cada trabajo, y
                visualizarlo de una manera agradable, brindándote un mejor
                panorama de como le esta yendo a tus grupos de trabajo.
              </h3>
            </div>
          </Modal>
          <button onClick={() => setOpenedAbout(true)}>
            Acerca de nosotros
          </button>
          <Modal
            opened={openedClients}
            onClose={() => setOpenedClients(false)}
            title="No tenemos clientes por el momento"></Modal>
          <button onClick={() => setOpenedClients(true)}>Clientes</button>
        </div>

        <div className="div-header-bar-options">
          <span className="separation">-----------</span>
          <Modal
            opened={openedLogin}
            onClose={() => setOpenedLogin(false)}
            title="Iniciar Sesión">
            <LoginForm />
          </Modal>
          <button onClick={() => setOpenedLogin(true)}>Iniciar</button>
          <span className="separation auth">|</span>
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
