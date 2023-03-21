import React, { useState, useEffect } from "react";
import axios from "axios"

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cg7p8s9r01qgl488qnh0cg7p8s9r01qgl488qnhg"
// const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.symbolSearch('AAPL', (error, data, response) => {
//   console.log(data)
// });



const Test = () =>{
    const url = "https://finnhub.io/api/v1/search?q=apple&token=cgal7v9r01qkpvoj1i80cgal7v9r01qkpvoj1i8g";
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    // const [getResults, setResults] = useState(null);
    // const[count, setCount] = useState();
    // useEffect(() => {
    //     axios.get(url).then((resp)=> {
    //         setCount(resp.data.count);
    //         setResults(resp.data.result);
    //     })
    // }, [])

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));

    // console.log(count)
    // console.log(getResults)
    // fetch("https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1631022248&to=1631627048")
    //     .then(res => res.json())
    //     .then(data => console.log(data.c));

    // const [priceStock, setPriceStock] = useState(null);
    // useEffect(() => {
    //     axios.get("https://finnhub.io/api/v1/stock/candle?symbol=IBM&resolution=D&from=1572651390&to=1575243390")
    //     .then((resp)=> {
    //     setPriceStock(resp.data.c);
    //     })
    // }, [])
    return(
        <div> 
            <h1>Helloi</h1>
            {/* {priceStock} */}
        </div>
    )
}

export default Test