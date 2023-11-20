import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";
import Anecdote from "./Anecdote";

const Menu = ({ anecdotes, addNewAnecdote }) => {
  const match = useMatch("/anecdotes/:id");
  const foundAnecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const padding = {
    paddingRight: 5,
  };
  return (
    <>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create New Anecdote
      </Link>
      <Link style={padding} to="/about">
        About Us
      </Link>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/create" element={<CreateNew addNew={addNewAnecdote} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote foundAnecdote={foundAnecdote} />}
        />
      </Routes>
    </>
  );
};

export default Menu;
