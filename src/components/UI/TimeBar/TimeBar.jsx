import React from "react";
import styles from "./TimeBar.module.scss";
import globalStyles from "../../../styles/main.module.scss";

const TimeBar = () => {
  return (
    <>
      <div className={styles.timeBar}>
        <button className={globalStyles.timeBarButton}>1d</button>
        <button className={globalStyles.timeBarButton}>5d</button>
        <button className={globalStyles.timeBarButton}>2w</button>
        <button className={globalStyles.timeBarButton}>1m</button>
        <button className={globalStyles.timeBarButton}>6m</button>
        <button className={globalStyles.timeBarButton}>1y</button>
        <button className={globalStyles.timeBarButton}>5y</button>
        <button className={globalStyles.timeBarButton}>7y</button>
        <button className={globalStyles.timeBarButton}>Max</button>
      </div>
    </>
  );
};

export default TimeBar;
