import { createSlice } from "@reduxjs/toolkit";

export const stocksItemSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
  },
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
  },
});

export const { setStocks } = stocksItemSlice.actions;
export default stocksItemSlice.reducer;