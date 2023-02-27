import React from "react";
import Button from "../Button/Button";
import styles from "./TimeBar.module.scss";

const TimeBar = () => {
  return (
    <>
      <div className={styles.timeBar}>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>1d</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>5d</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>2w</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>1m</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>6m</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>1y</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>5y</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>7y</div>
        </Button>
        <Button type="timeBar">
          <div className={styles.timeBarButton}>MAX</div>
        </Button>
      </div>
    </>
  );
};

export default TimeBar;
