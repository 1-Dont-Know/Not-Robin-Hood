import React, { useState } from "react";
import styles from "./AddFunds.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import people from "../../../assets/icons/people-icon.svg";
import creditCard from "../../../assets/icons/credit-card-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../redux/slices/balanceSlice";
import { checkIfNumber } from "../../../utils/helpers";

const AddFunds = ({ toggle }) => {
  // Currency State
  const [currency, setCurrency] = useState("usd");

  // Amount State
  const [amount, setAmount] = useState(0);

  // List of currencies
  const currencyList = {
    usd: "$",
    eur: "€",
    aud: "A$",
    cad: "C$",
  };

  const dispatch = useDispatch();

  // Currency Input Handler
  const currencyHandler = (e) => {
    setCurrency(e.target.value);
  };

  // Amount Input  Handler
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  // HANDLE PAYMENTS
  const paymentHandler = () => {
    dispatch(increment(amount));
    toggle();
  };

  return (
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
      <button onClick={paymentHandler} className={globalStyles.addFundsButton}>
        SELECT PAYMENT AND CONTINUE
      </button>
    </div>
  );
};

export default AddFunds;
