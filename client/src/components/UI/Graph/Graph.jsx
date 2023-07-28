import React, { useEffect } from "react";
import styles from "./Graph.module.scss";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

// Graph component
const Graph = ({ chartData }) => {
  /* Dark Mode Theme*/
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return ` $ ${value.toFixed(2)}`;
          },
        },
      },
      title: {
        display: true,
        // text: "GAINS!",
      },
      legend: {
        display: false,
      },
      //Edit the X+Y Axis Colors
      scales: {
        x: {
          grid: {
            color: darkModeTheme ? "#345345" : "lightgrey",
          },
          ticks: {
            color: darkModeTheme ? "lightgrey" : "black",
          },
        },
        y: {
          grid: {
            color: darkModeTheme ? "#345345" : "lightgrey",
          },
          ticks: {
            color: darkModeTheme ? "lightgrey" : "black",
          }
        }
      },
    },
   };
  
    return (
      <div className={`${styles.container} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        <Line data={chartData} options={options} />
      </div>
    );
  };
  
  export default Graph;
  
  
