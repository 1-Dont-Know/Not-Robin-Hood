import React, { useState, useEffect } from "react";
import styles from "./StockViewer.module.scss";
import BuyBox from "../../UI/BuyBox/BuyBox";
import Filter from "../../UI/Filter/Filter";
import { useLocation } from "react-router-dom";
import { useGetPriceQuery } from "../../../redux/slices/api/finnhubApiSlice";
import Hero from "../../UI/Hero/Hero";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const StockViewer = () => {
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]); // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const symbol = searchParams.get("symbol");
  const description = searchParams.get("description");

  const iframeSrc = `https://widget.finnhub.io/widgets/stocks/chart?symbol=${symbol}&watermarkColor=%231db954&backgroundColor=
  ${darkModeTheme ? '%23111111' : '%23FBF2EA'}&textColor=${darkModeTheme ? 'white' : 'black'}`;
  
  const { data: priceData, isLoading: priceLoading } = useGetPriceQuery(symbol);

  const getPriceStock = (symbol) => {
    if(priceLoading){}
    else{ 
      if(symbol === 'c'){
        return priceData.c.toFixed(2) //Current Price as a string
      }
      if(symbol === 'd'){
        return priceData.d.toFixed(2) //Price Change as a string
      }
      if(symbol === 'dp'){
        return priceData.dp.toFixed(2) //Price Change Percentage as a string
      } 
      console.log(priceData);
    }
  }

  return (
    <>
      <Hero>
        <div className={styles.stockNameWrapper}>
          <h1 className={`${styles.stockName} ${darkModeTheme ? styles["dark-mode"] : ""}`}>{description} ({symbol})</h1>
          <p className={`${styles.stockPrice} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
            ${getPriceStock('c')}
            <span className={styles.growth}
              style={{color: priceData && priceData.d  < 0 ? 'red' : '#2ab795'}}>${getPriceStock('d')}({getPriceStock('dp')}%)
            </span>
          </p>
        </div>
        {/* <AddFunds></AddFunds> */}
        <div className={styles.preview}>
          {/* //! GRAPH SECTION */}
          <section className={styles.graph}>
            <iframe 
              src={iframeSrc}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no"
            />
          </section>
          <section className={styles.buybox}>
            <BuyBox symbol = {symbol} price={getPriceStock('c')} name = {description} />
          </section>
        </div>
        {/* //! FILTER SECTION */}
        <section className={styles.filter}>
          <Filter />
        </section>
      </Hero>
      {/* </main> */}
      {/* </div> */}
    </>
  );
};

export default StockViewer;
