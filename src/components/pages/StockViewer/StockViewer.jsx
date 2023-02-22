import React from "react";
import styles from "./StockViewer.module.scss";
import Button from "../../UI/Button/Button";
import bell from "../../../assets/icons/bell-icon.svg"

const StockViewer = () => {
  return (
    <>
    <Button type="notification"> 
      <img src={bell} alt="bell" />
      <div className={styles.notificationQty}>3</div>
    </Button>
    </>
  );
};

const TimeBar = () => {
  return (
    <>
    <div className={styles.timeBar}>
      <Button type="timeBar"><div className={styles.timeBarButton}>1d</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>5d</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>2w</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>1m</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>6m</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>1y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>5y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>7y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>MAX</div></Button>
    </div>
    </>
  );
};

//export default StockViewer;
export default TimeBar;