import { configureStore } from "@reduxjs/toolkit";
import { stocksApi } from "../slices/apiSlice.js";
import { userApi } from "../slices/user/userApiSlice";
import authReducer from "../slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware, userApi.middleware),
  devTools: true,
});
