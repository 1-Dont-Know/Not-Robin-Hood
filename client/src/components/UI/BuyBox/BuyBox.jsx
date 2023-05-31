import React, { useState, useEffect } from "react";
import styles from "./BuyBox.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import buyIcon from "../../../assets/icons/shopping-cart.svg";
import { checkIfNumber } from "../../../utils/helpers";
import {
  useAddBalanceMutation,
  useGetUserByIdQuery,
  useGetBalanceQuery,
  useGetPortfolioStocksQuery,
  useUpdatePortfolioStocksMutation,
  useDeletePortfolioStocksMutation,
  useAddStockTransactionsMutation,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import { nanoid } from "nanoid";

const BuyBox = ({ type, symbol, price, name }) => {
  // Handling stock quantity
  const [qty, setQty] = useState(0);
  // Setting purchase date
  const currentDate = new Date();
  // Get the month with leading zero if necessary
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  // today's date (formatted)
  const defaultDate = `${currentDate.getFullYear()}-${month}-${currentDate.getDate()}`;
  const [datePurchased, setDatePurchased] = useState(defaultDate);

  // Amount State
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  const userID = useSelector(selectCurrentUser);

  // Destructuring RTK.Query Hook for updating user's balance
  const [addBalance, { isError, isSuccess }] = useAddBalanceMutation();

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

  // Let's make our date input controlled
  const purchaseDateHandler = (e) => {
    setDatePurchased(e.target.value);
  };

  const handlePurchaseSubmit = (e, amount) => {
    e.preventDefault();

    //* Buying case (reduce balance by amount)
    if (amount < 0) {
      // we dont have money, so we can't buy
      if (balance < Math.abs(amount)) {
        console.log(amount, " ", balance);
        console.log("sorry, you cant buy, not enough money");
        // we have money and we can buy
      } else {
        console.log("you can buy");
        console.log("amount to deduct:", amount, "balance:", balance);
        // we wil modify balance based on computed amount
        addBalance({ id: userID, amount });
        e.preventDefault();
        // updating stocks only if we are buying (adding new stock to the array)
        const id = nanoid();
        updateStocks({
          userID: userID,
          id,
          symbol: symbol,
          priceBought: price,
          company: name,
          share: qty,
          cost: Math.abs(amount),
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
              tempQTY = 0;
              // in case input quantity amount is bigger than the actual amount of stock, we will sell (delete) all stocks
            } else if (tempQTY > item.share) {
              tempQTY = tempQTY - item.share;
              deleteStock({ userID: userID, symbol: symbol, company: name });
              console.log("found >");
            } else if (tempQTY < item.share) {
              let temp = item.share - tempQTY;
              console.log(temp);
              let sold = price * tempQTY;
              updateStocks({
                userID: userID,
                id: item.id,
                symbol: symbol,
                priceBought: price,
                company: name,
                share: temp,
                cost: Math.abs(sold),
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

              deleteStock({ userID: userID, symbol: symbol, company: name });

              tempQTY = 0;
              console.log("found <");
            }
          }
          console.log("tempQTY = ", tempQTY);
        });
      console.log("tempQTY = ", tempQTY);
      if (tempQTY === qty) {
        console.log("you dont have this stock");
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

  return (
    <div className={styles.BuyBody}>
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
          value={qty === 0 ? "QTR" : qty}
          onChange={qtyHandler}
          type="number"
          id="Quantity"
          className={styles.inputBoxes}
          placeholder="QTR"
          onKeyDown={(event) => checkIfNumber(event)}
        />
        {/* Date Input */}
        <input
          type="date"
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
        <h1>Queue Order</h1>
        <div className={styles.orders}>
          <p>Order conformation</p>
        </div>
      </section>
    </div>
  );
};

export default BuyBox;
