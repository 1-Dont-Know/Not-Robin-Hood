import React from 'react'
import ToolIcon from "../../../assets/icons/tools.svg";
import Button from "../../UI/Button/Button";

const Settings = () => {
    return (
      <div>
        <h1>Setting Page</h1>

        <Button type="tools">
          <img src={ToolIcon} alt="tool Icon" />
          Tools
        </Button>

      </div>
    );
  };
  
  export default Settings;
  