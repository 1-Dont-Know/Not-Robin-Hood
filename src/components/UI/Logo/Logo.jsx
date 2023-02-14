import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

const Logo = ({ children }) => {
  return (
    <>
      <Link className={styles.logo}>
        <h1>HobinRood</h1>
        <h2>.</h2>
      </Link>
    </>
  );
};

export default Logo;
