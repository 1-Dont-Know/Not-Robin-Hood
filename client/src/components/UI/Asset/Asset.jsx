import React from "react";
import styles from "./Asset.module.scss";
import assetUp from "../../../assets/icons/asset-up.svg";
import assetDown from "../../../assets/icons/assetsdown.svg";

import {
  useGetAssetValueQuery,
  useGetAssetConditionQuery,
  useGetAssetPercentageQuery,
} from "../../../redux/slices/user/userApiSlice";

const Asset = () => {
  const {
    data: value,
    isLoading: loadingValue,
    isError: valueError,
  } = useGetAssetValueQuery(1);
  const {
    data: condition,
    isLoading: loadingCondition,
    isError: conditionError,
  } = useGetAssetConditionQuery(1);
  const {
    data: percentage,
    isLoading: loadingPercetage,
    isError: percentageError,
  } = useGetAssetPercentageQuery(1);

  if (loadingValue) {
    return <div className={styles.loader}></div>;
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Asset Value</h3>
      <p className={styles.amount}>
        ${value}
        <span>USD</span>
      </p>
      <div
        className={styles.results}
        style={{ color: condition === "positive" ? "#2ab795" : "#AE2424" }}
      >
        {condition === "positive" ? (
          <img src={assetUp} alt="up" />
        ) : (
          <img src={assetDown} alt="down" />
        )}
        $51.29{`(${percentage})%`}
        <span>Today</span>
      </div>
    </div>
  );
};

export default Asset;
