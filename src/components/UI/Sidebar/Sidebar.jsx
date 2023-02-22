import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import Asset from "../Asset/Asset";
import Balance from "../Balance/Balance";
import SidebarNav from "../SidebarNav/SidebarNav";

const Sidebar = () => {
  return (
    <>
      <aside className={styles.container}>
        <Logo />
        <Asset />
        <Balance />
        <SidebarNav />
      </aside>
    </>
  );
};

export default Sidebar;
