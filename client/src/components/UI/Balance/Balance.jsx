import React from "react";
import styles from "./Balance.module.scss";
import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.balance.value);
  return <div className={styles.container}>${balance}</div>;
};

export default Balance;
