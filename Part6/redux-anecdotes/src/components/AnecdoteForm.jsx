import React from "react";
import { addAnecdote } from "../reducers/anecdoteSlice";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdote-service";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const anecdoteContent = e.target.content.value;
    e.target.content.value = "";
    await anecdoteService.createNewAnecdote(anecdoteContent);
    dispatch(addAnecdote(anecdoteContent));
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <fieldset>
          <legend>Anecdote</legend>
          <div>
            <input type="text" name="content" required />
          </div>
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </>
  );
};

export default AnecdoteForm;
