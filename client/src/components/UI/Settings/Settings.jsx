import React, { useEffect } from "react";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import SquareIcon from "../../../assets/icons/square-icon.svg";
import SettingIcon from "../../../assets/icons/settings.svg";
import globalStyles from "../../../styles/main.module.scss";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Settings = () => {
    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

  return (
    <>
      <button className={`${globalStyles.settingsButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
        <img src={CameraIcon} alt="Screenshot" />
      </button>

      <button className={`${globalStyles.settingsButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
        <img src={SettingIcon} alt="Settings" />
      </button>

      <button className={`${globalStyles.settingsButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}>
        <img src={SquareIcon} alt="Fullscreen" />
      </button>
    </>
  );
};

export default Settings;
