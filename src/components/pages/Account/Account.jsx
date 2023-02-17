import React from "react";
import Button from "../../UI/Button/Button";
import cart from "../../../assets/icons/shopping-cart.svg";
import portfolioIcon from "../../../assets/icons/portfolio-icon.svg";

const Account = () => {
  return <div>
    Account page
    <Button type="buy"> 
      <img src={cart} alt="cart" />
      Buy
    </Button>

    <Button type="portfolio">
    <img src={portfolioIcon} alt="cart" />
      Portfolio
    </Button>
  </div>;
};

export default Account;
