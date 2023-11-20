import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import anecdotesData from "../anecdotes";

const App = () => {
  const [anecdotes, setAnecdotes] = useState(anecdotesData);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes([...anecdotes, anecdote]);
    console.log(anecdote);
    let notificationMessage = setTimeout(() => {
      setNotification(`A new Anecdote ${anecdote.content} added successfully.`);
    }, 200);
    setTimeout(() => {
      clearInterval(notificationMessage);
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNewAnecdote={addNew} />
      <p>{notification}</p>
      <Footer />
    </div>
  );
};

export default App;
