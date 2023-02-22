import React from "react";
import styles from "./Asset.module.scss";
import assetUp from "../../../assets/icons/asset-up.svg";

const Asset = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Asset Value</h3>
      <p className={styles.amount}>
        $12,345,67 <span>USD</span>
      </p>
      <div className={styles.results}>
        <img src={assetUp} alt="up" />
        $51.29(4.78%)<span>Today</span>
      </div>
    </div>
  );
};

export default Asset;
