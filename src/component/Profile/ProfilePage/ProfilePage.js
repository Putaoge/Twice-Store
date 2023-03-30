import React, { useEffect, useState } from 'react';
import Backdrop from '../../Backdrop/BackDrop';
import styles from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faSliders, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { changeUserInfo, getUserInfo, getHistoryOrder, logout } from '../../../store/UserSlice';
import { animationTime } from '../../../Api/data';
import HistoryItem from './HistoryItem/HistoryItem';

const ProfilePage = ({ handlerClose, isLeave }) => {
  const [onClose, setOnClose] = useState(false)
  const userInfo = useSelector(getUserInfo)
  const historyOrder = useSelector(getHistoryOrder)
  console.log('historyOrder: ', historyOrder);
  const dispatch = useDispatch()
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
        }
    ],
    "nickname": "ONCE",
    "address": "韩国首爾特別市江東區江東大路205號（城內洞448-13,JYP Center大樓）",
    "balance": 20151020,
    "avatar": "url(/images/profile/5.jpg)"
}
  */

  // 切換 修改/瀏覽 界面
  const [onChange, setOnChange] = useState(false)
  // 是否經過修改
  const [didChange, setDidChange] = useState(false)

  const [newInfo, setNewInfo] = useState({
    username: userInfo.username,
    password: userInfo.password,
    nickname: userInfo.nickname,
    address: userInfo.address
  })

  // console.log('newInfo: ', newInfo);


  // 離開效果
  const leavePage = () => {
    setOnClose(true)
    setTimeout(() => {
      handlerClose()
    }, animationTime)
  }

  useEffect(() => {
    if (isLeave) {
      leavePage()
    }
  }, [isLeave])

  // 點擊更改
  const handlerChangeInfo = () => {
    setOnChange(prev => !prev)
    setNewInfo({
      username: userInfo.username,
      password: userInfo.password,
      nickname: userInfo.nickname,
      address: userInfo.address
    })
  }

  // 確實修改了
  const handlerUsername = (e) => setNewInfo(prev => {
    setDidChange(true)
    return { ...prev, username: e.target.value.trim() }
  })
  const handlerPassword = (e) => setNewInfo(prev => {
    setDidChange(true)
    return { ...prev, password: e.target.value.trim() }
  })
  const handlerNickname = (e) => setNewInfo(prev => {
    setDidChange(true)
    return { ...prev, nickname: e.target.value }
  })
  const handlerAddress = (e) => setNewInfo(prev => {
    setDidChange(true)
    return { ...prev, address: e.target.value }
  })

  // 提交修改
  const handlerSubmit = () => {
    // newInfo
    // console.log('newInfo: ', newInfo);
    if (didChange) {
      dispatch(changeUserInfo(newInfo))
      handlerChangeInfo()
    }

  }

  // 登出
  const handlerLogout = () => {
    leavePage()
    setTimeout(() => {
      dispatch(logout())
    }, animationTime);
  }



  // 正常顯示
  const showInfo = (
    <ul className={styles.InfoList}>
      <li>
        <label className={styles.Desc}>用戶名:</label> <span className={styles.ShowInfo}>{userInfo.username}</span>
      </li>
      <li>
        <label className={styles.Desc}>密碼:</label> <span className={styles.ShowInfo}>{userInfo.password}</span>
      </li>
      <li>
        <label className={styles.Desc}>暱稱:</label> <span className={styles.ShowInfo}>{userInfo.nickname}</span>
      </li>
      <li className={styles.AddressBox}>
        <label className={styles.Desc}>配送地址:</label> <span className={styles.ShowAddress}>{userInfo.address}</span>
      </li>
    </ul>
  )

  // 更改時顯示
  const changeShow = (
    // <form className={styles.ChangeBox}>
    <ul className={styles.ChangeList}>
      <li>
        <label htmlFor='username' className={styles.Desc}>用戶名:</label>
        <input type="text" id='username' placeholder={userInfo.username} className={styles.InfoInput}
          value={newInfo.username}
          onChange={handlerUsername}
        />
      </li>
      <li>
        <label htmlFor='password' className={styles.Desc}>密碼:</label>
        <input type="text" id='password' placeholder={userInfo.password} className={styles.InfoInput}
          value={newInfo.password}
          onChange={handlerPassword}

        />
      </li>
      <li>
        <label htmlFor='nickname' className={styles.Desc}>暱稱:</label>
        <input type="text" id='nickname' placeholder={userInfo.nickname} className={styles.InfoInput}
          value={newInfo.nickname}
          onChange={handlerNickname}

        />
      </li>
      <li className={styles.AddressBox}>
        <label htmlFor='address' className={styles.Desc}>配送地址:</label>
        <textarea name="" id="address" rows="5" placeholder={userInfo.address} className={styles.InputAddress}
          value={newInfo.address}
          onChange={handlerAddress}
        />
      </li>
      <li className={styles.SubmitBox}>
        <button type="button" className={styles.CancelBtn} onClick={handlerChangeInfo}>取消</button>
        <button type="button" className={styles.ConfirmBtn} onClick={handlerSubmit}>點擊提交</button>
      </li>
    </ul>
    // </form>
  )


  return (
    <Backdrop>
      <div className={`${styles.ProfileBox}  ${onClose ? styles.BoxLeave : ''}`} onClick={(e) => e.stopPropagation()} style={{ animationDuration: animationTime / 1000 + 's' }}>
        <span
          className={styles.Exit}
          onClick={leavePage}
        >
          <FontAwesomeIcon
            icon={faXmark} />
        </span>
        <span
          className={styles.Logout}
          title={'登出'}
          onClick={handlerLogout}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket} />
        </span>


        <section className={styles.InfoBox}>


          <div className={styles.Avatar} style={{ backgroundImage: `${userInfo.avatar}`, boxShadow: userInfo.shadow }}></div>
          <div className={styles.InfoContainer}>
            <span
              className={styles.ChangeBtn}
              onClick={handlerChangeInfo}
            >
              <FontAwesomeIcon icon={faSliders} />
            </span>
            {
              onChange ?

                changeShow

                :

                showInfo

            }
            <div className={styles.Balance}>
              <span className={styles.Desc}>餘額:</span> $ {userInfo.balance}
            </div>
          </div>
        </section>
        {/* 購買記錄 */}
        <section className={styles.HistoryBox}>
          <p className={styles.Title}>
            訂單記錄
          </p>
          <ul className={styles.HistoryList}>

            {
              historyOrder.length ?
                historyOrder.map(item => <HistoryItem key={item.date} data={item} />)
                :
                <li className={styles.DefaultInfo}>
                  <p>
                    目前沒有訂單記錄
                  </p>
                  <img src="./images/profile/default.GIF" draggable='false' alt="" />
                </li>
            }
          </ul>
        </section>


      </div>
    </Backdrop>
  );
}

export default ProfilePage;
