import React, { useState, useEffect } from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";

const Balance = () => {
  const user = useSelector(selectCurrentUser);
  const { data: balance = 0, isLoading, error } = useGetBalanceQuery(user);
  console.log(user);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.container}>
      {isLoading ? <div className={styles.loader}></div> : `$${balance}`}
    </div>
  );
};

export default Balance;
