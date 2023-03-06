import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Portfolio.module.scss";
import Hero from "../../UI/Hero/Hero";
import globalStyles from "../../../styles/main.module.scss";
import vector from "../../../assets/icons/vector.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {

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
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <Sidebar />
        {/* Nav/Hero Section */}
        <main className={styles.mainSection}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <Hero>
            <div className={styles.tabs}>
            
            </div>


            <div className={styles.tanSquare}>
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

                <div className = {styles.line}></div>



                <section className={styles.buyingPower}>
                  <h1 className={styles.sectionTitle}>Buying Power</h1>
                  <h1 className={styles.sectionPercent}>50%</h1>
                  <h1 className={styles.sectionValue} id={styles.buyingPowerValue}>$600</h1>
                </section>

                <div className = {styles.line}></div>

              </div>

              <div className={styles.doughnutGraph}>
                <Doughnut
                  data={data}
                  options={options}
                  plugins={[textCenter]}
                ></Doughnut>
              </div>
            </div>
          </Hero>
        </main>
      </div>
    </>
  );
};

export default Portfolio;






