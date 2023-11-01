import { useState } from "react";
import FeedbackButton from "./components/FeedbackButton";
import Statistics from "./components/Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div className="container max-w-7xl mx-auto p-3 h-screen flex flex-col items-center justify-center font-bold">
        <div className="feedback__heading text-3xl mb-2 font-bold">
          Give FeedBack
        </div>
        <div className="feedback__buttons flex items-center gap-2">
          <FeedbackButton
            text="Good"
            onSmash={() => setGood((prev) => prev + 1)}
          />
          <FeedbackButton
            text="Neutral"
            onSmash={() => setNeutral((prev) => prev + 1)}
          />
          <FeedbackButton
            text="Bad"
            onSmash={() => setBad((prev) => prev + 1)}
          />
        </div>
        <section className="statistics mt-2">
          <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
        </section>
      </div>
    </>
  );
};

export default App;
