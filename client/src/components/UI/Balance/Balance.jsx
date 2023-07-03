import React, { useState, useEffect } from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/user/userApiSlice";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../Loading/Loading";
// Dark Mode
import { useSelector } from "react-redux";
import { selectDarkMode } from "./../../../redux/slices/darkModeSlice";

const Balance = () => {
  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {
    localStorage.setItem("darkMode", darkModeTheme);
  }, [darkModeTheme]);
  // End Dark Mode Theme

  const userID = useSelector(selectCurrentUser);

  const { data: balance = 0, isLoading, error } = useGetBalanceQuery(userID);
  
  //Console.log() balance when it changes
  // useEffect(() => {
  //   console.log(balance);
  // }, [balance]);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div
      className={`${styles.container} ${
        darkModeTheme ? styles["dark-mode"] : ""
      }`}
    >
      {isLoading ? <Loading /> : `$${balance}`}
    </div>
  );
};

export default Balance;
