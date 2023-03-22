import {
  LOGIN_ROUTE,
  PORTFOLIO_ROUTE,
  SIGNUP_ROUTE,
  STOCK_VIEWER_ROUTE,
  ACCOUNT_ROUTE,
  MARKETS_ROUTE,
  STOCK_TRANSACTIONS_ROUTE,
  NOT_FOUND,
} from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Portfolio from "../components/pages/Portfolio/Portfolio";
import Login from "../components/pages/Login/Login";
import Account from "../components/pages/Account/Account";
import Markets from "../components/pages/Markets/Markets";
import StockViewer from "../components/pages/StockViewer/StockViewer";
import StockTransactions from "../components/pages/StockTransactions/StockTransactions";
import NotFound from "../components/pages/NotFound/NotFound";

//? PUBLIC ROUTES

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
  {
    path: NOT_FOUND,
    element: NotFound,
  },
];

//? PRIVATE ROUTES (routes which are available for authorized users only)

export const privateRoutes = [
  {
    path: STOCK_VIEWER_ROUTE,
    element: StockViewer,
  },

  {
    path: MARKETS_ROUTE,
    element: Markets,
  },
  {
    path: ACCOUNT_ROUTE,
    element: Account,
  },

  {
    path: STOCK_TRANSACTIONS_ROUTE,
    element: StockTransactions,
  },

  {
    path: PORTFOLIO_ROUTE,
    element: Portfolio,
  },
  {
    path: NOT_FOUND,
    element: NotFound,
  },
];
