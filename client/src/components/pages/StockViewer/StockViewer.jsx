import React, { useState } from "react";
import styles from "./StockViewer.module.scss";
// import people from "../../../assets/icons/people-icon.svg";
// import creditCard from "../../../assets/icons/credit-card-icon.svg";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";
import BuyBox from "../../UI/BuyBox/BuyBox";
import Filter from "../../UI/Filter/Filter";
import { useLocation } from "react-router-dom";
import { useGetPriceQuery } from "../../../redux/slices/apiSlice";
import Hero from "../../UI/Hero/Hero";

const StockViewer = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const symbol = searchParams.get("symbol");
  const description = searchParams.get("description");

  console.log(symbol)
  console.log(description)

  const { data: priceData, isLoading: priceLoading } = useGetPriceQuery(symbol);

  if(priceLoading){}
  else{ console.log(priceData) }

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

  const [stockData, setStockData] = useState({
    labels: fakeData.map((data) => data.day),
    datasets: [
      {
        label: "Price",
        data: fakeData.map((data) => data.price),
      },
    ],
  });

  return (
    <>
      <Hero>
        <div className={styles.stockNameWrapper}>
          <h1 className={styles.stockName}>{description} ({symbol})</h1>
          <p className={styles.stockPrice}>
            ${getPriceStock('c')}
            <span className={styles.growth}>${getPriceStock('d')}({getPriceStock('dp')}%)</span>
          </p>
        </div>
        {/* <AddFunds></AddFunds> */}
        <div className={styles.preview}>
          {/* //! GRAPH SECTION */}
          <section className={styles.graph}>
            <Graph chartData={stockData} />
          </section>
          <section className={styles.buybox}>
            <BuyBox price={getPriceStock('c')} />
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
