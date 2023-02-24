import React from "react";
import styles from "./StockTransactions.module.scss";
import TopNav from "../../UI/TopNav/TopNav";
import Sidebar from "../../UI/Sidebar/Sidebar";
import Hero from "../../UI/Hero/Hero";

const StockTransactions = () => {
  return (
    <div className={styles.wrapper}>
      {/* Sidebar Section */}
      <Sidebar />
      {/* Nav/Hero Section */}
      <section className={styles.heroSection}>
        {/* Top Navigation */}
        <TopNav />
        {/* Hero Section */}
        <Hero>Transactions</Hero>
      </section>
    </div>
  );
};

export default StockTransactions;
