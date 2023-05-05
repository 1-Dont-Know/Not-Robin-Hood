import React, { useEffect, useState } from "react";

// IMPORTING REACT-ROUTER COMPONENTS
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

// IMPORTING OUR APP COMPONENTS / PRIVATE ROUTES / PUBLIC ROUTES

import NotFound from "../pages/NotFound/NotFound";
import Settings from "../pages/Settings/Settings";
import Sidebar from "../UI/Sidebar/Sidebar";
import TopNav from "../UI/TopNav/TopNav";
import { privateRoutes } from "../../routes/routes";
import { publicRoutes } from "../../routes/routes";

// IMPORTING STYLES FROM APP ROUTER STYLES
import styles from "./AppRouter.module.scss";
import NotificationPopUp from "../UI/NotificationPopUp/NotificationPopUp";
import jwt_decode from "jwt-decode";

import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
  logOut,
} from "../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersistLogin from "../PersistLogin/PersistLogin";
import RequireAuth from "../RequireAuth/RequireAuth";

const AppRouter = () => {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // VARIABLE TO HANDLE AUTHORIZATION, FOR PRIVATE ROUTES PURPOSE ONLY (getting token and current user from redux store)
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log("logged in user: ", user);
  console.log("logged in user's token:", token);

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  return (
    <>
      <Router>
        <Routes>
          {/* RENDERING PRIVATE ROUTES IF USER AUTHORIZED */}(
          <>
            {/* PRIVATE ROUTES LAYOUT, An <Outlet> should be used in parent 
              route elements to render their child route elements. This allows 
              nested UI to show up when child routes are rendered. */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route
                  path="/"
                  element={
                    <div className={styles.wrapper}>
                      <Sidebar />
                      <main className={styles.mainSection}>
                        <TopNav />
                        <Outlet />
                      </main>
                    </div>
                  }
                >
                  <Route
                    path="/"
                    element={<Navigate to="/account" replace />}
                  />
                  {privateRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}
                </Route>
                <Route path="/notifications" element={<NotificationPopUp />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </>
          ) ( // PUBLIC ROUTES
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </>
          )
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
