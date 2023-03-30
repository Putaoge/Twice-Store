import React from 'react';
import styles from './ProductCount.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

const ProductCount = ({ num, limit, handlerAdd, handlerMinus, inCart }) => {
  // console.log(num, limit);
  return (
    <div className={styles.CountBox}>
      <FontAwesomeIcon icon={faMinus} className={`${inCart ? styles.BtnInCart :styles.Btn}`} onClick={handlerMinus}/>
      <span className={`${inCart ? styles.NumInCart : styles.Num}`}>
        {num}
      </span>
      <FontAwesomeIcon icon={faPlus} className={`${inCart ? styles.BtnInCart : styles.Btn}`} onClick={handlerAdd} />

    </div>
  );
}

export default ProductCount;
