import React, { useState } from "react";
import styles from "./Hero.module.scss";

import Graph from "../Graph/Graph";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing

const Hero = ({ children }) => {
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
      <section className={styles.container}>{children}</section>;
      {/* Graph Component */}
      <div className={styles.graph}>
        <Graph chartData={stockData} />
      </div>
    </>
  );
};

export default Hero;
