import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../slices/balanceSlice";
import StocksItemReducer from "../slices/stockItemSlice"
import { stocksApi } from "../slices/apiSlice";
import darkModeReducer from "../slices/darkModeSlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import changeNameReducer from "../slices/changeNameSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    balance: balanceReducer,
    stocksItem: StocksItemReducer,
  },

  reducer: {
    darkMode: darkModeReducer,
  },
  reducer: {
    changePassword: changePasswordReducer,
  },
  reducer: {
    changeName: changeNameReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stocksApi.middleware),
});
