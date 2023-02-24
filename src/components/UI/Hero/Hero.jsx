import React, { useState } from "react";
import styles from "./Hero.module.scss";
import FeaturedStock from "../FeaturedStock/FeaturedStock";
import Graph from "../Graph/Graph";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing

const Hero = () => {
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
    <section className={styles.container}>
      <div className={styles.featured}>
        <FeaturedStock status="up" />
        <FeaturedStock status="down" />
        <FeaturedStock status="up" />
        <FeaturedStock status="up" />
      </div>

      {/* Graph Component */}
      <div className={styles.graph}>
        <Graph chartData={stockData} />
      </div>
    </section>
  );
};

export default Hero;
