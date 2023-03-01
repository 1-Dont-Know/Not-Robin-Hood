import React, { useState } from "react";
import styles from "./Hero.module.scss";

const Hero = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};

export default Hero;
