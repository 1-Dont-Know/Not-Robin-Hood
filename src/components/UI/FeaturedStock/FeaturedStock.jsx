import React from "react";
import styles from "./FeaturedStock.module.scss";
import featured from "../../../assets/icons/featured.svg";
import up from "../../../assets/icons/up.svg";

const FeaturedStock = ({ img, status }) => {
  return (
    <div className={status === "up" ? styles.positive : styles.negative}>
      <div className={styles.stockInformation}>
        <div className={styles.stockIcon}>
          <img src={featured} alt="stock-icon" />
        </div>
        <div className={styles.stockName}>
          <h1>BNB-USD</h1>
          <h4>BinanceCoin USD</h4>
        </div>
      </div>
      <div className={styles.stockResults}>
        <p>+1234.56%</p>
        <span>
          <img src={up} alt="up" />
        </span>
      </div>
      <div className={styles.stockPrice}>$50,130.17</div>
    </div>
  );
};

export default FeaturedStock;
