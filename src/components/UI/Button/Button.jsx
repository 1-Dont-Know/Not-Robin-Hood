import React from "react";
import styles from "./Button.module.scss";

// Button component receive a prop with the type of the button, applied className will be based on the prop, types: 'login', 'google, 'default'

const Button = ({ type, children }) => {
  return (
    <button
      className={
        type === "golden"
          ? styles.golden
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
