import React, { useState } from 'react';
import ProductCount from '../../../../ProductCount/ProductCount';
import styles from './CartItem.module.css'
import { useDispatch } from 'react-redux';
import { addProduct, minusProduct } from '../../../../../store/UserSlice';
import { Link } from 'react-router-dom';
const CartItem = ({ data }) => {
  console.log('data: ', data);
  const [remain, setRemain] = useState(true)
  const dispatch = useDispatch()
  const handlerAdd = () => {
    dispatch(addProduct({ productData: data, productNum: 1 }))
  }
  const handlerMinus = () => {
    if (data.amount === 1) {
      // console.log(1);
      setTimeout(() => {
        dispatch(minusProduct(data))
        setRemain(false)
      }, 5);
    } else {

      dispatch(minusProduct(data))
    }

  }

  return (
    <>

      {
        remain &&
        <li className={styles.CartItem}>
          <p className={styles.Tips}>
            LIMITED TO <span style={{ fontWeight: 700 }}>{data.limit}</span> PER CUSTOMER.
          </p>
          <div className={styles.Container} >
            <Link to={data.path} style={{ width: '25%' }} title={data.title} >
              <div className={styles.ProductImg}
                style={{
                  background: `url(${data.picPath})  no-repeat center center/cover`,
                  width: '90%',
                  aspectRatio: "1/1",
                  flexBasis: '1',
                }}
              />
            </Link>
            <div className={styles.Count}>
              <Link to={data.path} style={{ width: '25%', color: "#fff" }} >
                <p className={styles.Title}>
                  {data.title}
                </p>
              </Link>

              <p className={styles.Price}>
                {data.price}
              </p>
              <ProductCount num={data.amount} limit={data.limit} handlerAdd={handlerAdd} handlerMinus={handlerMinus} inCart={true} />
            </div>
          </div>
        </li>
      }
    </>

  );
}

export default CartItem;