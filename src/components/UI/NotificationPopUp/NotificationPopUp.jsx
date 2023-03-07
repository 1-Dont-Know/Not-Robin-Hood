import React from "react";
import styles from "./NotificationPopUp.module.scss";

const NotificationPopUp = ({ name, notifications, children }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.greetingTitle}>{`Hello, ${name}!`}</h1>

      <h3
        className={styles.subTitle}
      >{`You Have (${notifications}) Notifications`}</h3>

      <div className={styles.notificationsWrapper}>
        {/* Notifications List per date */}
        <div className={styles.notificationContainer}>
          <p className={styles.date}>2/27/2023</p>
          <ul className={styles.notificationsList}>
            <li className={styles.notificationListItem}>
              ChatGPT is asking for promotion, after 4 months working 24/7
              without day off.
            </li>
            <li className={styles.notificationListItem}>
              Sam Bankman invited you to attend his seminar, “10 ways how to
              scam people”
            </li>
            <li className={styles.notificationListItem}>
              BNB Stocks went up, don’t sleep, keep trading....
            </li>
          </ul>
        </div>
        <div className={styles.notificationContainer}>
          <p className={styles.date}>1/20/2023</p>
          <ul className={styles.notificationsList}>
            <li className={styles.notificationListItem}>
              Elon Musk sent you a friend request
            </li>
            <li className={styles.notificationListItem}>
              ChatGPT is asking for promotion, after 4 months working 24/7
              without day off.
            </li>
            <li className={styles.notificationListItem}>
              Sam Bankman invited you to attend his seminar, “10 ways how to
              scam people”
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopUp;
