import React, { useState } from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import cart from "../../../assets/icons/shopping-cart.svg";

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.stockInfo}>
      <button className={globalStyles.stockInfoButton} onClick={toggleAccordion}>
        <p>{props.title}</p>
        <img src={DownVectorIcon} alt="arrow down" className={isOpen ? styles.rotated : ""}/>
      </button>
      {isOpen && (
        <div className={styles.stockInfoContent}>
          <div className={styles.stockInfoText}>{props.children}</div>
        </div>
      )}
    </div>
  );
}
/*fake data */
const stockSymbols = ["AAPL", "GOOG", "TSLA", "AMZN", "FB"];
const stockValues = [100, 200, 300, 400, 500];

const generateRandomStockValue = () => {
  const randomIndex = Math.floor(Math.random() * stockValues.length);
  return stockValues[randomIndex];
};


const StockMarket = () => {
  return (
    <>
      <div>
        <div className={styles.stockSection}>
          <div className={styles.stockBody}>
            
            <button className={globalStyles.stockSymbolButton}>
              {stockSymbols[Math.floor(Math.random() * stockSymbols.length)]}
            </button>

            <button className={globalStyles.stockValueButton}>
              ${generateRandomStockValue()}
            </button>

            <Accordion title="Stock Information">
              <p>This is the content for Stock Information.</p>
            </Accordion>

            <button className={globalStyles.whiteBuyButton}>
              <img src={cart} alt="cart"/>
              Buy
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default StockMarket;