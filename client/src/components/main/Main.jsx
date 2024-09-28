import React from 'react';
import s from './Main.module.css';
import ImageCarousel from './ImageCarousel';

export default function Main() {
  return (
    <>
      <div className={s.main}>
        <ImageCarousel />
      </div>
    </>
  );
}
