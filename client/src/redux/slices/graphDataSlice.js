//This file stores the sum of assets that is calculated in the Account component.
//This data will be used inside the sidebar Asset component.

import { createSlice } from "@reduxjs/toolkit";

const graphDataSlice = createSlice({
  name: "graphData",
  initialState: [],
  reducers: {
    setGraphData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setGraphData } = graphDataSlice.actions;
export default graphDataSlice.reducer;