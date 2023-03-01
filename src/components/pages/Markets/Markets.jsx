import React from "react";
import Button from "../../UI/Button/Button";
// import PlusIcon from "../../../assets/icons/plus-icon.svg";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";
import Stock from "../../UI/Stock/StockMarket"
import DownVectorIcon from "../../../assets/icons/down-vector.svg"

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

                
        <div >
          <Button type="sort">
            Sort
            <img src={DownVectorIcon} alt="Vector "/>
          </Button>

          <Button type="sort">
            Time
            <img src={DownVectorIcon} alt="Vector "/>
          </Button>
        </div>

        <div className={styles.stockSection}>  
          <Stock />

          <Stock />

          <Stock />

          <Stock />

          <Stock />
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
