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
import { NavLink } from "react-router-dom";
//import AppFundsPopup from "../StockViewer/StockViewer";

const Settings = () => {
  const tabFlags = {
    settings: 1,
    notifications: 2,
    accountInfo: 3,
  }

  const [activeTab, setActiveTab] = useState(tabFlags.settings)

  function handleTabSelect(selectedTab) {

    setActiveTab(curr => { 
      return curr = selectedTab;
    });
  }


  return (
  <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo></Logo>  
          <button className={styles.stockCloseButton}>✖</button>
        </div>

        <main className={styles.headerSection}>
          
            <section className={styles.featured}>
              Modify your settings.
            </section>

        <div className={styles.settingsNavBar}>
          <div className={styles.settingsNavLink}>
          <button className={globalStyles.settingsPageButton} onClick={(e) =>{ handleTabSelect(tabFlags.settings)} }>
            <img src={settings} alt="settings" className={styles.settingsPageButton}/>
            Settings
          </button>
          <hr></hr>
          </div>
          {/* <img src={divider} alt="divider" id="divider"/> */}
          
          <div className={styles.settingsNavLink}>
          <button className={globalStyles.settingsPageButton} onClick={(e) => {handleTabSelect(tabFlags.notifications)}}>
            <img src={alert} alt="alert"/>
            Notifications
          </button>
          <hr></hr>
          </div>
          
          {/* <img src={divider} alt="divider" id="divider"/> */}
          
          <div className={styles.settingsNavLink}>
          <button className={globalStyles.settingsPageButton} onClick={(e) => {handleTabSelect(tabFlags.accountInfo)}}>
            <img src={person} alt="person"/>
            Account Info
          </button>
          <hr></hr>
          </div>
          {/* <img src={divider} alt="divider" id="divider"/>    */}
          

        </div>
        </main>

        {/*Settings, Notifications, Account Info Container*/}

        {/*Settings Tab*/}
        <section className={styles.settingsContainer}>
          {/* General settings */}
          {(activeTab === tabFlags.settings) &&
            <div className={styles.settings}>
              <h1 id="settingsOption">Dark Mode</h1>
              <input type="checkbox" id="switch" /><label htmlFor="switch">Toggle</label>
            </div>
          }
        
          {(activeTab === tabFlags.notifications) &&
          <>
            {/* notifications */}
            <div className={styles.notifications}>
              <h1 id="settingsOption">Receive Notifications</h1>
              <input type="checkbox" id="switch_1" /><label htmlFor="switch_1">Receive Notifications</label>
            </div>
            <div className={styles.notifications}>
              <h1 id="textOptions">Text Notifications</h1>
              <input type="checkbox" id="switch_2" />
              <label htmlFor="switch_2">Text Notifications</label>
            </div>
            <div className={styles.notifications}>
              <h2 id="textNumber">Text Number</h2>
              <input type="text" id="phoneNumber" placeholder="(___)---___---____"/>
            </div>
          </>
          }

          {/* Account Info user settings */}
            {(activeTab === tabFlags.accountInfo) &&
            <>
            <div className={styles.accountInfo}>
              <div className={styles.changePass}>
                <h1 id="settingsOption">Change your password</h1>
                  <input type="text" id="password" placeholder="current password"/>
                  <input type="text" id="password" placeholder="new password"/>
                  <button className={globalStyles.saveChangesButton}>Save</button>
              </div>

              <div className={styles.changeName}>
                <h1 id="settingsOption">Change your name</h1>
                  <input type="text" id="name" placeholder="current name"/>
                  <input type="text" id="name" placeholder="new name"/>
                  <button className={globalStyles.saveChangesButton}>Save</button>
              </div> 

              <div className={styles.del}>
                <h1 id="settingsOption">Delete Account</h1>
                  <button className={globalStyles.saveChangesButton} id="delete">Delete Account</button>
              </div>

            </div>
            </>}
            

        </section>


        {/*Save Changes Button*/}
        <div>
          <button className={globalStyles.saveChangesButton} id="mainSaveChanges">
          Save Changes
          </button>
        </div>
    
        {/*Logout section*/}
        <NavLink to="/signup">
          <div className={styles.logoutButton} id="logout">
            <img src={logout} alt="logout" />
            Log out
          </div>
        </NavLink>
      <div className={styles.image}>{/*Bull background image*/}</div>   
      </div>
      <br></br>
  </>
  );
};

export default Settings;
