import React from 'react';
import StockItem from "../../UI/StockItem/StockItem";
import styles from "./Markets.module.scss";

const Posts = ({ posts }) => {

  return (
    <div className={styles.stocksSection}>
      {posts.map((item) => (
        <StockItem
          key = {item.displaySymbol}
          symbol = {item.displaySymbol}
          value = {item.currency}
          des = {item.description}
          type = {item.type}
          figi = {item.figi}
        />
      ))}
    </div>
  );
};

export default Posts;