import React from "react";
import styles from "./Filter.module.scss";
import globalStyles from "../../../styles/main.module.scss";
// import ToolIcon from "../../../assets/icons/tools-icon.svg";
import Settings from "../Settings/Settings";
import TimeBar from "../TimeBar/TimeBar";
import tools from "../../../assets/icons/settings.svg";

const Filter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <button className={globalStyles.toolsButton}>
          <img src={tools} alt="Tools" />
          <p>Tools</p>
        </button>
      </div>
      <div className={styles.timeBar}>
        <TimeBar />
      </div>
      <div className={styles.settings}>
        <Settings />
      </div>
      {/* Common Filter Coontainer */}
      <div className={styles.commonFilter}>Hello, Darshwak!</div>
    </div>
  );
};

export default Filter;
