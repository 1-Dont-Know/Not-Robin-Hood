import { configureStore } from "@reduxjs/toolkit";
import { finnhubApiSlice } from "../slices/api/finnhubApiSlice.js";
import { alphaVantageApiSlice } from "../slices/api/alphaVantageApiSlice.js";
import { userApi } from "../slices/user/userApiSlice";
import authReducer from "../slices/auth/authSlice";
import persistReducer from "../slices/auth/authPersistSlice.js";
import themeReducer from "../slices/darkModeSlice.js";
import graphDataReducer from "../slices/graphDataSlice.js"
import graphFilterRangeReducer from "../slices/graphFilterRangeSlice.js";

export const store = configureStore({
  reducer: {
    [finnhubApiSlice.reducerPath]: finnhubApiSlice.reducer,
    [alphaVantageApiSlice.reducerPath]: alphaVantageApiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    persist: persistReducer,
    darkmode: themeReducer,
    graphData: graphDataReducer,
    graphFilterRange: graphFilterRangeReducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /*Turn off Serializability Middleware checks for large amounts of data
      Specifically this turns off the warning when calling the Finnhub api
      for the large list of companies for the US exchanges*/
      immutableCheck: false,
      serializableCheck: false,
      /***************************************************/
    }).concat(
      finnhubApiSlice.middleware,
      alphaVantageApiSlice.middleware,
      userApi.middleware
    ),
  devTools: true, // switch to false in production
});
