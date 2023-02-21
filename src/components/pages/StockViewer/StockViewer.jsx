import React from "react";
import styles from "./StockViewer.module.scss";
import Button from "../../UI/Button/Button";
import bell from "../../../assets/icons/bell-icon.svg"
import BuyBox from "../../UI/BuyBox/BuyBox";

const StockViewer = () => {
  return (
    <>
    {/* <Button type="notification"> 
      <img src={bell} alt="bell" />
      <div className={styles.notificationQty}>3</div>
    </Button> */}

    <BuyBox>

    </BuyBox>
    </>
  );
};

export default StockViewer;
