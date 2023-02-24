import React, { useState } from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";
import FeaturedStock from "../../UI/FeaturedStock/FeaturedStock";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";

const Account = () => {
  //State Hook for Graph Component
  const [stockData, setStockData] = useState({
    labels: fakeData.map((data) => data.day),
    datasets: [
      {
        label: "Price",
        data: fakeData.map((data) => data.price),
      },
    ],
  });
  return (
    <>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <Sidebar />
        {/* Nav/Hero Section */}
        <section className={styles.heroSection}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <Hero>
            <section className={styles.featured}>
              <FeaturedStock status="up" />
              <FeaturedStock status="down" />
              <FeaturedStock status="up" />
              <FeaturedStock status="up" />
            </section>
            {/* Divider Section */}
            <div className={styles.divider}>
              <hr />
            </div>
            {/* Filter Section */}
            <section className={styles.filter}>FILTER COMPONENT</section>

            {/* Graph Section */}
            <section className={styles.graph}>
              <Graph chartData={stockData} />
            </section>
          </Hero>
        </section>
      </div>
    </>
  );
};

export default Account;
