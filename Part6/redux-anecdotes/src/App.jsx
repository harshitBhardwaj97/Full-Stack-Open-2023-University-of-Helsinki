import { useDispatch } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteSlice";

const App = () => {
  const dispatch = useDispatch();

  // Exercise 6.16
  useEffect(() => {
    dispatch(initializeAnecdotes());
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
