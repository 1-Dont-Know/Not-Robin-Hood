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
        <nav className={styles.nav}>
          <Logo />
        </nav>
      </div>
      <div className={styles.box}>
        <div className={styles.image}></div>
        <div className={styles.signup}>
          {/* !TODO: REGISTRATION / LOGIN FORM  */}
          <form className={styles.signinForm}>
            <h1>Sign in</h1>
            <h3>Release your bull.</h3>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            <div className={styles.cta}>
              {/* Sign in button*/}
              <Button type="login">Sign in</Button>
            </div>
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
