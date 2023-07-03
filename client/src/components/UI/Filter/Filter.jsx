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
import { useDispatch } from "react-redux";
import { setGraphFilterRange } from "../../../redux/slices/graphFilterRangeSlice";
import { useSelector } from "react-redux";
import { selectGraphFilterRange } from "../../../redux/slices/graphFilterRangeSlice";
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Filter = () => {
  
   {/* Dark Mode Theme*/}
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  {/* End Dark Mode Theme*/}
  
  const range = ["1D", "1W", "1M", "3M", "6M", "1Y"];

  const dispatch = useDispatch();
  const graphFilterRange = useSelector(selectGraphFilterRange);

  const handleClick = (item) => {
    switch(item) {
      case ("1D"):
        dispatch(setGraphFilterRange(2));
        break;
      case ("1W"):
        dispatch(setGraphFilterRange(10));
        break;
      case ("1M"):
        dispatch(setGraphFilterRange(32));
        break;
      case ("3M"):
        dispatch(setGraphFilterRange(100));
        break;
      case ("6M"):
        dispatch(setGraphFilterRange(200));
        break;
      case ("1Y"):
        dispatch(setGraphFilterRange(366));
        break;
      default:
        dispatch(setGraphFilterRange(31));
    }
  };



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
      <div className={`${styles.commonFilter} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        <div className={`${styles.commonFilterTools} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <img src={tools} alt="Tools" />
        </div>
        <div className={`${styles.commonFilterRange} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          {range.map((item) => {
            return (
              <button key={item} className={globalStyles.timeBarButton} onClick={() => handleClick(item)}>
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
