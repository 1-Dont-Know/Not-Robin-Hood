import React from "react"
import Button from "../../UI/Button/Button";
import PlusIcon from "../../../assets/icons/plus-icon.svg";

const Markets = () => {
  return (
    <div>
      <h1>Markets Page</h1>

      <Button type="addFunds">
        <img src={PlusIcon} alt="plus icon" />
        Add Funds
      </Button>
    </div>
  )
}

export default Markets;