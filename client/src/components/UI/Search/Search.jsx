import React, { useState, useEffect } from 'react'
import styles from "./Search.module.scss";
import SearchResults from '../SearchResults/SearchResults';
import { useGetStockTickerQuery } from '../../../redux/slices/finnhubApiSlice';

// Search Bar component receives a placeholder prop for the search default message
const Search = ({ placeholder }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // useDebounce Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
  
    return debouncedValue;
  }


  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  const {
    data,
    isSuccess,
    isLoading,
    isError,
  } = useGetStockTickerQuery(debouncedSearchQuery, { skip: debouncedSearchQuery == "" });

  const inputChanged = e => {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <div className={styles.container}>
        <input 
          className={styles.search} 
          type="text" 
          placeholder={placeholder}
          value={searchQuery}
          onChange={inputChanged} 
        />
      </div>
      
      { !data ? 
        <></> :
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

export default Search;
