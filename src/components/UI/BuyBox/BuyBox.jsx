import React from "react";
import styles from "./BuyBox.module.scss";
import Button from "../Button/Button";

const BuyBox = ({ type, placeholder }) => {
    return (
      <div className={styles.BuyBody}>
            <div className={styles.wrapper}>
            <div className={styles.button}> 
                <Button type="buyBox"> Buy </Button>
                <Button type="sell"> Sell </Button>
            </div>
                <input type="select" className={styles.dropdown} value="QTR"/>
                <input type="select" className={styles.dropdown} value="MM/DD"/>

                <h1>Queue Order</h1>
                <div className={styles.orders}>
                    <p>Order conformation</p>
                </div>
            </div>
        </div>
  
    );
  };
  
  export default BuyBox;
  