import React, { useState, useEffect } from "react";
import styles from "./StockList.module.scss";
import { Link } from "react-router-dom";
import Popup from "../Popup/Popup";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const StockList = ({
  name,
  symbol,
  shares,
  currentPrice,
  avgCost,
  totalReturn,
  equity,
  sellHandler,
}) => {
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

  return (
    <>
      <div className={`${styles.stockList} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        <div className={styles.container}>
          <Link
            className={styles.item}
            to={{
              pathname: "/stock-viewer",
              search: `?symbol=${symbol}&description=${name.replace(
                /\s+/g,
                "+"
              )}`,
            }}
          >
            {" "}
            <p>{name}</p>
          </Link>
          <Link
            className={styles.item}
            to={{
              pathname: "/stock-viewer",
              search: `?symbol=${symbol}&description=${name.replace(
                /\s+/g,
                "+"
              )}`,
            }}
          >
            {" "}
            <p>{symbol}</p>
          </Link>
          <p className={styles.item}>{shares} pcs</p>
          <p className={styles.item}>${currentPrice}</p>
          <p className={styles.item}>${avgCost}</p>
          <p className={styles.item}>${totalReturn}</p>
          <p className={styles.item}>${equity}</p>
        </div>
        <button onClick={sellHandler} className={`${styles.sellBtn} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
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
