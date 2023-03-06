import React from "react";
import styles from "./StockTransactions.module.scss";
import TopNav from "../../UI/TopNav/TopNav";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Hero from "../../UI/Hero/Hero";
import Filter from "../../UI/Filter/Filter";
import Stock from "../../UI/Stock/Stock";

const StockTransactions = () => {
  const data = [
    {
      name: "BNB-USD",
      price: "$35",
      info: "Very expensive stock",
    },
    {
      name: "Potrero",
      price: "$23",
      info: "Old stock",
    },
    {
      name: "Doge",
      price: "$35",
      info: "Grandma's stock",
    },
    {
      name: "P&G",
      price: "$35",
      info: "Very expensive stock",
    },
    {
      name: "Alameda",
      price: "$300",
      info: "Very cheap stock",
    },
    {
      name: "BayBridge",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge2",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge3",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge4",
      price: "$349",
      info: "Interesting stock",
    },
  ];
  return (
    <>
      {/* <div className={styles.wrapper}> */}
      {/* Sidebar Section */}
      {/* <Sidebar /> */}
      {/* Nav/Hero Section */}
      {/* <main className={styles.mainSection}> */}
      {/* Top Navigation */}
      {/* <TopNav /> */}
      {/* Hero Section */}
      <Hero>
        <section className={styles.titleSection}>
          <h4 className={styles.title}>Recent Transactions</h4>
        </section>
        <section className={styles.transactions}>
          <ul className={styles.transactionsList}>
            {data.map((item) => {
              return (
                <Stock
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  info={item.info}
                />
              );
            })}
          </ul>
        </section>
        <section className={styles.filter}>
          <Filter />
        </section>
      </Hero>
      {/* </main> */}
      {/* </div> */}
    </>
  );
};

export default StockTransactions;
