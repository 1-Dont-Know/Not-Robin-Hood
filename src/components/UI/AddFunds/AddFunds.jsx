import React from "react";
import styles from "./AddFunds.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import people from "../../../assets/icons/people-icon.svg";
import creditCard from "../../../assets/icons/credit-card-icon.svg";

const AddFunds = () => {
  return (
    <div className={styles.gridContainerAppFunds}>
      {/* 1 - title and subtitle */}
      <div style={{ textAlign: "center" }}>
        <h1>✖</h1>
        <h2 className={styles.modalHeader}>Add funds</h2>
        <p>Select payments option to add balance to your funds for trading</p>
      </div>

      {/* 2 - currency dropdown menu */}
      <div className={styles.currencyContainer}>
        <h3>Deposit Amount</h3>
        <select
          name="currency"
          id="currency"
          onfocus="this.size=10;"
          onblur="this.size=0;"
          onchange="this.size=1; this.blur();"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="aud">AUD</option>
          <option value="cad">CAD</option>
        </select>
      </div>

      {/* 3 - $50 button */}
      <button className={globalStyles.addFundsButton}>$50</button>

      {/* 4 - $100 button */}
      <button className={globalStyles.addFundsButton}>$100</button>

      {/* 5 - $500 button */}
      <button className={globalStyles.addFundsButton}>$500</button>

      {/* 6 - custom amount input */}
      <input
        className={styles.currencyInput}
        type="number"
        name="Amount"
        placeholder="Enter amount"
      />

      {/* 7 - credit/debit button */}
      <button className={globalStyles.addFundsButton}>
        <img src={people} alt="profile" />
        Credit/Debit
      </button>

      {/* 8 - bank transfer button */}
      <button className={globalStyles.addFundsButton}>
        <img src={creditCard} alt="credit-card" />
        Bank Transfer
      </button>

      {/* 9 - save as default toggle */}
      <div className={styles.toggleContainer}>
        <strong>Save as a default payment</strong>
        <input type="checkbox" id="switch" />
        <label for="switch">Toggle</label>
      </div>

      {/* 10 - select payment and continue button */}
      <button className={globalStyles.addFundsButton}>
        SELECT PAYMENT AND CONTINUE
      </button>
    </div>
  );
};

export default AddFunds;
