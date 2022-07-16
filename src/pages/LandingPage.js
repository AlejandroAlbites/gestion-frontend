import React from 'react';
import { HeaderBar } from '../components/landingPage/HeaderBar';
import '../assets/styles/pages/LandingPage.scss';
import { Footer } from '../components/landingPage/Footer';
import { Carousel } from '../components/landingPage/Carousel';

export const LandingPage = () => {
  return (
    <main className="main-landing-page-content">
      <HeaderBar />
      <section className="section-carousel-container">
        <Carousel />
      </section>

      <footer className="footer-landing-page-container">
        <Footer />
      </footer>
    </main>
  );
};
