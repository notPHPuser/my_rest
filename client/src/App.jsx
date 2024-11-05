import React from 'react';
import s from './App.module.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <div className={s.footer}>
        <Footer />
      </div>
      <div className={s.rest}></div>
    </>
  );
}
