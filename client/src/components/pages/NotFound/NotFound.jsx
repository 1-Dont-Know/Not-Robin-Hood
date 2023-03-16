import React from "react";
import styles from "./NotFound.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import Logo from "../../UI/Logo/Logo";
import { Link } from "react-router-dom";
import backIcon from "../../../assets/icons/back.svg";

const NotFound = () => {
  return (
    <>
      {" "}
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* NAVIGATION SECTION  */}
          <nav className={styles.nav}>
            {/* LOGO SECTION */}
            <Logo />
          </nav>
        </div>
        <div className={styles.box}>
          {/* BULL IMAGE */}
          <div className={styles.image}></div>
          <div className={styles.errorContainer}>
            {/*  404 */}
            <h1 className={styles.title}>404</h1>
            <h3 className={styles.subtitle}>PAGE NOT FOUND</h3>
            <Link to="/" className={globalStyles.backHomeButton}>
              <img src={backIcon} alt="Go Home" />
              Go Back
            </Link>
            <p className={styles.footer}>console-cobras 2023 ⓒ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
