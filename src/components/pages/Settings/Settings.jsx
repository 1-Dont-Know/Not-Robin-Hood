import React, { useState } from "react";
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
//import AppFundsPopup from "../StockViewer/StockViewer";

const Settings = () => {
  const tabFlags = {
    settings: 1,
    notifications: 2,
    accountInfo: 3,
  };

  const [activeTab, setActiveTab] = useState(tabFlags.settings);
  const [selectedOption, setSelectedOption] = useState("Settings");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setActiveTab(tabFlags[event.target.value]);
  };

  function handleTabSelect(selectedTab) {
    setActiveTab((curr) => {
      return (curr = selectedTab);
    });
  }

  return (
    <>
      <div className={styles.container}>
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
              <input type="checkbox" id="switch" />
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
                  />
                  <input type="text" id="password" placeholder="new password" />
                  <button className={globalStyles.saveChangesButton}>
                    Save
                  </button>
                </div>

                <div className={styles.changeName}>
                  <h1 id="settingsOption">Change your name</h1>
                  <input type="text" id="name" placeholder="current name" />
                  <input type="text" id="name" placeholder="new name" />
                  <button className={globalStyles.saveChangesButton}>
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
