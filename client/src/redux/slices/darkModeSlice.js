import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkmode",
  initialState: {
    darkMode: (localStorage.getItem("darkMode") === "true") || false,
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = action.payload;
      //localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toggleTheme } = darkModeSlice.actions;

export default darkModeSlice.reducer;

export const selectDarkMode = (state) => state.darkmode.darkMode;
