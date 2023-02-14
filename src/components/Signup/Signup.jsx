import React from "react";
import styles from "./Signup.module.scss";
import Logo from "../UI/Logo/Logo";
import LoginBtn from "../UI/LoginBtn/LoginBtn";
import Input from "../UI/Input/Input";
import CreateAccountBtn from "../UI/CreateAccBtn/CreateAccountBtn";
import GoogleBtn from "../UI/GoogleBtn/GoogleBtn";
import google from "../../assets/icons/google.svg";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <LoginBtn>Login</LoginBtn>
          <Logo />
        </nav>
      </div>
      <div className={styles.box}>
        <div className={styles.image}></div>
        <div className={styles.signup}>
          <form className={styles.signupForm}>
            <h1>Create an account</h1>
            <h3>Make your parents happy.</h3>
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <CreateAccountBtn>Create account</CreateAccountBtn>
            <GoogleBtn>
              <img src={google} alt="google" />
              Sign up with Google
            </GoogleBtn>
          </form>
          <p className={styles.footer}>console-cobras 2023 ⓒ</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
