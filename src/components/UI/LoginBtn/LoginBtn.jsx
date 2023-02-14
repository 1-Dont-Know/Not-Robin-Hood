import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginBtn.module.scss";

const LoginBtn = ({ children }) => {
  return (
    <>
      <Link className={styles.loginBtn} to="/login">
        {children}
      </Link>
    </>
  );
};

export default LoginBtn;
