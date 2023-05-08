import React from "react";
import { useState, useEffect } from "react";
import { useRefreshAccessTokenMutation } from "../../redux/slices/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPersist } from "../../redux/slices/auth/authPersistSlice";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "../../redux/slices/auth/authSlice";
import { Outlet } from "react-router-dom";
import Loader from "../UI/Loader/Loader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshToken] = useRefreshAccessTokenMutation();
  const persist = useSelector(selectPersist);
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        const refreshResult = await refreshToken();
        console.log(refreshResult);
        dispatch(
          setCredentials({
            accessToken: refreshResult?.data?.accessToken,
            userId: refreshResult?.data?.userId,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);
    console.log(isMounted);
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(token)}`);
  }, [isLoading]);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
