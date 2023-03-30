import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
import Login from '../../component/Login/Login';
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <>
      <Header />
        <main className={styles.Main}>
          <Outlet></Outlet>
        </main>
      <Footer />
    </>
  );
}

export default Layout;
