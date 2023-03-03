import React from "react";
import globalStyles from "../../../styles/main.module.scss";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockItem from "../../UI/StockItem/StockItem";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";

const Markets = () => {
  /*declare a constant variable and set value to 5*/
   const numStocks = 5;

  return (
    <>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <Sidebar />
        {/* Nav/Hero Section */}
        <main className={styles.mainSection}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <Hero />

          <div>
            <button className={globalStyles.sortButton}>
              Sort
              <img src={DownVectorIcon} alt="Vector " />
            </button>

            <button className={globalStyles.sortButton}>
              Time
              <img src={DownVectorIcon} alt="Vector " />
            </button>
          </div>

          {/* created array with numStocks,
          each StockItem have unique key base on index of array.
          Then display numStock value.*/}
          <div className={styles.stockSection}>
            {Array.from({ length: numStocks }, (_, index) => (
              <StockItem key={index} />
            ))}
          </div>

        </main>
      </div>
    </>
  );
};

export default Markets;
