import React from "react";
import styles from "./Signup.module.scss";
import Logo from "../../UI/Logo/Logo";
import Input from "../../UI/Input/Input";
import google from "../../../assets/icons/google.svg";
import Button from "../../UI/Button/Button";
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
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />

            {/* Create an account button*/}
            <div className={styles.cta}>
              <Button type="default">Create account</Button>

              {/* Google Login Button */}
              <Button type="google">
                <img src={google} alt="google" />
                Sign up with Google
              </Button>
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
