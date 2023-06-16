import React, { useEffect, useState } from "react";
//import NotificationPopUp from "../../UI/NotificationPopUp/NotificationPopUp";
//import AddFunds from "../../UI/AddFunds/AddFunds";
//import Sidebar from "../../UI/Sidebar/Sidebar";
//import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Settings.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import Logo from "../../UI/Logo/Logo";
import logout from "../../../assets/icons/logout.svg";
import settings from "../../../assets/icons/settings.svg";
import alert from "../../../assets/icons/alert.svg";
import person from "../../../assets/icons/person.svg";
import { NavLink, Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode, toggleTheme } from './../../../redux/slices/darkModeSlice';
import { useChangePasswordMutation, useChangeNameMutation } from "../../../redux/slices/user/userApiSlice";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
//import AppFundsPopup from "../StockViewer/StockViewer";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  const tabFlags = {
    settings: 1,
    notifications: 2,
    accountInfo: 3,
  };

  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [oldPassworVal, setOldPasswordVal] = useState("");

  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState("");


  const [
    changePassword,
    {
      data: changePasswordData,
      isLoading: isLoading,
      isError: isError,
      isSuccess: isSuccess,
    }
  ] = useChangePasswordMutation();
  const [
    changeName,
    {
      data: changeNameData,
      isLoading: isNameLoading,
      isError: isNameError,
      isSuccess: isNameSuccess,
    }
  ] = useChangeNameMutation();

  const userID = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState(tabFlags.settings);
  const [selectedOption, setSelectedOption] = useState("Settings");


  const dispatch = useDispatch();
  const darkModeTheme = useSelector(selectDarkMode);


// When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {
    localStorage.setItem("darkMode", darkModeTheme);
  }, [darkModeTheme]);

  const newNameHandler = (e) => {
    setNewName(e.target.value)
  }
  const oldNameHandler = (e) => {
    setOldName(e.target.value)
  }

  // handler for new password
  const newPasswordHandler = (e) => {
    setNewPasswordVal(e.target.value)
  }
  const oldPasswordHandler = (e) => {
    setOldPasswordVal(e.target.value)
  }

  // Handling dark mode switch
  const handleToggle = () => {
    dispatch(toggleTheme(!darkModeTheme));
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setActiveTab(tabFlags[event.target.value]);
  };

  function handleTabSelect(selectedTab) {
    setActiveTab((curr) => {
      return (curr = selectedTab);
    });
  }

  const changeNameHandler = async (e) => {
    e.preventDefault();
    try{
      if(oldName !== newName && newName !== ""){
        const response = await changeName({userID, oldName, newName})
        console.log(response)
        if(!response.data){
          toast.error(response.error.data.message)
        }
        toast.success(response.data.message)
      }
      else{
        //toast
        toast.error("Names are the Same")
      }
    }catch (error){
      console.log(error)
    }
  }

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try{
      if(oldPassworVal !== newPasswordVal && newPasswordVal !== ""){
        console.log("old= " + oldPassworVal)
        
        console.log("ID = " + userID)
        const response = await changePassword({userID, newPassword: newPasswordVal, oldPassword: oldPassworVal})
        console.log(response)
        if(!response.data){
          toast.error(response.error.data.message)
        }
        toast.success(response.data.message)
      }
      else{
        // toast
        toast.error("Don't use the same password")
      }
    }catch (error){
      console.log(error)
    }
   
  };

  return (
    <>

     <div className={`${styles.container} ${darkModeTheme ? styles['dark-mode'] : ''}`}>
      <Toaster />
        {/* LOGO SECTION */}
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to="/" className={styles.closeSettingsBtn}>
          <button className={styles.stockCloseButton}>✖</button>
        </Link>
        {/*Logout section*/}
        <NavLink className={styles.logoutLink} to="/signup">
          <div className={styles.logoutButton} id="logout">
            <img src={logout} alt="logout" />
            Log out
          </div>
        </NavLink>
        <main className={styles.headerSection}>
          <section className={styles.featured}>Modify your settings.</section>

          {/* Settings Navigation */}
          <div className={styles.settingsNavBar}>
            <div className={styles.settingsNavLink}>
              <button
                className={globalStyles.settingsPageButton}
                onClick={(e) => {
                  handleTabSelect(tabFlags.settings);
                }}
                style={{
                  backgroundColor:
                    activeTab === tabFlags.settings ? "#37433a" : "#ffff",
                  color:
                    activeTab === tabFlags.settings ? "#d5e3e1" : "#37433a",
                }}
              >
                <img
                  src={settings}
                  alt="settings"
                  className={styles.settingsPageButton}
                  onClick={(e) => {
                    handleTabSelect(tabFlags.settings);
                  }}
                  style={{
                    filter:
                      activeTab === tabFlags.settings
                        ? "invert(1) contrast(200%) saturate(0)"
                        : "invert(0) contrast(200%) saturate(0)",
                  }}
                />
                Settings
              </button>
              <hr></hr>
            </div>

            {/* <img src={divider} alt="divider" id="divider"/> */}

            <div className={styles.settingsNavLink}>
              <button
                className={globalStyles.settingsPageButton}
                onClick={(e) => {
                  handleTabSelect(tabFlags.notifications);
                }}
                style={{
                  backgroundColor:
                    activeTab === tabFlags.notifications ? "#37433a" : "#ffff",

                  color:
                    activeTab === tabFlags.notifications
                      ? "#d5e3e1"
                      : "#37433a",
                }}
              >
                <img
                  src={alert}
                  alt="alert"
                  className={styles.settingsPageButton}
                  onClick={(e) => {
                    handleTabSelect(tabFlags.notifications);
                  }}
                  style={{
                    filter:
                      activeTab === tabFlags.notifications
                        ? "invert(1) contrast(200%) saturate(0)"
                        : "invert(0) contrast(200%) saturate(0)",
                  }}
                />
                Notifications
              </button>
              <hr></hr>
            </div>

            {/* <img src={divider} alt="divider" id="divider"/> */}

            <div className={styles.settingsNavLink}>
              <button
                className={globalStyles.settingsPageButton}
                onClick={(e) => {
                  handleTabSelect(tabFlags.accountInfo);
                }}
                style={{
                  backgroundColor:
                    activeTab === tabFlags.accountInfo ? "#37433a" : "#ffff",

                  color:
                    activeTab === tabFlags.accountInfo ? "#d5e3e1" : "#37433a",
                }}
              >
                <img
                  src={person}
                  alt="person"
                  className={styles.settingsPageButton}
                  onClick={(e) => {
                    handleTabSelect(tabFlags.accountInfo);
                  }}
                  style={{
                    filter:
                      activeTab === tabFlags.accountInfo
                        ? "invert(1) contrast(200%) saturate(0)"
                        : "invert(0) contrast(200%) saturate(0)",
                  }}
                />
                Account Info
              </button>
              <hr></hr>
            </div>
            {/* <img src={divider} alt="divider" id="divider"/>    */}
          </div>
          <div className={styles.settingsNavBarCollapsed}>
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="settings">Settings</option>
              <option value="notifications">Notifications</option>
              <option value="accountInfo">Account Info</option>
            </select>
          </div>
        </main>

        {/*Settings, Notifications, Account Info Container*/}

        {/*Settings Tab*/}
        <section className={styles.settingsContainer}>
          <section className={styles.saveChanges}>
            {/*Save Changes Button*/}

            <button
              className={globalStyles.saveChangesButton}
              id="mainSaveChanges"
            >
              Save Changes
            </button>
          </section>
          {/* General settings */}
          {activeTab === tabFlags.settings && (
            <div className={styles.settings}>
              <h1 id="settingsOption">Dark Mode</h1>
                <input
                  type="checkbox"
                  id="switch"
                  checked={Boolean(darkModeTheme)}
                  onChange={handleToggle}
                />
                <label className={styles.switchLabel} htmlFor="switch">
                Toggle
                </label>
            </div>
          )}

          {activeTab === tabFlags.notifications && (
            <>
              {/* notifications */}
              <div className={styles.notifications}>
                <h1 id="settingsOption">Receive Notifications</h1>
                <input type="checkbox" id="switch1" />
                <label className={styles.switchLabel} htmlFor="switch1">
                  Receive Notifications
                </label>
              </div>
              <div className={styles.notifications}>
                <h1 id="textOptions">Text Notifications</h1>
                <input type="checkbox" id="switch2" />
                <label className={styles.switchLabel} htmlFor="switch2">
                  Text Notifications
                </label>
              </div>
              <div className={styles.notifications}>
                <h2 id="textNumber">Text Number</h2>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="(___)---___---____"
                />
              </div>
            </>
          )}

          {/* Account Info user settings */}
          {activeTab === tabFlags.accountInfo && (
            <>
              <div className={styles.accountInfo}>
                <div className={styles.changePass}>
                  <h1 id="settingsOption">Change your password</h1>
                  <input
                    type="text"
                    id="password"
                    placeholder="current password"
                    value={oldPassworVal}
                    onChange={oldPasswordHandler}
                  />
                  <input type="text" id="password" placeholder="new password" value={newPasswordVal} onChange={newPasswordHandler}/>
                  <button className={globalStyles.saveChangesButton} onClick={changePasswordHandler}>
                    Save
                  </button>
                </div>

                <div className={styles.changeName}>
                  <h1 id="settingsOption">Change your name</h1>
                  <input type="text" id="name" placeholder="current name" value={oldName} onChange={oldNameHandler}/>
                  <input type="text" id="name" placeholder="new name" value={newName} onChange={newNameHandler}/>
                  <button className={globalStyles.saveChangesButton} onClick={changeNameHandler}>
                    Save
                  </button>
                </div>

                <div className={styles.del}>
                  <h1 id="settingsOption">Delete Account</h1>
                  <button
                    className={globalStyles.saveChangesButton}
                    id="delete"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
        <div className={styles.image}>{/*Bull background image*/}</div>
      </div>
    </>
  );
};

export default Settings;
