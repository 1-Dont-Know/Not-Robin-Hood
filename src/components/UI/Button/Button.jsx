import React from "react";
import styles from "./Button.module.scss";

// Button component receive a prop with the type of the button, applied className will be based on the prop, types: 'login', 'google, 'default'

const Button = ({ type, children }) => {
  return (
    <button
      className={
        type === "login"
          ? styles.login
          : type === "google"
          ? styles.google
          : type === "buy"
          ? styles.buyButton
          : type === "portfolio"
          ? styles.portfolioButton
          : type === "notification"
          ? styles.notificationButton
          : styles.default
      }
    >
      {children}
    </button>
  );
};

export default Button;
