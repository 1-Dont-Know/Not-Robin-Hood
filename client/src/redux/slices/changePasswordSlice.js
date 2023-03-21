import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
// };

const initialState = {
    password: localStorage.getItem("password"),
}



export const changePasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    // change this accordingly to how we want to use it.
    changePassword: (state, { payload }) => {
        for (var key in state) {
          state[key] = false;
        }
        state.changePassword = payload;
    },
  },
});

export const { changePassword } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
