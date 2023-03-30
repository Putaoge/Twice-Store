import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Backdrop.module.css'

// 獲取backdrop的根元素
const backdropRoot = document.querySelector('#backdrop-root')
// console.log('wojinliale');

// 遮罩層
const Backdrop = (props) => {
  // console.log('props: ', props);
  // console.log('props.children',props.children);
  return ReactDOM.createPortal(
    <div className={styles.Backdrop}>
      {
        props.children
      }
    </div>, backdropRoot)
}

export default Backdrop;



