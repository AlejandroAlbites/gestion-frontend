import React from 'react';
import '../../assets/styles/components/LandingPage/Carousel.scss';
import leftArrow from '../../assets/images/Carrousel/left.png';
import rightArrow from '../../assets/images/Carrousel/right.png';

export const BtnCarousel = ({ direction, moveSlide }) => {
  return (
    <span
      onClick={moveSlide}
      className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}>
      <img src={direction === 'next' ? rightArrow : leftArrow} />
    </span>
  );
};
