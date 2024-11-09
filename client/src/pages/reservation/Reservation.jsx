import React, { useState, useEffect } from 'react';
import bronirovanie from './photo/bronirovanie.png';
import Header from '../../components/header/Header';
import s from './Reservation.module.css';
import adres from '../adres/photo/adres.png';
import Footer from '../../components/footer/Footer';
import { Key, SquareX } from 'lucide-react';
import axios from 'axios';

export default function Reservation() {
  const [isVisible, setIsVisible] = useState(false);
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleHidden = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isVisible]);

  useEffect(() => {
    const fetchTables = async () => {
      const response = await axios.get('http://127.0.0.1:5000/tables');
      setTables(response.data);
    };

    const fetchReservations = async () => {
      const response = await axios.get('http://127.0.0.1:5000/reservations');
      setReservations(response.data);
    };

    fetchTables();
    fetchReservations();
  }, []);

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
          <button onClick={toggleVisibility} className={s.reservation_button}>
            Винмальди Одинцово
          </button>
        </div>
        {isVisible && (
          <div className={s.order_menu}>
            <button onClick={toggleHidden} className={s.button_close}>
              <SquareX size={30} />
            </button>
            {tables.map((table) => (
              <div className={s.tables}>
                <div
                  className={s.all_tables}
                  key={table[0]}
                  onClick={() => table[1] === 'свободен' && reserveTable(table[0])}
                  style={{
                    // width: '30%',
                    position: 'relative',
                    // height: '100px',
                    margin: '10px',
                    backgroundColor: table[1] === 'свободен' ? 'green' : 'red',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: table[1] === 'свободен' ? 'pointer' : 'not-allowed', // Изменение курсора
                    opacity: table[1] === 'занят' ? 0.6 : 1, // Уменьшаем непрозрачность занятого стола
                  }}
                >
                  {table[1]} (Стол {table[0]}) {/* Выводим номер стола */}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={s.reservation_footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
