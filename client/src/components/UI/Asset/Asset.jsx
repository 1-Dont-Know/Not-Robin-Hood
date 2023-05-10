import React from "react";
import styles from "./Asset.module.scss";
import assetUp from "../../../assets/icons/asset-up.svg";
import assetDown from "../../../assets/icons/assetsdown.svg";

import {
  useGetAssetValueQuery,
  useGetAssetConditionQuery,
  useGetAssetPercentageQuery,
} from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../Loading/Loading";

const Asset = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    data: value,
    isLoading: loadingValue,
    isError: valueError,
  } = useGetAssetValueQuery(currentUser);
  const {
    data: condition,
    isLoading: loadingCondition,
    isError: conditionError,
  } = useGetAssetConditionQuery(currentUser);
  const {
    data: percentage,
    isLoading: loadingPercetage,
    isError: percentageError,
  } = useGetAssetPercentageQuery(currentUser);

  console.table(value, condition, percentage);
  if (loadingValue) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Asset Value</h3>
      {value || condition || percentage ? (
        <>
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
            $0{`(${percentage})%`}
            <span>Today</span>
          </div>
        </>
      ) : (
        <h2 style={{ textAlign: "center", margin: "2rem" }}>
          Not Available...
        </h2>
      )}
    </div>
  );
};

export default Asset;
