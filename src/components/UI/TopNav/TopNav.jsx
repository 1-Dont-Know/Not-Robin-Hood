import React from "react";
import styles from "./TopNav.module.scss";
import globalStyles from "../../../styles/main.module.scss";
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
          <button className={globalStyles.buyButton}>
            <img src={cart} alt="cart" />
            Buy
          </button>
          <button className={globalStyles.portfolioButton}>
            <img src={portfolioIcon} alt="cart" />
            Portfolio
          </button>
        </section>
        {/* NOTIFICATIONS / PROFILE SECTION */}
        <section className={styles.profile}>
          <button className={globalStyles.notificationButton}>
            <img src={notification} alt="notification" />
            <span className={styles.notifications}>3</span>
          </button>
          <button className={globalStyles.profileButton}>
            <img src={profile} alt="profile" />
          </button>
        </section>
      </div>
    </>
  );
};

export default TopNav;
