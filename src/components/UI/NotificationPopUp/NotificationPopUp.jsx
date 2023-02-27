import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotificationPopUp.module.scss";

const NotificationPopUp = ({ children }) => {
  return (
    <>
      <div className={styles.popUp}> 
        <h1 className={styles.greeting}>Hi, __User___ </h1>
        <br></br>
        <h3 className={styles.subTitle}>You Have (__) Notifications</h3>
        <br></br>
        <br></br>

        <p>2/27/2023</p>

        <div className={styles.notification}> This is just test</div>

        <div className={styles.notification}> This is just test</div>
      </div>
    </>
  );
};

export default NotificationPopUp;