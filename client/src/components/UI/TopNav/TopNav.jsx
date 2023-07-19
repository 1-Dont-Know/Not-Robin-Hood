import React, { useEffect, useState } from "react";
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
import {
  useGetUserByIdQuery,
  useGetNotificationsQuery,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';
import Loading from "../Loading/Loading";

const TopNav = () => {
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFundsPopup, setShowFundsPopup] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  //* Getting User's Name

  const { data: user, isLoading, isSuccess } = useGetUserByIdQuery(currentUser);
  const { data: notifications } = useGetNotificationsQuery(currentUser);

  const username = isLoading ? <Loading /> : user.map((item) => item.name);

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
          <Search placeholder="Search Market" />
        </section>
        {/* BUY / PORTFOLIO BUTTON SECTION */}
        <section className={styles.cta}>
          <Link to="/markets" className={`${globalStyles.buyButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
            <img src={cart} alt="cart" />
            Buy
          </Link>
          <Link to="/portfolio" className={`${globalStyles.portfolioButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
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
                className={`${globalStyles.notificationButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
                id="notifications"
              >
                <img src={notification} alt="notification" />
                <span className={`${styles.notifications} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                  {notifications?.length}
                </span>
              </button>
              <button
                onClick={profileHandler}
                className={`${globalStyles.profileButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
                id="profile"
              >
                <img src={profile} alt="profile" />
              </button>
            </>
          )}
          {showProfile && (
            <div onClick={profileHandler} className={`${styles.profileMenu} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
              <div className={styles.info}>
                <h4>{isLoading ? <Loading /> : username}</h4>
                <img src={profile} alt="profile" />
              </div>
              <div className={styles.profileCta}>
                <button className={`${globalStyles.shareButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
                  <img src={ShareIcon} alt="Share" />
                  Share Profile
                </button>
                <button
                  onClick={addFundsHandler}
                  className={`${globalStyles.AddFundsProfileButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
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
          <NotificationPopUp
            name={isLoading ? <Loading /> : username}
            notifications={notifications?.length}
            data={notifications}
          />
        </Popup>
      )}
      {showFundsPopup && (
        <Popup name="addfunds" toggle={popUpHandler}>
          <AddFunds toggle={popUpHandler} />
        </Popup>
      )}
    </>
  );
};

export default TopNav;
