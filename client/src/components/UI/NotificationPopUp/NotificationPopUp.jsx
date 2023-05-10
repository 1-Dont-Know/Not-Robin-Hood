import React from "react";
import styles from "./NotificationPopUp.module.scss";

const NotificationPopUp = ({ name, notifications, data }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.greetingTitle}>{`Hello, ${name}!`}</h1>

      <h3
        className={styles.subTitle}
      >{`You Have (${notifications}) Notifications`}</h3>

      <div className={styles.notificationsWrapper}>
        {/* Notifications List per date */}
        {data.map((notification, index) => {
          const dateStr = notification.date;
          const date = new Date(dateStr);
          const month = date.getMonth() + 1; // getMonth() returns a zero-based index, so add 1 to get the correct month number
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${month}/${day}/${year}`;
          return (
            <div key={index} className={styles.notificationContainer}>
              <p className={styles.date}>{formattedDate}</p>
              <ul className={styles.notificationsList}>
                <li className={styles.notificationListItem}>
                  {notification.message}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationPopUp;
