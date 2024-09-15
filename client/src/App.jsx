import React from 'react';
import s from './App.module.css';
import Header from './components/header/Header';
import Main from './components/main/Main';

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <div className={s.rest}></div>
    </>
  );
}
