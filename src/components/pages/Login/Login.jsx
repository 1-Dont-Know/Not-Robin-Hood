import React from "react";
import styles from "./Login.module.scss";
import Logo from "../../UI/Logo/Logo";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
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
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            {/* SIGN IN BUTTON SECTION */}
            <div className={styles.cta}>
              {/* Sign in button*/}
              <Button type="login">Sign in</Button>
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
