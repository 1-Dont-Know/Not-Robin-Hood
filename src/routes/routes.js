import { SIGNUP_ROUTE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";

// public routes

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
];

// private routes

export const privateRoutes = [];
