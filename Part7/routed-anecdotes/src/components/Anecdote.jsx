import { useParams } from "react-router-dom";

const Anecdote = ({ foundAnecdote }) => {
  /*   
const { id } = useParams();
console.log(anecdotes);
const foundAnecdote = anecdotes.find((anecdote) => anecdote.id === Number(id));
  */

  console.log(foundAnecdote);
  return (
    <div>
      {foundAnecdote ? (
        <div>
          <h2>{foundAnecdote.content}</h2>
          <p>
            has {foundAnecdote.votes}{" "}
            {foundAnecdote.votes < 2 ? " Vote " : " Votes "}
          </p>
        </div>
      ) : (
        "Anecdote not found !"
      )}
    </div>
  );
};

export default Anecdote;
