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

const voteAnecdote = async (anecdoteId) => {
  const anecdotes = await getAllAnecdotes();

  const anecdoteToBeVoted = anecdotes.find(
    (anecdote) => anecdote.id === anecdoteId
  );

  const votedAnecdote = {
    ...anecdoteToBeVoted,
    votes: anecdoteToBeVoted.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${anecdoteId}`, votedAnecdote);

  return response.data;
};

export default { getAllAnecdotes, createNewAnecdote, voteAnecdote };
