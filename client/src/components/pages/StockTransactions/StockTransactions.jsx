import React, { useEffect } from "react";
import styles from "./StockTransactions.module.scss";
import TopNav from "../../UI/TopNav/TopNav";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Hero from "../../UI/Hero/Hero";
import Filter from "../../UI/Filter/Filter";
import Stock from "../../UI/Stock/Stock";
import { useGetStockTransactionsQuery } from "../../../redux/slices/user/userApiSlice";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";

const StockTransactions = () => {
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

  const currentUser = useSelector(selectCurrentUser);

  const { data: transactions } = useGetStockTransactionsQuery(currentUser);

  return (
    <>
      <Hero>
        <section className={styles.titleSection}>
          <h4 className={`${styles.title} ${darkModeTheme ? styles["dark-mode"] : ""}`}>Recent Transactions</h4>
        </section>
        <section className={`${styles.transactions} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <ul
            className={`${styles.transactionsList} ${darkModeTheme ? styles["dark-mode"] : ""}`}
            style={{ justifyContent: transactions?.length < 1 ? "center" : "" }}
          >
            {transactions?.length < 1 ? (
              <p className={styles.empty}>No transactions found</p>
            ) : (
              transactions?.map((item) => {
                return (
                  <Stock
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    info={item.description}
                    date={item.date}
                  />
                );
              }).reverse()
            )}
          </ul>
        </section>
      </Hero>
    </>
  );
};

export default StockTransactions;
