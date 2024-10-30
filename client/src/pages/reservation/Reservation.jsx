import React from 'react';
import bronirovanie from './photo/bronirovanie.png';
import Header from '../../components/header/Header';
import s from './Reservation.module.css';
import adres from '../adres/photo/adres.png';
import Footer from '../../components/footer/Footer';

export default function Reservation() {
  return (
    <>
      <Header />
      <div className={s.reservation}>
        <img className={s.reservation_img} src={bronirovanie} alt='reservation' />
        <div className={s.reservation_item}>
          <p className={s.reservation_p}>
            <span>Бронирование в PIVALDI</span>
            <br />
            <span className={s.reservation_span}>Выберите ваш ресторан</span>
            <br />
            <span className={s.reservation_span}>(Правила бронирования)</span>
          </p>
        </div>
        <div className={s.reservation_item_main}>
          <img className={s.reservation_photo} src={adres} alt='' />
          <button className={s.reservation_button}>Винмальди Одинцово</button>
        </div>
        <div className={s.reservation_footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
