import React from 'react';
import '../../assets/styles/components/LandingPage/Footer.scss';
import logo1 from '../../assets/images/logo1.png';

export const Footer = () => {
  return (
    <footer className="section-footer-content">
      <div className="div-footer-content">
        <img src={logo1} alt="logo1" loading="lazy" />
        <div className="div-footer-information">
          <span>Politica de privacidad</span>
          <p>Lima, Lima, Perú</p>
        </div>
        <div className="div-footer-icon">
          <span>
            <a href="https://github.com/AlejandroAlbites" target="_blank">
              <i className="fa-brands fa-github-square"></i>
            </a>
          </span>
          <span>
            <a
              href="https://www.linkedin.com/in/juan-alejandro-albites-tapia-316185112/"
              target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
