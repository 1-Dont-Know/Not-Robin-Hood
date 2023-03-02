import React from "react";
import NotificationPopUp from "../../UI/NotificationPopUp/NotificationPopUp";
import AddFunds from "../../UI/AddFunds/AddFunds";
import Sidebar from "../../UI/Sidebar/Sidebar";
//import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Settings.module.scss";
import Button from "../../UI/Button/Button";
import buttonStyle from "../../UI/Button/Button.module.scss";
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
            {/* */}
            </section>

        </Hero>        
        <div className={styles.settingsNavBar}> 
          <Button type={"settingsPage"} className="saveChangesButton"><img src={settings} alt="settings"/>Settings<img src={divider} alt="divider"/></Button>
          <Button type={"settingsPage"} className="saveChangesButton"><img src={alert} alt="alert"/>Notifications<img src={divider} alt="divider"/></Button>
          <Button type={"settingsPage"} className="saveChangesButton"><img src={person} alt="person"/>Account Info<img src={divider} alt="divider"/></Button>        
        </div>
        </main>

        {/*Settings, Notifications, Account Info Container*/}
        <section className={styles.settingsContainer}>
        Hey hi hello yeah whats up

        {/*Save Changes Button*/}
          <section>
            <Button type={"saveChanges"}>Save Changes</Button>
          </section>

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
