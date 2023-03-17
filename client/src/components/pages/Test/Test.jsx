import React, { useState } from "react";

// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "cg7p8s9r01qgl488qnh0cg7p8s9r01qgl488qnhg"
// const finnhubClient = new finnhub.DefaultApi()

// finnhubClient.symbolSearch('AAPL', (error, data, response) => {
//   console.log(data)
// });



const Test = () =>{

    fetch("https://finnhub.io/api/v1/search?q=apple")
        .then(res => res.json())
        .then(data => console.log(data));

    return(
        <div> 
            <h1>Helloi</h1>
        </div>
    )
}

export default Test