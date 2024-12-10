import React, { useState, useEffect } from 'react';
import bronirovanie from './photo/bronirovanie.png';
import Header from '../../components/header/Header';
import s from './Reservation.module.css';
import adres from '../adres/photo/adres.png';
import Footer from '../../components/footer/Footer';
import { SquareX } from 'lucide-react';
import axios from 'axios';

export default function Reservation() {
  const [isVisible, setIsVisible] = useState(false);
  const [tables, setTables] = useState([]);
  const [rolls, setRolls] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRolls, setSelectedRolls] = useState({});

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
    const fetchRolls = async () => {
      const response = await axios.get('http://localhost:5000/rolls');
      setRolls(response.data);
    };
    const fetchTables = async () => {
      const response = await axios.get('http://127.0.0.1:5000/tables');
      setTables(response.data);
    };

    const fetchReservations = async () => {
      const response = await axios.get('http://127.0.0.1:5000/reservations');
      setReservations(response.data);
    };
    fetchRolls();
    fetchTables();
    fetchReservations();
  }, []);
  const reserveTable = async (tableId) => {
    const phone = prompt('Введите номер телефона для бронирования:');
    const tg = prompt('Введите ваш тг');
    const selectedRollIds = Object.keys(selectedRolls).filter((id) => selectedRolls[id]);

    await axios.post('http://localhost:5000/reserve', {
      phone,
      tg,
      table_id: tableId,
      rolls: selectedRollIds,
    });
    alert('Столик забронирован!');

    // Обновляем статус столов и резервирования
    const responseTables = await axios.get('http://localhost:5000/tables');
    setTables(responseTables.data);
    const responseReservations = await axios.get('http://localhost:5000/reservations');
    setReservations(responseReservations.data);
  };

  const toggleRollSelection = (rollId) => {
    setSelectedRolls((prevSelected) => ({
      ...prevSelected,
      [rollId]: !prevSelected[rollId],
    }));
  };

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
                    cursor: table[1] === 'свободен' ? 'pointer' : 'not-allowed',
                    opacity: table[1] === 'занят' ? 0.6 : 1,
                  }}
                >
                  {table[1]} (Стол {table[0]}) {/* Выводим номер стола */}
                </div>
              </div>
            ))}
            <div className={s.rools}>
              <h1>Роллы</h1>
              <ul>
                {rolls.map((roll) => (
                  <li key={roll[0]}>
                    <img src={roll[3]} alt={roll[1]} style={{ width: '100px' }} />
                    <div>
                      {roll[1]} - {roll[2]}₽
                    </div>
                    <input
                      type='checkbox'
                      checked={!!selectedRolls[roll[0]]}
                      onChange={() => toggleRollSelection(roll[0])}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className={s.reservation_footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}
