import React, { useState } from "react";
import styles from "./StockList.module.scss";
import { Link } from "react-router-dom";
import Popup from "../Popup/Popup";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";

const StockList = ({
  name,
  symbol,
  shares,
  totalCost,
  avgCost,
  totalReturn,
  equity,
  sellHandler,
}) => {
  return (
    <>
      <div className={styles.stockList}>
      <div className={styles.container}>
        <p className={styles.item}>{name}</p>
        <p className={styles.item}>{symbol}</p>
        <p className={styles.item}>{shares} pcs</p>
        <p className={styles.item}>${totalCost}</p>
        <p className={styles.item}>${avgCost}</p>
        <p className={styles.item}>${totalReturn}</p>
        <p className={styles.item}>${equity}</p>
        </div>
        <button onClick={sellHandler} className={styles.sellBtn}>
          SELL
        </button>
        {/* TODO: According of stocks with the same name  */}
        {/* <button className={styles.openBtn}>
          {" "}
          <img src={DownVectorIcon} alt="Vector" />
        </button> */}
      </div>
    </>
  );
};

export default StockList;
