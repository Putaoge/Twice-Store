import React, { useEffect, useState } from 'react';
import Backdrop from '../Backdrop/BackDrop';
import styles from './Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getCartInfo, setUser, secondLogin } from '../../store/UserSlice';
import { animationTime } from '../../Api/data';

const Login = ({ handlerClose, cancelLogin, isLeave }) => {

  // 購物車信息
  const cartInfo = useSelector(getCartInfo)
  // console.log('cartInfo: ', cartInfo);

  const dispatch = useDispatch()

  //  切換 登入/註冊
  const [showLogin, setShowLogin] = useState(true)

  // 離開登入頁面動畫效果
  const [onClose, setOnClose] = useState(false)


  const [username, setUserame] = useState('')

  const [password, setPassword] = useState('')
  const loginBol = Boolean(username) && Boolean(password)


  const [signName, setSignName] = useState('')
  const [signPass, setSignPass] = useState('')
  const signupBol = Boolean(signName) && Boolean(signPass)

  // 登入時用戶是否存在
  const [userNoExit, setUserNoExit] = useState(false);
  // 密碼是否正確
  const [wrongPass, setWrongPass] = useState(false);

  // 註冊時用戶是否存在
  const [userExit, setUserExit] = useState(false);
  // 無法使用的用戶名
  const [isUser, setIsUser] = useState(false)

  // 註冊成功
  const [signSuccess, setSignSuccess] = useState(false)



  // 點擊登入
  const handlerLogin = () => {
    // 未完成輸入
    if (!loginBol) return;
    // console.log('username: ', username);
    // console.log('password: ', password);

    // 用戶名不能為user
    if (username === 'user') {
      setIsUser(true)
      return
    }

    // 搜索是否存在用戶
    let bol = JSON.parse(localStorage.getItem(username))
    // console.log('bol: ', bol);
    // 不存在用戶
    if (!bol) {
      setUserNoExit(true)
      return;
    }

    // 存在用戶
    // 判斷密碼
    if (bol.password !== password) {
      setWrongPass(true)
      return;
    }

    // 存在用戶且密碼正確
    // 在localStorage中存入user (當前使用者)
    // localStorage.setItem('user', JSON.stringify(bol))

    // 如果是第一次登入, 需要存儲設置用戶信息
    if (!bol.balance) {
      setTimeout(() => {
        dispatch(setUser(bol))
      }, animationTime);
    } else {
      // console.log('裡面有')
      setTimeout(() => {console.log();
        dispatch(secondLogin(bol))
      }, animationTime);
    }
    // 開啟離開動畫效果
    leavePage()




  }


  // 點擊註冊
  const handlerSignup = () => {
    // 未完成輸入
    if (!signupBol) return;
    if (signName === 'user') {
      setIsUser(true)
      return
    }
    // setShowLogin(false)
    /* 
    需要存的資料:
    用戶名, 密碼, 購物車內容
    同時存儲到user裡面
    */
    let bol = localStorage.getItem(signName)
    if (bol) {
      setUserExit(true)
      return
    }


    // console.log('username: ', signName);
    // console.log('password: ', signPass);
    let data = {
      username: signName,
      password: signPass,
      // cart: cartInfo || []
    }
    // console.log('data: ', data);
    // 存入localStorage
    localStorage.setItem(signName, JSON.stringify(data))

    // 註冊成功
    setSignSuccess(true)
    setTimeout(() => {
      toggleLoginSign()
    }, 1000)

  }
  // 切換登入/註冊界面
  const toggleLoginSign = () => {
    setShowLogin(prev => !prev)
    resetInput()
  }

  // 重置錯誤信息狀態
  const resetFn = () => {
    setUserNoExit(false)
    setWrongPass(false)
    setUserExit(false)
    setSignSuccess(false)
    setIsUser(false)
  }
  // 重置輸入框
  const resetInput = () => {
    resetFn()
    setUserame('')
    setPassword('')
    setSignName('')
    setSignPass('')
  }


  // 離開效果
  const leavePage = () => {
    setOnClose(true)
    setTimeout(() => {
      cancelLogin()
    }, animationTime)
  }

  useEffect(() => {
    if (isLeave) {
      leavePage()
    }
  }, [isLeave])




  // 登入頁面
  const loginPage = (
    <div className={styles.LoginPage}>
      <span
        className={styles.Exit}
        onClick={() => leavePage()}
      >
        <FontAwesomeIcon
          icon={faXmark}
        />
      </span>
      <h3 className={styles.Title}>登入</h3>
      {
        userNoExit ? <p className={styles.WarningTips}>用戶名不存在, 請前往註冊</p> : null
      }
      {
        isUser ? <p className={styles.WarningTips}>無法使用此用戶名, 請重新輸入</p> : null
      }
      {
        wrongPass ? <p className={styles.WarningTips}>密碼錯誤, 請重新輸入</p> : null
      }
      <div className={styles.InputBox}>
        <div className={styles.InputItemBox}>

          <label htmlFor="username">用戶名: </label>
          <input type="text" id='username' value={username} onChange={(e) => { resetFn(); setUserame(e.target.value.trim()) }} />
        </div>
        <div className={styles.InputItemBox}>
          <label htmlFor="password">密碼: </label>
          <input type="text" id='password' value={password} onChange={(e) => { resetFn(); setPassword(e.target.value.trim()) }} />
        </div>
      </div>
      <div className={styles.BtnBox}>
        <button
          onClick={handlerLogin}
        >
          登入
        </button>
        <button
          onClick={toggleLoginSign}
        >
          註冊
        </button>
      </div>
    </div>
  )

  // 
  const signupPage = (
    <div className={styles.SignupPage}>
      <span
        className={styles.Exit}
        onClick={() => leavePage()}
      >
        <FontAwesomeIcon
          icon={faXmark}
        />
      </span>
      {
        userExit ? <p className={styles.WarningTips}>該用戶已存在, 請前往登入</p> : null
      }
      {
        isUser ? <p className={styles.WarningTips}>無法使用此用戶名, 請重新輸入</p> : null
      }
      {
        signSuccess ? <p className={styles.WarningTips}>註冊成功, 請前往登入</p> : null
      }
      <h3 className={styles.Title}>註冊</h3>
      <div className={styles.InputBox}>
        <div className={styles.InputItemBox}>

          <label htmlFor="username">用戶名: </label>
          <input type="text" id='username' value={signName} onChange={(e) => { resetFn(); setSignName(e.target.value.trim()) }} />
        </div>
        <div className={styles.InputItemBox}>
          <label htmlFor="password">密碼: </label>
          <input type="text" id='password' value={signPass} onChange={(e) => { resetFn(); setSignPass(e.target.value.trim()) }} />
        </div>
      </div>
      <div className={styles.BtnBox}>
        <button
          onClick={handlerSignup}
        >
          完成註冊
        </button>
        <button
          onClick={toggleLoginSign}
        >
          返回登入
        </button>
      </div>
    </div>
  )

  return (
    <Backdrop>
      <div className={`${styles.LoginBox}  ${onClose ? styles.BoxLeave : ''}`} onClick={(e) => e.stopPropagation()} style={{ animationDuration: animationTime / 1000 + 's' }} >
        a阿瓦达无
        <section className={`${styles.ContainBox} ${showLogin ? '' : styles.GoSignup}`}>
          {
            loginPage
          }
          {
            signupPage
          }
        </section>
      </div>
    </Backdrop>
  );
}

export default Login;
