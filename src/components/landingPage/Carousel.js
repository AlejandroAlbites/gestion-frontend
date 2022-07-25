import React, { useState, useEffect } from 'react';
import '../../assets/styles/components/LandingPage/Carousel.scss';
import { BtnCarousel } from './BtnCarousel';

const dataCarousel = [
  {
    id: 1,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://res.cloudinary.com/drezhlbzo/image/upload/v1658713374/cgpkmsi4nge5g4oasfgk.png',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://res.cloudinary.com/drezhlbzo/image/upload/v1658645878/tgzi060dgho5e3k0f6bs.png',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://res.cloudinary.com/drezhlbzo/image/upload/v1658646234/xvxg62qsogpzqkbssyta.png',
  },
];

export const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataCarousel.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataCarousel.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataCarousel.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  });
  return (
    <div className="container-slider">
      {dataCarousel.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={
              slideIndex === index + 1 ? 'slide active-anim' : 'slide'
            }>
            <img src={obj.image} alt={obj.title} loading="lazy" />
          </div>
        );
      })}
      <BtnCarousel moveSlide={nextSlide} direction={'next'} />
      <BtnCarousel moveSlide={prevSlide} direction={'prev'} />

      <div className="container-dots">
        {Array.from({ length: 3 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}></div>
        ))}
      </div>
    </div>
  );
};
