import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, placeholder }) => {
  return (
    <>
      <input className={styles.input} type={type} placeholder={placeholder} />
    </>
  );
};

export default Input;
