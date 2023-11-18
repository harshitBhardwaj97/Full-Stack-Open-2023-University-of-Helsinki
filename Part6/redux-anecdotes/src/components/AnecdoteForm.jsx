import React from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(e.target.content.value));
    e.target.content.value = "";
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <fieldset>
          <legend>Anecdote</legend>
          <div>
            <input type="text" name="content" />
          </div>
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </>
  );
};

export default AnecdoteForm;
