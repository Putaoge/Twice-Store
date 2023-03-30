import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLink.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const nav = [
  {
    title: 'READY TO BE',
    path: 'READY-TO-BE'
  },
  {
    title: 'BETWEEN 1&2',
    path: 'BETWEEN-1-2'
  },
  {
    title: 'NAYEON',
    path: 'NAYEON'
  },
  {
    title: 'MORE & MORE',
    path: 'MORE-MORE'
  },
  {
    title: 'MERCHANDISE & ACCESSORIES',
    path: 'MERCHANDISE-ACCESSORIES'
  },
]

const NavLink = React.forwardRef((props, ref) => {
  return (
    <>
      <ul className={styles.PcNavList}>
        {
          nav.map((item, index) => {
            return (
              <li key={item.path}>
                <Link
                  to={`/collections/${item.path}`}><span className={styles.Link}>{item.title}</span></Link>
              </li>
            )
          })
        }
      </ul>
      <div className={`${props.leaveAnimation ? styles.MobileBoxLeave : ''} ${styles.MobileBox}`} ref={ref}>
        <span
          className={styles.Exit}
        >
          <FontAwesomeIcon
            onClick={props.handlerShow}
            icon={faXmark}
          />
        </span>
        <ul className={styles.MobileNavList}>
          {
            nav.map((item, index) => {
              return (
                <li key={item.path}>
                  <Link
                    onClick={props.handlerShow}
                    to={`/collections/${item.path}`}><span className={styles.Link}>{item.title}</span></Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
})

export default NavLink;
