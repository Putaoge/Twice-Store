import React, { useEffect, useState } from 'react';
import Backdrop from '../../../../Backdrop/BackDrop';
import styles from './Confirm.module.css'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../../../../store/UserSlice';
import { animationTime } from '../../../../../Api/data';

const Confirm = ({ cancelFn, isLeave }) => {

  const dispatch = useDispatch()

  const [leaveAnimation, setLeaveAnimation] = useState(false)

  // 確認刪除
  const handlerConfirm = () => {
    setLeaveAnimation(true)
    setTimeout(() => {
      cancelFn()
      dispatch(resetCart())
    }, animationTime);
  }

  // 取消
  const handlerCancel = () => {
    setLeaveAnimation(true)
    setTimeout(() => {
      cancelFn()
    }, animationTime);
  }

  useEffect(() => {
    if (isLeave) {
      handlerCancel()
    }
  }, [isLeave])


  return (
    <Backdrop>
      <div className={`${styles.ConfirmBox} ${leaveAnimation ? styles.BoxLeave : ''}`} onClick={(e) => e.stopPropagation()} style={{ animationDuration: animationTime / 1000 + 's' }} >
        <p className={styles.Title}>
          即將清空購物車, 是否確認?
        </p>
        <div className={styles.BtnBox}>
          <button
            className={`${styles.ConfirmBtn} ${styles.Btn}`}
            onClick={handlerConfirm}
          >
            確認
          </button>
          <button
            className={`${styles.CancelBtn} ${styles.Btn}`}
            onClick={handlerCancel}
          >
            取消
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default Confirm;
