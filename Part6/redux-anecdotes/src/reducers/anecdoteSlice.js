import { createSlice } from "@reduxjs/toolkit";

export const getId = () => (100000 * Math.random()).toFixed(0);

export const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const foundAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      foundAnecdote.votes++;
    },
    addAnecdote: (state, action) => {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };
      state.push(newAnecdote);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

// Action Creators
export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
