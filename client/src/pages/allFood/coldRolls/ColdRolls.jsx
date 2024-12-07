import React, { useEffect, useState } from 'react';
import s from './ColdRolls.module.css';
import Header from '../../../components/header/Header';
import axios from 'axios';
import Footer from '../../../components/footer/Footer';

export default function ColdRolls() {
  const [cold_rolls, set_cold_rolls] = useState([]);

  useEffect(() => {
    const fentchColdRolls = async () => {
      const response = await axios.get('http://127.0.0.1:5000/rolls/cold');
      set_cold_rolls(response.data);
    };

    fentchColdRolls();
  });

  return (
    <>
      <Header />
      <div className={s.cold_rolls}>
        <ul className={s.items_cold_rools}>
          {cold_rolls.map((roll) => (
            <li className={s.li_cold_rolls} key={roll[0]}>
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
