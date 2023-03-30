import React, { forwardRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './CartPage.module.css'
import { useSelector } from 'react-redux';
import { getCartInfo, getTotalPrice, getUserInfo } from '../../../../store/UserSlice';
import { animationTime } from '../../../../Api/data';

import CartItem from './CartItem/CartItem';
import Confirm from './Comfirm/Confirm';

import Login from '../../../Login/Login';
import Checkout from '../../../Checkout/Checkout';


const CartPage = React.forwardRef((props, ref) => {

  const cartInfo = useSelector(getCartInfo)
  // console.log('cartInfo: ', cartInfo);
  const totalPrice = useSelector(getTotalPrice)

  // 是否登入
  // const loginStorage = JSON.parse(localStorage.getItem('user'))
  const userInfo = useSelector(getUserInfo)
  const [isLogin, setIsLogin] = useState(false)

  // console.log('loginStorage: ', loginStorage);

  // 刪除全部確認框
  const [showConfirm, setShowConfirm] = useState(false)
  // 離開動畫
  const [leaveAnimation, setLeaveAnimation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 結賬
  const [checkOut, setCheckOut] = useState(false)

  const isShow = () => {
    // console.log('我想清除');
    props.handlerShow()
    // console.log('props.clearFn: ', props.clearFn);
    
  }
  useEffect(()=>{
    if (userInfo){
      // console.log('userInfo: ', userInfo);
      setTimeout(() => {
        setIsLogin(true)
      }, animationTime);

    }
  }, [userInfo])

  // 結賬
  const handlerCheckOut = () => {
    if(isLoading) return;

    setIsLoading(true)
    // props.clearEvent()
    // setCheckOut(prev=>!prev)

    if (checkOut) {
      setLeaveAnimation(true)
      // console.log(11111);
      setTimeout(() => {
        setLeaveAnimation(false)
        setIsLoading(false)
        setCheckOut(false)
        props.setEvent()
      }, animationTime)
    } else {
      props.clearEvent()
      setCheckOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, animationTime)
    }
  }

  // 清空購物車確認框
  const toggleConfirm = () => {
    if (isLoading) return;

    setIsLoading(true)
    if (showConfirm) {
      setLeaveAnimation(true)
      setTimeout(() => {
        setLeaveAnimation(false)
        setIsLoading(false)
      }, animationTime)
    } else {
      setShowConfirm(true)
      props.clearEvent()
      setTimeout(() => {
        setIsLoading(false)
      }, animationTime)
    }
  }

  // 清空購物車後
  const cancelFn = () => {
    setShowConfirm(false)
    props.setEvent()
  }

  // 下單後
  const successClose = ()=>{
    setCheckOut(false)
    isShow()
  }

  const cancelClose = ()=>{
    setCheckOut(false)
    setTimeout(()=>{
      props.setEvent()
    },animationTime)
  }

  const cancelLogin = ()=>{
    setCheckOut(false)
    props.setEvent()
    // setTimeout(() => {
    // }, animationTime)
  }



  return (
    <div
      className={`${props.showAnimation ? styles.Hide : ''} ${styles.CartBox}`} ref={ref}
    >
      <header className={styles.Header}>
        <span className={styles.Title}>
          SHOPPING CART
        </span>
        <div
          className={styles.Trash}
          onClick={toggleConfirm}
        >
          <FontAwesomeIcon icon={faTrash} />
          {
            showConfirm && <Confirm cancelFn={cancelFn} isLeave={leaveAnimation} />
          }
        </div>

        <span
          className={styles.Exit}
        >
          <FontAwesomeIcon
            onClick={isShow}
            icon={faXmark} />
        </span>
      </header>
      {
        cartInfo.length === 0 ? <p className={styles.Tips}>YOUR CART IS CURRENTLY EMPTY.</p>
          :
          <>
            <ul className={styles.CartList}>
              {
                cartInfo.map(item => {
                  return <CartItem key={item.title} data={item} />
                })
              }
            </ul>
            <footer className={styles.Footer}>
              <div className={styles.Price}>
                <span className={styles.Tips}>SUBTOTAL</span>
                <span className={styles.TotalPrice}>$ {totalPrice}</span>
              </div>
              <div
                className={styles.CheckOut}
                onClick={handlerCheckOut}
              >
                CHECK OUT →
                {
                  checkOut ? isLogin ? <Checkout successClose={successClose} cancelClose={cancelClose} isLeave={leaveAnimation} /> : <Login cancelLogin={cancelLogin} handlerClose={setCheckOut} isLeave={leaveAnimation} /> : null
                }
              </div>

            </footer>
          </>

      }


    </div>
  );
})

export default CartPage;
