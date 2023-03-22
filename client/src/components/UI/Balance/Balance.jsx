import React, { useState } from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/userApiSlice";
const Balance = () => {
  const {
    data = 0,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetBalanceQuery();

  console.log(data, isLoading, isError, isFetching, error);
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={styles.container}>
        ${data.map((item) => item.Balance)}
      </div>
    );
  }
};

export default Balance;
