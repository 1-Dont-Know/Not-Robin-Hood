import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "../../routes/routes";
import { SIGNUP_ROUTE } from "../../utils/consts";
import { MARKETS_PAGE } from "../../utils/consts";

const AppRouter = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}

        <Route path="/" element={<Navigate to={SIGNUP_ROUTE} replace />} />
        <Route path="/" element={<Navigate to={MARKETS_PAGE} replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
