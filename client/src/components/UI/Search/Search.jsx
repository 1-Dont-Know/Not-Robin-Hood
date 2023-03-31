import React, { useState, useEffect, useRef } from 'react'
import styles from "./Search.module.scss";
import { useGetStockTickerQuery } from '../../../redux/slices/apiSlice';
import { Link } from 'react-router-dom';

// Search Bar component receives a placeholder prop for the search default message
const Search = ({ placeholder }) => {
  
  /*****************************  WEBSOCKET *************************/
    // const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_API_KEY}`);

    // // Connection opened -> Subscribe
    // socket.addEventListener('open', function (event) {
    //     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))

    // });

    // // Listen for messages
    // socket.addEventListener('message', function (event) {
    //     try{
    //       console.log('Message from server ', JSON.parse(event.data).data[0].p);
    //     }
    //     catch{

    //     }
        
    // });

    // // Unsubscribe
    // var unsubscribe = function(symbol) {
    //     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    // }
    /**************************************************************/
  
  // useDebounce Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
          setResultsIsOpen(true);
          console.log(searchQuery);
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


  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [resultsIsOpen, setResultsIsOpen] = useState(false);

  //Function that handles when the user changes the text in the search bar
  const inputChanged = e => {
    setSearchQuery(e.target.value);
  }
  
  //Finnhub API call to search for company/stock ticker. Only runs after set amount of time defined by useDebounce call.
  //Skips calling the API if the search query is an empty string.
  const {
    data,
    isSuccess,
    isLoading,
    isError,
  } = useGetStockTickerQuery(debouncedSearchQuery, { skip: debouncedSearchQuery == "" });



  /* Function to handle if user clicks outside search box or search window */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      //Run if clicked on outside of element
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("You clicked outside of the search window");
          setResultsIsOpen(false);
          setSearchQuery("");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  /********************************************************************/


  
  /*Display Search Results to Console for Testing*/
    useEffect(
      () => {
        console.log(data)
      },
      [data] // Only re-call effect if value or delay changes
    );
  /***********************************************/
  

  return (
    <>
      {/* Search Field */}
      <div className={styles.container}>
        <input 
          className={styles.search} 
          type="text"
          placeholder={placeholder}
          value = {searchQuery}
          onChange={inputChanged}
          ref={wrapperRef}
        />
      </div>
      
      { !data || searchQuery ==="" || resultsIsOpen === false?
        <></> :
          <ul className={styles.searchResults} ref={wrapperRef}>
              {data.result.map((item) => {
                return (
                  <li key={item.symbol} >
                    <Link 
                      className={styles.listResult} 
                      to={{
                        pathname: "/stock-viewer",
                        search: `?symbol=${item.symbol}&description=${item.description}`
                      }}
                      onClick={()=>setResultsIsOpen(false)}
                    >
                      <span>{item.description}</span>
                      <span style={{color:"green"}}>{item.symbol}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
      }

    </>
  );
};

export default Search;
