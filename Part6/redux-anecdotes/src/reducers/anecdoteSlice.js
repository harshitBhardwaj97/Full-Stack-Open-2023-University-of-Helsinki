import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote-service";

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
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

// Action Creators
export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// Exercise 6.16
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

// Exercise 6.17
export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

// Exercise 6.18
export const saveAnecdoteVote = (anecdoteId) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdoteId);
    console.log(votedAnecdote);
    dispatch(voteAnecdote(votedAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
