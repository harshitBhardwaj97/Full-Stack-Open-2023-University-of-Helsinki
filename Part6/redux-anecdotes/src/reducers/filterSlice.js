import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterAnecdote: (state, action) => {
      state = action.payload;
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;

export default filterSlice.reducer;
