import { configureStore } from "@reduxjs/toolkit";

import StocksItemReducer from "../slices/stockItemSlice";
import { stocksApi } from "../slices/apiSlice";
import darkModeReducer from "../slices/darkModeSlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import changeNameReducer from "../slices/changeNameSlice";
import { balanceApi } from "../slices/userApiSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    stocksItem: StocksItemReducer,
    darkMode: darkModeReducer,
    changePassword: changePasswordReducer,
    changeName: changeNameReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware, balanceApi.middleware),
});
