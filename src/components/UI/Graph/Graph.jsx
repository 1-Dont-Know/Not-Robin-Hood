import React from "react";
import styles from "./Graph.module.scss";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// Graph component
const Graph = ({ chartData }) => {
  return (
    <div className={styles.container}>
      <Line data={chartData} />
    </div>
  );
};

export default Graph;
