import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);

  const compareVotes = (a1, a2) => {
    return a2.votes - a1.votes; // Sorted in descending order
  };
  const sortedAnecdotes = anecdotes.slice().sort(compareVotes);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const handleAnecdoteSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.content.value);
    dispatch(addAnecdote(e.target.content.value));
    e.target.content.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div>
          <input type="text" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
