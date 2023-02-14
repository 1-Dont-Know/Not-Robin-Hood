import React from "react";
import styles from "./CreateAccountBtn.module.scss";

const CreateAccountBtn = ({ children }) => {
  return <button className={styles.createAccBtn}>{children}</button>;
};

export default CreateAccountBtn;
