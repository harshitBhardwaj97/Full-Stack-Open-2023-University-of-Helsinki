import { useEffect, useState } from "react";
import { NewDiaryEntry } from "../types";
import { createEntry } from "../services/diary-service";
import axios from "axios";

const AddNewDiary = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {}, [success]);

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry: NewDiaryEntry = {
      date: event.target.date.value,
      weather: event.target.weather.value,
      visibility: event.target.visibility.value,
      comment: event.target.comment.value,
    };
    // console.log(newDiaryEntry);

    try {
      const data = await createEntry(newDiaryEntry);
      console.log(data);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response?.data);
        alert(error.response?.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add Diary</legend>
          <label htmlFor="date">
            Date :
            <input
              type="text"
              name="date"
              id="date"
              value={date}
              required
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </label>
          {date}
          <br />
          <label htmlFor="visibility">
            Visibility :
            <input
              type="text"
              name="visibility"
              id="visibility"
              value={visibility}
              required
              onChange={(e) => {
                setVisibility(e.target.value);
              }}
            />
          </label>
          {visibility}
          <br />
          <label htmlFor="weather">
            Weather :
            <input
              type="text"
              name="weather"
              id="weather"
              value={weather}
              required
              onChange={(e) => {
                setWeather(e.target.value);
              }}
            />
          </label>
          {weather}
          <br />
          <label htmlFor="comment">
            Comment :
            <input
              type="text"
              name="comment"
              id="comment"
              value={comment}
              required
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </label>
          {comment}
          <br />
          <button type="submit">Create</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddNewDiary;
