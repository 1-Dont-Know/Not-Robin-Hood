import React, { useState } from "react";
import styles from "./AddFunds.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import people from "../../../assets/icons/people-icon.svg";
import creditCard from "../../../assets/icons/credit-card-icon.svg";
import { checkIfNumber } from "../../../utils/helpers";
import {
  useAddBalanceMutation,
  useAddStockTransactionsMutation,
  useGetUserByIdQuery,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";

import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import { nanoid } from "nanoid";

const AddFunds = ({ toggle }) => {
  const userID = useSelector(selectCurrentUser);

  // Amount State
  const [amount, setAmount] = useState(0);
  // Destructuring RTK.Query Hook for updating user's balance
  const [addBalance, { isLoading, isError, isSuccess }] =
    useAddBalanceMutation();

  // Currency State
  const [currency, setCurrency] = useState("usd");

  // Updating our transactions list (add stock purchase transaction to the list), when buying stock.
  const [updateTransactions] = useAddStockTransactionsMutation();

  // List of currencies
  const currencyList = {
    usd: "$",
    eur: "€",
    aud: "A$",
    cad: "C$",
  };
  // Notifications handler
  const successNotification = () =>
    toast.success("You've successfully updated your balance");

  // Currency Input Handler
  const currencyHandler = (e) => {
    setCurrency(e.target.value);
  };

  // Amount Input  Handler
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  // Setting popup balance date
  const currentDate = new Date();
  // Get the month with leading zero if necessary
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  // today's date (formatted)
  const defaultDate = `${currentDate.getFullYear()}-${month}-${currentDate.getDate()}`;
  // HANDLE PAYMENTS

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (amount && amount > 0) {
      addBalance({ id: userID, amount });
      successNotification();
      setAmount(0);
      updateTransactions({
        userID,
        id: nanoid(),
        name: "ADD BALANCE",
        price: amount,
        description: `Add balance of $${amount}`,
        date: defaultDate,
      });
      // setTimeout(() => {
      //   toggle();
      // }, 3000);
    } else {
      toast.error("Enter amount please!");
    }
  };
  // if (isLoading) return <Loading />;
  if (isError) return <p>Error: {isError.message}</p>;

  return (
    <>
      <Toaster />
      <div className={styles.gridContainerAppFunds}>
        {/* 1 - title and subtitle */}
        <div style={{ textAlign: "center" }}>
          <h2 className={styles.modalHeader}>Add funds</h2>
          <p>Select payments option to add balance to your funds for trading</p>
        </div>
        {/* 2 - currency dropdown menu */}
        <div className={styles.currencyContainer}>
          <h3>Deposit Amount</h3>
          <select
            value={currency}
            name="currency"
            id="currency"
            onChange={currencyHandler}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="aud">AUD</option>
            <option value="cad">CAD</option>
          </select>
        </div>
        {/* 3 - $50 button */}
        <div className={styles.amountContainer}>
          <input
            type="radio"
            name="amount"
            onClick={amountHandler}
            value="50"
            id="50"
          />
          <label className={globalStyles.addFundsButton} htmlFor="50">
            {currencyList[currency]}50
          </label>
        </div>

        {/* 4 - $100 button */}
        <div className={styles.amountContainer}>
          <input
            type="radio"
            name="amount"
            onClick={amountHandler}
            value="100"
            id="100"
          />
          <label className={globalStyles.addFundsButton} htmlFor="100">
            {" "}
            {currencyList[currency]}100
          </label>
        </div>

        {/* 5 - $500 button */}
        <div className={styles.amountContainer}>
          <input
            type="radio"
            name="amount"
            onClick={amountHandler}
            value="500"
            id="500"
          />

          <label className={globalStyles.addFundsButton} htmlFor="500">
            {currencyList[currency]}500
          </label>
        </div>

        {/* 6 - custom amount input */}
        <input
          className={styles.currencyInput}
          type="number"
          name="Amount"
          value={amount}
          onChange={amountHandler}
          placeholder="Enter amount"
          onKeyDown={(event) => checkIfNumber(event)}
        />
        {/* 7 - credit/debit button */}
        <div className={styles.amountContainer}>
          <input type="radio" name="type" id="credit" />
          <label className={globalStyles.addFundsButton} htmlFor="credit">
            <img src={people} alt="profile" />
            Credit/Debit
          </label>
        </div>
        {/* 8 - bank transfer button */}
        <div className={styles.amountContainer}>
          <input type="radio" name="type" id="bank" />
          <label className={globalStyles.addFundsButton} htmlFor="bank">
            <img src={creditCard} alt="credit-card" />
            Bank Transfer
          </label>
        </div>
        {/* 9 - save as default toggle */}
        <div className={styles.toggleContainer}>
          <strong>Save as a default payment</strong>
          <input type="checkbox" id="switch" />
          <label className={styles.switchLabel} htmlFor="switch">
            Toggle
          </label>
        </div>
        {/* 10 - select payment and continue button */}
        <button
          onClick={(event) => handleBalanceSubmit(event)}
          className={globalStyles.addFundsButton}
        >
          SELECT PAYMENT AND CONTINUE
        </button>
      </div>
    </>
  );
};

export default AddFunds;
