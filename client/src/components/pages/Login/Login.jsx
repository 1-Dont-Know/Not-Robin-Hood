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
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // * TO GIVE FOCUS ON INPUT

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  // * HANDLING FORM SUBMISSION

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/account");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrMsg("No Server Response");
      } else if (error.originalStatus?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error?.originalStatus?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
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
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <form onSubmit={handleSubmit} className={styles.signinForm}>
              <h1>Sign in</h1>
              <h3>Release your bull.</h3>
              <p ref={errRef}>{errMsg}</p>
              <input
                className={globalStyles.input}
                type="email"
                placeholder="Email"
                ref={userRef}
                value={user}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
              <input
                className={globalStyles.input}
                type="password"
                placeholder="Password"
                onChange={handlePwdInput}
                value={pwd}
                required
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
