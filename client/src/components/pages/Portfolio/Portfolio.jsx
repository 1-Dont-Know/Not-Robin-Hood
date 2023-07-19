import React, { useState, useEffect } from "react";
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
  useAddBalanceMutation,
  useAddStockTransactionsMutation,
  useDeletePortfolioStocksMutation,
  useGetBalanceQuery,
  useGetPortfolioStocksQuery,
  useModifyPortfolioStocksMutation,
  useUpdatePortfolioStocksMutation,
  useSetPortfolioStocksTotalReturnMutation,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../../UI/Loading/Loading";
import Popup from "../../UI/Popup/Popup";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Portfolio = () => {
  const darkModeTheme = useSelector(selectDarkMode);
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;

  // ***** STATES
  // state to display/hide our sell stock popup
  const [sellStockPopup, setSellStockPopup] = useState(false);

  // state to display information about the stock we are going to sell
  const [sellStockInfo, setSellStockInfo] = useState({
    name: "",
    stocksAmount: 0,
    averageCost: 0,
    price: 0,
  });
  // state of the qty input inside sell stock popup (we are keeping it to compare with initial value for validation purposes)
  const [sellStocksAmount, setSellStocksAmount] = useState(0);
  console.log(sellStocksAmount);

  // active tab state
  // setting flags for each tab to identify which tab is active
  const tabFlags = {
    overview: 1,
    stocksList: 2,
  };
  const [activeTab, setActiveTab] = useState(tabFlags.overview);

  // ***** CONSTS

  // Register chart as pie chart
  ChartJS.register(ArcElement, Tooltip, Legend);

  // let's get our currently logged in user from redux store (we are using built-in useSelector hook from redux toolkit)
  const currentUser = useSelector(selectCurrentUser);

  // Destructuring pulled info from the sellstockinfo state
  const { name, stocksAmount, averageCost } = sellStockInfo;

  const [modifyStock] = useModifyPortfolioStocksMutation();

  // we need stocksdata to display stocks list in portfolio
  const { data: stocksData } = useGetPortfolioStocksQuery(currentUser);

  // we need balance of current user to display it as a buying power
  const { data: balance = 0, isLoading: isBalanceLoading } =
    useGetBalanceQuery(currentUser);

  // Destructuring RTK.Query Hook for updating user's balance
  const [addBalance, { isError, isSuccess }] = useAddBalanceMutation();

  // once we sold the stock, we would need to remove it from DB
  const [deleteStock] = useDeletePortfolioStocksMutation();

  // Updating our transactions list (add stock purchase transaction to the list), when buying stock.
  const [updateTransactions] = useAddStockTransactionsMutation();

  // Add new stock to portfolio stock list, let everyone know how rich you're ;)
  const [updateStocks, { isLoading }] = useUpdatePortfolioStocksMutation();

  // Apply calculated total return to each owned stock
  const [setStocksTotalReturn, {}] = useSetPortfolioStocksTotalReturnMutation();

  // based on stocks list, we are going through each with reduce and adding their equity for stocks value (stocks power)
  const stocksPower = stocksData?.reduce(
    (acc, curr) => acc + Number(curr.equity),
    0
  );
  console.log("stocksPower", stocksPower);

  // our buying power is our balance
  const buyingPower = Number(balance);

  // Total portfolio value
  const totalValue = stocksPower + buyingPower;
  console.log(totalValue);

  // stats of the owned stocks
  const ownedStocksStats =
    stocksData &&
    stocksData.map((item) => ({
      symbol: item.symbol,
      qty: item.share,
      oldPrice: item.currentPrice,
      averageCost: item.averageCost,
    }));
  // console.log("Owned Stocks symbols:", ownedStocksStats);

  // Getting percentage value based on our previous calculations
  const stocksPowerPercentage = (stocksPower / totalValue) * 100;
  const buyingPowerPercentage = (buyingPower / totalValue) * 100;

  // shouldn't be here, but just for now
  const api_key = `${process.env.REACT_APP_FINNHUB_API_KEY}`;

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
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bolder 0.7vw sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        `Total Value: $${totalValue.toFixed(2)}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  // ***** FUNCTIONS

  // Display sell stock popup
  // TODO: Change approach by using useRef or somethign else, it's a spicy DOM traversing stuff here, be careful :D
  const sellPopUpHandler = (e) => {
    // toggling value to display/hide popup
    setSellStockPopup((sellStockPopup) => !sellStockPopup);

    // getting stock values (name,qty,price) to display inside popup
    // 1. retrieve a parent element of the clicked target
    // 2. get all child nodes of the parent
    // 3. get a name,qty,average cost from textContent (array elements order numbers can be seen in StockList.jsx)
    const parentElement = e.target.parentElement;
    const childNodes = parentElement.childNodes;
    const name = childNodes[0]?.childNodes[0].textContent.slice(1);
    const qty = Number(childNodes[0].childNodes[2]?.textContent.split(" ")[0]);
    const priceStr = childNodes[0].childNodes[3]?.textContent;
    const averageCost = Number(priceStr?.replace("$", ""));
    console.log(priceStr);

    // Setting state of selected stock to sell (state: sellStockInfo)
    setSellStockInfo((prevState) => {
      return {
        ...prevState,
        name,
        stocksAmount: qty,
        averageCost,
      };
    });
    // setting our popup qty input as well
    setSellStocksAmount(qty);
  };

  // Setting amount based on the stocksAmount (stocksAmount * price)
  const sellStockInfoHandler = (e) => {
    setSellStocksAmount(() => e.target.value);
  };

  // handling active tab state
  function handleTabSelect(selectedTab) {
    setActiveTab((curr) => {
      return (curr = selectedTab);
    });
  }

  // Proceed to sell choosen stock, good luck :D
  // TODO: We need to create a separate function helper and reuse it for buying and selling
  const sellStockHandler = (e) => {
    if (
      !sellStocksAmount ||
      sellStocksAmount < 1 ||
      sellStocksAmount === undefined ||
      sellStocksAmount === null
    ) {
      toast.error("Enter amount to sell");
    } else if (sellStocksAmount > stocksAmount) {
      toast.error(`Hold your horses, you've only got ${stocksAmount} stocks`);
    } else {
      stocksData &&
        stocksData.map((item) => {
          const formattedDate = new Date(item.purchased_at);

          // Get the month with leading zero if necessary
          const month = (formattedDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          // today's date (formatted)
          const date = `${formattedDate.getFullYear()}-${month}-${formattedDate.getDate()}`;
          if (currentUser === item.user_id && name === item.name) {
            let temp = item.share - sellStocksAmount;
            console.log("TEMP:", temp);

            modifyStock({
              userID: currentUser,
              id: item.id,
              symbol: item.symbol,
              stockPrice: item.currentPrice,
              company: name,
              share: temp,
              totalCost: Math.abs(item.currentPrice * sellStocksAmount),
              // totalCost: 2,
              date,
            });
            addBalance({
              id: currentUser,
              amount: averageCost * sellStocksAmount,
            });
            updateTransactions({
              userID: currentUser,
              id: nanoid(),
              name,
              price: averageCost * sellStocksAmount,
              qty: sellStocksAmount,
              amount: sellStocksAmount,
              description: `Sold ${Math.abs(
                sellStocksAmount
              )} shares of ${name}`,
              date,
            });
            if (temp <= 0) {
              deleteStock({
                userID: currentUser,
                symbol: item.symbol,
                company: name,
              });
              addBalance({
                id: currentUser,
                amount: averageCost * sellStocksAmount,
              });
              updateTransactions({
                userID: currentUser,
                id: nanoid(),
                amount: sellStocksAmount,
                name,
                qty: sellStocksAmount,
                price: averageCost * sellStocksAmount,
                description: `Sold ${Math.abs(
                  sellStocksAmount
                )} shares of ${name}`,
                date,
              });
            }
          }
        });
      toast.success(
        `Congratulations, you've sold ${sellStocksAmount} stocks of ${name}`
      );
      //TODO: logic to sell stock should be here
      setSellStockPopup((prevState) => !prevState);
    }
  };
  // Calculate stocks total return
  // Let's make calculation of our total return value
  // 1. Get all the stocks from the user's portfolio, particularly their price
  // 2. We need to search those stocks on the market, based on the symbol of those stocks inside portfolio
  // 3. Fetch them, get their prices, compare with prices of the owned stocks
  // 4. Calculate total return and update asset value

  /*
    total cost = amount of stocks * the price it was purchased (e.x 06/01/23)
      total return = fetched new price * amount of stocks  - total cost
      
    */
  const calculateTotalReturn = async (company) => {
    const responseArray = await Promise.all(
      company.map((item) =>
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${api_key}`
        )
          .then((response) => response.json())
          .then((data) => ({
            oldPrice: item.oldPrice,
            fullinfo: data,
            symbol: item.symbol,
            totalCost: item.qty * item.oldPrice,
            currentPrice: data.c,
            totalReturn: item.qty * (data.c - item.averageCost),
            qty: item.qty,
          }))
      )
    );

    console.log(responseArray);

    if (responseArray.length > 0) {
      responseArray.map((item) => {
        console.log("Current Price:", item.currentPrice);
        return setStocksTotalReturn({
          totalReturn: item.totalReturn,
          symbol: item.symbol,
          stockPrice: item.currentPrice,
          share: item.qty,
        });
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero>
        <Toaster />
        <div className={`${styles.tabs} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          <button
            className={styles.tabButton}
            onClick={(e) => {
              handleTabSelect(tabFlags.overview);
            }}
            style={{
              backgroundColor: activeTab === tabFlags.overview ? (darkModeTheme ? "#d5e3e1" : "#d5e3e1") : (darkModeTheme ? "rgb(113, 113, 113)" : "#37433a"),
              color: activeTab === tabFlags.overview ? (darkModeTheme ? "#37433a" : "#37433a") : (darkModeTheme ? "rgb(74, 74, 74)" : "#d5e3e1"),
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
              backgroundColor: activeTab === tabFlags.stocksList ? (darkModeTheme ? "#d5e3e1" : "#d5e3e1") : (darkModeTheme ? "rgb(113, 113, 113)" : "#37433a"),
              color: activeTab === tabFlags.stocksList ? (darkModeTheme ? "#37433a" : "#37433a") : (darkModeTheme ? "rgb(74, 74, 74)" : "#d5e3e1"),
            }}
            
          >
            Stocks List
          </button>
        </div>

        <div className={`${styles.tanSquare} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
          {activeTab === tabFlags.overview && (
            <>
              <div className={styles.details}>
                <section className={styles.totalPortfolio}>
                  <h1 className={`${styles.totalPortfolioTitle} 
                    ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                    Total Portfolio Value
                  </h1>
                  <h1 className={`${styles.totalPortfolioValue} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                    {isBalanceLoading ? (
                      <Loading />
                    ) : (
                      `$${Number(stocksPower + buyingPower).toFixed(2)}`
                    )}
                  </h1>
                </section>

                <section className={styles.stocks}>
                  <h1 className={`${styles.sectionTitle} ${darkModeTheme ? styles["dark-mode"] : ""}`}>Stocks</h1>
                  <h1 className={`${styles.sectionPercent} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                    {isNaN(stocksPowerPercentage)
                      ? 0
                      : stocksPowerPercentage?.toFixed(4)}
                    %
                  </h1>
                  <h1 className={styles.sectionValue} id={styles.stockValue}>
                    {isBalanceLoading ? (
                      <Loading />
                    ) : (
                      `$${Number(stocksPower)?.toFixed(2)}`
                    )}
                  </h1>
                </section>

                <hr className={styles.overviewLine} />

                <section className={styles.buyingPower}>
                  <h1 className={`${styles.sectionTitle} ${darkModeTheme ? styles["dark-mode"] : ""}`}>Buying Power</h1>
                  <h1 className={`${styles.sectionPercent} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                    {isNaN(buyingPowerPercentage)
                      ? 0
                      : buyingPowerPercentage?.toFixed(4)}
                    %
                  </h1>
                  <h1
                    className={styles.sectionValue}
                    id={styles.buyingPowerValue}
                  >
                    {isBalanceLoading ? (
                      <Loading />
                    ) : (
                      `$${buyingPower?.toFixed(2)}`
                    )}
                  </h1>
                </section>

                <hr className={styles.overviewLine} />
              </div>

              {isBalanceLoading ? (
                <Loading />
              ) : (
                <div className={styles.doughnutGraph}>
                  <Doughnut
                    data={data}
                    options={options}
                    plugins={[textCenter]}
                  ></Doughnut>
                </div>
              )}
            </>
          )}

          {activeTab === tabFlags.stocksList && (
            <div style={{ width: "100%" }}>
              <section className={styles.transactions}>
                <div className={styles.stocksTitleBar}>
                  <h1 className={styles.title}>Name</h1>
                  <h1 className={styles.title}>Symbol</h1>
                  <h1 className={styles.title}>Shares</h1>
                  <h1 className={styles.title}>Current Price</h1>
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
                            currentPrice={item.currentPrice.toFixed(2)}
                            avgCost={item.averageCost.toFixed(2)}
                            totalReturn={item.totalReturn.toFixed(2)}
                            equity={Number(item.equity).toFixed(2)}
                            sellHandler={sellPopUpHandler}
                          />
                        );
                      })
                    : "No stocks purchased, go ahead and buy some"}
                </ul>
              </section>
            </div>
          )}
          {/* Calculate total return */}
          {activeTab === tabFlags.stocksList && (
            <button
              onClick={() => calculateTotalReturn(ownedStocksStats)}
              className={`${styles.calculateBtn} ${darkModeTheme ? styles["dark-mode"] : ""}`}
            >
              <img src={CalculateIcon} alt="Calculate Portfolio" />
            </button>
          )}
        </div>
        {sellStockPopup && (
          <Popup name="sellStock" toggle={sellPopUpHandler}>
            <div className={styles.sellStockPopupContainer}>
              <div className={`${styles.stockName} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
                <h4>Stock name:</h4>
                <p>{name}</p>
              </div>
              <div className={`${styles.stockDetails} ${darkModeTheme ? styles["dark-mode"] : ""}`}>
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
                  className={`${globalStyles.sellButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
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
