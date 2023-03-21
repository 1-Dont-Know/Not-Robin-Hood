import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../slices/balanceSlice";
import { stocksApi } from "../slices/apiSlice";


export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    balance: balanceReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stocksApi.middleware),
});
