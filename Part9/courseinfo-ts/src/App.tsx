import { courseName, courseParts, totalExercises } from "./data";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  return (
    <div>
      <Header header={courseName} />
      <Content content={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
