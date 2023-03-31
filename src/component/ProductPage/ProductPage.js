import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductItem from './ProductItem/ProductItem';

import styles from './ProductPage.module.css'

const ProductPage = () => {
  // console.log('我進來了');
  const { option } = useParams()
  // console.log('product: ', option);

  const [productData, setProductData] = useState()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    
    // 開發路徑
    // fetch(`/fakeData/${option}.json`).then(res => res.json())
    // 生產路徑
    fetch(`./fakeData/${option}.json`).then(res => res.json())
      .then(data => {
        console.log('data: ', data);
        setProductData(data)
        setIsLoading(false)
      })
  }, [option])

  return (
    <ul className={styles.ProductList}>
      {
        isLoading ?
          <p style={{ textAlign: 'center', lineHeight: '80vh' }}>正在加載…</p>
          :
          productData.map(item => {
            return (
              <li className={styles.ProductItem} key={item.title}>
                <Link to={`/shop/${option}/${item.title}`}>
                  <ProductItem data={item} />
                </Link>
              </li>
            )
          })
      }
    </ul>
  );
}

export default ProductPage;
