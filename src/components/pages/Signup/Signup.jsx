import React from "react";
import styles from "./Signup.module.scss";
import Logo from "../../UI/Logo/Logo";
import google from "../../../assets/icons/google.svg";
import globalStyles from "../../../styles/main.module.scss";
import { Link } from "react-router-dom";

const Signup = () => {
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
          {/* LOGIN FORM  */}
          <form className={styles.signupForm}>
            <h1>Create an account</h1>
            <h3>Make your parents happy.</h3>
            <input
              className={globalStyles.input}
              type="text"
              placeholder="Name"
            />
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

            {/* Create an account button*/}
            <div className={styles.cta}>
              <button className={globalStyles.defaultButton}>
                Create account
              </button>

              {/* Google Login Button */}
              <button className={globalStyles.googleButton}>
                <img src={google} alt="google" />
                Sign up with Google
              </button>
            </div>
            {/* LINK TO SIGNUP */}
            <p className={styles.loginLink}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>

          {/* FOOTER SECTION */}
          <p className={styles.footer}>console-cobras 2023 ⓒ</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
