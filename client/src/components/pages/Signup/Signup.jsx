import React, { useState, useEffect } from "react";
import styles from "./Signup.module.scss";
import Logo from "../../UI/Logo/Logo";
import google from "../../../assets/icons/google.svg";
import globalStyles from "../../../styles/main.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../redux/slices/user/userApiSlice";

import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const [registerUser, { isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  const inputsHandler = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const navigate = useNavigate();

  const errorsContent = errors.map((error) => {
    return <li key={error.msg}>{error.msg}</li>;
  });

  const registrationHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userData);
      const { data, error } = response;
      if (data) {
        const successNotification = () =>
          toast.success("You've successfully created account");
        successNotification();
        setUserData({
          name: "",
          email: "",
          password: "",
        });
        // navigate("/login");
      }
      if (error) {
        setErrors(error.data.errors.map((item) => item.msg));
        const errorNotification = () => toast.error(errors.toString());
        errorNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <Logo />
        </nav>
      </div>
      <div className={styles.box}>
        <div className={styles.image}></div>
        {/* {isError && errorsContent}
        {isSuccess && successMsg} */}
        <Toaster />
        <div className={styles.signup}>
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {" "}
              {/* LOGIN FORM  */}
              <form
                onSubmit={registrationHandler}
                className={styles.signupForm}
              >
                <h1>Create an account</h1>
                <h3>Make your parents happy.</h3>
                <input
                  className={globalStyles.input}
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={inputsHandler}
                  autoComplete="off"
                  required
                />
                <input
                  className={globalStyles.input}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={inputsHandler}
                  autoComplete="off"
                  required
                />
                <input
                  className={globalStyles.input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={inputsHandler}
                  autoComplete="off"
                  required
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
            </>
          )}

          {/* FOOTER SECTION */}
          <p className={styles.footer}>console-cobras 2023 ⓒ</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
