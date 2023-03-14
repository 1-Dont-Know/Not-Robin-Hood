import React from "react";
import styles from "./TimeBar.module.scss";
import globalStyles from "../../../styles/main.module.scss";

const TimeBar = () => {
  const range = ["1d", "5d", "2w", "1m", "6m", "1y", "5y", "7y", "Max"];
  return (
    <>
      <div className={styles.timeBar}>
        {range.map((item) => {
          return (
            <button key={item} className={globalStyles.timeBarButton}>
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TimeBar;
