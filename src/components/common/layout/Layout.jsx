import React from 'react';
import Header from './header/Header';
import RoomBar from './roomBar/RoomBar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.box}>
        <RoomBar />
        {children}
      </main>
    </div>
  );
}
