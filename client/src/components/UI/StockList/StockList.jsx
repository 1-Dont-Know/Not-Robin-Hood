import React from "react";
import styles from "./StockList.module.scss";
import { Link } from "react-router-dom";

const StockList = ({ name, symbol, shares, price, avgCost, totalReturn, equity }) => {
  return (
    <Link className={styles.stockList}>
      <p className={styles.item}>{name}</p>
      <p className={styles.item}>{symbol}</p>
      <p className={styles.item}>{shares}</p>
      <p className={styles.item}>{price}</p>
      <p className={styles.item}>{avgCost}</p>
      <p className={styles.item}>{totalReturn}</p>
      <p className={styles.item}>{equity}</p>
    </Link>
  );
};

export default StockList;