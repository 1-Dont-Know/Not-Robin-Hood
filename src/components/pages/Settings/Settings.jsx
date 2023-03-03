import React from "react";
import NotificationPopUp from "../../UI/NotificationPopUp/NotificationPopUp";
import AddFunds from "../../UI/AddFunds/AddFunds";
import Sidebar from "../../UI/Sidebar/Sidebar";
//import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Settings.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import Logo from "../../UI/Logo/Logo";
import logout from "../../../assets/icons/logout.svg";
import settings from "../../../assets/icons/settings.svg";
import alert from "../../../assets/icons/alert.svg";
import person from "../../../assets/icons/person.svg";
import divider from "../../../assets/icons/divider.svg";
import Hero from "../../UI/Hero/Hero";
import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
  <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo></Logo>  
        </div>

        <main className={styles.mainSection}>
          <Hero>
            {/* */}
              <section className={styles.featured}>
                Modify your settings.
            {/* */}
            </section>

        </Hero>        
        <div className={styles.settingsNavBar}>
          <button className={globalStyles.settingsPageButton}><img src={settings} alt="settings"/>
            Settings</button><img src={divider} alt="divider" id="divider"/>
          <button className={globalStyles.settingsPageButton}><img src={alert} alt="alert"/>
            Notifications</button><img src={divider} alt="divider" id="divider"/>
          <button className={globalStyles.settingsPageButton}><img src={person} alt="person"/>
            Account Info</button><img src={divider} alt="divider" id="divider"/>       
        </div>
        </main>

        {/*Settings, Notifications, Account Info Container*/}
        {/*Settings Tab*/}
        <section className={styles.settingsContainer}>
          <h1 id="settingsOption">Dark Mode</h1>
          <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
        {}
          <h1 id="settingsOption">Receive Notifications</h1>
            <input type="checkbox" id="switch" /><label for="switch">Receive Notifications</label>
            
          <h1 id="settingsOption">Text Notifications</h1>
            <input type="checkbox" id="switch" /><label for="switch">Text Notifications</label>

          <h2 id="settingsOption">Text Number</h2>
            <input type="text" id="phoneNumber" placeholder="(___)---___---____"/>
            
          <h1 id="settingsOption">Change your password</h1>
            <input type="text" id="password" placeholder="current password"/>
            <input type="text" id="password" placeholder="new password"/>
            <button className={globalStyles.saveChangesButton}>Save</button>

          <h1 id="settingsOption">Change your name</h1>
            <input type="text" id="name" placeholder="current name"/>
            <input type="text" id="name" placeholder="new name"/>
            <button className={globalStyles.saveChangesButton}>Save</button>

          <h1 id="settingsOption">Delete Account</h1>
            <button className={globalStyles.saveChangesButton} id="delete">Delete Account</button>

        </section>

        {/*Save Changes Button*/}
        <section>
          <button className={globalStyles.saveChangesButton}>Save Changes</button>
        </section>
    
        {/*Logout section*/}
        <NavLink to="/signup">
          <div className={styles.listItem} id="logout">
            <img src={logout} alt="logout" />
            Log out
          </div>
        </NavLink>
        
      </div>
      <br></br>
  </>
  );
};

export default Settings;
