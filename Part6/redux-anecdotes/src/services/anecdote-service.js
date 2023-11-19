import axios from "axios";
import { getId } from "../reducers/anecdoteSlice";

const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewAnecdote = async (anecdoteContent) => {
  const anecdote = {
    content: anecdoteContent,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export default { getAllAnecdotes, createNewAnecdote };
