import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BurgerMenu.module.scss";
import BurgerIcon from "../../../assets/icons/burger.svg";
import globalStyles from "../../../styles/main.module.scss";
import portfolio from "../../../assets/icons/portfolio-icon.svg";
import cart from "../../../assets/icons/shopping-cart.svg";
import notification from "../../../assets/icons/bell-icon.svg";
import profile from "../../../assets/icons/profile.svg";
import AddIcon from "../../../assets/icons/plus-icon.svg";
import ShareIcon from "../../../assets/icons/share.svg";

const BurgerMenu = ({ showProfile, notificationsHandler, addFundsHandler }) => {
  const [isOpen, setIsOpen] = useState(false);

  const burgerMenuHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <>
      {isOpen ? (
        <div className={styles.burgerMenuList}>
          {/* BUY / PORTFOLIO BUTTON SECTION */}
          <section className={styles.cta}>
            <Link to="/markets" className={globalStyles.buyButton}>
              <img src={cart} alt="cart" />
              Buy
            </Link>
            <Link to="/portfolio" className={globalStyles.portfolioButton}>
              <img src={portfolio} alt="Portfolio" />
              Portfolio
            </Link>
          </section>
          {/* NOTIFICATIONS / PROFILE SECTION */}
          <section className={styles.profile}>
            {" "}
            <button
              onClick={notificationsHandler}
              className={globalStyles.notificationButton}
              id="notifications"
            >
              <img src={notification} alt="notification" />
              <span className={styles.notifications}>6</span>
            </button>
            <div className={styles.info}>
              <h4>Aaron Smith</h4>
              <img src={profile} alt="profile" />
            </div>
            <div className={styles.profileCta}>
              <button className={globalStyles.shareButton}>
                <img src={ShareIcon} alt="Share" />
                Share Profile
              </button>
              <button
                onClick={addFundsHandler}
                className={globalStyles.AddFundsProfileButton}
              >
                <img src={AddIcon} alt="Add" />
                Add Funds
              </button>
            </div>
          </section>
          <button className={styles.closeBtn} onClick={burgerMenuHandler}>
            ✖
          </button>
        </div>
      ) : (
        <Link onClick={burgerMenuHandler} className={styles.wrapper}>
          <img src={BurgerIcon} alt="Menu" />
        </Link>
      )}
    </>
  );
};

export default BurgerMenu;
