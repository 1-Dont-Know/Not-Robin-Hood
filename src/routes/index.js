import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/consts";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

// public routes

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
];

// private routes

export const privateRoutes = [];
