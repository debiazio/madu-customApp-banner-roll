import React from 'react';
import styles from './styles.css';

const BannerRoll = () => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
        CONFIRA A FEIRA HOSPITALAR
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        ·
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
      <span className={styles.highlight}>A MAIOR LINHA DE MOBILIÁRIO TÉCNICO DO MUNDO</span>
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      ·
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
        CONFIRA A FEIRA hospitalar
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        ·
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        <span className={styles.highlight}>A MAIOR LINHA DE MOBILIÁRIO TÉCNICO DO MUNDO</span>
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        ·
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        CONFIRA A FEIRA HOSPITALAR
      </div>
    </div>
  );
};

export default BannerRoll;
