import React from "react";
import styles from "./Popup.module.scss";

const Popup = ({ name, toggle, children }) => {
  return (
    <div className={styles.container}>
      <div
        className={name === "notifications" ? styles.popup : styles.popUpFunds}
      >
        <button
          onClick={toggle}
          className={
            name === "notifications"
              ? styles.closePopupButton
              : styles.closePopupButtonFunds
          }
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
