import React, { useEffect, useState } from 'react';
import s from './Drinks.module.css';
import Header from '../../../components/header/Header';
import axios from 'axios';
import Footer from '../../../components/footer/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fentchDrinks = async () => {
      const response = await axios.get('http://127.0.0.1:5000/drinks');
      setDrinks(response.data);
    };

    fentchDrinks();
  });

  return (
    <>
      <Header />
      <div className={s.drinks}>
        <ul className={s.items_drinks}>
          {drinks.map((drink) => (
            <li className={s.li_drinks} key={drink[0]}>
              <img className={s.img_drinks} src={drink[3]} alt='' />
              <p className={s.name_drinks}>{drink[1]}</p>
              <p className={s.price_drinks}>{drink[2]} руб.</p>
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
