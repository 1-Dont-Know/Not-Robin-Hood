import React, { useState } from "react";
import globalStyles from "../../../styles/main.module.scss";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockItem from "../../UI/StockItem/StockItem";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { stockData } from "../../UI/StockItem/StockData";

const Markets = () => {
  // declares a new state variable setSortedStocks and initializes it with the value false
  const [setSortedStocks] = useState(false);
  // declares a new state variable sortOrder and initializes it with the value "asc". 
  // Also declares a setter function setSortOrder that will be used to update the sortOrder state variable
  const [sortOrder, setSortOrder] = useState("asc");
  // This variable will display only 5 stockItem on the screen
  const numStocks = 5;

//This function toggles the sort order when the user clicks the Sort button
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedStocks(prevState => !prevState);
  };

// This function gets the stock data and sorts it in alphabetical order based on the stock symbol
const getStockData = () => {
  const sortedData = stockData.slice().sort((a, b) => {
    return a.symbol.localeCompare(b.symbol);
  });

  // Rearrange the data to match the desired sort order
  if (sortOrder === "asc") {
    return sortedData;
  } else {
    return sortedData.reverse();
  }
};

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
            <button className={globalStyles.sortButton} onClick={toggleSort}>
              {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"}
              <img src={DownVectorIcon} alt="Vector" />
            </button>
          </div>

          <div className={styles.stockSection}>
            {getStockData().slice(0, numStocks).map((stock) => (
              <StockItem key={stock.symbol} symbol={stock.symbol} value={stock.value} />
            ))}
          </div>

        </main>
      </div>
    </>
  );
};

export default Markets;