import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';
import React, { useEffect } from "react";
import styles from "./Stock.module.scss";
import { Link } from "react-router-dom";

const Stock = ({ name, price, info, date }) => {

  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
      
  const cleanDate = new Date(date).toLocaleDateString();
  return (
    <Link className={`${styles.transactionItem} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
      <p className={`${styles.stockName} ${darkModeTheme ? styles["dark-mode"] : ""}`}>{name}</p>
      <p className={`${styles.stockPrice} ${darkModeTheme ? styles["dark-mode"] : ""}`}>${price}</p>
      <p className={`${styles.stockInfo} ${darkModeTheme ? styles["dark-mode"] : ""}`}>{info}</p>
      <p className={`${styles.stockInfoDate} ${darkModeTheme ? styles["dark-mode"] : ""}`}>Date:{cleanDate}</p>
    </Link>
  );
};

export default Stock;
