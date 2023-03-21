import { configureStore } from "@reduxjs/toolkit";

import { stocksApi } from "../slices/apiSlice";
import { balanceApi } from "../slices/userApiSlice";

export const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware, balanceApi.middleware),
});
