import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import Asset from "../Asset/Asset";
import Balance from "../Balance/Balance";
import SidebarNav from "../SidebarNav/SidebarNav";
import ChevronIcon from "../../../assets/icons/chevron.png";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sideBarHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
  // End Dark Mode Theme

  return (
    <>
      <aside
        className={`${isOpen ? styles.containerHidden : styles.container} 
        ${darkModeTheme ? styles["dark-mode"] : ""}`}>
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
