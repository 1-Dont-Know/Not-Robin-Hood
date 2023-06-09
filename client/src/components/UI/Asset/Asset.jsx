import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import styles from "./Asset.module.scss";
import assetUp from "../../../assets/icons/asset-up.svg";
import assetDown from "../../../assets/icons/assetsdown.svg";
import { useGetPortfolioStocksQuery } from "../../../redux/slices/user/userApiSlice";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../Loading/Loading";
// Dark Mode
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Asset = () => {
  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  // End Dark Mode Theme

  const currentUser = useSelector(selectCurrentUser);
  const { data: stocksData } = useGetPortfolioStocksQuery(currentUser);

  const assetValue = stocksData
    ?.reduce((acc, curr) => acc + curr.equity, 0)
    .toFixed(2);
  const percentage = 0;
  const condition = "negative";
  if (!stocksData) {
    return <Loading />;
  }
  return (
    <div className={`${styles.container} ${darkModeTheme ? styles['dark-mode'] : ''}`}>
      <h3 className={styles.title}>Asset Value</h3>
      {stocksData ? (
        <>
          <p className={styles.amount}>${assetValue}</p>
          <div
            className={styles.results}
            style={{
              color: condition === "positive" ? "#2ab795" : "#AE2424",
            }}
          >
            {condition === "positive" ? (
              <img src={assetUp} alt="up" />
            ) : (
              <img src={assetDown} alt="down" />
            )}
            $0{`(${percentage})%`}
            <span>Today</span>
          </div>
        </>
      ) : (
        <h2 style={{ textAlign: "center", margin: "2rem" }}>
          Not Available...
        </h2>
      )}
    </div>
  );
};

export default Asset;
