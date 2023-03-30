import React from 'react';
import styles from './ProductItem.module.css'

const ProductItem = ({data}) => {
  // console.log(data);
  return (
    <>
      <div className="pic"
       style={{
         background: `url(${data.picPath})  no-repeat center center/cover`,
        width:'90%',
        marginBottom:20,
        aspectRatio:1/1
       }}
      />
      <p className={styles.Title}>
        {data.title}
      </p>
      <p className={styles.Price}>
        {data.price}
      </p>
      
    </>
  );
}

export default ProductItem;
