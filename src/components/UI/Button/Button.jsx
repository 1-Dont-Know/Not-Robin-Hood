import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children }) => {
  return (
    <button
      className={
        type === "login"
          ? styles.login
          : type === "google"
          ? styles.google
          : styles.default
      }
    >
      {children}
    </button>
  );
};

export default Button;
