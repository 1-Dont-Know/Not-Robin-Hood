import React, { useState } from "react";
import styles from "./Portfolio.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockList from "../../UI/StockList/StockList";
import globalStyles from "../../../styles/main.module.scss";
import vector from "../../../assets/icons/vector.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {

  const tabFlags = {
    overview: 1,
    stocksList: 2,
  };

  const [activeTab, setActiveTab] = useState(tabFlags.stocksList);

  function handleTabSelect(selectedTab) {

    setActiveTab(curr => {
      return curr = selectedTab;
    });
  }


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

  const stockData = [
    {
      name: "Bay Valley Tech",
      symbol: "BVT",
      shares: "220",
      price: "$2.20",
      avgCost: "$10",
      totalReturn: "$543.00",
      equity: "$543.00",
    },
    {
      name: "Bay Valley Tech",
      symbol: "BVT",
      shares: "220",
      price: "$2.20",
      avgCost: "$10",
      totalReturn: "$543.00",
      equity: "$543.00",
    },
  ];



  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };




  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = 'bolder sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(`Total Portfolio Value: $1200`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <Hero>
        <div className={styles.tabs}>
          <button className={styles.tabButton} onClick={(e) => { handleTabSelect(tabFlags.overview) }}>Overview</button>
          <h1 style={{ color: "gray" }}>|</h1>
          <button className={styles.tabButton} onClick={(e) => { handleTabSelect(tabFlags.stocksList) }}>Stocks List</button>
        </div>


        <div className={styles.tanSquare}>
          {(activeTab === tabFlags.overview) &&
            <>
              <div className={styles.details}>


                <section className={styles.totalPortfolio}>
                  <h1 className={styles.totalPortfolioTitle}>Total Portfolio Value</h1>
                  <h1 className={styles.totalPortfolioValue}>$1200.00</h1>
                </section>

                <section className={styles.stocks}>
                  <h1 className={styles.sectionTitle}>Stocks</h1>
                  <h1 className={styles.sectionPercent}>50%</h1>
                  <h1 className={styles.sectionValue} id={styles.stockValue}>$600</h1>
                </section>

                <div className={styles.line}></div>



                <section className={styles.buyingPower}>
                  <h1 className={styles.sectionTitle}>Buying Power</h1>
                  <h1 className={styles.sectionPercent}>50%</h1>
                  <h1 className={styles.sectionValue} id={styles.buyingPowerValue}>$600</h1>
                </section>

                <div className={styles.line}></div>

              </div>

              <div className={styles.doughnutGraph}>
                <Doughnut
                  data={data}
                  options={options}
                // plugins={[textCenter]}
                ></Doughnut>
              </div>

            </>}

          {(activeTab === tabFlags.stocksList) &&
            <>
              <section className={styles.transactions}>
              <StockList
                        key = {"Name"}
                        name = {"Name"}
                        symbol = {"Symbol"}
                        shares = {"Shares"}
                        price = {"Price"}
                        avgCost = {"Average Cost"}
                        totalReturn = {"Total Return"}
                        equity = {"Equity"}

                        className={styles.titleBar}
              />
                <ul className={styles.transactionsList}>
                  {stockData.map((item) => {
                    return (
                      <></>
                    );
                  })}
                </ul>
              </section>
            </>}

        </div>
      </Hero>
    </>
  );
};

export default Portfolio;






