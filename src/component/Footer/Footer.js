import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-solid-svg-icons';
import { faSpotify, faApple, faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <ul className={styles.IconList}>
        <li>
          <a href="https://www.facebook.com/JYPETWICE" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faFacebook} />

          </a>
        </li>
        <li>
          <a href="https://twitter.com/JYPETWICE" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/twicetagram" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCzgxx_DM2Dcb9Y1spb9mUJA" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>
        <li>
          <a href="https://music.apple.com/us/artist/twice/1203816887" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faApple} />
          </a>
        </li>
        <li className={styles.test}>
          <a href="https://open.spotify.com/artist/7n2Ycct7Beij7Dj7meI4X0" target={'_blank'} rel="noreferrer noopener">
            <FontAwesomeIcon icon={faSpotify} />
          </a>
        </li>
      </ul>
      <p className={styles.Mark}>
        Made By Putao
      </p>
    </footer>
  );
}

export default Footer;
