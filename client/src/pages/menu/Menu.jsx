import React from 'react';
import Header from '../../components/header/Header';
import s from './Menu.module.css';

export default function Menu() {
  return (
    <>
      <div className={s.menu}>
        <Header />
      </div>
    </>
  );
}
