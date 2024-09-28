import React, { useState, useEffect } from 'react';
import s from './Main.module.css';
import first_main from './photos/first_main.png';
import second_main from './photos/second_main.png';
import third_main from './photos/third_main.png';

export default function ImageCarousel() {
  const images = [first_main, second_main, third_main];
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prevPhoto) => (prevPhoto + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className={s.ImageCarousel}>
        <img className={s.photo_main} src={images[currentPhoto]} />
      </div>
    </>
  );
}
