import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdote-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();

  // Exercise 6.20
  const {
    data: anecdotes,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => anecdoteService.getAllAnecdotes(),
    retry: 1,
  });

  // Exercise 6.22
  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = async (anecdote) => {
    // console.log(anecdote.id);
    voteAnecdoteMutation.mutate(anecdote.id);
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <span>Anecdote Service not available due to problem with server.</span>
    );
  }

  if (isSuccess) {
    console.log(JSON.parse(JSON.stringify(anecdotes)));
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} {anecdote.votes < 2 ? " Vote " : " Votes "}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
