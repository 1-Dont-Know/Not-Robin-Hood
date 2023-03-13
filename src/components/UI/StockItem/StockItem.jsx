import React from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import Accordion from "../../UI/Accordion/Acccordion";

const StockItem = ({ symbol, value }) => {
  return (
    <div className={styles.stockItem}>
      <div className={styles.buttonContainer}>
        {/* stock symbol button */}
        <div className={styles.stockSymbol}>
          <button className={globalStyles.stockSymbolButton}>{symbol}</button>
        </div>
        {/* stock value button */}
        <div className={styles.stockValue}>
          <button className={globalStyles.stockValueButton}>${value}</button>
        </div>
        {/* stock symbol button */}
        <div className={styles.stockInfoAccordion}>
          <Accordion title="Stock Information">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              mollitia cum consequatur nisi sit eligendi blanditiis, itaque,
              dolore dolores quia quisquam earum voluptates. Quo accusamus
              cumque consectetur minima quibusdam atque!
            </p>
          </Accordion>
        </div>
           {/* buy button */}
        <div className={styles.buyStock}>
          <Link to="/stock-viewer" className={globalStyles.whiteBuyButton}>
            <img src={cart} alt="cart" />
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
