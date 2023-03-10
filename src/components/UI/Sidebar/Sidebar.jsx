import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import Asset from "../Asset/Asset";
import Balance from "../Balance/Balance";
import SidebarNav from "../SidebarNav/SidebarNav";
import ChevronIcon from "../../../assets/icons/chevron.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const sideBarHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <aside className={isOpen ? styles.containerHidden : styles.container}>
        {!isOpen && <Logo />}
        <div
          onClick={sideBarHandler}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          className={styles.toggle}
        >
          <img src={ChevronIcon} alt="toggle" />
        </div>
        {!isOpen && <Asset />}
        {!isOpen && <Balance />}
        {!isOpen && <SidebarNav />}
      </aside>
    </>
  );
};

export default Sidebar;
