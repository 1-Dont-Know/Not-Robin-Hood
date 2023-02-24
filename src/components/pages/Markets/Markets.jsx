import React from "react"
import Button from "../../UI/Button/Button";
import PlusIcon from "../../../assets/icons/plus-icon.svg";
import Sidebar from "../../UI/Sidebar/Sidebar";

const Markets = () => {
  return (

    <div>
      <Sidebar />
      <h1>Markets Page</h1>

      <Button type="addFunds">
        <img src={PlusIcon} alt="plus icon" />
        Add Funds
      </Button>
    </div>
  )
}

export default Markets;
