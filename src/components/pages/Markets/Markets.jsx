import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";

export default function Markets() {
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
}
