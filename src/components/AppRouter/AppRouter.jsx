import React from "react";

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

const AppRouter = () => {
  // TEMPORARY VARIABLE TO HANDLE AUTHORIZATION, FOR PRIVATE ROUTES PURPOSE ONLY
  const auth = {
    token: true,
  };
  return (
    <>
      <Router>
        <Routes>
          {/* RENDERING PRIVATE ROUTES IF USER AUTHORIZED */}
          {auth.token ? (
            <>
              {/* PRIVATE ROUTES LAYOUT, An <Outlet> should be used in parent 
              route elements to render their child route elements. This allows 
              nested UI to show up when child routes are rendered. */}
              <Route
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
                <Route path="/" element={<Navigate to="/account" replace />} />
                {privateRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Route>
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            // PUBLIC ROUTES
            <>
              {publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
