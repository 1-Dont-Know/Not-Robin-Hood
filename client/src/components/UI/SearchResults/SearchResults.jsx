import React, { useState, useEffect } from 'react'
import styles from "./SearchResults.module.scss";
import { useGetStockTickerQuery } from '../../../redux/slices/finnhubApiSlice';



//Search Results
const SearchResults = ({ searchValue }) => {

  const { data, isLoading } = useGetStockTickerQuery(searchValue);
  if (!isLoading) console.log(data.result);

  return (
    <>
      {
        !isLoading &&
        <ul className={styles.searchResults}>
          {data.result.map((item) => {
            return (
              <li
                key={item.symbol}
                className={styles.listResult}
              >
                <span>{item.description}</span>
                <span style={{color:"green"}}>{item.symbol}</span>
              </li>
            );
          })}
        </ul>
      }
    </>


  );
};

export default SearchResults;
