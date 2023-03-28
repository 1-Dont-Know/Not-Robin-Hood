import { configureStore } from "@reduxjs/toolkit";

import StocksItemReducer from "../slices/stockItemSlice";
import { stocksApi } from "../slices/apiSlice.js";
import darkModeReducer from "../slices/darkModeSlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import changeNameReducer from "../slices/changeNameSlice";
import { userApi } from "../slices/user/userApiSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    stocksItem: StocksItemReducer,
    darkMode: darkModeReducer,
    changePassword: changePasswordReducer,
    changeName: changeNameReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware, userApi.middleware),
});
