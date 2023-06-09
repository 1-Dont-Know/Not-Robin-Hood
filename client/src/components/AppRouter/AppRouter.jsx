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
import PersistLogin from "../PersistLogin/PersistLogin";
import RequireAuth from "../RequireAuth/RequireAuth";
// Dark Mode
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../redux/slices/darkModeSlice.js';

const AppRouter = () => {

  // Dark Mode Theme
  const darkModeTheme = useSelector(selectDarkMode);
  // When Settings page is rendered, we will set our localstorage "darkMode": false by default;
  useEffect(() => {
    localStorage.setItem("darkMode", darkModeTheme);
  }, [darkModeTheme]);

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
                      <main className={`${styles.mainSection} ${darkModeTheme ? styles['dark-mode'] : ''}`}>
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
