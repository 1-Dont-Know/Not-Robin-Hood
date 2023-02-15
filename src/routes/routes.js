import { SIGNUP_ROUTE, STOCK_VIEWER_ROUTE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Stock_Viewer from "../components/pages/Stock_Viewer/Stock_Viewer";

// public routes

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {
    path: STOCK_VIEWER_ROUTE,
    element: Stock_Viewer,
  },
];

// private routes

export const privateRoutes = [];
