import React, { useState, useEffect, useRef } from "react";
import Graph from "../../UI/Graph/Graph";
import { fakeData } from "../../../utils/fakeData";
import styles from "./Test.module.scss";
import { useGetMapQuery } from "../../../redux/slices/apiSlice";
import Chart from 'chart.js/auto';



const Test = () =>{


    // const [data, isLoading, isError, isSuccess] = useGetMapQuery();

    // const [stockData, setStockData] = useState({
    //     labels: fakeData.map((data) => data.day),
    //     datasets: [
    //         {
    //         label: "Price",
    //         data: fakeData.map((data) => data.price),
    //         },
    //     ],
    // });

    
    // const [price, setPrice] = useState(null);

    // /*****************************  WEBSOCKET *************************/
    // //Place this outside of the component function so it doesn't create a new connection every time there is a re-render
    // const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_API_KEY}`);

    // // Connection opened -> Subscribe
    // socket.addEventListener('open', function (event) {     
    //     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    //     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
    //     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'GME'}))
    // });
  
    //   // Listen for messages
    //   socket.addEventListener('message', function (event) {
    //     try{
    //     //   console.log(JSON.parse(event.data).data[0].s, "Price: ",JSON.parse(event.data).data[0].p);
    //         const priceData = JSON.parse(event.data).data[0];
    //         console.log(priceData.s, "Price: ", priceData.p);
    //         setPrice(priceData.p);
    //     }
    //     catch{
    //       // event.data[0].data.s,' Price Change: ', event.data[0].data.p
    //     }
        
    //   });
  
    //   // Unsubscribe
    //   var unsubscribe = function(symbol) {
    //       socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    //   }
    //   /**************************************************************/ 
    //   if(price){ console.log("the price is ", price) }



    // const [stockData, setStockData] = useState([]);
    // const [loading, setLoading] = useState(true);
    
    // // Finnhub API key
    // const apiKey = 'YOUR_API_KEY_HERE';
    
    // // Stock symbol
    // const symbol = 'AAPL';
    
    // // Initialize Finnhub API client
    // const apiClient = new DefaultApi();
    
    // // Fetch stock data from Finnhub API
    // useEffect(() => {
    //     apiClient.stockCandles(symbol, 'D', Math.floor(Date.now() / 1000) - 2592000, Math.floor(Date.now() / 1000), {}, apiKey, (error, data, response) => {
    //     if (error) {
    //         console.error('Error fetching stock data:', error);
    //         setLoading(false);
    //     } else {
    //         console.log('Stock data:', data);
    //         setStockData(data.c);
    //         setLoading(false);
    //     }
    //     });
    // }, []);

    //   // Render loading spinner while fetching data
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://widget.finnhub.io/widgets/stocks/chart?symbol=AAPL&watermarkColor=%231db954&backgroundColor=%23FBF2EA&textColor=black');
        const chartData = await response.json();

        // Get chart context
        const ctx = chartRef.current.getContext('2d');

        // Create chart
        new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

    return(
        <div> 
            <h1>Helloi</h1>
            {/* //! GRAPH SECTION */}
            {/* {isLoading && <p>...Loading...</p>}
            {isError && <p>Error!!!</p>}
            {isSuccess && (
                <section className={styles.graph}>
                    <Graph chartData={stockData} />
                </section>
            )} */}
            {/* <iframe 
                src="https://widget.finnhub.io/widgets/stocks/chart?symbol=AAPL&watermarkColor=%231db954&backgroundColor=%23FBF2EA&textColor=black" 
                width="100%" 
                height="300" 
                frameBorder="0" 
                scrolling="no"
            /> */}
             
{/* 
             <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="close" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer> */}

            <canvas ref={chartRef}></canvas>
        </div>
    )
}

export default Test