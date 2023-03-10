import React, { useState, useEffect } from "react";
import globalStyles from "../../../styles/main.module.scss";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockItem from "../../UI/StockItem/StockItem";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { stockData } from "../../../utils/fakeData";

const Markets = () => {
  // declares a new state variable setSortedStocks and initializes it with the value false
  const [sortedStocks, setSortedStocks] = useState(false);
  // declares a new state variable sortOrder and initializes it with the value "asc".
  // Also declares a setter function setSortOrder that will be used to update the sortOrder state variable
  const [sortOrder, setSortOrder] = useState("asc");
  const [buttonText, setButtonText] = useState(
    sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"
  );
  // This variable will display only 5 stockItem on the screen
  const numStocks = 5;

  //This function toggles the sort order when the user clicks the Sort button
  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortedStocks((prevState) => !prevState);
  };

  useEffect(() => {
    // Set the button text to the new value with a 300ms delay
    setTimeout(() => {
      setButtonText(sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A");
    }, 200);
  }, [sortOrder]);

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
      {/* Hero Section */}
      <Hero>
        {/* SORT SECTION */}
        <section className={styles.sortSection}>
          {/* Create a button to trigger toggleSort function when clicked */}
          <button className={globalStyles.sortButton} onClick={toggleSort}>
            {/* Change button text depending on the sortOrder state */}
            {/* {sortOrder === "asc" ? "Sort A-Z" : "Sort Z-A"} */}
            <span className={styles.buttonText}>
              {buttonText}
            </span>
            <img 
              src={DownVectorIcon} 
              alt="Vector" 
              className={sortedStocks ? styles.rotated : ""}
            />
          </button>
        </section>

        {/* STOCKS SECTIONS */}
        <section className={styles.stocksSection}>
          {/* Call the getStockData function to sort the stockData array.
          Slice the sorted stockData array to display only the first numStocks stocks.
          Create a StockItem component for each stock and pass the symbol and value props */}
          {getStockData()
            .slice(0, numStocks)
            .map((stock) => (
              <StockItem
                key={stock.symbol}
                symbol={stock.symbol}
                value={stock.value}
              />
            ))}
        </section>
      </Hero>
    </>
  );
};

export default Markets;
