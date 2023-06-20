//This file stores the sum of assets that is calculated in the Account component.
//This data will be used inside the sidebar Asset component.

import { createSlice } from "@reduxjs/toolkit";

const sumOfAssetsSlice = createSlice({
  name: "sumOfAssets",
  initialState: [],
  reducers: {
    setSumOfAssets: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSumOfAssets } = sumOfAssetsSlice.actions;
export default sumOfAssetsSlice.reducer;