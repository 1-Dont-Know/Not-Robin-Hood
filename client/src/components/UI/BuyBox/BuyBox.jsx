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
  const [qty, setQty] = useState(0);

  // Amount State
  const [sellAmount, setSellAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);

  const userID = useSelector(selectCurrentUser);

  // Destructuring RTK.Query Hook for updating user's balance
  const [addBalance, { isError, isSuccess }] = useAddBalanceMutation();

  const {
    data: balance = 0,
    isLoading: isLoading2,
    error: error2,
  } = useGetBalanceQuery(userID);

  const { data: stocksData } = useGetPortfolioStocksQuery();

  const [deleteStock] = useDeletePortfolioStocksMutation();
  const [updateTransactions] = useAddStockTransactionsMutation();

  const [updateStocks, { isLoading }] = useUpdatePortfolioStocksMutation();

  const qtyHandler = (e) => {
    setQty(Number(e.target.value));
  };

  const handleBalanceSubmit = (e, amount) => {
    e.preventDefault();
    // Buying case (reduce balance by amount)
    if (amount < 0) {
      // we dont have money, so we can't buy
      if (balance < Math.abs(amount)) {
        console.log(amount, " ", balance);
        console.log("cant buy");
        // we have money and we can buy
      } else {
        console.log(amount, " ", balance);
        console.log("can buy");
        // we wil modify balance based on computed amount
        addBalance({ id: userID, amount });
        e.preventDefault();
        console.log(symbol);
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
        });
        updateTransactions({
          userID,
          id,
          name,
          price,
          description: `Purchase of ${Math.abs(amount)} shares`,
        });
      }
      // selling case
    } else {
      // let found =0;
      let tempQTY = qty;
      stocksData &&
        stocksData.map((item) => {
          // let tempQTY = qty;
          if (
            symbol === item.symbol &&
            userID === item.user_id &&
            tempQTY > 0
          ) {
            // addBalance({ id: 1, amount })
            if (tempQTY === item.share) {
              deleteStock({ userID: userID, symbol: symbol, company: name });
              console.log("found =");
              tempQTY = 0;
              // addBalance({ id: userID, amount });
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
                id: nanoid(),
                symbol: symbol,
                priceBought: price,
                company: name,
                share: temp,
                cost: Math.abs(sold),
              });

              deleteStock({ userID: userID, symbol: symbol, company: name });

              tempQTY = 0;
              console.log("found <");
            }

            // found = 1;
            // console.log("found")
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

  // triggering amount state
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
          onClick={(event) => handleBalanceSubmit(event, buyAmount)}
        >
          <img src={buyIcon} alt="Buy" />
          Buy
        </button>
        <button
          className={globalStyles.sellButton}
          onClick={(event) => handleBalanceSubmit(event, sellAmount)}
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
          placeholder="MM/DD"
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
