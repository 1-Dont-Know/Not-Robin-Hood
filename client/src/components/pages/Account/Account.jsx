import React, { useState, useEffect } from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";
import FeaturedStock from "../../UI/FeaturedStock/FeaturedStock";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";
import Filter from "../../UI/Filter/Filter";
import { useGetPortfolioStocksQuery } from "../../../redux/slices/user/userApiSlice";
import { selectDarkMode } from "./../../../redux/slices/darkModeSlice"; //Dark Mode
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../../redux/slices/auth/authSlice";
import { useSelector } from "react-redux";

const Account = () => {
  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {
    localStorage.setItem("darkMode", darkModeTheme);
  }, [darkModeTheme]);
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
      stocksData.forEach((stock) => {
        const found = uniqueStocksArray.find(
          (item) => item.name === stock.name
        );
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

  const graphData = useSelector((state) => state.graphData);

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
        <section
          className={`${styles.featured} ${
            darkModeTheme ? styles["dark-mode"] : ""
          }`}
        >
          {stocksData &&
            uniqueStocks().map((data) => (
              <FeaturedStock
                key={data.name}
                symbol={data.symbol}
                name={data.name}
              />
            ))}
        </section>
        {/* //! FILTER SECTION */}
        <section className={styles.filter}>
          <Filter />
        </section>
        {/* //! GRAPH SECTION */}
        <section className={styles.graph}>
          {stocksData && <Graph chartData={graphData} />}
        </section>{" "}
      </Hero>
    </>
  );
};

export default Account;
