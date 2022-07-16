import React, { useState, useEffect } from 'react';
import '../../assets/styles/components/LandingPage/Carousel.scss';
// import ca1 from '../../assets/images/Carrousel/ca1';
// import ca2 from '../../assets/images/Carrousel/ca2';
// import ca3 from '../../assets/images/Carrousel/ca3';
import { BtnCarousel } from './BtnCarousel';

const dataCarousel = [
  {
    id: 1,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://st2.depositphotos.com/2673929/8344/i/950/depositphotos_83445092-stock-photo-workplaces-in-a-modern-panoramic.jpg',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://us.123rf.com/450wm/ismagilov/ismagilov1904/ismagilov190400228/120196765-interior-de-oficina-moderna-con-muebles-representaci%C3%B3n-3d-.jpg?ver=6',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
    image:
      'https://img.lalr.co/cms/2022/01/28191612/Oficina-minimalista.png?size=xl&ratio=r40_21',
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
