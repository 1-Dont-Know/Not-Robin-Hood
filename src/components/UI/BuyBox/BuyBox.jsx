import React from "react";
import styles from "./BuyBox.module.scss";
import globalStyles from "../../../styles/main.module.scss";

const BuyBox = ({ type, placeholder }) => {
  return (
    <div className={styles.BuyBody}>
      <div className={styles.wrapper}>
        <div className={styles.button}>
          <button className={globalStyles.buyBoxButton}>Buy</button>
          <button className={globalStyles.sellButton}>Sell</button>
        </div>
        <input type="select" className={styles.dropdown} value="QTR" />
        <input type="select" className={styles.dropdown} value="MM/DD" />

        <h1>Queue Order</h1>
        <div className={styles.orders}>
          <p>Order conformation</p>
        </div>
      </div>
    </div>
  );
};

export default BuyBox;
