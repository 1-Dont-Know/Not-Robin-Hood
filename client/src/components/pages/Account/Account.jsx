import React, { useState, useEffect } from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";
import FeaturedStock from "../../UI/FeaturedStock/FeaturedStock";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";
import Filter from "../../UI/Filter/Filter";
import { useGetPortfolioStocksQuery } from "../../../redux/slices/user/userApiSlice"
import { selectDarkMode } from './../../../redux/slices/darkModeSlice'; //Dark Mode
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../../redux/slices/auth/authSlice";
import { useSelector } from "react-redux";
import {useGetCandleDataQuery} from "../../../redux/slices/api/finnhubApiSlice";

const Account = () => {
  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  // End Dark Mode Theme

  // Currently logged in user from redux store (we are using built-in useSelector hook from redux toolkit)
  const currentUser = useSelector(selectCurrentUser);

  // Get user's stocks data from database
  const { data: stocksData } = useGetPortfolioStocksQuery(currentUser);

  
  //Function to remove duplicate stock names from portfolio and only show unique list of stocks
  //Returns array of objects of all unique stock tickers, name, and number of shares owned by user
  const uniqueStocks = () => {
    if (stocksData) {
      const uniqueStocksArray = [];
      stocksData.forEach(stock => {
        const found = uniqueStocksArray.find(item => item.name === stock.name);
        if (!found) {
          uniqueStocksArray.push({
            name: stock.name,
            symbol: stock.symbol,
            shares: stock.share,
          });
        }
      });
      return uniqueStocksArray;
    }
  };

  //Async function to list all user owned stock symbols in an array
  const stockSymbolArray = async () => {
    const result = await Promise.all(stocksData.map(async (stock) => {
      return stock.symbol;
    }));
    return result;
  };

  //Async function to list number of shares per stock of all user owned stock in an array
  const numSharesArray = async () => {
    const result = await Promise.all(stocksData.map(async (stock) => {
      return stock.share;
    }));
    return result;
  };

  // console.log(stocksData); //View all stocks owned by user
  // console.log(uniqueStocks()); //View list of unique stocks owned by user (removes duplicate names)



  const numDays = 30; //Set number of days for graph range as well as how far back you want historic finnhub data. Doesn't include weekends.
  const [symbols, setSymbols] = useState(); //Array of stock symbols
  const [numShares, setNumShares] = useState(); //Array of number of shares of each stock
  let dates = []; //Array of dates based on numDays variable
  let sumArray = []; //Array of the sum of equity from our portfolio

  //useEffect hook to update symbols and number of shares at startup
  useEffect(() => {
    const fetchSymbolsAndShares = async () => {
      const symbolsResult = await stockSymbolArray();
      const numSharesResult = await numSharesArray();
      setSymbols(symbolsResult);
      setNumShares(numSharesResult);
    };
  
    if (stocksData) {
      fetchSymbolsAndShares();
    }
  }, [stocksData]);

  //Historical data function to get amount of all owned stock from portfolio 
  //and return an array of total closing costs across set number of days
  //For example if 7 days of historical data is wanted, it would return an array
  //of the sum of all closing prices for each day
  const historicalData = async (symbols,numDays) => {
    const results = [];

    for (const symbol of symbols) {
      const response= await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&count=${numDays}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`);
      const data = await response.json();
  
      results.push(data);
    }

    return results;
  }
  
  //Graph Data State for Graph Component
  const [graphData, setGraphData] = useState();

  //Wait unitl symbols and numShares async is done, then grab all historic data
  useEffect(() => {
    if (symbols && numShares) {
      historicalData(symbols, numDays).then((results) => {
        //console.log(`Finnhub API Closing Results`, results);

        //Update the dates array if the user has stocks. We only need the first position because
        //the dates are the same in all the other api requests. Fill sumArray with 0's based on length
        //of closing costs
        if (results.length !== 0){
          dates = convertUnixToReadableDates(results[0].t);
          sumArray = Array.from({ length: results[0].c.length }, () => 0);
          
        }

        //For each of the stocks the user owns, step through each day and sum the (shares owned * daily closing price)
        results.forEach((finnhubResult, stockPosition) => {
          // console.log(finnhubResult.c)
          finnhubResult.c.forEach((value, index) => {
            sumArray[index] += value * numShares[stockPosition];
          });
        });

        // console.log('Sum',sumArray);
        // console.log('Dates', dates);

        // Update graphData state with the dates and sumArray data
        setGraphData({
          labels: dates,
          datasets: [
            {
              label: "$",
              data: sumArray,
            },
          ],
        });

      });
    }
  }, [symbols, numShares]);





  //Function used to convert UNIX Timestamps to readable dates
  function convertUnixToReadableDates(timestamps) {
    const dates = [];
    timestamps.forEach((timestamp) => {
      const date = new Date(timestamp * 1000);
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const formattedDate = `${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}-${year}`;
      dates.push(formattedDate);
  });
  return dates;
  }




  return (
    <>
      <Hero style={{ gap: "1rem" }}>
        {/* //! FEATURED STOCKS */}
        {/* <section className={styles.featured}>
          <FeaturedStock status="up" />
          <FeaturedStock status="down" />
          <FeaturedStock status="up" />
          <FeaturedStock status="up" />
        </section> */}

        <section className={`${styles.featured} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          {stocksData && uniqueStocks().map(data => (
            <FeaturedStock key={data.name} symbol={data.symbol} name={data.name}/>
          ))}
        </section>

        {/* //! FILTER SECTION */}
        <section className={styles.filter}>
          <Filter />
        </section>
        {/* //! GRAPH SECTION */}
        <section className={styles.graph}>
          {graphData && <Graph chartData={graphData}/>} 
        </section>{" "}
      </Hero>
    </>
  );
};

export default Account;
