import axios from "axios";

const baseUrl = `http://localhost:3001/anecdotes`;

const getId = () => (100000 * Math.random()).toFixed(0);

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    id: getId(),
    votes: 0,
  };

  const response = await axios.post(baseUrl, newAnecdote);
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

  console.log(votedAnecdote);

  const response = await axios.put(`${baseUrl}/${anecdoteId}`, votedAnecdote);
  return response.data;
};

export default { getAllAnecdotes, createAnecdote, voteAnecdote };
