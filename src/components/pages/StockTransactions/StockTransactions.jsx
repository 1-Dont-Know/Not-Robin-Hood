import React from "react";
import styles from "./StockTransactions.module.scss";
import Search from "../../UI/Search/Search";
import Sidebar from "../../UI/Sidebar/Sidebar";

const StockTransactions = () => {
  return (
    <div>
      {/* <Search placeholder="Search for Market" /> */}
      <Sidebar />
    </div>
  );
};

export default StockTransactions;
