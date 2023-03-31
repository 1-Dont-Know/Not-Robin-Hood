import { configureStore } from "@reduxjs/toolkit";
import { finnhubApiSlice } from "../slices/apiSlice";
import { userApiSlice } from "../slices/userApiSlice";

import StocksItemReducer from "../slices/stockItemSlice";
import darkModeReducer from "../slices/darkModeSlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import changeNameReducer from "../slices/changeNameSlice";


export const store = configureStore({
  reducer: {
    [finnhubApiSlice.reducerPath]: finnhubApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    
    stocksItem: StocksItemReducer,
    darkMode: darkModeReducer,
    changePassword: changePasswordReducer,
    changeName: changeNameReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(finnhubApiSlice.middleware, userApiSlice.middleware),
});
