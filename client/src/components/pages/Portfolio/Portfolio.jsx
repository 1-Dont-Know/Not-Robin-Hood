import React, { useState } from "react";
import styles from "./Portfolio.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockList from "../../UI/StockList/StockList";
import globalStyles from "../../../styles/main.module.scss";
import vector from "../../../assets/icons/vector.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  useGetPortfolioStocksQuery,
  useUpdatePortfolioStocksMutation,
} from "../../../redux/slices/user/userApiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const tabFlags = {
    overview: 1,
    stocksList: 2,
  };

  const { data: stocksData } = useGetPortfolioStocksQuery();

  const [updateStocks, { isLoading }] = useUpdatePortfolioStocksMutation();

  const [activeTab, setActiveTab] = useState(tabFlags.overview);

  function handleTabSelect(selectedTab) {
    setActiveTab((curr) => {
      return (curr = selectedTab);
    });
  }

  const fetchStocks = (e) => {
    e.preventDefault();
    updateStocks();
  };

  //Fake data for pie chart
  const data = {
    labels: [],
    datasets: [
      {
        label: "Portfolio Value",
        data: [50, 50],
        backgroundColor: ["#2AB795", "#C18E60"],
        borderColor: ["#2AB795", "#C18E60"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `Total Portfolio Value: $1200`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <>
      {/* Hero Section */}
      <Hero>
        <div className={styles.tabs}>
          <button
            className={styles.tabButton}
            onClick={(e) => {
              handleTabSelect(tabFlags.overview);
            }}
            style={{
              backgroundColor:
                activeTab === tabFlags.overview ? "#37433a" : "#d5e3e1",

              color: activeTab === tabFlags.overview ? "#d5e3e1" : "#37433a",
            }}
          >
            Overview
          </button>

          <h1 style={{ color: "gray" }}>|</h1>
          <button
            className={styles.tabButton}
            onClick={(e) => {
              handleTabSelect(tabFlags.stocksList);
            }}
            style={{
              backgroundColor:
                activeTab === tabFlags.stocksList ? "#37433a" : "#d5e3e1",

              color: activeTab === tabFlags.stocksList ? "#d5e3e1" : "#37433a",
            }}
          >
            Stocks List
          </button>
        </div>

        <div className={styles.tanSquare}>
          {activeTab === tabFlags.overview && (
            <>
              <div className={styles.details}>
                <section className={styles.totalPortfolio}>
                  <h1 className={styles.totalPortfolioTitle}>
                    Total Portfolio Value
                  </h1>
                  <h1 className={styles.totalPortfolioValue}>$1200.00</h1>
                </section>

                <section className={styles.stocks}>
                  <h1 className={styles.sectionTitle}>Stocks</h1>
                  <h1 className={styles.sectionPercent}>50%</h1>
                  <h1 className={styles.sectionValue} id={styles.stockValue}>
                    $600
                  </h1>
                </section>

                <hr className={styles.overviewLine} />

                <section className={styles.buyingPower}>
                  <h1 className={styles.sectionTitle}>Buying Power</h1>
                  <h1 className={styles.sectionPercent}>50%</h1>
                  <h1
                    className={styles.sectionValue}
                    id={styles.buyingPowerValue}
                  >
                    $600
                  </h1>
                </section>

                <hr className={styles.overviewLine} />
              </div>

              <div className={styles.doughnutGraph}>
                <Doughnut
                  data={data}
                  options={options}
                  // plugins={[textCenter]}
                ></Doughnut>
              </div>
            </>
          )}

          {activeTab === tabFlags.stocksList && (
            <div style={{ width: "100%" }}>
              <section className={styles.transactions}>
                <div className={styles.stocksTitleBar}>
                  <h1 className={styles.title}>Name</h1>
                  <h1 className={styles.title}>Symbol</h1>
                  <h1 className={styles.title}>Shares</h1>
                  <h1 className={styles.title}>Price</h1>
                  <h1 className={styles.title}>Average Cost</h1>
                  <h1 className={styles.title}>Total Return</h1>
                  <h1 className={styles.title}>Equity</h1>
                </div>

                <hr className={styles.stocksLine} />

                <ul className={styles.transactionsList}>
                  {/* {stockData.map((item) => {
                    return (
                      <StockList
                        key={item.name}
                        name={item.name}
                        symbol={item.symbol}
                        shares={item.shares}
                        price={item.price}
                        avgCost={item.avgCost}
                        totalReturn={item.totalReturn}
                        equity={item.equity}
                      />
                    );
                  })} */}
                  {stocksData
                    ? stocksData.map((item) => {
                        return (
                          <StockList
                            key={item.id}
                            name={item.name}
                            symbol={item.symbol}
                            shares={item.amount}
                            price={item.price}
                            avgCost={item.averageCost}
                            totalReturn={item.totalReturn}
                            equity={item.equity}
                          />
                        );
                      })
                    : "No stocks purchased, go ahead and buy some"}
                  <button onClick={fetchStocks}>Add Stock</button>
                </ul>
              </section>
            </div>
          )}
        </div>
      </Hero>
    </>
  );
};

export default Portfolio;
