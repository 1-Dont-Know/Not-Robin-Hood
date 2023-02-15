import { LOGIN_ROUTE, PORTFOLIO_ROUTE, SIGNUP_ROUTE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Portfolio from "../components/pages/Portfolio/Portfolio";
import Login from "../components/pages/Login/Login";

// public routes

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
];

// private routes

export const privateRoutes = [
  {
    path: PORTFOLIO_ROUTE,
    element: Portfolio,
  },
];
