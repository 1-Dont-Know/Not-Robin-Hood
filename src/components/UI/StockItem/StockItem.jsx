import React from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import cart from "../../../assets/icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import Accordion from "../../UI/Accordion/Acccordion";

const StockItem = ({ symbol, value }) => {
  return (
    <div>
      <div className={styles.buttonContainer}>
        <div className={styles.stockSymbol}>
          <button className={globalStyles.stockSymbolButton}>{symbol}</button>
        </div>
        <div className={styles.stockValue}>
          <button className={globalStyles.stockValueButton}>${value}</button>
        </div>

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
