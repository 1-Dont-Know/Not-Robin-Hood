import React from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/userApiSlice";
const Balance = () => {
  console.log(useGetBalanceQuery());
  return <div className={styles.container}>$0</div>;
};

export default Balance;
