import React, { useState } from "react";
import styles from "./Hero.module.scss";

import FeaturedStock from "../FeaturedStock/FeaturedStock";
import Graph from "../Graph/Graph";
import { fakeData } from "../../../utils/fakeData"; //Temporary Fake Data used for Testing

const Hero = ({ children }) => {
  //State Hook for Graph Component

  return <>{children}</>;
};

export default Hero;
