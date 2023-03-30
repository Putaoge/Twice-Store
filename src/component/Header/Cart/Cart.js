import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import styles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCartInfo } from '../../../store/UserSlice';
import CartPage from './CartPage/CartPage';
import { animationTime } from '../../../Api/data';

const Cart = () => {
  const select = useSelector(getCartInfo)
  const [cartAmount, setCartAmout] = useState(0)
  const cartRef = useRef(null)
  const hideRef = useRef(null)

  const [showCart, setShowCart] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  // 是否在加載窗口
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('select变了');
    if (select.length) {
      // console.log('select.cart.amout: ', select);
      let count = 0
      select.forEach(item => {
        count += item.amount
      })
      setCartAmout(count)
    } else {
      setCartAmout(0)
    }

    // return (() => {
    //   document.removeEventListener('click', clickOutside)
    // })

  }, [select])

  const handlerShow = () => {
    if (loading)return;

    setLoading(true)
    if (cartRef.current) {
      // console.log('cartRef.current: ', cartRef.current);
      setShowAnimation(true)
      document.removeEventListener('click', clickOutside)

      setTimeout(() => {
        setShowCart(prev => !prev)
        setShowAnimation(false)
        setLoading(false)
      }, animationTime)
    } else {
      // setLoading(true)
      setShowCart(prev => !prev)
      setTimeout(() => {
        document.addEventListener('click', clickOutside)
        setLoading(false)
      }, animationTime)
    }
    // console.log(cartRef.current);
  }


  // 要確保是同一個function, 才能remove
  const clickOutside = useCallback(function (event) {
    if (!hideRef.current.contains(event.target)) {
      // console.log(event.target);
      // setShowAnimation(false)
      handlerShow()
    }
  }, [])

  // 設定事件
  const setEvent = () => {
    document.addEventListener('click', clickOutside)
  }

  const clearEvent = () => {
    document.removeEventListener('click', clickOutside)
  }


  return (
    <div ref={hideRef}>
      <div
        className={styles.PcCart}
        onClick={() => handlerShow()}

      >
        CART({cartAmount}) &nbsp;
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      <div
        className={styles.MobileCart}
        onClick={() => handlerShow()}

      >
        <span className={styles.CartCount}>{cartAmount}</span>
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      {
        showCart ?
          <CartPage
            ref={cartRef}
            showAnimation={showAnimation}
            handlerShow={handlerShow}
            clearFn={clickOutside}
            clearEvent={clearEvent}
            setEvent={setEvent}
          /> : null
      }
    </div>
  );
}

export default Cart;
