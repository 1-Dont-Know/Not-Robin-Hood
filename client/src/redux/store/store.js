import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../slices/balanceSlice";
import StocksItemReducer from "../slices/stockItemSlice"
import { stocksApi } from "../slices/apiSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    balance: balanceReducer,
    stocksItem: StocksItemReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stocksApi.middleware),
});
