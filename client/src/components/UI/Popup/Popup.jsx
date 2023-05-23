import React from "react";
import styles from "./Popup.module.scss";

const Popup = ({ name, toggle, children }) => {
  return (
    <div className={styles.container}>
      <div
        className={
          name === "notifications"
            ? styles.popup
            : name === "sellStock"
            ? styles.sellStock
            : styles.popUpFunds
        }
      >
        <button
          onClick={toggle}
          className={
            name === "notifications"
              ? styles.closePopupButton
              : name === "sellStock"
              ? styles.closePopupButtonSellStock
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
