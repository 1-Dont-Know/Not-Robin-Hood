import React, { useEffect } from "react";
import styles from "./Filter.module.scss";
import globalStyles from "../../../styles/main.module.scss";
// import ToolIcon from "../../../assets/icons/tools-icon.svg";
import Settings from "../Settings/Settings";
import TimeBar from "../TimeBar/TimeBar";
import tools from "../../../assets/icons/settings.svg";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import SquareIcon from "../../../assets/icons/square-icon.svg";
import SettingIcon from "../../../assets/icons/settings.svg";
import TimeIcon from "../../../assets/icons/timer.svg";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Filter = () => {
  const range = ["1d", "5d", "2w", "1m", "6m", "1y", "5y", "7y", "Max"];
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}
    
  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <button className={`${globalStyles.toolsButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
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
      <div className={styles.commonFilter}>
        <div className={styles.commonFilterTools}>
          <img src={tools} alt="Tools" />
        </div>
        <div className={styles.commonFilterRange}>
          {range.map((item) => {
            return (
              <button key={item} className={globalStyles.timeBarButton}>
                {item}
              </button>
            );
          })}
        </div>
        <div className={styles.timeRange}>
          <img src={TimeIcon} alt="Time Range" />
        </div>
        <div className={styles.commonFilterSettings}>
          <img src={CameraIcon} alt="Screenshot" />
          <img src={SettingIcon} alt="Settings" />
          <img src={SquareIcon} alt="Fullscreen" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
