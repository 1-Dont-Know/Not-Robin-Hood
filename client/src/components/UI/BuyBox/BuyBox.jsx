import React, { useState, useEffect } from "react";
import styles from "./BuyBox.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import buyIcon from "../../../assets/icons/shopping-cart.svg";
import { checkIfNumber } from "../../../utils/helpers";
import {
  useAddBalanceMutation,
  useGetBalanceQuery,
  useGetPortfolioStocksQuery,
  useUpdatePortfolioStocksMutation,
  useDeletePortfolioStocksMutation,
  useAddStockTransactionsMutation,
  useModifyPortfolioStocksMutation,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";

const BuyBox = ({ type, symbol, price, name }) => {
  // Handling stock quantity
  const [qty, setQty] = useState(0);

  // Setting pucharse date
  const [datePurchased, setDatePurchased] = useState(getCurrentDate());

  // Let's make our date input controlled
  const purchaseDateHandler = (e) => {
    setDatePurchased(getCurrentDate());
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    let day = currentDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Amount State
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const userID = useSelector(selectCurrentUser);

  // Destructuring RTK.Query Hook for updating user's balance
  const [addBalance, { isError, isSuccess }] = useAddBalanceMutation();

  // Destructing our hook for updating stock if it's already owned/in our portfolio
  const [modifyStock] = useModifyPortfolioStocksMutation();

  // To modify user's balance, we need to get a current balance, based on the currently logged in user
  const {
    data: balance = 0,
    isLoading: isLoading2,
    error: error2,
  } = useGetBalanceQuery(userID);

  // Let's get all stocks from portfolio
  const { data: stocksData } = useGetPortfolioStocksQuery(userID);
  // once we sold the stock, we would need to remove it from DB
  const [deleteStock] = useDeletePortfolioStocksMutation();

  // Updating our transactions list (add stock purchase transaction to the list), when buying stock.
  const [updateTransactions] = useAddStockTransactionsMutation();

  // Add new stock to portfolio stock list, let everyone know how rich you're ;)
  const [updateStocks, { isLoading }] = useUpdatePortfolioStocksMutation();

  // Magic handler to set our quantity state, it makes our input to be controlled :)
  const qtyHandler = (e) => {
    setQty(Number(e.target.value));
  };

  const match =
    stocksData && stocksData.filter((data) => data.symbol === symbol);
  // console.log("matched stocks: ", match);
  // console.log("stocks from portfolio:", stocksData);

  // useEffect(() => {
  //   setPurchaseHistory((prevState) => {
  //     return [...prevState, match];
  //   });
  // }, [match]);

  const handlePurchaseSubmit = (e, amount) => {
    e.preventDefault();
    const stocks = stocksData?.filter((data) => data.symbol === symbol);
    console.log("stocks:", stocks);
    console.log("symbol:", symbol);
    //* Buying case (reduce balance by amount)
    if (amount < 0) {
      // we dont have money, so we can't buy
      if (balance < Math.abs(amount)) {
        console.log(amount, " ", balance);
        console.log("sorry, you cant buy, not enough money");
        toast.error("Insufficient amount of money");
        // we have money and we can buy
      } else {
        console.log("you can buy");
        console.log("amount to deduct:", amount, "balance:", balance);
        // we wil modify balance based on computed amount
        addBalance({ id: userID, amount });
        e.preventDefault();
        // updating stocks only if we are buying (adding new stock to the array)
        const id = nanoid();
        /* check if this stock is already owned (inside portfolio),
          if so, call modifyStock function to modify the owned stock by modifying share
          if not, just add this stock to portfolio
        */

        // modifyStock({
        //   userID,
        //   id,
        //   share: qty,
        //   symbol,
        //   stockPrice: price,
        //   totalCost: Math.abs(amount),
        //   date: datePurchased,
        // });

        updateStocks({
          userID: userID,
          id,
          symbol: symbol,
          stockPrice: price,
          company: name,
          share: qty,
          totalCost: Math.abs(amount),
          date: datePurchased,
        });

        updateTransactions({
          userID,
          id,
          name,
          price: sellAmount,
          description: `Purchase of ${name} ${Math.abs(amount)} shares`,
          date: datePurchased,
        });
        toast.success("Successfully purchased");
      }
      //! selling case
    } else {
      // variable to set temporary quantity based on quantity input
      let tempQTY = qty;
      stocksData &&
        stocksData.map((item) => {
          // let's check if we have this stock in our portfolio before we will proceed to sell
          // check if symbol matched, check user's id and if the choosen quantity is valid (more than 0)
          if (
            symbol === item.symbol &&
            userID === item.user_id &&
            tempQTY > 0
          ) {
            // if everything above is matched (validated) we will check if our quantity is exactly equal to amount of owned stock quantity
            //  and delete it from db + update our balance
            if (tempQTY === item.share) {
              deleteStock({ userID: userID, symbol: symbol, company: name });
              console.log("found and sold(deleted) = ", item.share);
              toast.success("Successfully sold!");
              tempQTY = 0;
              // in case input quantity amount is bigger than the actual amount of stock, we will sell (delete) all stocks
            } else if (tempQTY > item.share) {
              // tempQTY = tempQTY - item.share;
              // deleteStock({ userID: userID, symbol: symbol, company: name });
              // toast.error("Don't have enough of this stock")
              console.log("don't have enough");
            } else if (tempQTY < item.share) {
              let temp = item.share - tempQTY;
              console.log("TEMP:", temp);
              let sold = price * tempQTY;
              modifyStock({
                userID: userID,
                id: item.id,
                symbol: symbol,
                stockPrice: price,
                company: name,
                share: temp,
                totalCost: Math.abs(sold),
                date: datePurchased,
              });
              updateTransactions({
                userID,
                id: nanoid(),
                name,
                price: sellAmount,
                description: `Sold ${Math.abs(amount)} shares of ${name}`,
                date: datePurchased,
              });
              // deleteStock({ userID: userID, symbol: symbol, company: name });

              tempQTY = 0;
              console.log("found <");
              toast.success("Successfully sold!");
            }
          }
          console.log("tempQTY = ", tempQTY);
        });
      console.log("tempQTY = ", tempQTY);
      if (tempQTY === qty) {
        // console.log("you dont have this stock");
        toast.error("Don't have enough of this stock");
        // TODO: ASK DARSHWAK ABOUT THIS LOGIC
        // addBalance({ id: userID, amount });
      } else if (tempQTY === 0) {
        console.log("Sold all ", qty, " stocks");
        addBalance({ id: userID, amount });
      } else {
        console.log("Only Sold ", tempQTY, " out of ", qty);
        let sold = price * (qty - tempQTY);
        console.log("sold is = ", sold);
        addBalance({ id: userID, amount: sold });
      }
    }
  };

  // triggering amount state for two (buy/sell) scenario
  useEffect(() => {
    setSellAmount(parseFloat((price * qty).toFixed(2)));
    setBuyAmount(parseFloat((-price * qty).toFixed(2)));
  }, [qty]);

  useEffect(() => {
    const history = stocksData?.filter((item) => item.symbol === symbol);
    history && setPurchaseHistory(history);
  }, [stocksData]);

  return (
    <div className={styles.BuyBody}>
      <Toaster />
      {/* CALL TO ACTION BUTTONS SECTION */}
      <section className={styles.ctaSection}>
        <button
          className={globalStyles.buyBoxButton}
          onClick={(event) => handlePurchaseSubmit(event, buyAmount)}
        >
          <img src={buyIcon} alt="Buy" />
          Buy
        </button>
        <button
          className={globalStyles.sellButton}
          onClick={(event) => handlePurchaseSubmit(event, sellAmount)}
        >
          <img src={buyIcon} alt="Sell" />
          Sell
        </button>
      </section>
      {/* INPUTS SECTION */}
      <section className={styles.inputsSection}>
        {/* Quantity Input */}
        <input
          value={qty === 0 ? "QTY" : qty}
          onChange={qtyHandler}
          type="number"
          id="Quantity"
          className={styles.inputBoxes}
          placeholder="QTY"
          onKeyDown={(event) => checkIfNumber(event)}
        />
        {/* Date Input */}
        <input
          type="date"
          min={datePurchased}
          max={datePurchased}
          id="userDate"
          className={styles.inputBoxes}
          onChange={purchaseDateHandler}
          value={datePurchased}
        />
        {/* Total Amount  */}
        <div className={styles.inputBoxes}>
          Total: ${qty === 0 ? 0 : sellAmount}
        </div>
      </section>

      {/* ORDERS SECTION */}
      <section className={styles.ordersSection}>
        <h1>Purchase History</h1>
        <div className={styles.orders}>
          {purchaseHistory && purchaseHistory.length > 0
            ? purchaseHistory.map((item) => {
                return (
                  <ul key={item.id}>
                    <li style={{ fontSize: "0.8rem" }} key={item.id}>
                      <p>
                        Date: {datePurchased} / Name: {item.name} / Share:{" "}
                        {item.share}
                      </p>
                    </li>
                  </ul>
                );
              })
            : "No history found"}
        </div>
      </section>
    </div>
  );
};

export default BuyBox;
