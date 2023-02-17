import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";

const Account = () => {
  return (
    <>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <section className="sidebar"></section>
        <Sidebar />

        {/* Nav/Hero Section */}
        <section className={styles.hero}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <div style={{ backgroundColor: "green" }}>HERO SECTION</div>
        </section>
      </div>
    </>
  );
};

export default Account;
