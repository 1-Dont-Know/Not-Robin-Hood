import React from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import Accordion from "../../UI/Accordion/Acccordion";

const StockItem = ({ symbol, value, des, type, figi }) => {

  const description = () => {
    return(
      <div>
        { des }
        <br></br>
        Type: { type }
        <br></br>
        Figi: { figi }
        <br></br>
      </div>
    )
  }

  return (
    <div className={styles.stockItem}>
      <div className={styles.buttonContainer}>
        {/* stock symbol button */}
        <div className={styles.stockSymbol}>
          <button className={globalStyles.stockSymbolButton}>{symbol}</button>
        </div>
        {/* stock value button */}
        <div className={styles.stockValue}>
          <button className={globalStyles.stockValueButton}>{value}</button>
        </div>
        {/* stock symbol button */}
        <div className={styles.stockInfoAccordion}>
          <Accordion title="Stock Information">
            { description() }
          </Accordion>
        </div>
           {/* buy button */}
        <div className={styles.buyStock}>
          <Link  to={{ 
            pathname: "/stock-viewer", 
            search: `?symbol=${symbol}&description=${des}`
            }}  
            className={globalStyles.whiteBuyButton}
          >
            <img src={cart} alt="cart" />
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
