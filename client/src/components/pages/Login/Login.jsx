import React, { useState, useRef, useEffect } from "react";
import styles from "./Login.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import Logo from "../../UI/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/slices/auth/authSlice";
import { useLoginMutation } from "../../../redux/slices/auth/authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // TO NAVIGATE TO ACCOUNT PAGE AFTER SUCCESS LOGIN
  const navigate = useNavigate();

  // INPUTS DATA HANDLER

  const loginDataHandler = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const [
    login,
    {
      data: loginData,
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();
  const dispatch = useDispatch();

  // * TO GIVE FOCUS ON INPUT

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [userData.email, userData.password]);

  // * HANDLING FORM SUBMISSION

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      await login(userData);
    } else {
      alert("Please fill in all inputs");
    }

    try {
      const credentials = await login({ ...userData }).unwrap();
      // dispatch(setCredentials({ ...credentials, user }));
      setUserData({
        email: "",
        password: "",
      });
      // navigate("/account");
      console.log(credentials);
    } catch (error) {
      if (!error?.originalStatus) {
        setErrorMessage("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrorMessage("Missing Username or Password");
      } else if (error?.originalStatus === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };

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
          {isLoginLoading ? (
            <h1>Loading...</h1>
          ) : (
            <form onSubmit={handleSubmit} className={styles.signinForm}>
              <h1>Sign in</h1>
              <h3>Release your bull.</h3>
              <p ref={errRef}>{errorMessage}</p>
              <input
                className={globalStyles.input}
                type="email"
                placeholder="Email"
                ref={userRef}
                value={userData.email}
                name="email"
                onChange={loginDataHandler}
                autoComplete="off"
                // required
              />
              <input
                className={globalStyles.input}
                type="password"
                placeholder="Password"
                onChange={loginDataHandler}
                value={userData.password}
                name="password"
                // required
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
          )}

          <p className={styles.footer}>console-cobras 2023 ⓒ</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
