import React, { useState } from "react";
import styles from "./TopNav.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import notification from "../../../assets/icons/bell-icon.svg";
import profile from "../../../assets/icons/profile.svg";
import Search from "../Search/Search";
import portfolio from "../../../assets/icons/portfolio-icon.svg";
import Popup from "../Popup/Popup";
import NotificationPopUp from "../NotificationPopUp/NotificationPopUp";
import AddIcon from "../../../assets/icons/plus-icon.svg";
import ShareIcon from "../../../assets/icons/share.svg";
import AddFunds from "../AddFunds/AddFunds";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const TopNav = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFundsPopup, setShowFundsPopup] = useState(false);

  // PROFILE HANDLER
  const profileHandler = () => {
    setShowProfile((showProfile) => !showProfile);
  };

  //POPUP HANDLER

  const popUpHandler = () => {
    if (!showFundsPopup) {
      notificationsHandler();
    }
    if (!showNotifications) {
      addFundsHandler();
    }
  };

  // NOTIFICATIONS HANDLER

  const notificationsHandler = () => {
    setShowNotifications((showNotifications) => !showNotifications);
  };

  // ADD FUNDS POPUP HANDLER
  const addFundsHandler = () => {
    setShowFundsPopup((showFundsPopup) => !showFundsPopup);
  };

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
          {!showProfile && (
            <>
              {" "}
              <button
                onClick={notificationsHandler}
                className={globalStyles.notificationButton}
                id="notifications"
              >
                <img src={notification} alt="notification" />
                <span className={styles.notifications}>6</span>
              </button>
              <button
                onClick={profileHandler}
                className={globalStyles.profileButton}
                id="profile"
              >
                <img src={profile} alt="profile" />
              </button>
            </>
          )}
          {showProfile && (
            <div onClick={profileHandler} className={styles.profileMenu}>
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
            </div>
          )}
        </section>
        {/* BURGER MENU SECTION */}
        <BurgerMenu
          showProfile={showProfile}
          notificationsHandler={notificationsHandler}
          profileHandler={profileHandler}
          addFundsHandler={addFundsHandler}
        />
      </div>
      {showNotifications && (
        <Popup name="notifications" toggle={popUpHandler}>
          <NotificationPopUp name="Aaron" notifications="6" />
        </Popup>
      )}
      {showFundsPopup && (
        <Popup name="addfunds" toggle={popUpHandler}>
          <AddFunds />
        </Popup>
      )}
    </>
  );
};

export default TopNav;
