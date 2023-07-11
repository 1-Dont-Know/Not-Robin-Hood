import React, { useEffect } from "react";
import styles from "./TimeBar.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import { useDispatch } from "react-redux";
import { setGraphFilterRange } from "../../../redux/slices/graphFilterRangeSlice";
import { useSelector } from "react-redux";
import { selectGraphFilterRange } from "../../../redux/slices/graphFilterRangeSlice";
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const TimeBar = () => {
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
    <>
      <div className={`${styles.timeBar} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        {range.map((item) => {
          return (
            /* <button key={item} className={globalStyles.timeBarButton} onClick={() => handleClick(item)}> */
            <button key={item} className={`${globalStyles.timeBarButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`} onClick={() => handleClick(item)}>

              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TimeBar;
