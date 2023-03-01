import React from "react";
import styles from "./AddFunds.module.scss";
import Button from "../../UI/Button/Button";
import people from "../../../assets/icons/people-icon.svg"
import creditCard from "../../../assets/icons/credit-card-icon.svg"

const AddFunds = () => {
    return (
        <div className={styles.gridContainerAppFunds}>

            {/* 1 - title and subtitle */}
            <div style={{textAlign:'center'}}>
            <h2 className={styles.modalHeader}>Add funds</h2>
            <p>Select payments option to add balance to your funds for trading</p>
            </div>

            {/* 2 - currency dropdown menu */}
            <div className={styles.currencyContainer}>
                <h3>Deposit Amount</h3>
                <select name="currency" id="currency">
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="aud">AUD</option>
                    <option value="cad">CAD</option>
                </select>
            </div>

            {/* 3 - $50 button */}
            <Button type={"addFunds"}>
            $50
            </Button>

            {/* 4 - $100 button */}
            <Button type={"addFunds"}>
            $100
            </Button>

            {/* 5 - $500 button */}
            <Button type={"addFunds"}>
            $500
            </Button>

            {/* 6 - custom amount input */}
            <input className={styles.currencyInput} type="number" name="Amount" placeholder="Enter amount" />
            
            {/* 7 - credit/debit button */}
            <Button type={"addFunds"}>
            <img src={people} alt="profile"/>
            Credit/Debit
            </Button>
            
            {/* 8 - bank transfer button */}
            <Button type={"addFunds"}>
            <img src={creditCard} alt="credit-card"/>
            Bank Transfer
            </Button>

            {/* 9 - save as default toggle */}
            <div className={styles.toggleContainer}>
            <strong>Save as a default payment</strong>
            <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
            </div>

            {/* 10 - select payment and continue button */}
            <Button type={"addFunds"}>
                Select Payment And Continue
            </Button>
        </div>
    );
};

export default AddFunds;
