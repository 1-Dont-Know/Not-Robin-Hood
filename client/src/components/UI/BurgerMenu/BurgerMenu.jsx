import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import {
  useGetNotificationsQuery,
  useGetUserByIdQuery,
} from "../../../redux/slices/user/userApiSlice";
import Loading from "../Loading/Loading";
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const BurgerMenu = ({ showProfile, notificationsHandler, addFundsHandler }) => {
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const { data: user, isLoading, isSuccess } = useGetUserByIdQuery(currentUser);
  const { data: notifications } = useGetNotificationsQuery(currentUser);
  const username = isLoading ? <Loading /> : user.map((item) => item.name);
  const burgerMenuHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <>
      {isOpen ? (
        <div className={`${styles.burgerMenuList} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
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
                className={`${globalStyles.notificationButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
                id="notifications"
              >
                <img src={notification} alt="notification" />
                <span className={`${styles.notifications} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                  {notifications?.length}
                </span>
              </button>
            <div className={styles.info}>
              <h4>{username}</h4>
              <img src={profile} alt="profile" />
            </div>
            <div className={styles.profileCta}>
              <button className={`${globalStyles.shareButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
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
