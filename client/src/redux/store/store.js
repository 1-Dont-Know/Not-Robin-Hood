import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "../slices/balanceSlice";
import darkModeReducer from "../slices/darkModeSlice";
import changePasswordReducer from "../slices/changePasswordSlice";
import changeNameReducer from "../slices/changeNameSlice";

export const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
  reducer: {
    darkMode: darkModeReducer,
  },
  reducer: {
    changePassword: changePasswordReducer,
  },
  reducer: {
    changeName: changeNameReducer,
  },
});
