import React from "react";
import styles from "./Hero.module.scss";
import FeaturedStock from "../FeaturedStock/FeaturedStock";

const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.featured}>
        <FeaturedStock status="up" />
        <FeaturedStock status="down" />
        <FeaturedStock status="up" />
        <FeaturedStock status="up" />
      </div>
    </section>
  );
};

export default Hero;
