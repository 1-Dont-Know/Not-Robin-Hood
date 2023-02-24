import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Account.module.scss";
import Hero from "../../UI/Hero/Hero";
import FeaturedStock from "../../UI/FeaturedStock/FeaturedStock";

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
          <Hero>
            <div className={styles.featured}>
              <FeaturedStock status="up" />
              <FeaturedStock status="down" />
              <FeaturedStock status="up" />
              <FeaturedStock status="up" />
            </div>
          </Hero>
        </section>
      </div>
    </>
  );
};

export default Account;
