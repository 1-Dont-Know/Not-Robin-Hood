import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice.js";
import { userApi } from "../slices/user/userApiSlice";
import authReducer from "../slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /*Turn off Serializability Middleware checks for large amounts of data
      Specifically this turns off the warning when calling the Finnhub api
      for the large list of companies for the US exchanges*/
      immutableCheck: false,
      serializableCheck: false,
      /***************************************************/
    }).concat(apiSlice.middleware, userApi.middleware),
  devTools: true,
});
