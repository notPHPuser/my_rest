import React from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className={s.header}>
        <Link to='/' className={s.logo}>
          Винвальди
        </Link>
        <div className={s.header_menu}>
          <Link to='/menu' className={s.href_header}>
            <span className={s.span_header}>Меню</span>
          </Link>
          <a className={s.href_header} href=''>
            <span className={s.span_header}>Бронирование</span>
          </a>
          <a className={s.href_header} href=''>
            <span className={s.span_header}>Адреса</span>
          </a>
        </div>
      </div>
    </>
  );
}