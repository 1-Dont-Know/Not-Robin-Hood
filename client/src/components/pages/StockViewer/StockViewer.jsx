import React, { useState } from "react";
import styles from "./StockViewer.module.scss";
import people from "../../../assets/icons/people-icon.svg";
import creditCard from "../../../assets/icons/credit-card-icon.svg";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";
import BuyBox from "../../UI/BuyBox/BuyBox";
import Filter from "../../UI/Filter/Filter";

// import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";

const AppFundsPopup = () => {
  const stockPrice = "59.71";
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
          <h1 className={styles.stockName}>BINANCE (BNB-USD)</h1>
          <p className={styles.stockPrice}>
            ${stockPrice}
            <span className={styles.growth}>$51.29(4.78%)</span>
          </p>
        </div>
        {/* <AddFunds></AddFunds> */}
        <div className={styles.preview}>
          {/* //! GRAPH SECTION */}
          <section className={styles.graph}>
            <Graph chartData={stockData} />
          </section>
          <section className={styles.buybox}>
            <BuyBox price={stockPrice} />
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

export default AppFundsPopup;
