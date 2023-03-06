import React from "react";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import SquareIcon from "../../../assets/icons/square-icon.svg";
import SettingIcon from "../../../assets/icons/settings.svg";
import globalStyles from "../../../styles/main.module.scss";

const Settings = () => {
  return (
    <>
      <button className={globalStyles.settingsButton}>
        <img src={CameraIcon} alt="Screenshot" />
      </button>

      <button className={globalStyles.settingsButton}>
        <img src={SettingIcon} alt="Settings" />
      </button>

      <button className={globalStyles.settingsButton}>
        <img src={SquareIcon} alt="Fullscreen" />
      </button>
    </>
  );
};

export default Settings;
