import React, { useEffect } from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import Accordion from "../../UI/Accordion/Acccordion";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const StockItem = ({ symbol, value, des, type, figi }) => {
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

  const description = () => {
    return(
      <div>
        { des }
        <br></br>
        Type: { type }
        <br></br>
        Figi: { figi }
        <br></br>
      </div>
    )
  }

  return (
    <div className={styles.stockItem}>
      <div className={`${styles.buttonContainer} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        {/* stock symbol button */}
        <div className={styles.stockSymbol}>
          <button className={`${globalStyles.stockSymbolButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>{symbol}</button>
        </div>
        {/* stock value button */}
        <div className={styles.stockValue}>
          <button className={`${globalStyles.stockValueButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>{value}</button>
        </div>
        {/* stock symbol button */}
        <div className={`${styles.stockInfoAccordion} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <Accordion title="Stock Information">
            { description() }
          </Accordion>
        </div>
           {/* buy button */}
        <div className={styles.buyStock}>
          <Link  to={{ 
            pathname: "/stock-viewer", 
            search: `?symbol=${symbol}&description=${des.replace(/\s+/g,'+')}`
            }}  
            className={`${globalStyles.whiteBuyButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
          >
            <img src={cart} alt="cart" />
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
