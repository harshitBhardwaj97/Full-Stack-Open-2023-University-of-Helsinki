import DiaryEntries from "./components/DiaryEntries";
import AddNewDiary from "./components/AddNewDiary";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./services/diary-service";
import { useState, useEffect } from "react";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((data) => {
      setDiaries(data);
    });
  }, [diaries]);

  return (
    <div>
      <AddNewDiary />
      <DiaryEntries diaries={diaries} />
    </div>
  );
};

export default App;
