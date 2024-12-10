import React, { useState, useEffect } from 'react';
import s from './admin.module.css';
import axios from 'axios';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const correctPassword = '1';
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await axios.get('http://127.0.0.1:5000/reservations');
      setOrder(response.data);
    };
    fetchReservations();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAccessGranted(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  if (accessGranted) {
    return (
      <div>
        <h1>Брони:</h1>
        <ul>
          {order.map((order, index) => (
            <li key={index}>
              Телефон: {order.phone} - Роллы: {order.rolls.join(', ')} - Стол: {order.table_id} - ТГ
              : {order.tg}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (accessGranted) {
    return (
      <div>
        <h1>Защищенная страница</h1>
        <p>Добро пожаловать! Вы получили доступ к защищенному контенту.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>Введите пароль для доступа</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={s.password}
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Введите пароль'
            required
          />
          <button className={s.enter} type='submit'>
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
