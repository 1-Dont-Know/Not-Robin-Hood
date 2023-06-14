import React, { useState, useEffect } from "react";
import styles from "./SidebarNav.module.scss";
import overview from "../../../assets/icons/overview.svg";
import markets from "../../../assets/icons/markets.svg";
import transactions from "../../../assets/icons/transactions.svg";
import settings from "../../../assets/icons/settings.svg";
import logout from "../../../assets/icons/logout.svg";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/slices/auth/authSlice";
import { useLogoutUserMutation } from "../../../redux/slices/user/userApiSlice";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const SidebarNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser, { data }] = useLogoutUserMutation();

  const logOutHandler = () => {
    dispatch(logOut());
    logoutUser();
    navigate("/login");
    toast.success("You've succesfully logout!");
  };
  
  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  // End Dark Mode Theme

  
  return (
    <nav>
      {/* //! GENERAL LIST */}
      <ul className={styles.generalList}>
        <h2 className={`${styles.sectionTitle} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          General
          <span>
            <hr className={`${styles.divider} ${darkModeTheme ? styles["dark-mode"] : ""}`} />
          </span>
        </h2>
        <NavLink to="/account">
          {({ isActive }) => (
            //<li className={isActive ? styles.active : styles.listItem}>
            <li
            className={`${isActive ? styles.active : styles.listItem} 
            ${darkModeTheme ? styles["dark-mode"] : ""}`}
            >
              <img src={overview} alt="overview" className={`${darkModeTheme ? styles["dark-mode-img"] : ""}`} />
              Overview
            </li>
          )}
        </NavLink>
        <NavLink to="/markets">
          {({ isActive }) => (
            <li
            className={`${isActive ? styles.active : styles.listItem} 
            ${darkModeTheme ? styles["dark-mode"] : ""}`}
            >
              <img src={markets} alt="markets" className={`${darkModeTheme ? styles["dark-mode-img"] : ""}`}/>
              Markets
            </li>
          )}
        </NavLink>
        <NavLink to="/stock-transactions">
          {({ isActive }) => (
            <li
            className={`${isActive ? styles.active : styles.listItem} 
            ${darkModeTheme ? styles["dark-mode"] : ""}`}
            >
              <img src={transactions} alt="transactions" className={`${darkModeTheme ? styles["dark-mode-img"] : ""}`}/> Stock Transactions
            </li>
          )}
        </NavLink>
      </ul>
      {/* //! SUPPORT LIST */}
      <ul className={styles.supportList}>
        <h2 className={`${styles.sectionTitle} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          Support
          <span>
            <hr className={`${styles.divider} ${darkModeTheme ? styles["dark-mode"] : ""}`} />
          </span>
        </h2>
        <NavLink to="/settings">
          <li className={`${styles.listItem} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
            <img src={settings} alt="settings" className={`${darkModeTheme ? styles["dark-mode-img"] : ""}`}/>
            Settings
          </li>
        </NavLink>
        <NavLink onClick={logOutHandler} to="/">
          <li className={`${styles.listItem} ${darkModeTheme ? styles["dark-mode"] : ""}`} id="logout">
            <img src={logout} alt="logout" className={`${darkModeTheme ? styles["dark-mode-img"] : ""}`}/>
            Log out
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default SidebarNav;
