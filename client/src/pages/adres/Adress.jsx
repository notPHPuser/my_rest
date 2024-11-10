import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import s from './Adres.module.css';
import Header from '../../components/header/Header';
import adress_photo from './photo/adres.png';
import Footer from '../../components/footer/Footer';
import { SquareX } from 'lucide-react';

export default function Adress() {
  const [isOpen, setIsopen] = useState(false);
  const myMapRef = useRef(null);

  const loadMap = useCallback(() => {
    const script = document.createElement('script');
    script.src =
      'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aee914678fbe394a21bc5858d6dd03bbc7b5a8c297b3ce37bb65bfb235fb61273&amp;width=500&amp;height=400&amp;lang=ru_RU&amp;scroll=true';
    script.async = true;
    myMapRef.current.appendChild(script);
  }, []);

  useEffect(() => {
    if (myMapRef.current) {
      loadMap();
    } else {
      const intervalId = setInterval(() => {
        if (myMapRef.current) {
          loadMap();
          clearInterval(intervalId);
        }
      }, 100);
    }
    return () => {
      if (myMapRef.current) {
        myMapRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleOpen = () => {
    setIsopen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

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
          <button onClick={handleOpen} className={s.open_map}>
            Открыть карту
          </button>
          {isOpen && (
            <div className={s.map}>
              <SquareX onClick={handleOpen} className={s.button_close} size={30} />
              <div ref={myMapRef} id='my_map' className={s.map_of_rest}></div>
            </div>
          )}
        </div>
        <div className={s.footer}>
          <Footer />
        </div>
      </>
    </>
  );
}
