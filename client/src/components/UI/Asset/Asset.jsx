import React from "react";
import styles from "./Asset.module.scss";
import assetUp from "../../../assets/icons/asset-up.svg";
import assetDown from "../../../assets/icons/assetsdown.svg";

import { useGetAssetValueQuery } from "../../../redux/slices/user/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slices/auth/authSlice";
import Loading from "../Loading/Loading";

const Asset = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: usersAsset, isLoading: loadingValue } =
    useGetAssetValueQuery(currentUser);
  if (loadingValue) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Asset Value</h3>
      {usersAsset?.value || usersAsset?.condition || usersAsset?.percentage ? (
        <>
          <p className={styles.amount}>
            ${usersAsset?.value}
            <span>USD</span>
          </p>
          <div
            className={styles.results}
            style={{
              color:
                usersAsset?.condition === "positive" ? "#2ab795" : "#AE2424",
            }}
          >
            {usersAsset?.condition === "positive" ? (
              <img src={assetUp} alt="up" />
            ) : (
              <img src={assetDown} alt="down" />
            )}
            $0{`(${usersAsset?.percentage})%`}
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
