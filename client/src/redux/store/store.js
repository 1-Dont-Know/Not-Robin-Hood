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
    getDefaultMiddleware().concat(apiSlice.middleware, userApi.middleware),
  devTools: true,
});
