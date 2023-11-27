import { NonSensitiveDiaryEntry } from "../types";

interface DiaryEntriesProp {
  diaries: NonSensitiveDiaryEntry[];
}

const Total = ({ diaries }: DiaryEntriesProp) => {
  if (!diaries) {
    return null;
  }

  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>Visibility : {diary.visibility}</p>
          <p>Weather : {diary.weather}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Total;
