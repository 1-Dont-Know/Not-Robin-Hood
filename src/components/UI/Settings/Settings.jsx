import React from "react";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import SquareIcon from "../../../assets/icons/square-icon.svg";
import SettingIcon from "../../../assets/icons/settings-icon.svg";
import Button from "../Button/Button";

const Settings = () => {
  return (
    <>
      <Button type="settings">
        <img src={CameraIcon} alt="Camera Icon" />
      </Button>

      <Button type="settings">
        <img src={SettingIcon} alt="Setting Icon" />
      </Button>

      <Button type="settings">
        <img src={SquareIcon} alt="Square Icon" />
      </Button>
    </>
  );
};

export default Settings;
