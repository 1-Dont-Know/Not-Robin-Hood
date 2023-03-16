import React from "react";
import styles from "./SettingsPage.module.scss";

// Search Bar component receives a placeholder prop for the search default message
const Settings = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <input className={styles.settingsPage} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Settings;
