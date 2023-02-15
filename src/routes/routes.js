import { LOGIN_ROUTE, PORTFOLIO_ROUTE, SIGNUP_ROUTE, ACCOUNT_ROUTE, MARKETS_PAGE} from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Portfolio from "../components/pages/Portfolio/Portfolio";
import Login from "../components/pages/Login/Login";
import Account from "../components/pages/Account/Account";
import Markets from "../components/pages/Markets/Markets";

//? PUBLIC ROUTES

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  
  {
    Markets-page
    path: MARKETS_PAGE,
    element: Markets,
  },
  
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
  
  {

    path: ACCOUNT_ROUTE,
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
