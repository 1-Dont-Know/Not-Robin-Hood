import React from "react";
import styles from "./TimeBar.module.scss";
import globalStyles from "../../../styles/main.module.scss";

const TimeBar = () => {
  return (
    <>
      <div className={styles.timeBar}>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>1d</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>5d</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>2w</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>1m</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>6m</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>1y</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>5y</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>7y</div>
        </button>
        <button className={globalStyles.timeBarButton}>
          <div className={styles.timeBarButton}>MAX</div>
        </button>
      </div>
    </>
  );
};

export default TimeBar;
