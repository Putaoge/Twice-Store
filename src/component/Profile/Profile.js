import React, { useState } from 'react';
import styles from './Profile.module.css'
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../store/UserSlice';
import Login from '../Login/Login';
import ProfilePage from './ProfilePage/ProfilePage';
const Profile = () => {
  const userInfo = useSelector(getUserInfo)
  // console.log('userInfo: ', userInfo);

  // 登入頁面是否打開
  const [login, setLogin] = useState(false)
  // 隐藏動畫
  const [leaveAnimation, setLeaveAnimation] = useState(false)

  // 是否在加載窗口
  const [loading, setLoading] = useState(false)

  // 個人資料頁面是否打開
  const [profile, setProfile] = useState(false)



  // 顯示個人頁面
  const showProfile = () => {
    if (loading)return;

    // loading中不能再次點擊
    setLoading(true)
    if (profile){
      setLeaveAnimation(true)
      setTimeout(() => {
        setProfile(prev => !prev)
        setLeaveAnimation(false)

        // 可再次點擊
        setLoading(false)
      }, 300);
    }else{
      // setLoading(true)
      setProfile(prev=>!prev)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
  }


  // 顯示登入頁面
  const showLogin = () => {
    if (loading)return;

    setLoading(true)
    if(login){
      setLeaveAnimation(true)
      setTimeout(() => {
        setLogin(prev => !prev)
        setLeaveAnimation(false)
        setLoading(false)
      }, 300);
    }else{
      // setLoading(true)
      setLogin(prev=>!prev)
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
  }

  // 關閉登入頁面
  const handlerLoginClose = () => {
    setLogin(false)
  }
  
  // 關閉個人頁面
  const handlerProfileClose = () => {
    setProfile(false)
  }

  return (
    <div className={styles.ProfileBox}>
      {
        userInfo ?
          (
            <div
              className={styles.Avatar}
              style={{ backgroundImage: userInfo.avatar }}
              onClick={showProfile}
            >
              {
                profile ? <ProfilePage handlerClose={handlerProfileClose} isLeave={leaveAnimation} /> : null
              }
            </div>
          )
          :
          (
            <div
              className={styles.Avatar}

              // 開發路徑
              // style={{ backgroundImage: 'url(/images/profile/once.png)' }}

              // 生產路徑
              style={{ backgroundImage: 'url(./images/profile/once.png)' }}
              onClick={showLogin}
            >
              {
                login ? <Login handlerClose={handlerLoginClose} cancelLogin={handlerLoginClose} isLeave={leaveAnimation} /> : null
              }
            </div>
          )
      }
      {/* {
        login ? <Login handlerClose={handlerClose} /> : null
      } */}



    </div>
  );
}

export default Profile;
