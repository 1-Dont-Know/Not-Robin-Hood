import React from "react";
import styles from "./TopNav.module.scss";
import Button from "../../UI/Button/Button";
import cart from "../../../assets/icons/shopping-cart.svg";
import portfolioIcon from "../../../assets/icons/portfolio-icon.svg";
import notification from "../../../assets/icons/bell-icon.svg";
import profile from "../../../assets/icons/profile.svg";
import Search from "../Search/Search";

const TopNav = () => {
  return (
    <>
      <div className={styles.container}>
        {/* SEARCH SECTION */}
        <section className={styles.search}>
          {/* Search Component */}
          <Search placeholder="Search for market" />
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
        {/* NOTIFICATIONS / PROFILE SECTION */}
        <section className={styles.profile}>
          <Button type="notification">
            <img src={notification} alt="notification" />
          </Button>
          <Button type="profile">
            <img src={profile} alt="profile" />
          </Button>
        </section>
      </div>
    </>
  );
};

export default TopNav;
