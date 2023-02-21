import React from "react";
import styles from "./TopNav.module.scss";
import Button from "../../UI/Button/Button";
import cart from "../../../assets/icons/shopping-cart.svg";
import portfolioIcon from "../../../assets/icons/portfolio-icon.svg";
import Profile from "../Profile/Profile";

const TopNav = () => {
  return (
    <>
      <div className={styles.container}>
        {/* SEARCH SECTION */}
        <section className={styles.search}>
          {/* Search Component */}
          <input type="text" placeholder="search" />
        </section>
        {/* BUY / PORTFOLIO BUTTON SECTION */}
        <section className={styles.cta}>
          <Button type="buy">
            <img src={cart} alt="cart" />
            Buy
          </Button>
          <Button type="portfolio">
            <img src={portfolioIcon} alt="cart" />
            Portfolio
          </Button>
        </section>
        {/* PROFILE SECTION */}
        <section className={styles.profile}>
          <Profile />
        </section>
      </div>
    </>
  );
};

export default TopNav;
