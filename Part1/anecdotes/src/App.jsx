import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const setRandomAnecdote = () => {
    const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdoteIndex);
  };

  // Creating initial 0 filled array against each index [0,0,0,0,0,0,0,0]
  const initialArr = Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [anecdoteScoreArray, setAnecdoteScoreArray] = useState(initialArr);

  const handleVote = (selected) => {
    const anecdoteScoreArrayCopy = [...anecdoteScoreArray];
    anecdoteScoreArrayCopy[selected] += 1;
    setAnecdoteScoreArray(anecdoteScoreArrayCopy);
  };

  const maxVotedIndex = anecdoteScoreArray.indexOf(
    Math.max(...anecdoteScoreArray)
  );

  return (
    <>
      <div className="container max-w-7xl mx-auto p-3 h-screen flex flex-col items-center justify-center font-bold">
        <div className="anecdote__heading text-3xl mb-2 font-bold">
          Random Anecdote
        </div>
        <div className="anecdote">{anecdotes[selected]}</div>
        <div className="votes">Votes : {anecdoteScoreArray[selected]}</div>
        <div className="actions flex items-center gap-4">
          <button
            className="px-2 py-4 font-bold cursor-pointer hover:scale-105 bg-yellow-300 rounded-full hover:bg-yellow-500 ease-linear duration-150 mt-2"
            onClick={setRandomAnecdote}
          >
            Generate Random Anecdote
          </button>
          <button
            className="px-2 py-4 font-bold cursor-pointer hover:scale-105 bg-green-300 rounded-full hover:bg-green-500 ease-linear duration-150 mt-2"
            onClick={() => {
              handleVote(selected);
            }}
          >
            Vote this anecdote
          </button>
          {/* <div className="array">{anecdoteScoreArray}</div> */}
        </div>
        <div className="anecdote__maxvotes text-3xl m-2 font-bold">
          Anecdote with most votes
        </div>
        <div>
          {anecdotes[maxVotedIndex]} , having{" "}
          {anecdoteScoreArray[maxVotedIndex]} votes
        </div>
      </div>
    </>
  );
};

export default App;
