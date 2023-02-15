import { SIGNUP_ROUTE, Account_ROUTE } from "../utils/consts";
import Signup from "../components/pages/Signup/Signup";
import Account from "../components/pages/Account/Account";

// public routes

export const publicRoutes = [
  {
    path: SIGNUP_ROUTE,
    element: Signup,
  },
  {
    path: Account_ROUTE,
    element: Account,
    // terstint safpda[nf'nads[fn op[asdfn ]]]
  },
];

// private routes

export const privateRoutes = [];
