import { useDispatch } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import { setAnecdotes } from "./reducers/anecdoteSlice";
import anecdoteService from "./services/anecdote-service";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAllAnecdotes()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  const [query, setQuery] = useState("");

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter handleQuery={setQuery} />
      <AnecdoteList query={query} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
