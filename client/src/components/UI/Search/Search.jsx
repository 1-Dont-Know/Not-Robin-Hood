import React from "react";
import styles from "./Search.module.scss";
import { useGetStockTickerQuery } from "../../../redux/slices/apiSlice";

// Search Bar component receives a placeholder prop for the search default message
const Search = ({ placeholder }) => {
  // const { data, isLoading } = useGetStockTickerQuery("APPL");

  // if (isLoading) {
  // } else {
  //   console.log(data);
  // }

  return (
    <div className={styles.container}>
      <input className={styles.search} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Search;
