import React, { useState } from "react";
import styles from "./BuyBox.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import buyIcon from "../../../assets/icons/shopping-cart.svg";

const BuyBox = ({ type, placeholder, price }) => {
  const [qty, setQty] = useState("QTR");

  function totalHandler(price) {
    return price * qty;
  }

  const qtyHandler = (e) => {
    setQty(e.target.value);
  };

  return (
    <div className={styles.BuyBody}>
      {/* CALL TO ACTION BUTTONS SECTION */}
      <section className={styles.ctaSection}>
        <button className={globalStyles.buyBoxButton}>
          <img src={buyIcon} alt="Buy" />
          Buy
        </button>
        <button className={globalStyles.sellButton}>
          <img src={buyIcon} alt="Sell" />
          Sell
        </button>
      </section>
      {/* INPUTS SECTION */}
      <section className={styles.inputsSection}>
        {/* Quantity Input */}
        <input
          value={qty}
          onChange={qtyHandler}
          type="number"
          id="Quantity"
          className={styles.inputBoxes}
          placeholder="QTR"
        />
        {/* Date Input */}
        <input
          type="date"
          id="userDate"
          className={styles.inputBoxes}
          placeholder="MM/DD"
        />
        {/* Total Amount  */}
        <div type="number" className={styles.inputBoxes}>
          Total: ${qty === "QTR" ? 0 : totalHandler(price)}
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
