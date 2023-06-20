import React, { useEffect } from "react";
import styles from "./TimeBar.module.scss";
import globalStyles from "../../../styles/main.module.scss";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';


const TimeBar = () => {
  const range = ["1d", "5d", "2w", "1m", "6m", "1y", "5y", "7y", "Max"];

        {/* Dark Mode Theme*/}
        const darkModeTheme = useSelector(selectDarkMode);
        // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
        useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
        {/* End Dark Mode Theme*/}
  return (
    <>
      <div className={`${styles.timeBar} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        {range.map((item) => {
          return (
            <button key={item} className={`${globalStyles.timeBarButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TimeBar;
