import React from "react";
import styles from "./StockItem.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import cart from "../../../assets/icons/shopping-cart.svg";

// Accordion components that take in props as argument
// manages its open/closed state with the isOpen state variable
function Accordion(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  // When the user clicks on the accordion, the toggleAccordion function is called to toggle the state of isOpen.
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.stockInfo}>
      {/* added onClick where trigger function called toggleAccordion when clicked */}
      <button className={globalStyles.stockInfoButton} onClick={toggleAccordion}>
        {/* props.title is used to display the title of the accordion, which is "Stock Information" in this case */}
        <p>{props.title}</p>
        <img src={DownVectorIcon} alt="arrow down" className={isOpen ? styles.rotated : ""}/>
      </button>
      {/* Check if the accordion should be open and show the content if true */}
      {isOpen && (
        <div className={styles.stockInfoContent}>
          {/* props.children is calling the <p> inside the accordion */}
          <div className={styles.stockInfoText}>{props.children}</div>
        </div>
      )}
    </div>
  );
}

const StockItem = ({ symbol, value }) => {

  return (
    <div>
      <div className={styles.stockSection}>
        <div className={styles.stockBody}>

          <button className={globalStyles.stockSymbolButton}>
            {symbol}
          </button>

          <button className={globalStyles.stockValueButton}>
            ${value}
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
  );
};

export default StockItem;