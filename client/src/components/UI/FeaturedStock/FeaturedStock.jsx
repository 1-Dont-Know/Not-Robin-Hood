import { React, useEffect, useState} from "react";
import styles from "./FeaturedStock.module.scss";
import featured from "../../../assets/icons/featured.svg";
import up from "../../../assets/icons/up.svg";
import { useGetPriceQuery } from "../../../redux/slices/api/finnhubApiSlice";
//Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode, toggleTheme } from './../../../redux/slices/darkModeSlice';

const useStockPrice = (symbol) => {
  return useGetPriceQuery(symbol);
};

const FeaturedStock = ({ symbol, name }) => {
  const { data, error, isLoading } = useStockPrice(symbol);
  const [status, setStatus] = useState(); //State used to track if there is current gain or loss for stock
  
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

  useEffect(() => {
    if (data) {
      setStatus(() => {
        return (parseFloat(data.d) > 0) ? "up" : "down"; 
      });
      // console.log(data);
      // console.log(typeof data.d)
    }
  }, [data]);

  return (
    data && (<div className={`${status === "up" ? styles.positive : styles.negative} 
        ${darkModeTheme ? styles["dark-mode"] : ""}`}>
      <div className={styles.stockInformation}>
        <div className={`${styles.stockIcon} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <img src={featured} alt="stock-icon" />
        </div>
        <div className={`${styles.stockName} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <h1>{symbol}</h1>
          <h4>{name}</h4>
        </div>
      </div>
      <div className={`${styles.stockResults} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        <p>{`%${data.dp}`}</p>
        <span>
          <img src={up} alt="up" />
        </span>
      </div>
      <div className={`${styles.stockPrice} ${darkModeTheme ? styles["dark-mode"] : ""}`}>{(parseFloat(data.d) > 0) ? `+$${data.d}` : `-$${data.d.toString().slice(1)}` }</div>
    </div>
    ));
};

export default FeaturedStock;
