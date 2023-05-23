import React from "react";
import styles from "./Stock.module.scss";
import { Link } from "react-router-dom";

const Stock = ({ name, price, info }) => {
  return (
    <Link className={styles.transactionItem}>
      <p className={styles.stockName}>{name}</p>
      <p className={styles.stockPrice}>${price}</p>
      <p className={styles.stockInfo}>{info}</p>
    </Link>
  );
};

export default Stock;
