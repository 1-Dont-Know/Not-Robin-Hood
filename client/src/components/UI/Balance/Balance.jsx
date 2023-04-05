import React, { useState, useEffect } from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/user/userApiSlice";

const Balance = () => {
  const { data: balance = 0, isLoading, error } = useGetBalanceQuery(1);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.container}>
      {isLoading ? <div className={styles.loader}></div> : `$${balance}`}
    </div>
  );
};

export default Balance;
