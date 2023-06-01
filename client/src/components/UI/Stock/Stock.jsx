import React from "react";
import styles from "./Stock.module.scss";
import { Link } from "react-router-dom";

const Stock = ({ name, price, info, date }) => {
  const cleanDate = new Date(date).toLocaleDateString();
  return (
    <Link className={styles.transactionItem}>
      <p className={styles.stockName}>{name}</p>
      <p className={styles.stockPrice}>${price}</p>
      <p className={styles.stockInfo}>{info}</p>
      <p className={styles.stockInfoDate}>Date:{cleanDate}</p>
    </Link>
  );
};

export default Stock;
