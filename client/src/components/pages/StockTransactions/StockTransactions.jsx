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
  const data = [
    {
      name: "BNB-USD",
      price: "$35",
      info: "Very expensive stock",
    },
    {
      name: "Potrero",
      price: "$23",
      info: "Old stock",
    },
    {
      name: "Doge",
      price: "$35",
      info: "Grandma's stock",
    },
    {
      name: "P&G",
      price: "$35",
      info: "Very expensive stock",
    },
    {
      name: "Alameda",
      price: "$300",
      info: "Very cheap stock",
    },
    {
      name: "BayBridge",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge2",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge3",
      price: "$349",
      info: "Interesting stock",
    },
    {
      name: "BayBridge4",
      price: "$349",
      info: "Interesting stock",
    },
  ];

  const { data: transactions } = useGetStockTransactionsQuery(currentUser);
  return (
    <>
      <Hero>
        <section className={styles.titleSection}>
          <h4 className={styles.title}>Recent Transactions</h4>
        </section>
        <section className={styles.transactions}>
          <ul className={styles.transactionsList}>
            {transactions?.map((item) => {
              return (
                <Stock
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  info={item.description}
                />
              );
            })}
          </ul>
        </section>
        <section className={styles.filter}>
          <Filter />
        </section>
      </Hero>
    </>
  );
};

export default StockTransactions;
