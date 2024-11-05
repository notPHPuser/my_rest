import React, { useEffect, useState } from 'react';
import s from './HotRolls.module.css';
import Header from '../../../components/header/Header';
import axios from 'axios';
import Footer from '../../../components/footer/Footer';

export default function HotRolls() {
  const [hot_rolls, set_hot_rolls] = useState([]);

  useEffect(() => {
    const fentchHotRolls = async () => {
      const response = await axios.get('http://127.0.0.1:5000/rolls/hot');
      set_hot_rolls(response.data);
    };

    fentchHotRolls();
  });

  return (
    <>
      <Header />
      <div className={s.hot_rolls}>
        <ul className={s.items_hot_rools}>
          {hot_rolls.map((roll) => (
            <li className={s.li_hot_rolls} key={roll[0]}>
              <img className={s.img_rolls} src={roll[3]} alt='' />
              <p className={s.name_rolls}>{roll[1]}</p>
              <p className={s.price_rolls}>{roll[2]} руб.</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </>
  );
}
