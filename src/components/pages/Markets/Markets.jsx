import React from "react"
import Button from "../../UI/Button/Button";
import PlusIcon from "../../../assets/icons/plus-icon.svg";
import Sidebar from "../../UI/Sidebar/Sidebar";
import TopNav from "../../UI/TopNav/TopNav";
import styles from "./Markets.module.scss";
import Hero from "../../UI/Hero/Hero";

const Markets = () => {
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
          <Button type="addFunds">
            <img src={PlusIcon} alt="plus icon" />
            Add Funds
          </Button>
        </div>
        </section>
      </div>
    </>
  );

}

export default Markets;
