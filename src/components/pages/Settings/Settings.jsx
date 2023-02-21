import React from 'react'
import Button from "../../UI/Button/Button";

import ToolIcon from "../../../assets/icons/tools-icon.svg";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import SquareIcon from "../../../assets/icons/square-icon.svg";
import SettingIcon from "../../../assets/icons/settings-icon.svg";

const Settings = () => {
    return (
      <div>
        <h1>Setting Page</h1>

        <Button type="tools">
          <img src={ToolIcon} alt="Tool Icon" />
          Tools
        </Button>
      
        <div>
          <Button type="settings">
            <img src={CameraIcon} alt="Camera Icon" />
          </Button>

          <Button type="settings">
            <img src={SettingIcon} alt="Setting Icon" />
          </Button>

          <Button type="settings">
            <img src={SquareIcon} alt="Square Icon" />
          </Button>
        </div>

      </div>
    );
  };
  
  export default Settings;
  