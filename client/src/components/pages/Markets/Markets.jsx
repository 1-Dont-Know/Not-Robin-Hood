import React, { useState, useEffect } from "react";
import globalStyles from "../../../styles/main.module.scss";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockItem from "../../UI/StockItem/StockItem";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { stockData } from "../../../utils/fakeData";
// import axios from "axios"
import { useGetPriceQuery, useGetCompaniesQuery } from "../../../redux/slices/apiSlice";

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

  // ---------------------------------------------------------------------

  const { data, isLoading, isError, isSuccess } = useGetCompaniesQuery();

  const output = data && data.map(item => item).filter(stock => stock.type === "Common Stock");
  console.log(output)

  const getStockData = () => {
    const sortedData = output.slice().sort((a, b) => {
      return a.displaySymbol.localeCompare(b.displaySymbol);
    });

    // Rearrange the data to match the desired sort order
    if (sortOrder === "asc") {
      return sortedData;
    } else {
      return sortedData.reverse();
    }
  };



  // const [companyList, setCompanyList] = useState();
  // const { data, isLoading } = useGetCompaniesQuery();
  //   useEffect(() => {
  //       // const test = "";
  //       let companies;
  //       if (isLoading) {
  //       } else { 
  //           // console.log(data);
  //           companies = data.result;
  //           setCompanyList(companies)
  //       };
  //   }, []);
  
  
  // const { data, isLoading } = useGetCompaniesQuery();
  //   // const test = "";
  // let companies;
  // if (isLoading) {
  // } else {
  //     console.log(data);
  //     companies = data.result;
  // };

  // const GetThisPrice = (thisSymbol) => {
  //   let test = JSON.stringify(thisSymbol);
  //   const { data: price, isLoading: priceLoder } = useGetPriceQuery("AAPL");
  //   // console.log("this symbol is ", thisSymbol)
  //   let stockPrice;
  //   if (priceLoder) {
  //   } else {
  //       stockPrice = price.c;
  //       // console.log("price is ", stockPrice)
  //   } 
  //   return stockPrice;
  // }

  // ---------------------------------------------------------------------

  // This function gets the stock data and sorts it in alphabetical order based on the stock symbol
  // const getStockData = () => {
  //   const sortedData = stockData.slice().sort((a, b) => {
  //     return a.symbol.localeCompare(b.symbol);
  //   });

  //   // Rearrange the data to match the desired sort order
  //   if (sortOrder === "asc") {
  //     return sortedData;
  //   } else {
  //     return sortedData.reverse();
  //   }
  // };

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
            <span className={styles.buttonText}>{buttonText}</span>
            <img
              src={DownVectorIcon}
              alt="Vector"
              className={sortedStocks ? styles.rotated : ""}
            />
          </button>
        </section>

        {/* STOCKS SECTIONS */}
        {/* <section > */}
          {/* Call the getStockData function to sort the stockData array.
          Slice the sorted stockData array to display only the first numStocks stocks.
          Create a StockItem component for each stock and pass the symbol and value props */}
          
          {/* {getStockData()
            .slice(0, numStocks)
            .map((stock) => (
              <StockItem
                key={stock.symbol}
                symbol={stock.symbol}
                value={stock.value}
              />
            ))} */}
          
          {isLoading && <h2> ...Loading... </h2>}
          {isError && <h2>ERROR!!!</h2>}
          {isSuccess && (
            <div className={styles.stocksSection}>
                {getStockData().slice(0,100).map((item,idx) => (
                    <StockItem
                      key = {item.displaySymbol}
                      symbol = {item.displaySymbol}
                      value = {item.currency}
                      des = {item.description}
                    />
                ))}
            </div>
          )}


        {/* </section> */}
      </Hero>
    </> 
  );
};

export default Markets;
