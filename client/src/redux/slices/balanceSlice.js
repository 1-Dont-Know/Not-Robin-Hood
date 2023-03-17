import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += parseFloat(action.payload);
    },
  },
});

export const { increment } = balanceSlice.actions;

export default balanceSlice.reducer;
