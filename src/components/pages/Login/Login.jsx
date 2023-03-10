import React from "react";
import styles from "./Login.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import Logo from "../../UI/Logo/Logo";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* NAVIGATION SECTION  */}
        <nav className={styles.nav}>
          {/* LOGO SECTION */}
          <Logo />
        </nav>
      </div>
      <div className={styles.box}>
        <div className={styles.image}></div>
        <div className={styles.signup}>
          {/*  LOGIN FORM  */}
          <form className={styles.signinForm}>
            <h1>Sign in</h1>
            <h3>Release your bull.</h3>
            <input
              className={globalStyles.input}
              type="email"
              placeholder="Email"
            />
            <input
              className={globalStyles.input}
              type="password"
              placeholder="Password"
            />
            {/* SIGN IN BUTTON SECTION */}
            <div className={styles.cta}>
              {/* Sign in button*/}
              <button className={globalStyles.loginButton}>Sign in</button>
            </div>
            {/* LINK TO SIGN UP */}
            <p className={styles.loginLink}>
              New to HobinRood? <Link to="/signup">Sign up for free</Link>
            </p>
          </form>
          <p className={styles.footer}>console-cobras 2023 ⓒ</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
