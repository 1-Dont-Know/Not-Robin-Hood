import React, { useState } from "react";
import styles from "./Portfolio.module.scss";
import Hero from "../../UI/Hero/Hero";
import StockList from "../../UI/StockList/StockList";
import globalStyles from "../../../styles/main.module.scss";
import vector from "../../../assets/icons/vector.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import buyIcon from "../../../assets/icons/shopping-cart.svg";
import CalculateIcon from "../../../assets/icons/calculate.svg";
import {
  useGetBalanceQuery,
  useGetPortfolioStocksQuery,
  useUpdatePortfolioStocksMutation,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../../UI/Loading/Loading";
import Popup from "../../UI/Popup/Popup";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const currentUser = useSelector(selectCurrentUser);
  const tabFlags = {
    overview: 1,
    stocksList: 2,
  };
  const [sellStockPopup, setSellStockPopup] = useState(false);
  const [sellStockInfo, setSellStockInfo] = useState({
    name: "",
    stocksAmount: 0,
    averageCost: 0,
  });

  // Destructuring pulled info from the sellstockinfo state
  const { name, stocksAmount, averageCost } = sellStockInfo;
  const [sellStocksAmount, setSellStocksAmount] = useState(0);
  // Display sell stock popup
  const sellPopUpHandler = (e) => {
    setSellStockPopup((sellStockPopup) => !sellStockPopup);
    const parentElement = e.target.parentElement;
    const childNodes = parentElement.childNodes;
    const name = childNodes[0]?.textContent;
    const qty = Number(childNodes[2]?.textContent.split(" ")[0]);
    const priceStr = childNodes[4]?.textContent;
    const averageCost = Number(priceStr?.replace("$", ""));

    // Setting state of selected stock to sell (state: sellStockInfo)
    setSellStockInfo((prevState) => {
      return {
        ...prevState,
        name,
        stocksAmount: qty,
        averageCost,
      };
    });
    setSellStocksAmount(qty);
  };

  // Setting amount based on the stocksAmount (stocksAmount * price)
  const sellStockInfoHandler = (e) => {
    setSellStocksAmount(() => e.target.value);
  };

  // we need stocksdata to display stocks list in portfolio
  const { data: stocksData } = useGetPortfolioStocksQuery(currentUser);

  // we need balance of current user to display it as a buying power
  const { data: balance = 0, isLoading: isBalanceLoading } =
    useGetBalanceQuery(currentUser);

  // based on stocks list, we are going through each with reduce and adding their equity for stocks value (stocks power)
  const stocksPower = stocksData?.reduce((acc, curr) => acc + curr.equity, 0);
  // our buying power is our balance
  const buyingPower = balance;

  // Total portfolio value
  const totalValue = stocksPower + buyingPower;

  // Getting percentage value based on our previous calculations
  const stocksPowerPercentage = ((stocksPower / totalValue) * 100).toFixed(2);
  const buyingPowerPercentage = ((buyingPower / totalValue) * 100).toFixed(2);

  // active tab state
  const [activeTab, setActiveTab] = useState(tabFlags.overview);

  // handling active tab state
  function handleTabSelect(selectedTab) {
    setActiveTab((curr) => {
      return (curr = selectedTab);
    });
  }

  // Display data for pie chart
  const data = {
    labels: ["Buying Power", "Stocks"],
    datasets: [
      {
        label: [],
        data: [buyingPowerPercentage, stocksPowerPercentage],
        backgroundColor: ["#2AB795", "#C18E60"],
        borderColor: ["#2AB795", "#C18E60"],
      },
    ],
  };
  // Options for pie chart
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Context data for pie chart
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bolder sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `Total Portfolio Value: ${totalValue}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  // Proceed to sell choosen stock, good luck :D
  const sellStockHandler = (e) => {
    // logic to sell stock
    if (
      !sellStocksAmount ||
      sellStocksAmount < 1 ||
      sellStocksAmount === undefined ||
      sellStocksAmount === null
    ) {
      alert("Enter amount to sell");
    } else if (sellStocksAmount > stocksAmount) {
      alert(`Hold your horses, you've only got ${stocksAmount} stocks`);
    } else {
      alert(
        `Congratulations, you've sold ${sellStocksAmount} stocks of ${name}`
      );
      setSellStockPopup((prevState) => !prevState);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero>
        <div className={styles.tabs}>
          <button
            className={styles.tabButton}
            onClick={(e) => {
              handleTabSelect(tabFlags.overview);
            }}
            style={{
              backgroundColor:
                activeTab === tabFlags.overview ? "#37433a" : "#d5e3e1",

              color: activeTab === tabFlags.overview ? "#d5e3e1" : "#37433a",
            }}
          >
            Overview
          </button>

          <h1 style={{ color: "gray" }}>|</h1>
          <button
            className={styles.tabButton}
            onClick={(e) => {
              handleTabSelect(tabFlags.stocksList);
            }}
            style={{
              backgroundColor:
                activeTab === tabFlags.stocksList ? "#37433a" : "#d5e3e1",

              color: activeTab === tabFlags.stocksList ? "#d5e3e1" : "#37433a",
            }}
          >
            Stocks List
          </button>
        </div>

        <div className={styles.tanSquare}>
          {activeTab === tabFlags.overview && (
            <>
              <div className={styles.details}>
                <section className={styles.totalPortfolio}>
                  <h1 className={styles.totalPortfolioTitle}>
                    Total Portfolio Value
                  </h1>
                  <h1 className={styles.totalPortfolioValue}>
                    {isBalanceLoading ? (
                      <Loading />
                    ) : (
                      `$${(stocksPower + balance).toFixed(2)}`
                    )}
                  </h1>
                </section>

                <section className={styles.stocks}>
                  <h1 className={styles.sectionTitle}>Stocks</h1>
                  <h1 className={styles.sectionPercent}>
                    {isNaN(stocksPowerPercentage) ? 0 : stocksPowerPercentage}%
                  </h1>
                  <h1 className={styles.sectionValue} id={styles.stockValue}>
                    {isBalanceLoading ? (
                      <Loading />
                    ) : (
                      `$${stocksPower?.toFixed(2)}`
                    )}
                  </h1>
                </section>

                <hr className={styles.overviewLine} />

                <section className={styles.buyingPower}>
                  <h1 className={styles.sectionTitle}>Buying Power</h1>
                  <h1 className={styles.sectionPercent}>
                    {isNaN(buyingPowerPercentage) ? 0 : buyingPowerPercentage}%
                  </h1>
                  <h1
                    className={styles.sectionValue}
                    id={styles.buyingPowerValue}
                  >
                    {isBalanceLoading ? <Loading /> : `$${buyingPower}`}
                  </h1>
                </section>

                <hr className={styles.overviewLine} />
              </div>

              <div className={styles.doughnutGraph}>
                <Doughnut
                  data={data}
                  options={options}
                  // plugins={[textCenter]}
                ></Doughnut>
              </div>
            </>
          )}

          {activeTab === tabFlags.stocksList && (
            <div style={{ width: "100%" }}>
              <section className={styles.transactions}>
                <div className={styles.stocksTitleBar}>
                  <h1 className={styles.title}>Name</h1>
                  <h1 className={styles.title}>Symbol</h1>
                  <h1 className={styles.title}>Shares</h1>
                  <h1 className={styles.title}>Price</h1>
                  <h1 className={styles.title}>Average Cost</h1>
                  <h1 className={styles.title}>Total Return</h1>
                  <h1 className={styles.title}>Equity</h1>
                </div>

                <hr className={styles.stocksLine} />

                <ul className={styles.transactionsList}>
                  {stocksData
                    ? stocksData.map((item) => {
                        return (
                          <StockList
                            key={item.id}
                            name={item.name}
                            symbol={item.symbol}
                            shares={item.share}
                            price={item.price}
                            avgCost={item.averageCost}
                            totalReturn={item.totalReturn}
                            equity={item.equity}
                            sellHandler={sellPopUpHandler}
                          />
                        );
                      })
                    : "No stocks purchased, go ahead and buy some"}
                </ul>
              </section>
            </div>
          )}
          {activeTab === tabFlags.stocksList && (
            <button className={styles.calculateBtn}>
              <img src={CalculateIcon} alt="Calculate Portfolio" />
            </button>
          )}
        </div>
        {sellStockPopup && (
          <Popup name="sellStock" toggle={sellPopUpHandler}>
            <div className={styles.sellStockPopupContainer}>
              <div className={styles.stockName}>
                <h4>Stock name:</h4>
                <p>{name}</p>
              </div>
              <div className={styles.stockDetails}>
                <div className={styles.qty}>
                  <h4>QTY:</h4>
                  <input
                    type="number"
                    name="stocksAmount"
                    value={sellStocksAmount}
                    onChange={sellStockInfoHandler}
                  />
                </div>
                <div className={styles.amount}>
                  <h4>Amount in $:</h4>
                  <input
                    type="number"
                    name="averageCost"
                    value={
                      sellStocksAmount && sellStocksAmount > 0
                        ? (averageCost * sellStocksAmount).toFixed(2)
                        : 0
                    }
                    onChange={sellStockInfoHandler}
                    readOnly
                  />
                </div>
              </div>
              {sellStocksAmount > stocksAmount ? (
                <p style={{ color: "red" }}>
                  Hold your horses, you've only got {stocksAmount} stocks
                </p>
              ) : (
                ""
              )}
              <div className={styles.sellBtnContainer}>
                <button
                  onClick={sellStockHandler}
                  className={globalStyles.sellButton}
                  // disable button if the amount of input more than actual purchased stocks amount
                  disabled={sellStocksAmount > stocksAmount ? true : false}
                >
                  <img src={buyIcon} alt="Sell" />
                  Sell
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Hero>
    </>
  );
};

export default Portfolio;
