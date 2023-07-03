import { createSlice } from "@reduxjs/toolkit";

export const graphFilterRangeSlice = createSlice({
  name: "graphFilterRange",
  initialState: {
    graphFilterRange: 32,
  },
  reducers: {
    setGraphFilterRange: (state, action) => {
      state.graphFilterRange = action.payload;
    },
  },
});

export const { setGraphFilterRange } = graphFilterRangeSlice.actions;
export default graphFilterRangeSlice.reducer;
export const selectGraphFilterRange = (state) => state.graphFilterRange.graphFilterRange;