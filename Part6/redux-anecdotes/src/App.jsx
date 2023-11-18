import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter handleQuery={setQuery} />
      <AnecdoteList query={query} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
