import React from "react";
import styles from "./TopNav.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
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
          <Link to="/portfolio" className={globalStyles.portfolioButton}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#37433a"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 7.5H16.5V4.5C16.5 4.10218 16.342 3.72064 16.0607 3.43934C15.7794 3.15804 15.3978 3 15 3H9C8.60218 3 8.22065 3.15804 7.93934 3.43934C7.65804 3.72064 7.5 4.10218 7.5 4.5V7.5H3C2.60218 7.5 2.22064 7.65804 1.93934 7.93934C1.65804 8.22064 1.5 8.60218 1.5 9V19.5C1.5 19.8978 1.65804 20.2794 1.93934 20.5607C2.22064 20.842 2.60218 21 3 21H21C21.3978 21 21.7794 20.842 22.0607 20.5607C22.342 20.2794 22.5 19.8978 22.5 19.5V9C22.5 8.60218 22.342 8.22064 22.0607 7.93934C21.7794 7.65804 21.3978 7.5 21 7.5ZM9 4.5H15V7.5H9V4.5ZM3 19.5V9H21V19.5H3Z" />
            </svg>
            Portfolio
          </Link>
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
