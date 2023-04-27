import React, { useState, useEffect } from "react";
import styles from "./StockViewer.module.scss";
import BuyBox from "../../UI/BuyBox/BuyBox";
import Filter from "../../UI/Filter/Filter";
import { useLocation } from "react-router-dom";
import { useGetPriceQuery } from "../../../redux/slices/api/finnhubApiSlice";
import Hero from "../../UI/Hero/Hero";

const StockViewer = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const symbol = searchParams.get("symbol");
  const description = searchParams.get("description");

  const { data: priceData, isLoading: priceLoading } = useGetPriceQuery(symbol);

  if(priceLoading){}
  else{}

  const getPriceStock = (symbol) => {
    if(priceLoading){}
    else{ 
      if(symbol === 'c'){
        return priceData.c 
      }
      if(symbol === 'd'){
        return priceData.d 
      }
      if(symbol === 'dp'){
        return priceData.dp 
      } 
    }
  }

  return (
    <>
      <Hero>
        <div className={styles.stockNameWrapper}>
          <h1 className={styles.stockName}>{description} ({symbol})</h1>
          <p className={styles.stockPrice}>
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
              src={`https://widget.finnhub.io/widgets/stocks/chart?symbol=${symbol}&watermarkColor=%231db954&backgroundColor=%23FBF2EA&textColor=black`}
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
