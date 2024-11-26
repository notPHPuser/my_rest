import React, { useState } from 'react';
import s from './admin.module.css';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const correctPassword = 'qwerty123';

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
        <h1>Защищенная страница</h1>
        <p>Добро пожаловать! Вы получили доступ к защищенному контенту.</p>
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
          <button type='submit'>Войти</button>
        </form>
      </div>
    </>
  );
}
