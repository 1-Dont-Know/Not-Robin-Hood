import React, { useState } from "react";
import styles from "./TopNav.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import notification from "../../../assets/icons/bell-icon.svg";
import profile from "../../../assets/icons/profile.svg";
import Search from "../Search/Search";
import portfolio from "../../../assets/icons/portfolio-icon.svg";

const TopNav = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const popUpHandler = () => {
    setShowNotifications(!showNotifications);
  };
  console.log(showNotifications);
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
          <Link to="/portfolio" className={globalStyles.portfolioButton}>
            <img src={portfolio} alt="Portfolio" />
            Portfolio
          </Link>
        </section>
        {/* NOTIFICATIONS / PROFILE SECTION */}
        <section className={styles.profile}>
          <button
            onClick={popUpHandler}
            className={globalStyles.notificationButton}
          >
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
