import React from "react";
import styles from "./StockViewer.module.scss";
import Button from "../../UI/Button/Button";
import bell from "../../../assets/icons/bell-icon.svg"
import profile from "../../../assets/icons/profile-icon.svg"
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

const TimeBar = () => {
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
};

//export default StockViewer;
export default TimeBar;