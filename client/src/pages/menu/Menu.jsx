import React from 'react';
import Header from '../../components/header/Header';
import s from './Menu.module.css';
import cold_rolls from './photos/cold_rolls.png';
import hot_rolls from './photos/hot_rolls.png';
import drinks from './photos/drinks.png';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <>
      <Header />
      <div className={s.menu}>
        <Link to='coldrolls' className={s.menu_item}>
          <img className={s.menu_photo} src={cold_rolls} alt='' />
          <button className={s.menu_button}>Холодные роллы</button>
        </Link>
        <div className={s.menu_item}>
          <img className={s.menu_photo} src={hot_rolls} alt='' />
          <button className={s.menu_button}>Горячие роллы</button>
        </div>
        <div className={s.menu_item}>
          <img className={s.menu_photo} src={drinks} alt='' />
          <button className={s.menu_button}>Напитки</button>
        </div>
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </>
  );
}
