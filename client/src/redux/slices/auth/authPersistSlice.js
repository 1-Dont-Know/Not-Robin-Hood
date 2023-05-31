import { createSlice } from "@reduxjs/toolkit";

const authPersistSlice = createSlice({
  name: "persist",
  initialState: { persist: localStorage.getItem("persist") || false },
  reducers: {
    setPersist: (state, action) => {
      state.persist = action.payload;
    },
  },
});

export const { setPersist } = authPersistSlice.actions;
export default authPersistSlice.reducer;

export const selectPersist = (state) => state.persist;
