import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
// };

// ------------------------------------------------------
// Another way to make an initail satate for dark Mode
    // If localstorage is undefined, it will automatically be false. And when user changes darkMode you store it with :
    // localStorage.setItem("darkMode", darkMode);
/* const initialState = {
  darkMode: localStorage.getItem("darkMode") || false,
}; */

// ------------------------------------------------------

export const darkModeSlice = createSlice({
  name: "darkmode",
  initialState: {
    darkMode: localStorage.getItem("darkMode") || false,
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