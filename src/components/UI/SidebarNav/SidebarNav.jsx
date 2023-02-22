import React from "react";
import styles from "./SidebarNav.module.scss";
import overview from "../../../assets/icons/overview.svg";
import markets from "../../../assets/icons/markets.svg";
import transactions from "../../../assets/icons/transactions.svg";
import settings from "../../../assets/icons/settings.svg";
import logout from "../../../assets/icons/logout.svg";

const SidebarNav = () => {
  return (
    <nav>
      <ul className={styles.generalList}>
        <h2 className={styles.sectionTitle}>
          General
          <span>
            <hr className={styles.divider} />
          </span>
        </h2>
        <li className={styles.listItem}>
          <img src={overview} alt="overview" />
          Overview
        </li>
        <li className={styles.listItem}>
          {" "}
          <img src={markets} alt="markets" />
          Markets
        </li>
        <li className={styles.listItem}>
          {" "}
          <img src={transactions} alt="transactions" /> Stock Transaction
        </li>
      </ul>
      <ul className={styles.supportList}>
        <h2 className={styles.sectionTitle}>
          Support
          <span>
            <hr className={styles.divider} />
          </span>
        </h2>
        <li className={styles.listItem}>
          <img src={settings} alt="settings" />
          Settings
        </li>
        <li className={styles.listItem}>
          <img src={logout} alt="logout" />
          Log out
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
