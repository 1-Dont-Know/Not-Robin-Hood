
import { LOGIN_ROUTE, PORTFOLIO_ROUTE, SIGNUP_ROUTE, Account_ROUTE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Portfolio from "../components/pages/Portfolio/Portfolio";
import Login from "../components/pages/Login/Login";
import Account from "../components/pages/Account/Account";



//? PUBLIC ROUTES

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {

    path: LOGIN_ROUTE,
    element: Login,

    path: Account_ROUTE,
    element: Account,
  },
];

//? PRIVATE ROUTES (routes which are available for authorized users only)

export const privateRoutes = [
  {
    path: PORTFOLIO_ROUTE,
    element: Portfolio,
  },
];
