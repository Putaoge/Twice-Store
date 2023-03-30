import React, { useRef } from 'react';
import styles from './HistoryInnerItem.module.css'



const HistoryInnerItem = ({ data }) => {
  // console.log('千層餅的data: ', data);
  /* 
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
  */



  return (
    <li className={styles.InnerItemBox}>
      <img src={data.picPath} alt={data.title} title={data.title} className={styles.Picture} />
      <div className={styles.Content}>
        <p className={styles.Title} title={data.title}>{data.title}</p>
        <span className={styles.Amount}>× {data.amount}</span>
        <span className={styles.Price}>$ {`${+(+(data.price.replace('$', '') * data.amount).toFixed(2))}`}</span>
      </div>
      {/* <button onClick={playmedia}>点滴单</button> */}
      
    </li>
  );
}

export default HistoryInnerItem;
