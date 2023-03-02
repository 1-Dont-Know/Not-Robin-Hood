import React from "react";
import globalStyles from "../../../styles/main.module.scss";
// import PlusIcon from "../../../assets/icons/plus-icon.svg";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockItem from "../../UI/StockItem/StockItem";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";

const Markets = () => {
  return (
    <>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <Sidebar />
        {/* Nav/Hero Section */}
        <main className={styles.mainSection}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <Hero />

          <div>
            <button className={globalStyles.sortButton}>
              Sort
              <img src={DownVectorIcon} alt="Vector " />
            </button>

            <button className={globalStyles.sortButton}>
              Time
              <img src={DownVectorIcon} alt="Vector " />
            </button>
          </div>

          <div className={styles.stockSection}>
            <StockItem />

            <StockItem />

            <StockItem />

            <StockItem />

            <StockItem />
          </div>

          {/* <Button type="addFunds">
            <img src={PlusIcon} alt="plus icon" />
            Add Funds
          </Button> */}
        </main>
      </div>
    </>
  );
};

export default Markets;
