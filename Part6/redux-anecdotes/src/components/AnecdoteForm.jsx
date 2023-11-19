import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const anecdoteContent = e.target.content.value;
    e.target.content.value = "";

    // Exercise 6.17
    dispatch(createNewAnecdote(anecdoteContent));
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
