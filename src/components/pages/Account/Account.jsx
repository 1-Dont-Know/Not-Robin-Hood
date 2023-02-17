import React from "react";

import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import Button from "../../UI/Button/Button";
import cart from "../../../assets/icons/shopping-cart.svg";
import portfolioIcon from "../../../assets/icons/portfolio-icon.svg";
import styles from "./Account.module.scss";

const Account = () => {
  return (
    <>
      Account page
      <Button type="buy">
        <img src={cart} alt="cart" />
        Buy
      </Button>
      <Button type="portfolio">
        <img src={portfolioIcon} alt="cart" />
        Portfolio
      </Button>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <section className="sidebar"></section>
        <Sidebar />

        {/* Nav/Hero Section */}
        <section className={styles.hero}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <div style={{ backgroundColor: "green" }}>HERO SECTION</div>
        </section>
      </div>
    </>
  );
};

export default Account;
