import React, { useState, useEffect } from 'react'
import styles from "./Search.module.scss";
import SearchResults from '../SearchResults/SearchResults';
import { useGetStockTickerQuery } from '../../../redux/slices/finnhubApiSlice';

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
    /*******************************************************/
  
  
  
  // const [searchQuery, setSearchQuery] = useState("");

  // // useDebounce Hook
  // function useDebounce(value, delay) {
  //   // State and setters for debounced value
  //   const [debouncedValue, setDebouncedValue] = useState(value);

  //   useEffect(
  //     () => {
  //       // Update debounced value after delay
  //       const handler = setTimeout(() => {
  //         setDebouncedValue(value);
  //       }, delay);

  //       // Cancel the timeout if value changes (also on delay change or unmount)
  //       // This is how we prevent debounced value from updating if value is changed ...
  //       // .. within the delay period. Timeout gets cleared and restarted.
  //       return () => {
  //         clearTimeout(handler);
  //       };
  //     },
  //     [value, delay] // Only re-call effect if value or delay changes
  //   );
  
  //   return debouncedValue;
  // }


  // const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  // const {
  //   data,
  //   isSuccess,
  //   isLoading,
  //   isError,
  // } = useGetStockTickerQuery(debouncedSearchQuery, { skip: debouncedSearchQuery == "" });

  // const inputChanged = e => {
  //   setSearchQuery(e.target.value);
  // }

  // let newData;
  // if(data){
  //   newData = data.result.map(
  //     (item) => {
  //       if (item.type==="Common Stock"){
  //         return item
  //       }
  //     }
  //   )
  // }

  /***********************************************************/



  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const { data, isLoading } = useGetStockTickerQuery();

  const inputChanged = e => {
    setSearchQuery(e.target.value);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
    
      if (data && searchQuery!==""){
        const newData = data.filter((item) => {
          return item.description.toLowerCase().includes(searchQuery.toLocaleLowerCase());
        })
        setSearchResults(newData);
      }else if(searchQuery===""){
        setSearchResults([]);
      }
      
      console.log(searchResults);
    }, 500)

    setTimer(newTimer);
  }

  console.log(searchResults);
  
  

  
  

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
      
      {/* { isLoading && searchQuery==="" ? 
        <></> :
          <ul className={styles.searchResults}>
              {data.map((item) => {
                if (item.description.includes(searchQuery)){
                  return (
                    <li
                      key={item.symbol}
                      className={styles.listResult}
                    >
                      <span>{item.description}</span>
                      <span style={{color:"green"}}>{item.symbol}</span>
                    </li>
                  );
                }
              })}
            </ul>
      } */}

    </>
  );
};

export default Search;
