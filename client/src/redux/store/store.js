import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../slices/balanceSlice";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

const newState = store.getState();

console.log(newState);
