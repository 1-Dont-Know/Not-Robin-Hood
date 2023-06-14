import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Logo = ({ children }) => {

  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  // End Dark Mode Theme

  return (
    <>
      <Link to="/" className={`${styles.logo} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
        <h1>HobinRood</h1>
        <h2>.</h2>
      </Link>
    </>
  );
};

export default Logo;
