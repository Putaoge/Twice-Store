import React, { useRef, useState } from 'react';
import HistoryInnerItem from './HistoryInnerItem/HistoryInnerItem';
import styles from './HistoryItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import Confirm from '../../../Header/Cart/CartPage/Comfirm/Confirm';
import { animationTime } from '../../../../Api/data';
import { useDispatch } from 'react-redux';
import { removeOrder } from '../../../../store/UserSlice';


const HistoryItem = ({ data }) => {
  // console.log('data: ', data);
  const radio = useRef(null)
  const [leaveAnimation, setLeaveAnimation] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  /* 
    {
      "product": [
          {
              "title": "More & More (ENG VER) Digital Single",
              "price": "$1.29",
              "picPath": "https://cdn.shopify.com/s/files/1/0267/1371/8831/products/More-_-More-Enlgish-Version-with-border_344x.png?v=1597965942",
              "soldout": false,
              "limit": 10,
              "cartMessage": [
                  "DIGITAL DOWNLOAD OF \"More & More (ENG VER) Digital Single\" WILL BE DELIVERED VIA EMAIL UPON PURCHASE.",
                  "DIGITAL DOWNLOADS ARE ONLY AVAILABLE TO U.S. CUSTOMERS.",
                  "DIGITAL DOWNLOADS ARE DELIVERED AS MP3 44.1KHZ/24-BIT AUDIO FILES.",
                  "*LIMIT OF 10 PER CUSTOMER."
              ],
              "amount": 2,
              "path": "/shop/MORE-MORE/More%20&%20More%20(ENG%20VER)%20Digital%20Single"
          }
      ],
      "address": "韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）",
      "date": "2023/3/29 上午6:13:03",
      "total": 2.58
  }
  */

  // 取消
  const cancelFn = () => {
    setShowConfirm(false)
  }

  // 播放
  const playmedia = () => {
    radio.current.play()
  }

  const toggleCancel = () => {
    if (isLoading) return;

    setIsLoading(true)

    if (showConfirm) {
      setLeaveAnimation(true)
      setTimeout(() => {
        setLeaveAnimation(false)
        setIsLoading(false)
        setShowConfirm(false)

      }, animationTime);
    } else {
      setShowConfirm(true)
      setTimeout(() => {
        setIsLoading(false)
      }, animationTime);
    }
  }

  const confirmFn = ()=>{
    dispatch(removeOrder(data))
  }

  return (
    <li className={styles.ItemBox}>
      <div className={styles.PlaySoundBtn}>
        <FontAwesomeIcon icon={faVolumeHigh} onClick={playmedia} />
      </div>
      <p className={styles.Time}>
        {data.date}
      </p>
      <ul className={styles.ItemList}>
        {
          data.product.map(item => <HistoryInnerItem key={`${data.date} ${item.title}`} data={item} />)
        }
      </ul>
      <p style={{ textAlign: 'end', marginBottom: 20 }}>
        總計: $ {data.total}
      </p>
      <p className={styles.Address}>
        收件地址: <br /> {data.address}
      </p>
      <div
        className={styles.CancelOrder}
        onClick={toggleCancel}
      >
        取消訂單
        {
          showConfirm ? <Confirm cancelFn={cancelFn} confirmFn={confirmFn} text={'即將刪除訂單, 是否確認?'} isLeave={leaveAnimation} /> : null
        }
      </div>

      <audio src={data.randomVoice} ref={radio}></audio>
    </li>
  );
}

export default HistoryItem;
