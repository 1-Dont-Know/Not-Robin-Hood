import React from "react";
import styles from "./StockTransactions.module.scss";
import TopNav from "../../UI/TopNav/TopNav";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Hero from "../../UI/Hero/Hero";
import Filter from "../../UI/Filter/Filter";
import Stock from "../../UI/Stock/Stock";
import { useGetStockTransactionsQuery } from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";

const StockTransactions = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { data: transactions } = useGetStockTransactionsQuery(currentUser);

  return (
    <>
      <Hero>
        <section className={styles.titleSection}>
          <h4 className={styles.title}>Recent Transactions</h4>
        </section>
        <section className={styles.transactions}>
          <ul
            className={styles.transactionsList}
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
