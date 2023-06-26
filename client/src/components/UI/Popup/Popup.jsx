import React, { useEffect } from "react";
import styles from "./Popup.module.scss";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Popup = ({ name, toggle, children }) => {
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  
  return (
    <div className={`${styles.container} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
      <div
        className={`${name === "notifications" ? styles.popup :
        name === "sellStock" ? styles.sellStock : styles.popUpFunds}
        ${darkModeTheme ? styles["dark-mode"] : ""}`}
      >
        <button
          onClick={toggle}
          className={
            name === "notifications"
              ? styles.closePopupButton
              : name === "sellStock"
              ? styles.closePopupButtonSellStock
              : styles.closePopupButtonFunds
          }
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
