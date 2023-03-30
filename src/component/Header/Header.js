import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Cart from './Cart/Cart';
import styles from './Header.module.css'
import NavLink from './NavLink/NavLink';

const Header = () => {
  const [mobileList, setMobileList] = useState(false)

  // 離開動畫
  const [leaveAnimation, setLeaveAnimation] = useState(false)
  const navRef = useRef(null)

  const handlerShow = () => {
    if (navRef.current){
      // console.log('navRef.current: ', navRef.current);
      document.removeEventListener('click', clickOutside)
      setLeaveAnimation(true)
      setTimeout(() => {
        setMobileList(false)
        setLeaveAnimation(false)
      }, 240)
    } else {
      // console.log('navRef.current: ', navRef.current);
      setMobileList(true)
      setTimeout(()=>{
        document.addEventListener('click', clickOutside)
      },0)
    }
  }


  const clickOutside = useCallback(function (event) {
    if (!navRef.current.contains(event.target)) {
      // console.log(event.target);
      handlerShow()
    }
  }, [])


  return (
    <>
      <header className={styles.PcHeader}>
        <Link to='/'>
          <img src="./images/header/TWICE_Logo_Solo_x150.png" alt="" className={styles.Logo} />
        </Link>
        <NavLink />
        <Cart />
        <Profile />
      </header>
      <header className={styles.MobileHeader}>
        {
          mobileList ? <NavLink  ref={navRef} leaveAnimation={leaveAnimation} handlerShow={handlerShow} />
            :
            <div
              className={styles.MobileClick}
              onClick={handlerShow}
            >
            <span></span><span></span><span></span>
            </div>
        }
        <Link to='/'>
          <img src="./images/header/TWICE_Logo_Solo_x150.png" alt="" className={styles.Logo} />
        </Link>
        <Cart />
        <Profile />
      </header>

    </>
  );
}

export default Header;
