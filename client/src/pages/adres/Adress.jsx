import React from 'react';
import s from './Adres.module.css';
import Header from '../../components/header/Header';
import adress_photo from './photo/adres.png';
import Footer from '../../components/footer/Footer';

export default function Adress() {
  return (
    <>
      <>
        <Header />
        <div className={s.adress}>
          <img src={adress_photo} className={s.adress_photo} alt='adres_photo' />
          <h1 className={s.name_of_rest}>Ресторан ВинВальди Одинцово</h1>
          <p className={s.info_about_rest}>
            <span className={s.adres_text}>Адрес: </span> Лесной городок, Фасадная д. 2А
          </p>
          <span className={s.adres_text}>Время работы: </span>
          <p className={s.info_about_rest}>пн — чт/вс: 11:00 — 01:00</p>
          <p className={s.info_about_rest}>пт — сб: 11:00 — 02:00</p>
          <p className={s.info_about_rest}>&#10003; По Минскому шоссе 12 км от МКАД</p>
          <p>
            <span className={s.adres_text}>Тел: </span>{' '}
            <span className={s.tele_number}>+7 (495) 477-95-00</span>
          </p>
          <p className={s.info_about_rest}>
            &#10003; На общественном транспорте: Метро «Парк Победы»,
            <br /> далее автобус № 301, 442 до остановки «Лесной городок»
          </p>
          <p className={s.info_about_rest}>
            &#10003; Электричка до станции «Лесной городок» (Киевское
            <br /> направление)
          </p>
          <button className={s.open_map}>Открыть карту</button>
        </div>
        <div className={s.footer}>
          <Footer />
        </div>
      </>
    </>
  );
}
