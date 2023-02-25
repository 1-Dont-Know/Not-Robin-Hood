import React from "react";
import styles from "./Filter.module.scss";
import Button from "../Button/Button";
import ToolIcon from "../../../assets/icons/tools-icon.svg";
import Settings from "../Settings/Settings";
import TimeBar from "../TimeBar/TimeBar";

const Filter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <Button type="tools">
          <img src={ToolIcon} alt="Tool Icon" />
          Tools
        </Button>
      </div>
      <div className={styles.timeBar}>
        <TimeBar />
      </div>
      <div className={styles.settings}>
        <Settings />
      </div>
    </div>
  );
};

export default Filter;
