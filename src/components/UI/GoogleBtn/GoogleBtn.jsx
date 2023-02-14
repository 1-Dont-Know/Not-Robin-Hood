import React from "react";
import styles from "./GoogleBtn.module.scss";

const GoogleBtn = ({ children }) => {
  return <button className={styles.googleBtn}>{children}</button>;
};

export default GoogleBtn;
