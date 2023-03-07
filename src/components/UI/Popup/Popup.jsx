import React from "react";
import styles from "./Popup.module.scss";
import globalStyles from "../../../styles/main.module.scss";

const Popup = ({ toggle, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <button onClick={toggle} className={styles.closePopupButton}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
