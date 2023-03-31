import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import styles from './ShopItem.module.css'
import { getCartInfo } from '../../store/UserSlice';
import ProductCount from '../ProductCount/ProductCount';
import { addProduct } from '../../store/UserSlice';

const Shop = () => {
  const location = useLocation()
  // console.log('location: ', location);
  // 解碼空格
  // console.log(decodeURIComponent(location.pathname).replace('/shop/','').split('/'));
  const [option, product] = decodeURIComponent(location.pathname).replace('/shop/', '').split('/')
  // console.log('option, product: ', option, product);

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [productData, setProductData] = useState({})

  const [productNum, setProductNum] = useState(1)

  const cartInfo = useSelector(getCartInfo)
  // console.log('cartInfo: ', cartInfo);


  useEffect(() => {
    // 開發路徑
    // fetch(`/fakeData/${option}.json`).then(res => res.json())

    // 生產路徑
    fetch(`./fakeData/${option}.json`).then(res => res.json())
      .then(data => {
        // console.log(data);
        setProductData(data.filter(item => item.title === product)[0])
        setIsLoading(false)
      })
  }, [location])

  const handlerAdd = () => {
    if (productNum === productData.limit) return;
    setProductNum(prev => prev + 1)
    // console.log(productNum);
    // console.log(productData);
  }
  const handlerMinus = () => {
    if (productNum === 0) return;
    setProductNum(prev => prev - 1)
    // console.log(productNum);
  }

  // 添加到購物車
  const addToCart = () => {
    if (productNum !== 0) {
      dispatch(addProduct({ productData, productNum, path: location.pathname }))
    }
  }


  // SET ME FREE (Remixes) Digital Album
  return (
    <>
      {
        isLoading ?
          <p style={{ textAlign: 'center', lineHeight:'80vh' }}>正在加載…</p>
          :
          <div
            className={styles.ProductBox}
          >
            <img title={productData.title} src={productData.picPath.replace(/(\_\d+.)\./, '.')} alt="" />
            <div className={styles.Details}>
              <p className={styles.Title}>
                {productData.title}
              </p>
              <p className={styles.Price}>
                {productData.price}
              </p>
              <p style={{ margin: '50px 0 20px 0', fontSize: 18, userSelect: 'none' }}>
                QUANTITY
              </p>
              <ProductCount num={productNum} limit={productData.limit} handlerAdd={handlerAdd} handlerMinus={handlerMinus} inCart={false} />
              <button
                className={styles.AddToCart}
                onClick={addToCart}
              >
                ADD TO CART
              </button>
              <article>
                <ul className={styles.ArticleList}>
                  {
                    productData.cartMessage.map(item => {
                      return (
                        <li key={item}>{item}</li>
                      )
                    })
                  }
                  <li>*LIMIT OF <span className={styles.LimitInfo}>{productData.limit}</span> PER CUSTOMER.</li>
                </ul>
              </article>

            </div>
          </div>
      }
    </>
  );
}

export default Shop;
