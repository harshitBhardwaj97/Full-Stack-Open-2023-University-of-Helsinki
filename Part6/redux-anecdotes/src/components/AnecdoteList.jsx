import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, setAnecdotes } from "../reducers/anecdoteSlice";

const AnecdoteList = ({ query }) => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const dispatch = useDispatch();

  //   console.log(anecdotes);

  const compareVotes = (a1, a2) => {
    return a2.votes - a1.votes; // Sorted in descending order
  };
  const sortedAnecdotes = anecdotes.slice().sort(compareVotes);

  const filteredAnecdotes =
    query === ""
      ? sortedAnecdotes
      : sortedAnecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(query)
        );

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };
  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} {anecdote.votes < 2 ? " Vote " : " Votes "}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
