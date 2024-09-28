import React from 'react';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <>
      <div className={s.footer}>
        <div className={s.info_in_footer}>
          <a href='https://t.me/VinValdi_bot' target='_blank'>
            Наш чат бот
          </a>
        </div>
      </div>
    </>
  );
}
