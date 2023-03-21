import { createSlice } from "@reduxjs/toolkit";

export const stocksItemSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    isLoading: false,
  },
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStocks, setLoading } = stocksItemSlice.actions;
export default stocksItemSlice.reducer;