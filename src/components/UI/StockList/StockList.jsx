import React from "react";
import styles from "./StockList.module.scss";
import { Link } from "react-router-dom";

const StockList = ({ name, symbol, shares, price, avgCost, totalReturn, equity }) => {
  return (
    <div className={styles.listItem}>
      <p className={styles.stockName}>{name}</p>
      <p className={styles.stockSymbol}>{symbol}</p>
      <p className={styles.stockShares}>{shares}</p>
      <p className={styles.stockPrice}>{price}</p>
      <p className={styles.stockAvgCost}>{avgCost}</p>
      <p className={styles.stockTotalReturn}>{totalReturn}</p>
      <p className={styles.stockEquity}>{equity}</p>
    </div>
  );
};

export default StockList;