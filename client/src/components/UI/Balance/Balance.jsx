import React, { useState, useEffect } from "react";
import styles from "./Balance.module.scss";
import { useGetBalanceQuery } from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../Loading/Loading";

const Balance = () => {
  const userID = useSelector(selectCurrentUser);

  const { data: balance = 0, isLoading, error } = useGetBalanceQuery(userID);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.container}>
      {isLoading ? <Loading /> : `$${balance}`}
    </div>
  );
};

export default Balance;
