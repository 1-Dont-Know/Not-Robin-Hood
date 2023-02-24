import React from "react";
import styles from "./StockViewer.module.scss";
import Button from "../../UI/Button/Button";
import bell from "../../../assets/icons/bell-icon.svg"
import people from "../../../assets/icons/people-icon.svg"
import creditCard from "../../../assets/icons/credit-card-icon.svg"
import BuyBox from "../../UI/BuyBox/BuyBox";

const StockViewer = () => {
  return (
    <>
    {/* <Button type="notification"> 
      <img src={bell} alt="bell" />
      <div className={styles.notificationQty}>3</div>
    </Button> */}
    {/* <Button type="profile">
      <img src={profile} alt="profile" />
      <div className={styles.profileQty}>3</div>

      </Button> */}
        

    <BuyBox>

    </BuyBox>
    </>
  );
}; 
/*const TimeBar = () => {
  return (
    <>
    <div className={styles.timeBar}>
      <Button type="timeBar"><div className={styles.timeBarButton}>1d</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>5d</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>2w</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>1m</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>6m</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>1y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>5y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>7y</div></Button>
      <Button type="timeBar"><div className={styles.timeBarButton}>MAX</div></Button>
    </div>
    </>
  );
};*/

const AppFundsPopup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Header}>
        <h3 className={styles.title}><center>Add funds</center></h3>
          <div>
            <h3><center>Select payments option to add balance to your funds for trading</center></h3>
          </div>
      </div>
      <div className="Currency">
        <div className={styles.title}>
          <h3>Deposit Amount</h3>
          <select name="currency" id="currency">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="aud">AUD</option>
          <option value="cad">CAD</option>
          </select>
        </div>
      </div>
        <div className={styles.buttonContainer + "Mid-1"}>
         <Button type="fundButton"><div className={styles.timeBarButton}>$50</div></Button>
         <Button type="fundButton"><div className={styles.timeBarButton}>$100</div></Button>
         <Button type="fundButton"><div className={styles.timeBarButton}>$500</div></Button>
          <input type="number" id="Name" name="Amount" placeholder="Enter amount"></input>
        </div>
      <div className={styles.buttonContainer + "Mid-2"}>
        <Button type="fundButton"><div className={styles.timeBarButton}><img src={people} alt="profile"/>Credit/Debit</div></Button>
        <Button type="fundButton"><div className={styles.timeBarButton}><img src={creditCard} alt="credit-card"/>Bank Transfer</div></Button>
      </div>
      
      <div className={styles.buttonContainer + "Footer"}>
        <h3 className={styles.emphasize}>Save as a default payment</h3>
        <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
        <Button type="fundButton"><div className={styles.timeBarButton}>SELECT PAYMENT AND CONTINUE</div></Button>
      </div>

    </div>
  );
  /*   return (
    <div className={styles.container}>
      <h3 className={styles.title}>Asset Value</h3>
      <p className={styles.amount}>
        $12,345,67 <span>USD</span>
      </p>
      <div className={styles.results}>
        $51.29(4.78%)<span>Today</span>
      </div>
    </div>
  ); */
};

//export default StockViewer;
//export default TimeBar;
export default AppFundsPopup;