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
          : type === "profile"
          ? styles.profileButton
          : type === "tools"
          ? styles.toolsButton
          : type === "timeBar"
          ? styles.timeBarButton
          : type === "settings"
          ? styles.settingsButton
          : type === "buyBox"
          ? styles.buyBoxButton
          : type === "sell"
          ? styles.sellButton
          : type === "addFunds"
          ? styles.addFundsButton
          : type === "sort"
          ? styles.sortButton
          : type === "stockSymbol"
          ? styles.stockSymbolButton
          : type === "stockValue"
          ? styles.stockValueButton
          : type === "stockInfo"
          ? styles.stockInfoButton
          : type === "whiteBuy"
          ? styles.whiteBuyButton
          : styles.default
      }
    >
      {children}
    </button>
  );
};

export default Button;
