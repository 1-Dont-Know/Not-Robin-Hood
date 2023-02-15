import { SIGNUP_ROUTE, MARKETS_PAGE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Markets from "../components/pages/Markets/Markets";

// public routes

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {
    path: MARKETS_PAGE,
    element: Markets,
  }
];

// private routes

export const privateRoutes = [];
