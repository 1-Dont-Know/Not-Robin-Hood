import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";

const Account = () => {
  return (
    <>
      <div className={styles.wrapper}>
        {/* Sidebar Section */}
        <Sidebar />
        {/* Nav/Hero Section */}
        <section className={styles.heroSection}>
          {/* Top Navigation */}
          <TopNav />
          {/* Hero Section */}
          <Hero />
        </section>
      </div>
    </>
  );
};

export default Account;
