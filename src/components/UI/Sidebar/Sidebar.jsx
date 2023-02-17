import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";

const Sidebar = () => {
  return (
    <>
      <aside className={styles.container}>
        <Logo />
      </aside>
    </>
  );
};

export default Sidebar;
