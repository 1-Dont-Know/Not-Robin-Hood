import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: 0,
// };

const initialState = {
    name: localStorage.getItem("name"),
}



export const changeNameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    // change this accordingly to how we want to use it.
    changeName: (state, { payload }) => {
        for (var key in state) {
          state[key] = false;
        }
        state.changeName = payload;
    },
  },
});

export const { changeName } = changeNameSlice.actions;

export default changeNameSlice.reducer;
