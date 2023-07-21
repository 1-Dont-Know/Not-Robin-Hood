import React, { useState, useRef, useEffect } from "react";
import styles from "./Accordion.module.scss";
import globalStyles from "../../../styles/main.module.scss";
import DownVectorIcon from "../../../assets/icons/down-vector.svg";
import { useSelector } from 'react-redux';
import { selectDarkMode } from './../../../redux/slices/darkModeSlice';

// Accordion components that take in props as argument manages its open/closed state with the isOpen state variable
function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

// this line initializes a state variable called height with an initial value of 0
// and a function called setHeight that can be used to update its value
  const [height, setHeight] = useState(0);

// This line creates a reference to the content element inside the accordion, which will be used to measure its height and apply the appropriate styles
  const contentRef = useRef(null);

// this useEffect get called when the "isOpen" variable changes
// then it use setHeight to update the height state to either full size of the content element (contentRef.current.scrollHeight) if the accordion is open
// or 0 if it is closed
  useEffect(() => {
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

// When the user clicks on the accordion, the toggleAccordion function is called to toggle the state of isOpen.
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

    {/* Dark Mode Theme*/}
    const darkModeTheme = useSelector(selectDarkMode);
    // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
    useEffect(() => {localStorage.setItem("darkMode", darkModeTheme);}, [darkModeTheme]);
    {/* End Dark Mode Theme*/}

// to ensure styling to work properly create a function where it sets the max-height property of the content to the height 
// if the isOpen state is true when accordion is open then set the maxHeight to the value of the height variable
// if the isOpen state is false when accordion is closed then set the max height to 0. To hide the accordion.
  const contentStyle = {
    maxHeight: isOpen ? `${height}px` : "0",
    transition: "max-height 0.45s ease-in-out",
    overflow: "hidden",
  };

  return (
    <div className={styles.stockInfo}>
      {/* added onClick where trigger function called toggleAccordion when clicked */}
      <button
        className={`${globalStyles.stockInfoButton} ${darkModeTheme ? globalStyles["dark-mode"] : ""}`}
        onClick={toggleAccordion}
      >
        {/* props.title is used to display the title of the accordion, which is "Stock Information" in this case */}
        <p>{props.title}</p>
        <img
          src={DownVectorIcon}
          alt="arrow down"
          className={isOpen ? styles.rotated : ""}
        />
      </button>
      {/* Check if the accordion should be open and show the content if true */}
      <div className={styles.stockInfoContent} style={contentStyle}>
        <div className={`${styles.stockInfoText} ${darkModeTheme ? styles["dark-mode"] : ""}`} ref={contentRef}>
          {props.children}
        </div>
          {/* props.children is calling the <p> inside the accordion */}
      </div>
    </div>
  );
}

export default Accordion;