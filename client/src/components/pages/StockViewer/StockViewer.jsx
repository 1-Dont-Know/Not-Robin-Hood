import React, { useState, useEffect } from "react";
import styles from "./StockViewer.module.scss";
import people from "../../../assets/icons/people-icon.svg";
import creditCard from "../../../assets/icons/credit-card-icon.svg";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing
import Graph from "../../UI/Graph/Graph";
import BuyBox from "../../UI/BuyBox/BuyBox";
import Filter from "../../UI/Filter/Filter";
import axios from "axios"

// import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";

const StockViewer = () => {
  const stockPrice = "59.71";


  // const priceStock = fetch("https://finnhub.io/api/v1/quote?symbol=AAPL&token=cg7p8s9r01qgl488qnh0cg7p8s9r01qgl488qnhg")
  //       .then(res => res.json())
  //       .then(data => console.log(data.c))
  //       // .then(stockPrice = data.c);
  // // console.log(priceStock)

  const url = "https://finnhub.io/api/v1/quote?symbol=AAPL&token=cgal7v9r01qkpvoj1i80cgal7v9r01qkpvoj1i8g"
  // const getPrice = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //     setData(data.c)
  //     // const testprice = data.c
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // async function getPrice1(url){
  //   const response = await fetch(url);
  //   return response.json();
  // }

  // const data1 = await getPrice1(url);
  // console.log({ data1 })
  
  
  // var jsonData;
  // fetch(url).then(response=> response.json()).then(data=>{jsonData=data;});
  // console.log(jsonData);

  // const testprice = data.c
  // console.log(testprice)

  // const [price23, setPrice23] = useState([])

  // useEffect(() => {
  //   const getPrice123 = async() => {
  //     const res = await axios.get(
  //       url
  //     )
  //     setPrice23(res.data.c)
  //   }
  // }, [])

  // let jsonData;
  // fetch(url).then(
  //   function(u){return u.json;}
  // ).then(
  //   function(json){
  //     jsonData = json;
  //   }
  // )

  // console.log(jsonData)

  // async function githubUsers() {
  //   let response = await fetch(url)
  //   let users = await response.json()
  //   // console.log(users)
  //   return users;
  // }
  
  // const answ = githubUsers()

  // console.log(answ)

  // let jsondata;    
  // fetch(url).then(
  //       function(u){ return u.json();}
  //     ).then(
  //       function(json){
  //         jsondata = json;
  //       }
  //     )
  
  //     console.log(jsondata)

  // function getData(url, cb) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(result => cb(result));
  // }
  
  // getData(url, (data) => console.log({ data }))

  
  const [stockData, setStockData] = useState({
    labels: fakeData.map((data) => data.day),
    datasets: [
      {
        label: "Price",
        data: fakeData.map((data) => data.price),
      },
    ],
  });

  // const [price23, setPrice23] = useState([])

  // useEffect (() =>{
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(data => setPrice23(data.c))
  //   .catch(error =>console.error())
  // }, [])

  const [priceStock, setPriceStock] = useState(null);
  useEffect(() => {
    axios.get(url).then((resp)=> {
      setPriceStock(resp.data.c);
    })
  }, [])

  return (
    <>
      <Hero>
        <div className={styles.stockNameWrapper}>
          <h1 className={styles.stockName}>BINANCE (BNB-USD)</h1>
          <p className={styles.stockPrice}>
            ${priceStock}
            <span className={styles.growth}>$51.29(4.78%)</span>
          </p>
        </div>
        {/* <AddFunds></AddFunds> */}
        <div className={styles.preview}>
          {/* //! GRAPH SECTION */}
          <section className={styles.graph}>
            <Graph chartData={stockData} />
          </section>
          <section className={styles.buybox}>
            <BuyBox price={priceStock} />
          </section>
        </div>
        {/* //! FILTER SECTION */}
        <section className={styles.filter}>
          <Filter />
        </section>
      </Hero>
      {/* </main> */}
      {/* </div> */}
    </>
  );
};

export default StockViewer;
