import React, { useEffect, useState } from 'react';
import Backdrop from '../Backdrop/BackDrop';
import styles from './Checkout.module.css'
import { animationTime } from '../../Api/data';
import { useDispatch, useSelector } from 'react-redux';
import { getCartInfo, getTotalPrice, getUserInfo } from '../../store/UserSlice';
import { addOrder } from '../../store/UserSlice';

const Checkout = ({ successClose, cancelClose, isLeave }) => {

  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo)
  const cartInfo = useSelector(getCartInfo)
  // console.log('userInfo: ', userInfo);
  /* 
      {
        "username": "1",
        "password": "1",
        "cart": [
            {
                "title": "BETWEEN 1&2 Complete ver. (Not Signed)",
                "price": "$28.00",
                "picPath": "https://cdn.shopify.com/s/files/1/0267/1371/8831/products/cover_A_344x.png?v=1661486457",
                "soldout": false,
                "limit": 6,
                "cartMessage": [
                    "DIGITAL DOWNLOAD OF \"BETWEEN 1&2 Complete ver. (Not Signed)\" WILL BE DELIVERED VIA EMAIL UPON PURCHASE.",
                    "DIGITAL DOWNLOADS ARE ONLY AVAILABLE TO U.S. CUSTOMERS.",
                    "DIGITAL DOWNLOADS ARE DELIVERED AS MP3 44.1KHZ/24-BIT AUDIO FILES.",
                    "*LIMIT OF 6 PER CUSTOMER."
                ],
                "amount": 6,
                "path": "/shop/BETWEEN-1-2/BETWEEN%201&2%20Complete%20ver.%20(Not%20Signed)"
            },
        ],
        "nickname": "ONCE",
        "address": "韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）",
        "balance": 20151020,
        "avatar": "url(/images/profile/5.jpg)"
    }
  */
  const total = useSelector(getTotalPrice)

  // 離開效果
  const [onClose, setOnClose] = useState(false)

  const [isChanging, setIsChanging] = useState(false)
  const [newAddress, setNewAddress] = useState(userInfo.address)


  // // 離開效果
  // const leavePage = () => {
  //   setOnClose(true)
  //   setTimeout(() => {
  //     successClose()
  //   }, animationTime)
  // }

  useEffect(() => {
    if (isLeave) {
      handlerCancel()
    }
  }, [isLeave])

  // 修改地址
  const handlerChangeAddress = () => {
    if (!isChanging) {
      setIsChanging(true)
    } else {
      setIsChanging(false)
    }
  }

  // 確認購買
  const handlerConfirm = () => {
    // console.log(newAddress);
    // console.log('newAddress: ', newAddress);
    // console.log('cartInfo: ', cartInfo);
    // console.log('total: ', total);
    // leavePage()

    // 成功購買
    setOnClose(true)
    setTimeout(() => {
      successClose()
    }, animationTime)

    // 等離場效果結束再更改store內容
    setTimeout(() => {
      dispatch(addOrder({
        newAddress,
        cartInfo,
        total
      }))
    }, animationTime);
  }


  // 取消購買
  const handlerCancel = ()=>{
    setOnClose(true)
    setTimeout(() => {
      cancelClose()
    }, animationTime)
  }


  return (
    <Backdrop>
      <div className={`${styles.ConfirmBox} ${onClose ? styles.BoxLeave : ''}`} style={{ animationDuration: animationTime / 1000 + 's' }} onClick={(e) => e.stopPropagation()}>

        <p className={styles.TotalPrice}>
          總金額: {total} $
        </p>
        <div className={styles.AddressBox}>
          <div className={styles.InputBox}>
            <label htmlFor="address" style={{ minWidth: 80, lineHeight: '30px', fontWeight: 700 }}>配送地址:</label>
            {
              isChanging ?
                (

                  <textarea
                    id='address'
                    placeholder={userInfo.address}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    // className={styles.ChangeInput}
                    cols="28" rows="3"
                    style={{ resize: 'none', outline:"none" }}
                  />
                )
                :
                (
                  <span className={styles.ShowAddress}>
                    {newAddress}
                  </span>
                )
            }
          </div>
          <button
            className={styles.ChangeBtn}
            onClick={handlerChangeAddress}
          >
            修改
          </button>
        </div>
        <div className={styles.BtnBox}>
          <button
            className={styles.CancelBtn}
            onClick={handlerCancel}
          >取消</button>
          <button
            className={styles.ConfirmBtn}
            onClick={handlerConfirm}
          >確認購買</button>
        </div>

      </div>
    </Backdrop>
  );
}

export default Checkout;
